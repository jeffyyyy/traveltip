import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text as RNText } from 'react-native';
import { Text } from 'react-native-paper';
import MapView, { Marker, Polyline, Callout, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MAP_PROVIDER = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
  ? PROVIDER_GOOGLE
  : undefined; // no API key → Apple Maps

const CITIES = [
  { order: 1,    name: 'Barcelona',   dates: 'May 20–24',         lat: 41.3874, lng:  2.1686, main: true,  dayId: 'd1'  },
  { order: null, name: 'Tossa de Mar', dates: 'May 22 (day trip)',  lat: 41.7198, lng:  2.9331, main: false, dayId: 'd3'  },
  { order: null, name: 'Montserrat',   dates: 'May 23 (day trip)',  lat: 41.5935, lng:  1.8369, main: false, dayId: 'd4'  },
  { order: 2,    name: 'Granada',     dates: 'May 24–26',         lat: 37.1773, lng: -3.5986, main: true,  dayId: 'd5'  },
  { order: 3,    name: 'Córdoba',     dates: 'May 26–27',         lat: 37.8882, lng: -4.7794, main: true,  dayId: 'd7'  },
  { order: 4,    name: 'Sevilla',     dates: 'May 27–30',         lat: 37.3891, lng: -5.9845, main: true,  dayId: 'd8'  },
  { order: null, name: 'Ronda',       dates: 'May 29 (day trip)',  lat: 36.7458, lng: -5.1619, main: false, dayId: 'd10' },
  { order: 5,    name: 'Madrid',      dates: 'May 30–Jun 2',      lat: 40.4168, lng: -3.7038, main: true,  dayId: 'd11' },
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
  const navigation = useNavigation<any>();

  const goToDay = (dayId: string) => {
    navigation.navigate('Itinerary', {
      screen: 'DayDetail',
      params: { dayId },
    });
  };

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
            tracksViewChanges={false}
            anchor={{ x: 0.5, y: 1 }}
          >
            <View style={styles.pinWrapper}>
              <View style={[styles.pinBubble, city.main ? styles.pinBubbleMain : styles.pinBubbleDay]}>
                {city.order !== null
                  ? <RNText style={styles.pinNumber}>{city.order}</RNText>
                  : <RNText style={styles.pinIcon}>✶</RNText>
                }
              </View>
              <View style={[styles.pinTail, city.main ? styles.pinTailMain : styles.pinTailDay]} />
            </View>
            <Callout onPress={() => goToDay(city.dayId)} tooltip>
              <View style={styles.callout}>
                <RNText style={styles.calloutName}>{city.name}</RNText>
                <RNText style={styles.calloutDates}>{city.dates}</RNText>
                <View style={styles.calloutCta}>
                  <RNText style={styles.calloutCtaText}>View day details</RNText>
                  <Ionicons name="chevron-forward" size={12} color="#6750A4" />
                </View>
              </View>
            </Callout>
          </Marker>
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
  pinWrapper:     { alignItems: 'center' },
  pinBubble: {
    width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2.5, borderColor: '#fff',
    shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }, elevation: 6,
  },
  pinBubbleMain: { backgroundColor: '#6750A4' },
  pinBubbleDay:  { backgroundColor: '#E65100', width: 26, height: 26, borderRadius: 13 },
  pinTail: {
    width: 0, height: 0,
    borderLeftWidth: 7, borderRightWidth: 7, borderTopWidth: 10,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
    marginTop: -1,
  },
  pinTailMain: { borderTopColor: '#6750A4' },
  pinTailDay:  { borderTopColor: '#E65100', borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 7 },
  pinNumber: { color: '#fff', fontWeight: '800', fontSize: 14 },
  pinIcon:   { color: '#fff', fontWeight: '800', fontSize: 11 },
  callout: {
    backgroundColor: '#fff', borderRadius: 12, padding: 12,
    minWidth: 160, maxWidth: 200,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 }, elevation: 6,
  },
  calloutName:    { fontWeight: '700', fontSize: 15, color: '#1a1a1a', marginBottom: 2 },
  calloutDates:   { fontSize: 12, color: '#666', marginBottom: 8 },
  calloutCta:     { flexDirection: 'row', alignItems: 'center', gap: 2 },
  calloutCtaText: { fontSize: 12, color: '#6750A4', fontWeight: '600' },
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
