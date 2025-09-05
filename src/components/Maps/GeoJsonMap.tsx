'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import type { FeatureCollection } from 'geojson';
import { useQuery } from '@tanstack/react-query';
import geojsonData from '@/data/geoJsonPopayan.json';
import { useFetchMaps } from '@/api/Maps/fetchMaps';
import { useYear } from '@/context/YearContext';

// Tipamos bien el geojson
const typedGeojson: FeatureCollection = geojsonData as FeatureCollection;


interface PropsData {
    DESC_ZONA: string;
    TOTAL: number;
}

export const GeoJsonMap = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const { accidentsByCommunity } = useFetchMaps()
    const [isFullScreen, setIsFullScreen] = useState(false);

    const { year } = useYear()
    const { data } = useQuery({
        queryKey: ['accidents-Community', year],
        queryFn: () => accidentsByCommunity(year),
        placeholderData: {
            TOTAL: 0
        }
    })

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_TOKEN_MAPBOX || "";

        if (mapContainer.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [-76.614, 2.441],
                zoom: 11,
                antialias: true,
            });

            map.addControl(new mapboxgl.FullscreenControl(), "top-left");
            map.addControl(new mapboxgl.NavigationControl(), "top-left");

            const handleFullscreenChange = () => {
                setIsFullScreen(!!document.fullscreenElement);
            };

            document.addEventListener("fullscreenchange", handleFullscreenChange);

            map.on('style.load', () => {
                map.setFog({});
            });

            map.on('load', () => {
                const geojsonWithTotals: FeatureCollection = {
                    ...typedGeojson,
                    features: typedGeojson.features.map((feature) => {
                        const comunaName = feature.properties?.name || feature.properties?.nombre;
                        const match = data.find(
                            (item: PropsData) => item.DESC_ZONA.toLowerCase() === comunaName?.toLowerCase()
                        );

                        return {
                            ...feature,
                            properties: {
                                ...feature.properties,
                                total: match ? match.TOTAL : 0,
                            }
                        };
                    }),
                };

                map.addSource('popayan', {
                    type: 'geojson',
                    data: geojsonWithTotals,
                    generateId: true,
                });

                // Capa de relleno
                map.addLayer({
                    id: 'popayan-layer',
                    type: 'fill',
                    source: 'popayan',
                    paint: {
                        'fill-color': '#627BC1',
                        'fill-opacity': 0.3
                    }
                });

                // Contorno
                map.addLayer({
                    id: 'outline',
                    type: 'line',
                    source: 'popayan',
                    paint: {
                        'line-color': '#37353E',
                        'line-width': 3
                    }
                });

                map.addLayer({
                    id: 'labels',
                    type: 'symbol',
                    source: 'popayan',
                    layout: {
                        'text-field': [
                            'format',
                            ['get', 'name'], { 'font-scale': 1.2 },
                            '\n',
                            ['concat', 'Total: ', ['to-string', ['get', 'total']]]
                        ],
                        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                        'text-size': 14,
                        'text-allow-overlap': false,
                        'text-anchor': 'center'
                    },
                    paint: {
                        'text-color': '#000',
                        // 'text-halo-color': '#fff',
                        'text-halo-width': 2
                    }
                });
            });

            return () => {
                document.removeEventListener("fullscreenchange", handleFullscreenChange);
                map.remove()
            };
        }
    }, [data])

    return <div id="map" ref={mapContainer} style={{ height: '100%' }}></div>;
}
