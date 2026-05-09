import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { TRIP_DAYS, ActivityType } from '../data/spainTrip';
import { ACTIVITY_TITLES_ZH } from '../data/spainTripZh';
import { useLanguage } from '../context/LanguageContext';

const TYPE_CONFIG: Record<ActivityType, { color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  transport:     { color: '#1565C0', icon: 'airplane-outline' },
  sightseeing:   { color: '#2E7D32', icon: 'camera-outline' },
  food:          { color: '#E65100', icon: 'restaurant-outline' },
  accommodation: { color: '#6A1B9A', icon: 'bed-outline' },
  leisure:       { color: '#00695C', icon: 'walk-outline' },
};

export default function DayDetailScreen({ route }: any) {
  const { dayId } = route.params;
  const { t, lang } = useLanguage();
  const day = TRIP_DAYS.find(d => d.id === dayId);

  if (!day) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{day.cityEmoji}</Text>
        <Text variant="headlineMedium" style={styles.heroCity}>{day.city}</Text>
        <Text variant="bodyMedium" style={styles.heroDate}>{day.dayLabel} · Day {day.dayNumber}</Text>
      </View>

      <View style={styles.timeline}>
        {day.activities.map((activity, index) => {
          const config = TYPE_CONFIG[activity.type];
          const isLast = index === day.activities.length - 1;
          return (
            <View key={index} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <Text variant="bodySmall" style={styles.timeText}>{activity.time}</Text>
                <View style={[styles.dot, { backgroundColor: config.color }]} />
                {!isLast && <View style={styles.line} />}
              </View>
              <Card style={[styles.activityCard, { borderLeftColor: config.color }]}>
                <Card.Content style={styles.activityContent}>
                  <View style={styles.activityHeader}>
                    <Ionicons name={config.icon} size={16} color={config.color} style={styles.activityIcon} />
                    <Text variant="titleSmall" style={styles.activityTitle}>
                      {lang === 'zh' ? (ACTIVITY_TITLES_ZH[`${day.id}_${index}`] ?? activity.title) : activity.title}
                    </Text>
                  </View>
                  {activity.description && (
                    <Text variant="bodySmall" style={styles.activityDesc}>{activity.description}</Text>
                  )}
                  {activity.isFreeEntry && (
                    <Chip compact icon="tag" style={styles.freeChip} textStyle={styles.freeChipText}>
                      🆓 {activity.freeEntryNote}
                    </Chip>
                  )}
                </Card.Content>
              </Card>
            </View>
          );
        })}
      </View>

      <View style={styles.legend}>
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
          <View key={type} style={styles.legendItem}>
            <Ionicons name={cfg.icon} size={14} color={cfg.color} />
            <Text variant="bodySmall" style={styles.legendText}>{t(`day.type.${type}`)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { paddingBottom: 32 },
  hero: { backgroundColor: '#6750A4', padding: 24, alignItems: 'center' },
  heroEmoji: { fontSize: 40, marginBottom: 4 },
  heroCity: { color: '#fff', fontWeight: 'bold' },
  heroDate: { color: '#e8def8', marginTop: 4 },
  timeline: { padding: 16 },
  timelineRow: { flexDirection: 'row', marginBottom: 12 },
  timelineLeft: { width: 68, alignItems: 'center', paddingTop: 12 },
  timeText: { color: '#888', fontSize: 10, marginBottom: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  line: { width: 2, flex: 1, backgroundColor: '#ddd', marginTop: 2 },
  activityCard: { flex: 1, marginLeft: 8, borderLeftWidth: 3 },
  activityContent: { paddingVertical: 8, paddingHorizontal: 12 },
  activityHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  activityIcon: { marginRight: 6 },
  activityTitle: { fontWeight: '600', flex: 1 },
  activityDesc: { color: '#555', marginBottom: 6 },
  freeChip: { alignSelf: 'flex-start', backgroundColor: '#d4edda', height: 24, marginTop: 4 },
  freeChipText: { fontSize: 11 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, padding: 16, backgroundColor: '#fff', marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendText: { color: '#555', textTransform: 'capitalize' },
});
