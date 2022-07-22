import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Mapbox from 'mapbox-gl';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Button, Loading } from '@/components/atoms';

import styles from './MapboxMap.module.css';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';

interface Props {
  isLoading: boolean;
  originLng?: number;
  originLat?: number;
  onMapLoading: (loading: boolean) => void;
  onSelect: (lng: number, lat: number) => void;
}

export const MapboxMap = memo(({ isLoading, originLng, originLat, onMapLoading, onSelect }: Props) => {
  const [lng, setLng] = useState(originLng ?? 106.774124);
  const [lat, setLat] = useState(originLat ?? -6.121435);
  const mapNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = mapNode.current;

    if (!node) {
      return;
    }

    const map = setupMap([lng, lat], node);

    return () => {
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setupMap = useCallback(
    (position: Mapbox.LngLatLike, _node: HTMLDivElement) => {
      const map = new Mapbox.Map({
        accessToken,
        center: position,
        container: _node,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 12,
      });

      const marker = new Mapbox.Marker({ color: 'red', draggable: true }).setLngLat(position).addTo(map);

      marker.on('dragend', () => {
        const coordinate = marker.getLngLat();
        const markLng = Number(coordinate.lng.toFixed(5));
        const markLat = Number(coordinate.lat.toFixed(5));
        setLng(markLng);
        setLat(markLat);
      });

      const geocoder = new MapboxGeocoder({
        accessToken,
        marker: false,
        zoom: 12,
      });
      map.addControl(geocoder);

      geocoder.on('result', (result) => {
        marker.setLngLat(result.result.center);
      });

      const navigationControl = new Mapbox.NavigationControl({ showCompass: false });
      map.addControl(navigationControl);

      map.once('render', () => onMapLoading(true));
      map.once('load', () => {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const coordinates: Mapbox.LngLatLike = [position.coords.longitude, position.coords.latitude];
            map.flyTo({
              center: coordinates,
              essential: false,
            });
            marker.setLngLat(coordinates);
            setLng(coordinates[0]);
            setLng(coordinates[1]);
          },
          function (err) {
            console.log(err);
          },
          {
            enableHighAccuracy: true,
          },
        );
        onMapLoading(false);
      });

      return map;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onMapLoading],
  );

  const handleClick = useCallback(() => {
    onSelect(lng, lat);
  }, [lat, lng, onSelect]);

  return (
    <>
      {isLoading ? (
        <div style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'white', zIndex: 2 }}>
          <Loading />
        </div>
      ) : (
        <div className={styles.centerbar}>
          <Button color="secondary" className="w-full" onClick={handleClick}>
            Select Location
          </Button>
        </div>
      )}

      <div ref={mapNode} className={styles.container} />
    </>
  );
});
