'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import { useQuery } from '@tanstack/react-query';
import { useFetchMaps } from '@/api/Maps/fetchMaps';

interface Props {
    coordenadaX: number;
    coordenadaY: number;
}

export const PredictionMap = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [severity, setSeverity] = useState('')
    const [isFullScreen, setIsFullScreen] = useState(false);
    const mapContainer = useRef<HTMLDivElement>(null);
    const { accidentsByDate } = useFetchMaps()
    const { data, refetch } = useQuery({
        queryKey: ['accidentsByDate', startDate, endDate, severity],
        queryFn: () => accidentsByDate(startDate, endDate, severity),
        enabled: false, // Prevents automatic fetching on component mount
    });

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_TOKEN_MAPBOX;

        if (mapContainer.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [-76.614, 2.441],
                zoom: 12,
                pitch: 45,
                bearing: -10.4,
                antialias: true,
            });
            const fullScreen = new mapboxgl.FullscreenControl()
            // Add zoom controls
            map.addControl(fullScreen, "top-left");
            map.addControl(new mapboxgl.NavigationControl(), "top-left");
            const handleFullscreenChange = () => {
                setIsFullScreen(!!document.fullscreenElement);
            };
            data?.map((item: Props) => {
                new mapboxgl.Marker()
                    .setLngLat([item.coordenadaY, item.coordenadaX])
                    .addTo(map);
            })

            document.addEventListener("fullscreenchange", handleFullscreenChange);

            return () => {
                document.removeEventListener("fullscreenchange", handleFullscreenChange);
                map.remove();
            };

        }
    }, [data])

    return (
        <div>
            <div
                ref={mapContainer}
                style={{ width: "100%", height: "100vh", position: "relative" }}
            >

                {isFullScreen && (
                    <div className="absolute top-4 left-12 z-10 bg-white/90 rounded-lg p-3 shadow-md flex flex-col gap-2 text-sm">
                        <div>
                            <label className="font-medium block mb-1">Fecha Inicio</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 w-56"
                            />
                        </div>
                        <div>
                            <label className="font-medium block mb-1">Fecha Fin</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 w-56"
                            />
                        </div>
                        <div>
                            <label className="font-medium block mb-1">Gravedad</label>
                            <select
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 w-56"
                            >
                                <option value="">Todas</option>
                                <option value="d">Daños</option>
                                <option value="h">Heridos</option>
                                <option value="m">Fallecidos</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button onClick={() => refetch()} className="bg-blue-500 text-white text-center rounded px-4 py-2 hover:bg-blue-600 w-full">Buscar</button>
                            {/* <button onClick={handleSearchSeverity} className="bg-green-500 text-white text-center rounded px-4 py-2 hover:bg-green-600 w-full">Analizar punto critico</button> */}
                            {/* <button onClick={handleSearchCriticalAreas} className="bg-yellow-500 text-white text-center rounded px-4 py-2 hover:bg-yellow-600 w-full">Analizar puntos criticos</button> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
