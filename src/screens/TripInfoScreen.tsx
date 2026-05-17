import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Text, Card, SegmentedButtons, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HOTELS, TRANSPORT, TransportItem } from '../data/spainTrip';
import { TICKET_ASSETS } from '../data/ticketRegistry';
import { CITY_NAMES_ZH } from '../data/spainTripZh';
import { useLanguage } from '../context/LanguageContext';

const TRANSPORT_ICON: Record<TransportItem['type'], keyof typeof Ionicons.glyphMap> = {
  flight: 'airplane',
  train: 'train-sharp',
  bus: 'bus',
};

const TRANSPORT_COLOR: Record<TransportItem['type'], string> = {
  flight: '#1565C0',
  train: '#2E7D32',
  bus: '#E65100',
};

export default function TripInfoScreen({ navigation }: any) {
  const { t, lang } = useLanguage();
  const [tab, setTab] = useState('transport');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SegmentedButtons
        value={tab}
        onValueChange={setTab}
        style={styles.tabs}
        buttons={[
          { value: 'transport', label: t('info.tabTransport'), icon: 'airplane' },
          { value: 'hotels', label: t('info.tabHotels'), icon: 'bed' },
        ]}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {tab === 'transport' && (
          <>
            <Text variant="titleSmall" style={styles.sectionLabel}>
              {TRANSPORT.length} {t('general.segments')}
            </Text>
            {TRANSPORT.map(item => (
              <Card key={item.id} style={[styles.card, { borderLeftColor: TRANSPORT_COLOR[item.type] }]}>
                <Card.Content style={styles.transportContent}>
                  <Ionicons
                    name={TRANSPORT_ICON[item.type]}
                    size={22}
                    color={TRANSPORT_COLOR[item.type]}
                    style={styles.icon}
                  />
                  <View style={styles.transportBody}>
                    <View style={styles.routeRow}>
                      <Text variant="titleSmall" style={styles.place}>{item.from}</Text>
                      <Ionicons name="arrow-forward" size={14} color="#888" style={styles.arrow} />
                      <Text variant="titleSmall" style={styles.place}>{item.to}</Text>
                    </View>
                    <Text variant="bodySmall" style={styles.operator}>{item.operator}</Text>
                    <View style={styles.timeRow}>
                      <Chip style={styles.dateChip} textStyle={styles.chipText}>{item.date}</Chip>
                      <Text variant="bodySmall" style={styles.times}>
                        {item.departTime} → {item.arriveTime}
                      </Text>
                    </View>
                    {item.notes && (
                      <Text variant="bodySmall" style={styles.notes}>{item.notes}</Text>
                    )}
                    {item.ticketKey && TICKET_ASSETS[item.ticketKey] && (
                      <TouchableOpacity
                        style={styles.ticketBtn}
                        onPress={() => navigation.navigate('TicketViewer', { ticketKey: item.ticketKey, title: lang === 'zh' ? '车票' : 'Ticket' })}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="ticket-outline" size={14} color="#E65100" />
                        <Text style={styles.ticketBtnText}>{lang === 'zh' ? '查看车票' : 'View Ticket'}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </Card.Content>
              </Card>
            ))}
          </>
        )}

        {tab === 'hotels' && (
          <>
            <Text variant="titleSmall" style={styles.sectionLabel}>
              {HOTELS.length} hotels · {HOTELS.reduce((s, h) => s + h.nights, 0)} {t('general.totalNights')}
            </Text>
            {HOTELS.map(h => (
              <Card key={h.id} style={[styles.card, styles.hotelCard]}>
                <Card.Content>
                  <View style={styles.hotelHeader}>
                    <Ionicons name="bed-outline" size={20} color="#6A1B9A" style={styles.icon} />
                    <View style={styles.hotelInfo}>
                      <Text variant="titleSmall" style={styles.hotelName}>{h.name}</Text>
                      <Text variant="bodySmall" style={styles.hotelCity}>{lang === 'zh' ? (CITY_NAMES_ZH[h.city] ?? h.city) : h.city}</Text>
                    </View>
                  </View>
                  <View style={styles.hotelDates}>
                    <View style={styles.dateBlock}>
                      <Text variant="bodySmall" style={styles.dateLabel}>{t('general.checkIn')}</Text>
                      <Text variant="bodyMedium" style={styles.dateValue}>{h.checkIn}</Text>
                    </View>
                    <Ionicons name="arrow-forward" size={16} color="#aaa" />
                    <View style={styles.dateBlock}>
                      <Text variant="bodySmall" style={styles.dateLabel}>{t('general.checkOut')}</Text>
                      <Text variant="bodyMedium" style={styles.dateValue}>{h.checkOut}</Text>
                    </View>
                    <Chip style={styles.nightsChip} textStyle={styles.chipText}>
                        {lang === 'zh' ? `${h.nights}晚` : `${h.nights}N`}
                      </Chip>
                    <TouchableOpacity onPress={() => {
                      const q = encodeURIComponent(`${h.name}, ${h.city}, Spain`);
                      const gUrl = `comgooglemaps://?q=${q}`;
                      const web = `https://www.google.com/maps/search/?api=1&query=${q}`;
                      Linking.canOpenURL(gUrl).then(ok => Linking.openURL(ok ? gUrl : web)).catch(() => Linking.openURL(web));
                    }} hitSlop={8}>
                      <Ionicons name="map" size={18} color="#6A1B9A" />
                    </TouchableOpacity>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  tabs: { margin: 12 },
  content: { padding: 12, paddingTop: 4, paddingBottom: 32 },
  sectionLabel: { color: '#888', marginBottom: 10 },
  card: { marginBottom: 10, borderLeftWidth: 4 },
  hotelCard: { borderLeftColor: '#6A1B9A' },
  transportContent: { flexDirection: 'row', alignItems: 'flex-start' },
  icon: { marginRight: 10, marginTop: 2 },
  transportBody: { flex: 1 },
  routeRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 },
  place: { fontWeight: '600' },
  arrow: { marginHorizontal: 6 },
  operator: { color: '#555', marginBottom: 6 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateChip: { backgroundColor: '#e8def8' },
  times: { color: '#333' },
  notes: { color: '#888', marginTop: 4, fontStyle: 'italic' },
  hotelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  hotelInfo: { flex: 1 },
  hotelName: { fontWeight: '700' },
  hotelCity: { color: '#888', marginTop: 2 },
  hotelDates: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dateBlock: { alignItems: 'center' },
  dateLabel: { color: '#888' },
  dateValue: { fontWeight: '600', color: '#333' },
  nightsChip: { backgroundColor: '#ede7f6' },
  chipText: { fontSize: 12, lineHeight: 18 },
  ticketBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8, alignSelf: 'flex-start', backgroundColor: '#fff3e0', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 },
  ticketBtnText: { fontSize: 12, color: '#E65100', fontWeight: '600', lineHeight: 18 },
});
