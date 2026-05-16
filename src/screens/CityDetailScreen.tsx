import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { TRIP_DAYS, ActivityType } from '../data/spainTrip';
import { ACTIVITY_TITLES_ZH, CITY_NAMES_ZH, FREE_ENTRY_ZH } from '../data/spainTripZh';
import { useLanguage } from '../context/LanguageContext';

const TYPE_COLOR: Record<ActivityType, string> = {
  transport:     '#1565C0',
  sightseeing:   '#2E7D32',
  food:          '#E65100',
  accommodation: '#6A1B9A',
  leisure:       '#00695C',
};

const TYPE_ICON: Record<ActivityType, keyof typeof Ionicons.glyphMap> = {
  transport:     'airplane-outline',
  sightseeing:   'camera-outline',
  food:          'restaurant-outline',
  accommodation: 'bed-outline',
  leisure:       'walk-outline',
};

export default function CityDetailScreen({ route, navigation }: any) {
  const { cityName } = route.params as { cityName: string };
  const { lang } = useLanguage();

  const cityDays = TRIP_DAYS.filter(d => d.city === cityName);
  const displayName = lang === 'zh' ? (CITY_NAMES_ZH[cityName] ?? cityName) : cityName;

  useEffect(() => {
    navigation.setOptions({ title: displayName });
  }, [displayName]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {cityDays.map(day => (
          <TouchableOpacity
            key={day.id}
            onPress={() => navigation.navigate('DayDetail', { dayId: day.id })}
            activeOpacity={0.85}
          >
            <Card style={styles.dayCard}>
              <Card.Content>
                <View style={styles.dayHeader}>
                  <View style={styles.dayBadge}>
                    <Text variant="titleLarge" style={styles.dayNum}>{day.dayNumber}</Text>
                    <Text variant="bodySmall" style={styles.dayLabel}>{day.dayLabel}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#aaa" />
                </View>

                <View style={styles.activitiesList}>
                  {day.activities.map((activity, index) => (
                    <View key={index} style={styles.activityRow}>
                      <Ionicons
                        name={TYPE_ICON[activity.type]}
                        size={14}
                        color={TYPE_COLOR[activity.type]}
                        style={styles.activityIcon}
                      />
                      <View style={styles.activityBody}>
                        <Text variant="bodySmall" style={styles.activityTime}>{activity.time}</Text>
                        <Text variant="bodyMedium" style={styles.activityTitle}>
                          {lang === 'zh'
                            ? (ACTIVITY_TITLES_ZH[`${day.id}_${index}`] ?? activity.title)
                            : activity.title}
                        </Text>
                        {activity.isFreeEntry && (
                          <Chip icon="tag" style={styles.freeChip} textStyle={styles.chipText}>
                            {lang === 'zh'
                              ? (FREE_ENTRY_ZH[activity.freeEntryNote ?? ''] ?? activity.freeEntryNote)
                              : activity.freeEntryNote}
                          </Chip>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

        {cityDays.length === 0 && (
          <Text style={styles.empty}>No activities found for {displayName}.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 12, paddingBottom: 32 },
  dayCard: { marginBottom: 12 },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  dayBadge: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  dayNum: { color: '#6750A4', fontWeight: 'bold' },
  dayLabel: { color: '#888' },
  activitiesList: { gap: 10 },
  activityRow: { flexDirection: 'row', alignItems: 'flex-start' },
  activityIcon: { marginTop: 3, marginRight: 8, width: 16 },
  activityBody: { flex: 1 },
  activityTime: { color: '#999', marginBottom: 1 },
  activityTitle: { fontWeight: '500' },
  freeChip: { alignSelf: 'flex-start', backgroundColor: '#d4edda', marginTop: 4 },
  chipText: { fontSize: 12, lineHeight: 18 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
});
