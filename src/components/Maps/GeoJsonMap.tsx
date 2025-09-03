'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import { FeatureCollection } from 'geojson';
import geojsonData from '@/data/geoJsonPopayan.json' assert { type: "json" };

const typedGeojson: FeatureCollection = geojsonData as FeatureCollection;


export const GeoJsonMap = () => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_TOKEN_MAPBOX || "";

        if (mapContainer.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v11",
                center: [-76.614, 2.441],
                zoom: 11,
                pitch: 31,
                // bearing: -10.4,
                antialias: true,
            });

            const fullScreen = new mapboxgl.FullscreenControl();
            map.addControl(fullScreen, "top-left");
            map.addControl(new mapboxgl.NavigationControl(), "top-left");

            map.on('style.load', () => {
                map.setFog({});
            });

            map.on('load', () => {
                map.addSource('popayan', {
                    type: 'geojson',
                    data: typedGeojson,
                });

                map.addLayer({
                    id: 'popayan-layer',
                    type: 'fill',
                    source: 'popayan',
                    paint: {
                        'fill-color': '#0080ff',
                        'fill-opacity': 0.2,
                    }
                });

                map.addLayer({
                    id: 'outline',
                    type: 'line',
                    source: 'popayan',
                    layout: {},
                    paint: {
                        'line-color': '#fff',
                        'line-width': 2
                    }
                });
            });

            return () => map.remove();
        }
    }, [])

    return <div id="map" ref={mapContainer} style={{ height: '100%' }}></div>;
}
