import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import MapView, { Marker, Polyline, Callout, Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const CITIES = [
  { name: 'Barcelona', emoji: '🏛️', dates: 'May 20–24', lat: 41.3874, lng:  2.1686, order: 1 },
  { name: 'Montserrat', emoji: '⛰️', dates: 'May 23 (day trip)', lat: 41.5935, lng:  1.8369, order: null },
  { name: 'Tossa de Mar', emoji: '🏰', dates: 'May 22 (day trip)', lat: 41.7198, lng:  2.9331, order: null },
  { name: 'Granada',    emoji: '🕌', dates: 'May 24–26', lat: 37.1773, lng: -3.5986, order: 2 },
  { name: 'Córdoba',    emoji: '🌸', dates: 'May 26–27', lat: 37.8882, lng: -4.7794, order: 3 },
  { name: 'Sevilla',    emoji: '💃', dates: 'May 27–30', lat: 37.3891, lng: -5.9845, order: 4 },
  { name: 'Madrid',     emoji: '🏰', dates: 'May 30–Jun 2', lat: 40.4168, lng: -3.7038, order: 5 },
];

const MAIN_ROUTE = CITIES.filter(c => c.order !== null).map(c => ({ latitude: c.lat, longitude: c.lng }));
const RETURN_ROUTE = [
  { latitude: 40.4168, longitude: -3.7038 }, // Madrid
  { latitude: 41.3874, longitude:  2.1686 }, // Barcelona
];

const INITIAL_REGION: Region = {
  latitude: 39.5,
  longitude: -2.0,
  latitudeDelta: 8,
  longitudeDelta: 11,
};

export default function TripMapScreen() {
  const mapRef = useRef<MapView>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const resetView = () => {
    mapRef.current?.animateToRegion(INITIAL_REGION, 600);
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={INITIAL_REGION}>

        {/* Main route: Barcelona → Granada → Córdoba → Sevilla → Madrid */}
        <Polyline
          coordinates={MAIN_ROUTE}
          strokeColor="#6750A4"
          strokeWidth={3}
          lineDashPattern={[10, 5]}
        />

        {/* Return flight: Madrid → Barcelona (dashed lighter) */}
        <Polyline
          coordinates={RETURN_ROUTE}
          strokeColor="#9E9E9E"
          strokeWidth={2}
          lineDashPattern={[6, 6]}
        />

        {CITIES.map(city => (
          <Marker
            key={city.name}
            coordinate={{ latitude: city.lat, longitude: city.lng }}
            onPress={() => setSelected(city.name)}
          >
            <View style={[styles.pin, city.order ? styles.pinMain : styles.pinDay]}>
              {city.order ? (
                <Text style={styles.pinNumber}>{city.order}</Text>
              ) : (
                <Text style={styles.pinEmoji}>{city.emoji}</Text>
              )}
            </View>
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{city.emoji} {city.name}</Text>
                <Text style={styles.calloutDates}>{city.dates}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendRow}>
          <View style={[styles.legendLine, { backgroundColor: '#6750A4' }]} />
          <Text style={styles.legendText}>Main route</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendLine, { backgroundColor: '#9E9E9E' }]} />
          <Text style={styles.legendText}>Return flight</Text>
        </View>
      </View>

      {/* Reset button */}
      <TouchableOpacity style={styles.resetBtn} onPress={resetView}>
        <Ionicons name="locate" size={20} color="#6750A4" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1 },
  map:          { flex: 1 },
  pin: {
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 3, shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  pinMain:      { backgroundColor: '#6750A4' },
  pinDay:       { backgroundColor: '#E65100', width: 26, height: 26, borderRadius: 13 },
  pinNumber:    { color: '#fff', fontWeight: '800', fontSize: 13 },
  pinEmoji:     { fontSize: 12 },
  callout: {
    backgroundColor: '#fff', borderRadius: 10, padding: 10,
    minWidth: 140, shadowColor: '#000', shadowOpacity: 0.2,
    shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 6,
  },
  calloutTitle: { fontWeight: '700', fontSize: 14, color: '#333', marginBottom: 2 },
  calloutDates: { fontSize: 12, color: '#6750A4' },
  legend: {
    position: 'absolute', bottom: 24, left: 16,
    backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: 10,
    padding: 10, gap: 6, shadowColor: '#000', shadowOpacity: 0.15,
    shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  legendRow:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendLine:   { width: 24, height: 3, borderRadius: 2 },
  legendText:   { fontSize: 12, color: '#333' },
  resetBtn: {
    position: 'absolute', bottom: 24, right: 16,
    backgroundColor: '#fff', borderRadius: 24, width: 44, height: 44,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }, elevation: 4,
  },
});
