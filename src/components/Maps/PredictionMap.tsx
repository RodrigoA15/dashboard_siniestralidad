'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl, { Map, Marker, Popup } from 'mapbox-gl';
import { useQuery } from '@tanstack/react-query';
import { useFetchMaps } from '@/api/Maps/fetchMaps';
import { usePredictions } from '@/api/Maps/fetchPredictions';

// =======================
// Interfaces
// =======================
interface AccidentProps {
    coordenadaX: number;
    coordenadaY: number;
    nro_croquis: string;
}

interface CriticalPoint {
    longitud: number;
    latitud: number;
    n_accidentes: number;
}

// =======================
// Constantes
// =======================
const DEFAULT_CENTER: [number, number] = [-76.614, 2.441];
const DEFAULT_ZOOM = 12;
const CRITICAL_COLOR = '#FF3F33';

// =======================
// Componente principal
// =======================
export const PredictionMap = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [severity, setSeverity] = useState('');
    const [isFullScreen, setIsFullScreen] = useState(false);

    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null);

    const { accidentsByDate } = useFetchMaps();
    const { fetchAllPredictions, fetchCriticalAreas } = usePredictions();

    // =======================
    // Queries
    // =======================
    const accidentsQuery = useQuery({
        queryKey: ['accidentsByDate', startDate, endDate, severity],
        queryFn: () => accidentsByDate(startDate, endDate, severity),
        enabled: false,
    });

    const predictionQuery = useQuery({
        queryKey: ['prediction-fetch', accidentsQuery.data],
        queryFn: () => fetchAllPredictions(accidentsQuery.data),
        enabled: false,
    });

    const criticalQuery = useQuery({
        queryKey: ['critical-fetch', accidentsQuery.data],
        queryFn: () => fetchCriticalAreas(accidentsQuery.data),
        enabled: false,
    });

    // =======================
    // Handlers
    // =======================
    const handleFullscreenChange = useCallback(() => {
        setIsFullScreen(!!document.fullscreenElement);
    }, []);

    // =======================
    // Renderizar marcadores
    // =======================
    const renderAccidentMarkers = useCallback(
        (map: Map, accidents?: AccidentProps[]) => {
            accidents?.forEach((item) => {
                new Marker()
                    .setLngLat([item.coordenadaY, item.coordenadaX])
                    .setPopup(new Popup({ offset: 25 }).setText(item.nro_croquis))
                    .addTo(map);
            });
        },
        []
    );

    const renderPredictionMarker = useCallback(
        (map: Map, prediction?: CriticalPoint) => {
            if (!prediction) return;

            new Marker({ color: CRITICAL_COLOR })
                .setLngLat([prediction.latitud, prediction.longitud])
                .addTo(map);
        },
        []
    );

    const renderCriticalMarkers = useCallback(
        (map: Map, criticalPoints?: CriticalPoint[]) => {
            criticalPoints?.forEach((point) => {
                const popup = new Popup({ offset: 25 }).setText(
                    `Número de accidentes: ${point.n_accidentes}`
                );
                new Marker({ color: CRITICAL_COLOR })
                    .setLngLat([point.latitud, point.longitud])
                    .setPopup(popup)
                    .addTo(map);
            });
        },
        []
    );

    // =======================
    // Inicializar mapa
    // =======================
    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_TOKEN_MAPBOX ?? '';

        if (!mapContainer.current) return;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            pitch: 45,
            bearing: -10.4,
            antialias: true,
        });

        map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
        map.addControl(new mapboxgl.NavigationControl(), 'top-left');

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        mapInstance.current = map;

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            map.remove();
        };
    }, [handleFullscreenChange]);

    // =======================
    // Renderizar datos en el mapa
    // =======================
    useEffect(() => {
        const map = mapInstance.current;
        if (!map) return;

        renderAccidentMarkers(map, accidentsQuery.data);
        renderPredictionMarker(map, predictionQuery.data);
        renderCriticalMarkers(map, criticalQuery.data);
    }, [accidentsQuery.data, predictionQuery.data, criticalQuery.data, renderAccidentMarkers, renderPredictionMarker, renderCriticalMarkers]);

    // =======================
    // Render
    // =======================
    return (
        <div>
            <div
                ref={mapContainer}
                style={{ width: '100%', height: '100vh', position: 'relative' }}
            >
                {isFullScreen && (
                    <div className="absolute top-4 left-12 z-10 bg-white/90 rounded-lg p-3 shadow-md flex flex-col gap-2 text-sm">
                        {/* Fecha Inicio */}
                        <div>
                            <label className="font-medium block mb-1">Fecha Inicio</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 w-56"
                            />
                        </div>
                        {/* Fecha Fin */}
                        <div>
                            <label className="font-medium block mb-1">Fecha Fin</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 w-56"
                            />
                        </div>
                        {/* Gravedad */}
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
                        {/* Botones */}
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => accidentsQuery.refetch()}
                                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 w-full"
                            >
                                Buscar
                            </button>
                            <button
                                onClick={() => predictionQuery.refetch()}
                                className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 w-full"
                            >
                                Analizar punto crítico
                            </button>
                            <button
                                onClick={() => criticalQuery.refetch()}
                                className="bg-yellow-500 text-white rounded px-4 py-2 hover:bg-yellow-600 w-full"
                            >
                                Analizar puntos críticos
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
