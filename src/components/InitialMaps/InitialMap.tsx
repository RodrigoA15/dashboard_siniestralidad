import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import { useQuery } from '@tanstack/react-query';
import { useFetchMaps } from '@/api/Maps/fetchMaps';

interface Props {
  coordenadaX: number;
  coordenadaY: number;
}
export const InitialMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { accidentsByDate } = useFetchMaps()
  const { data, isLoading } = useQuery({
    queryKey: ['accidentsByDate', new Date('2025-03-10'), new Date('2025-03-12'), 'h'],
    queryFn: () => accidentsByDate('2025-03-10', '2025-03-12', 'h')
  })

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

      data.map((item: Props) => {
        new mapboxgl.Marker()
          .setLngLat([item.coordenadaY, item.coordenadaX])
          .addTo(map);
      })

      // Clean up on unmount
      return () => map.remove();
    }
  }, [data]);

  if (isLoading) return <p>Loading Map...</p>

  return <div id="map" ref={mapContainer} style={{ height: '100%' }}></div>;
}
