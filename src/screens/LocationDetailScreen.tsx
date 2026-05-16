import React, { useEffect, useState } from 'react';
import {
  View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { fetchLocationDetails, LocationDetails, FoodRecommendation } from '../services/geminiService';

export default function LocationDetailScreen({ route, navigation }: any) {
  const { locationName, city, lang = 'en' } = route.params as { locationName: string; city: string; lang: 'en' | 'zh' };

  const [details, setDetails] = useState<LocationDetails | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyFoodName = async (name: string, index: number) => {
    await Clipboard.setStringAsync(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const load = () => {
    setLoading(true);
    setError(null);
    fetchLocationDetails(locationName, city, lang)
      .then(d => { setDetails(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  };

  useEffect(() => {
    navigation.setOptions({ title: locationName });
    load();
  }, [locationName, city]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6750A4" />
        <Text variant="bodyMedium" style={styles.loadingText}>
          {lang === 'zh' ? `正在查询 ${locationName}…` : `Asking Gemini about ${locationName}…`}
        </Text>
      </View>
    );
  }

  if (error) {
    const isRateLimit = error === 'RATE_LIMIT';
    return (
      <View style={styles.centered}>
        <Ionicons name={isRateLimit ? 'time-outline' : 'alert-circle-outline'} size={48} color="#B00020" />
        <Text variant="bodyMedium" style={styles.errorText}>
          {isRateLimit
            ? (lang === 'zh' ? 'API 请求次数已达上限，请稍等片刻后重试。' : 'Rate limit reached. Please wait a moment and try again.')
            : error}
        </Text>
        <TouchableOpacity style={styles.retryBtn} onPress={load}>
          <Text style={styles.retryText}>{lang === 'zh' ? '重试' : 'Retry'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>{locationName}</Text>
        <Text variant="bodySmall" style={styles.subtitle}>{city}, Spain</Text>
        <View style={styles.badge}>
          <Ionicons name="sparkles" size={12} color="#6750A4" />
          <Text style={styles.badgeText}>Powered by Gemini</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaChip}>
          <Ionicons name="time-outline" size={14} color="#555" />
          <Text style={styles.metaText}>{details!.duration}</Text>
        </View>
        <View style={styles.metaChip}>
          <Ionicons name="sunny-outline" size={14} color="#555" />
          <Text style={styles.metaText}>{details!.bestTime}</Text>
        </View>
      </View>

      {details!.mustSee ? (
        <View style={styles.mustSeeCard}>
          <View style={styles.mustSeeHeader}>
            <Ionicons name="star" size={16} color="#fff" />
            <Text style={styles.mustSeeLabel}>{lang === 'zh' ? '必看' : 'Must See'}</Text>
          </View>
          <Text style={styles.mustSeeText}>{details!.mustSee}</Text>
        </View>
      ) : null}

      <Section icon="book-outline" title={lang === 'zh' ? '简介' : 'About'} color="#1565C0">
        <Text variant="bodyMedium" style={styles.aboutText}>{details!.about}</Text>
      </Section>

      <Section icon="star-outline" title={lang === 'zh' ? '亮点' : 'Highlights'} color="#2E7D32">
        {details!.highlights.map((h, i) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={[styles.bullet, { color: '#2E7D32' }]}>●</Text>
            <Text variant="bodyMedium" style={styles.bulletText}>{h}</Text>
          </View>
        ))}
      </Section>

      <Section icon="bulb-outline" title={lang === 'zh' ? '游览贴士' : 'Visitor Tips'} color="#E65100">
        {details!.tips.map((tip, i) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={[styles.bullet, { color: '#E65100' }]}>●</Text>
            <Text variant="bodyMedium" style={styles.bulletText}>{tip}</Text>
          </View>
        ))}
      </Section>

      {details!.gettingThere ? (
        <Section icon="navigate-outline" title={lang === 'zh' ? '如何前往' : 'Getting There'} color="#00695C">
          <Text variant="bodyMedium" style={styles.aboutText}>{details!.gettingThere}</Text>
        </Section>
      ) : null}

      {details!.nearbyFood?.length > 0 && (
        <Section icon="restaurant-outline" title={lang === 'zh' ? '附近餐厅' : 'Nearby Food'} color="#6A1B9A">
          {details!.nearbyFood.map((item: FoodRecommendation, i: number) => (
            <View key={i} style={styles.foodCard}>
              <View style={styles.foodCardTop}>
                <Text style={styles.foodName}>{item.name}</Text>
                <View style={styles.foodMeta}>
                  <Text style={styles.foodDistance}>{item.distance}</Text>
                  <TouchableOpacity onPress={() => copyFoodName(item.name, i)} hitSlop={8}>
                    <Ionicons
                      name={copiedIndex === i ? 'checkmark-circle' : 'copy-outline'}
                      size={16}
                      color={copiedIndex === i ? '#2E7D32' : '#7B1FA2'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.foodDish}>{item.dish}</Text>
              <Text style={styles.foodVibe}>{item.vibe}</Text>
            </View>
          ))}
        </Section>
      )}

      {details!.funFact ? (
        <Section icon="sparkles" title={lang === 'zh' ? '趣味小知识' : 'Fun Fact'} color="#F9A825">
          <Text variant="bodyMedium" style={styles.aboutText}>{details!.funFact}</Text>
        </Section>
      ) : null}
    </ScrollView>
  );
}

function Section({
  icon, title, color, children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={[styles.sectionHeader, { borderLeftColor: color }]}>
        <Ionicons name={icon} size={18} color={color} />
        <Text variant="titleMedium" style={[styles.sectionTitle, { color }]}>{title}</Text>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#f5f5f5' },
  content:      { paddingBottom: 40 },
  centered:     { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  loadingText:  { color: '#666', marginTop: 12, textAlign: 'center' },
  errorText:    { color: '#B00020', textAlign: 'center' },
  retryBtn:     { backgroundColor: '#6750A4', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24 },
  retryText:    { color: '#fff', fontWeight: '600' },
  header:       { backgroundColor: '#6750A4', padding: 24, alignItems: 'center', gap: 4 },
  title:        { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  subtitle:     { color: '#e8def8' },
  badge:        { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, backgroundColor: '#e8def8', borderRadius: 12, paddingVertical: 3, paddingHorizontal: 10 },
  badgeText:    { fontSize: 11, color: '#6750A4', fontWeight: '600' },
  section:      { margin: 16, marginBottom: 0, backgroundColor: '#fff', borderRadius: 12, elevation: 1 },
  sectionHeader:{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14, paddingBottom: 10, borderLeftWidth: 3, borderTopLeftRadius: 12 },
  sectionTitle: { fontWeight: '700' },
  sectionBody:  { paddingHorizontal: 14, paddingBottom: 14, gap: 6 },
  mustSeeCard:   { margin: 16, marginBottom: 0, borderRadius: 12, backgroundColor: '#F57F17', overflow: 'hidden' },
  mustSeeHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingTop: 10, paddingBottom: 4 },
  mustSeeLabel:  { color: '#fff', fontWeight: '700', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 },
  mustSeeText:   { color: '#fff', lineHeight: 22, paddingHorizontal: 14, paddingBottom: 12, fontSize: 14 },
  metaRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16, paddingTop: 12 },
  metaChip:     { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#fff', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10, elevation: 1 },
  metaText:     { fontSize: 12, color: '#444', flexShrink: 1 },
  aboutText:    { color: '#333', lineHeight: 22 },
  bulletRow:    { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  bullet:       { fontSize: 8, marginTop: 7 },
  bulletText:   { flex: 1, color: '#333', lineHeight: 22 },
  foodCard:     { backgroundColor: '#f3e8ff', borderRadius: 10, padding: 10, gap: 3 },
  foodCardTop:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  foodMeta:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  foodName:     { fontWeight: '700', color: '#4A148C', fontSize: 14, flex: 1 },
  foodDistance: { fontSize: 11, color: '#7B1FA2', fontWeight: '600' },
  foodDish:     { fontSize: 13, color: '#333', fontStyle: 'italic' },
  foodVibe:     { fontSize: 12, color: '#666' },
});
