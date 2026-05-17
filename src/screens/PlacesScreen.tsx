import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { Text, Card, ProgressBar, SegmentedButtons } from 'react-native-paper';
import TripMapScreen from './TripMapScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ATTRACTIONS, CITIES, Attraction } from '../data/spainTrip';
import { ATTRACTION_NAMES_ZH, CITY_NAMES_ZH, FREE_ENTRY_ZH } from '../data/spainTripZh';
import { useLanguage } from '../context/LanguageContext';

const CHECKED_KEY = '@checked_attractions';

const CITY_ORDER = CITIES.map(c => c.name);

type Section = { title: string; emoji: string; data: Attraction[] };

function buildSections(): Section[] {
  return CITY_ORDER.map(city => {
    const cityInfo = CITIES.find(c => c.name === city)!;
    return { title: city, emoji: cityInfo.emoji, data: ATTRACTIONS.filter(a => a.city === city) };
  });
}

export default function PlacesScreen() {
  const { t, lang } = useLanguage();
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [view, setView] = useState<'list' | 'map'>('list');
  const sections = buildSections();

  useEffect(() => {
    AsyncStorage.getItem(CHECKED_KEY).then(val => {
      if (val) setChecked(new Set(JSON.parse(val)));
    });
  }, []);

  const toggle = useCallback(async (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      AsyncStorage.setItem(CHECKED_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const total = ATTRACTIONS.length;
  const done = checked.size;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.progressHeader}>
        <SegmentedButtons
          value={view}
          onValueChange={v => setView(v as 'list' | 'map')}
          style={styles.toggle}
          buttons={[
            { value: 'list', label: t('places.listTab'), icon: 'format-list-bulleted' },
            { value: 'map',  label: t('places.mapTab'),  icon: 'map-outline' },
          ]}
        />
        {view === 'list' && (
          <>
            <Text variant="titleMedium" style={styles.progressTitle}>
              {t('places.progress').replace('{done}', String(done)).replace('{total}', String(total))}
            </Text>
            <ProgressBar progress={done / total} color="#6750A4" style={styles.progressBar} />
          </>
        )}
      </View>
      {view === 'map' && <TripMapScreen />}

      {view === 'list' && <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => {
          const sectionDone = section.data.filter(a => checked.has(a.id)).length;
          return (
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {section.emoji} {lang === 'zh' ? (CITY_NAMES_ZH[section.title] ?? section.title) : section.title}
              </Text>
              <Text variant="bodySmall" style={styles.sectionCount}>
                {sectionDone}/{section.data.length}
              </Text>
            </View>
          );
        }}
        renderItem={({ item }) => {
          const isChecked = checked.has(item.id);
          return (
            <TouchableOpacity onPress={() => toggle(item.id)}>
              <Card style={[styles.card, isChecked && styles.checkedCard]}>
                <Card.Content style={styles.cardContent}>
                  <Ionicons
                    name={isChecked ? 'checkbox' : 'square-outline'}
                    size={22}
                    color={isChecked ? '#6750A4' : '#aaa'}
                    style={styles.checkbox}
                  />
                  <View style={styles.cardBody}>
                    <Text
                      variant="bodyMedium"
                      style={[styles.attractionName, isChecked && styles.checkedText]}
                    >
                      {lang === 'zh' ? (ATTRACTION_NAMES_ZH[item.id] ?? item.name) : item.name}
                    </Text>
                    <Text variant="bodySmall" style={styles.dayInfo}>
                      Day {item.dayNumbers.join(', ')}
                    </Text>
                    {item.freeEntry && (
                      <View style={styles.freeRow}>
                        <Ionicons name="pricetag" size={12} color="#2E7D32" />
                        <Text variant="bodySmall" style={styles.freeText}>
                          {lang === 'zh' ? (FREE_ENTRY_ZH[item.freeEntry!] ?? item.freeEntry) : item.freeEntry}
                        </Text>
                      </View>
                    )}
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        }}
      />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  progressHeader: { backgroundColor: '#fff', padding: 12, elevation: 2, gap: 10 },
  toggle:        { marginBottom: 4 },
  progressTitle: { fontWeight: '600' },
  progressBar:   { height: 8, borderRadius: 4 },
  list: { padding: 12, paddingBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 4 },
  sectionTitle: { fontWeight: '700' },
  sectionCount: { color: '#6750A4', fontWeight: '600' },
  card: { marginBottom: 6 },
  checkedCard: { opacity: 0.6, backgroundColor: '#f0f0f0' },
  cardContent: { flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: { marginRight: 10, marginTop: 2 },
  cardBody: { flex: 1 },
  attractionName: { fontWeight: '500' },
  checkedText: { textDecorationLine: 'line-through', color: '#888' },
  dayInfo: { color: '#888', marginTop: 2 },
  freeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  freeText: { color: '#2E7D32', fontWeight: '500' },
});
