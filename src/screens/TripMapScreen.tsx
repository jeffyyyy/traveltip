import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import MapView, { Marker, Polyline, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const MAP_PROVIDER = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
  ? PROVIDER_GOOGLE
  : undefined; // falls back to Apple Maps on iOS

const CITIES = [
  { name: '1. Barcelona',   dates: 'May 20–24',          lat: 41.3874, lng:  2.1686, main: true  },
  { name: 'Montserrat',     dates: 'May 23 (day trip)',   lat: 41.5935, lng:  1.8369, main: false },
  { name: 'Tossa de Mar',   dates: 'May 22 (day trip)',   lat: 41.7198, lng:  2.9331, main: false },
  { name: '2. Granada',     dates: 'May 24–26',           lat: 37.1773, lng: -3.5986, main: true  },
  { name: '3. Córdoba',     dates: 'May 26–27',           lat: 37.8882, lng: -4.7794, main: true  },
  { name: '4. Sevilla',     dates: 'May 27–30',           lat: 37.3891, lng: -5.9845, main: true  },
  { name: '5. Madrid',      dates: 'May 30–Jun 2',        lat: 40.4168, lng: -3.7038, main: true  },
];

const MAIN_ROUTE = CITIES.filter(c => c.main).map(c => ({ latitude: c.lat, longitude: c.lng }));
const RETURN_ROUTE = [
  { latitude: 40.4168, longitude: -3.7038 },
  { latitude: 41.3874, longitude:  2.1686 },
];

const INITIAL_REGION: Region = {
  latitude: 39.5,
  longitude: -2.0,
  latitudeDelta: 8,
  longitudeDelta: 11,
};

export default function TripMapScreen() {
  const mapRef = useRef<MapView>(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={MAP_PROVIDER}
        initialRegion={INITIAL_REGION}
      >
        <Polyline coordinates={MAIN_ROUTE}   strokeColor="#6750A4" strokeWidth={3} />
        <Polyline coordinates={RETURN_ROUTE} strokeColor="#9E9E9E" strokeWidth={2} />

        {CITIES.map(city => (
          <Marker
            key={city.name}
            coordinate={{ latitude: city.lat, longitude: city.lng }}
            title={city.name}
            description={city.dates}
            pinColor={city.main ? '#6750A4' : '#E65100'}
          />
        ))}
      </MapView>

      <View style={styles.legend}>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#6750A4' }]} />
          <Text style={styles.legendText}>Main cities</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#E65100' }]} />
          <Text style={styles.legendText}>Day trips</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendLine, { backgroundColor: '#9E9E9E' }]} />
          <Text style={styles.legendText}>Return flight</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.resetBtn} onPress={() => mapRef.current?.animateToRegion(INITIAL_REGION, 600)}>
        <Ionicons name="locate" size={20} color="#6750A4" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map:       { flex: 1 },
  legend: {
    position: 'absolute', bottom: 24, left: 16,
    backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: 10,
    padding: 10, gap: 6,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  legendRow:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot:  { width: 12, height: 12, borderRadius: 6 },
  legendLine: { width: 24, height: 3, borderRadius: 2 },
  legendText: { fontSize: 12, color: '#333' },
  resetBtn: {
    position: 'absolute', bottom: 24, right: 16,
    backgroundColor: '#fff', borderRadius: 24, width: 44, height: 44,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }, elevation: 4,
  },
});
