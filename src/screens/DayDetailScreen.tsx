import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform, PanResponder } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { TRIP_DAYS, ActivityType } from '../data/spainTrip';
import { ACTIVITY_TITLES_ZH } from '../data/spainTripZh';
import { useLanguage } from '../context/LanguageContext';
import { getTicket, TICKET_ASSETS } from '../data/ticketRegistry';

const TYPE_CONFIG: Record<ActivityType, { color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  transport:     { color: '#1565C0', icon: 'airplane-outline' },
  sightseeing:   { color: '#2E7D32', icon: 'camera-outline' },
  food:          { color: '#E65100', icon: 'restaurant-outline' },
  accommodation: { color: '#6A1B9A', icon: 'bed-outline' },
  leisure:       { color: '#00695C', icon: 'walk-outline' },
};

const CITY_COLORS: Record<string, string> = {
  'Barcelona': '#1565C0',
  'Granada':   '#6A1B9A',
  'Córdoba':   '#BF360C',
  'Sevilla':   '#E65100',
  'Ronda':     '#2E7D32',
  'Madrid':    '#B71C1C',
};

function getActivityIcon(type: ActivityType, title: string): keyof typeof Ionicons.glyphMap {
  if (type === 'transport') {
    const t = title.toLowerCase();
    if (t.includes('train') || t.includes('ave') || t.includes('metro')) return 'train-sharp';
    if (t.includes('bus'))    return 'bus';
    if (t.includes('fly') || t.includes('flight') || t.includes('arrive') || t.includes('airport')) return 'airplane-outline';
    return 'navigate-outline';
  }
  return TYPE_CONFIG[type].icon;
}

const MAPS_TYPES: ActivityType[] = ['sightseeing', 'accommodation', 'leisure', 'food'];
const AI_TYPES: ActivityType[] = ['sightseeing', 'leisure'];

function openInMaps(query: string, city: string) {
  const q = encodeURIComponent(`${query}, ${city}, Spain`);
  if (Platform.OS === 'ios') {
    Linking.canOpenURL('comgooglemaps://').then(supported => {
      Linking.openURL(
        supported
          ? `comgooglemaps://?q=${q}`
          : `https://maps.apple.com/?q=${q}`
      );
    });
  } else {
    Linking.openURL(`geo:0,0?q=${q}`);
  }
}

export default function DayDetailScreen({ route, navigation }: any) {
  const { dayId } = route.params;
  const { t, lang } = useLanguage();
  const day = TRIP_DAYS.find(d => d.id === dayId);
  const dayIndex = TRIP_DAYS.findIndex(d => d.id === dayId);

  // Refs so the panResponder closure always sees the latest values
  const dayIndexRef = useRef(dayIndex);
  dayIndexRef.current = dayIndex;
  const navigationRef = useRef(navigation);
  navigationRef.current = navigation;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30,
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -50 && dayIndexRef.current < TRIP_DAYS.length - 1) {
          navigationRef.current.replace('DayDetail', { dayId: TRIP_DAYS[dayIndexRef.current + 1].id, direction: 'next' });
        } else if (dx > 50 && dayIndexRef.current > 0) {
          navigationRef.current.replace('DayDetail', { dayId: TRIP_DAYS[dayIndexRef.current - 1].id, direction: 'prev' });
        }
      },
    })
  ).current;

  if (!day) return null;

  const hasPrev = dayIndex > 0;
  const hasNext = dayIndex < TRIP_DAYS.length - 1;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      <View style={[styles.hero, { backgroundColor: CITY_COLORS[day.city] ?? '#6750A4' }]}>
        <View style={styles.heroNav}>
          <TouchableOpacity
            onPress={() => hasPrev && navigation.replace('DayDetail', { dayId: TRIP_DAYS[dayIndex - 1].id, direction: 'prev' })}
            style={styles.navArrow}
            activeOpacity={hasPrev ? 0.5 : 1}
          >
            <Ionicons name="chevron-back" size={26} color={hasPrev ? '#e8def8' : 'transparent'} />
          </TouchableOpacity>
          <View style={styles.heroCenter}>
            <Text style={styles.heroEmoji}>{day.cityEmoji}</Text>
            <Text variant="headlineMedium" style={styles.heroCity}>{day.city}</Text>
            <Text variant="bodyMedium" style={styles.heroDate}>{day.dayLabel} · Day {day.dayNumber}</Text>
          </View>
          <TouchableOpacity
            onPress={() => hasNext && navigation.replace('DayDetail', { dayId: TRIP_DAYS[dayIndex + 1].id, direction: 'next' })}
            style={styles.navArrow}
            activeOpacity={hasNext ? 0.5 : 1}
          >
            <Ionicons name="chevron-forward" size={26} color={hasNext ? '#e8def8' : 'transparent'} />
          </TouchableOpacity>
        </View>
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
                    <Ionicons name={getActivityIcon(activity.type, activity.title)} size={16} color={config.color} style={styles.activityIcon} />
                    {MAPS_TYPES.includes(activity.type) ? (
                      <TouchableOpacity
                        style={styles.titleRow}
                        onPress={() => openInMaps(activity.title, day.city)}
                        activeOpacity={0.6}
                      >
                        <Text variant="titleSmall" style={styles.activityTitle}>
                          {lang === 'zh' ? (ACTIVITY_TITLES_ZH[`${day.id}_${index}`] ?? activity.title) : activity.title}
                        </Text>
                        <Ionicons name="location-outline" size={13} color="#999" style={styles.mapPin} />
                      </TouchableOpacity>
                    ) : (
                      <Text variant="titleSmall" style={styles.activityTitle}>
                        {lang === 'zh' ? (ACTIVITY_TITLES_ZH[`${day.id}_${index}`] ?? activity.title) : activity.title}
                      </Text>
                    )}
                  </View>
                  {activity.description && (
                    <Text variant="bodySmall" style={styles.activityDesc}>{activity.description}</Text>
                  )}
                  {activity.isFreeEntry && (
                    <Chip icon="tag" style={styles.freeChip} textStyle={styles.freeChipText}>
                      🆓 {activity.freeEntryNote}
                    </Chip>
                  )}
                  {AI_TYPES.includes(activity.type) && (
                    <TouchableOpacity
                      style={styles.aiBtn}
                      onPress={() => navigation.navigate('LocationDetail', {
                        locationName: activity.title,
                        city: day.city,
                        lang,
                      })}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="sparkles" size={14} color="#6750A4" />
                      <Text style={styles.aiBtnText}>
                        {lang === 'zh' ? 'AI详情' : 'AI Details'}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {(() => {
                    const ticket = getTicket(day.city, day.date, activity.time);
                    if (!ticket) return null;
                    const ticketKey = Object.keys(TICKET_ASSETS).find(k => TICKET_ASSETS[k] === ticket)!;
                    return (
                      <TouchableOpacity
                        style={styles.ticketBtn}
                        onPress={() => navigation.navigate('TicketViewer', {
                          ticketKey,
                          title: lang === 'zh' ? '门票' : 'Ticket',
                        })}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="ticket-outline" size={14} color="#6750A4" />
                        <Text style={styles.ticketBtnText}>
                          {lang === 'zh' ? '查看门票' : 'View Ticket'}
                        </Text>
                      </TouchableOpacity>
                    );
                  })()}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1 },
  content: { paddingBottom: 32 },
  hero: { padding: 24 },
  heroNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  navArrow: { padding: 8 },
  heroCenter: { flex: 1, alignItems: 'center' },
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
  titleRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  activityTitle: { fontWeight: '600', flex: 1 },
  mapPin: { marginLeft: 3 },
  activityDesc: { color: '#555', marginBottom: 6 },
  freeChip: { alignSelf: 'flex-start', backgroundColor: '#d4edda', marginTop: 4 },
  freeChipText: { fontSize: 12, lineHeight: 18 },
  ticketBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, alignSelf: 'flex-start', backgroundColor: '#eaddff', borderRadius: 8, paddingVertical: 5, paddingHorizontal: 10 },
  ticketBtnText: { fontSize: 13, color: '#6750A4', fontWeight: '600' },
  aiBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, alignSelf: 'flex-start', backgroundColor: '#eaddff', borderRadius: 8, paddingVertical: 5, paddingHorizontal: 10 },
  aiBtnText: { fontSize: 13, color: '#6750A4', fontWeight: '600' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, padding: 16, backgroundColor: '#fff', marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendText: { color: '#555', textTransform: 'capitalize' },
});
