import { useState, useEffect, useCallback } from 'react';

export type GeolocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unavailable' | 'error';

interface GeolocationState {
  status: GeolocationStatus;
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

/**
 * Requests the browser Geolocation API.
 * On success, returns a "lat,lon" coordinate string suitable for WeatherAPI.com queries.
 * Gracefully handles denied / unavailable states without throwing.
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: 'idle',
    latitude: null,
    longitude: null,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, status: 'unavailable', error: 'Geolocation is not supported by your browser.' }));
      return;
    }

    setState((s) => ({ ...s, status: 'loading' }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: 'success',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState((s) => ({ ...s, status: 'denied', error: 'Location permission denied.' }));
        } else {
          setState((s) => ({ ...s, status: 'error', error: err.message }));
        }
      },
      { timeout: 10_000, maximumAge: 300_000 }
    );
  }, []);

  // Request on first mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const coordQuery =
    state.latitude !== null && state.longitude !== null
      ? `${state.latitude},${state.longitude}`
      : null;

  return { ...state, coordQuery, retry: requestLocation };
}
