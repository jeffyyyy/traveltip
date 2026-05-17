import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TRIP_DAYS } from '../data/spainTrip';
import { CITY_NAMES_ZH } from '../data/spainTripZh';
import { useLanguage } from '../context/LanguageContext';

const ACTIVITY_TYPE_COLORS: Record<string, string> = {
  transport: '#1565C0',
  sightseeing: '#2E7D32',
  food: '#E65100',
  accommodation: '#6A1B9A',
  leisure: '#00695C',
};

export default function ItineraryScreen({ navigation }: any) {
  const { t, lang } = useLanguage();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text variant="titleLarge" style={styles.header}>{t('itinerary.title')}</Text>
      <FlatList
        data={TRIP_DAYS}
        keyExtractor={d => d.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const dayDate = new Date(item.date);
          dayDate.setHours(0, 0, 0, 0);
          const isToday = dayDate.getTime() === today.getTime();
          const isPast = dayDate < today;
          const freeCount = item.activities.filter(a => a.isFreeEntry).length;

          return (
            <TouchableOpacity onPress={() => navigation.navigate('DayDetail', { dayId: item.id })}>
              <Card style={[styles.card, isToday && styles.todayCard, isPast && styles.pastCard]}>
                <Card.Content style={styles.cardContent}>
                  <View style={styles.dayBadge}>
                    <Text variant="titleMedium" style={styles.dayNum}>{item.dayNumber}</Text>
                    {isToday && <Text style={styles.todayBadge}>{t('itinerary.today')}</Text>}
                  </View>
                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <Text variant="titleSmall" style={[styles.dayLabel, isPast && styles.pastText]}>
                        {item.dayLabel}
                      </Text>
                      <Text variant="bodyMedium" style={styles.city}>
                        {item.cityEmoji} {item.city}
                      </Text>
                    </View>
                    <Text variant="bodySmall" style={[styles.preview, isPast && styles.pastText]} numberOfLines={1}>
                      {item.activities.slice(0, 2).map(a => a.title).join(' · ')}
                    </Text>
                    <View style={styles.chips}>
                      {item.dayTrip && (
                        <Chip icon="map-marker-path" style={styles.dayTripChip} textStyle={styles.dayTripText}>
                          {t('general.dayTrip')}: {lang === 'zh' ? (CITY_NAMES_ZH[item.dayTrip] ?? item.dayTrip) : item.dayTrip}
                        </Chip>
                      )}
                      <Chip style={styles.chip} textStyle={styles.chipText}>
                        {item.activities.length} {t('general.activities')}
                      </Chip>
                      {freeCount > 0 && (
                        <Chip icon="tag" style={styles.freeChip} textStyle={styles.chipText}>
                          {freeCount} {t('general.free')}
                        </Chip>
                      )}
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, paddingBottom: 8, fontWeight: '600' },
  list: { padding: 12, paddingTop: 4, paddingBottom: 32 },
  card: { marginBottom: 10 },
  todayCard: { borderWidth: 2, borderColor: '#6750A4' },
  pastCard: { opacity: 0.7 },
  cardContent: { flexDirection: 'row', alignItems: 'flex-start' },
  dayBadge: { width: 44, alignItems: 'center', marginRight: 12 },
  dayNum: { color: '#6750A4', fontWeight: 'bold', fontSize: 22 },
  todayBadge: { fontSize: 9, color: '#6750A4', fontWeight: 'bold', letterSpacing: 0.5 },
  cardBody: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  dayLabel: { fontWeight: '600' },
  city: { color: '#555' },
  preview: { color: '#666', marginBottom: 8 },
  pastText: { opacity: 0.6 },
  chips: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  chip: { backgroundColor: '#e8def8' },
  freeChip:    { backgroundColor: '#d4edda' },
  dayTripChip: { backgroundColor: '#fff3e0' },
  dayTripText: { fontSize: 12, lineHeight: 18, color: '#E65100', fontWeight: '600' },
  chipText: { fontSize: 12, lineHeight: 18 },
});
