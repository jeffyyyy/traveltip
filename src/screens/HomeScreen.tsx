import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Chip } from 'react-native-paper';
import { CITIES, TRIP_DAYS, TRIP_START, HOTELS } from '../data/spainTrip';
import { CITY_NAMES_ZH } from '../data/spainTripZh';
import { useLanguage } from '../context/LanguageContext';

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function getTodayDay() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return TRIP_DAYS.find(d => {
    const dd = new Date(d.date);
    dd.setHours(0, 0, 0, 0);
    return dd.getTime() === today.getTime();
  });
}

export default function HomeScreen() {
  const { t, lang } = useLanguage();
  const daysUntil = useMemo(() => getDaysUntil(TRIP_START), []);
  const todayDay = useMemo(() => getTodayDay(), []);
  const isTripStarted = daysUntil <= 0;
  const isTripOver = daysUntil < -15;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineMedium" style={styles.header}>{t('home.tripTitle')}</Text>

      <Card style={styles.countdownCard}>
        <Card.Content style={styles.countdownContent}>
          {isTripOver ? (
            <Text variant="titleLarge" style={styles.countdownText}>{t('home.tripOver')}</Text>
          ) : isTripStarted ? (
            <>
              <Text variant="displaySmall" style={styles.countdownNum}>Day {Math.abs(daysUntil) + 1}</Text>
              <Text variant="titleMedium" style={styles.countdownLabel}>{t('home.dayOf')}</Text>
            </>
          ) : (
            <>
              <Text variant="displaySmall" style={styles.countdownNum}>{daysUntil}</Text>
              <Text variant="titleMedium" style={styles.countdownLabel}>{t('home.daysUntil')}</Text>
              <Text variant="bodySmall" style={styles.countdownSub}>{t('home.departure')}</Text>
            </>
          )}
        </Card.Content>
      </Card>

      {todayDay && (
        <Card style={styles.todayCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>{t('home.todayLabel')} {todayDay.dayLabel}</Text>
            <Text variant="bodyLarge" style={styles.cityLabel}>{todayDay.cityEmoji} {lang === 'zh' ? (CITY_NAMES_ZH[todayDay.city] ?? todayDay.city) : todayDay.city}</Text>
            {todayDay.activities.slice(0, 3).map((a, i) => (
              <Text key={i} variant="bodySmall" style={styles.activityLine}>
                {a.time}  {a.title}
              </Text>
            ))}
          </Card.Content>
        </Card>
      )}

      <Text variant="titleMedium" style={styles.sectionTitle}>{t('home.citiesTitle')}</Text>
      <View style={styles.cityGrid}>
        {CITIES.map(city => (
          <Card key={city.name} style={styles.cityCard}>
            <Card.Content style={styles.cityCardContent}>
              <Text style={styles.cityEmoji}>{city.emoji}</Text>
              <Text variant="titleSmall" style={styles.cityName}>{lang === 'zh' ? (CITY_NAMES_ZH[city.name] ?? city.name) : city.name}</Text>
              <Text variant="bodySmall" style={styles.cityDays}>{city.days}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <Text variant="titleMedium" style={styles.sectionTitle}>{t('home.hotelsTitle')}</Text>
      {HOTELS.map(h => (
        <Card key={h.id} style={styles.hotelCard}>
          <Card.Content style={styles.hotelRow}>
            <View style={styles.hotelInfo}>
              <Text variant="titleSmall">{h.name}</Text>
              <Text variant="bodySmall" style={styles.hotelCity}>{lang === 'zh' ? (CITY_NAMES_ZH[h.city] ?? h.city) : h.city}</Text>
            </View>
            <Chip compact>{h.checkIn} – {h.checkOut}</Chip>
          </Card.Content>
        </Card>
      ))}

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text variant="headlineSmall" style={styles.statNum}>15</Text>
          <Text variant="bodySmall" style={styles.statLabel}>{t('general.days')}</Text>
        </View>
        <View style={styles.statBox}>
          <Text variant="headlineSmall" style={styles.statNum}>6</Text>
          <Text variant="bodySmall" style={styles.statLabel}>{t('general.cities')}</Text>
        </View>
        <View style={styles.statBox}>
          <Text variant="headlineSmall" style={styles.statNum}>32</Text>
          <Text variant="bodySmall" style={styles.statLabel}>{t('general.attractions')}</Text>
        </View>
        <View style={styles.statBox}>
          <Text variant="headlineSmall" style={styles.statNum}>7</Text>
          <Text variant="bodySmall" style={styles.statLabel}>{t('general.freeEntries')}</Text>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16, paddingBottom: 32 },
  header: { textAlign: 'center', marginVertical: 16, fontWeight: 'bold' },
  countdownCard: { backgroundColor: '#6750A4', marginBottom: 16 },
  countdownContent: { alignItems: 'center', paddingVertical: 12 },
  countdownNum: { color: '#fff', fontWeight: 'bold' },
  countdownText: { color: '#fff', textAlign: 'center' },
  countdownLabel: { color: '#e8def8', marginTop: 4 },
  countdownSub: { color: '#ccc5e0', marginTop: 4 },
  todayCard: { marginBottom: 16, backgroundColor: '#eaddff' },
  sectionTitle: { marginBottom: 10, marginTop: 8, fontWeight: '600' },
  cityLabel: { marginBottom: 8, color: '#6750A4' },
  activityLine: { color: '#444', marginBottom: 2 },
  cityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  cityCard: { width: '47%' },
  cityCardContent: { alignItems: 'center', paddingVertical: 12 },
  cityEmoji: { fontSize: 28, marginBottom: 4 },
  cityName: { fontWeight: '600' },
  cityDays: { opacity: 0.6, textAlign: 'center', marginTop: 2 },
  hotelCard: { marginBottom: 8 },
  hotelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hotelInfo: { flex: 1, marginRight: 8 },
  hotelCity: { opacity: 0.6, marginTop: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginTop: 8 },
  statBox: { alignItems: 'center' },
  statNum: { color: '#6750A4', fontWeight: 'bold' },
  statLabel: { opacity: 0.6, marginTop: 2 },
});
