import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import { TICKET_ASSETS } from '../data/ticketRegistry';

export default function TicketViewerScreen({ route, navigation }: any) {
  const { ticketKey, title } = route.params as { ticketKey: string; title: string };
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [webViewLoading, setWebViewLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: title ?? 'Ticket' });
  }, [title]);

  useEffect(() => {
    (async () => {
      try {
        const assetModule = TICKET_ASSETS[ticketKey];
        if (!assetModule) throw new Error(`No ticket found for key: ${ticketKey}`);
        const [asset] = await Asset.loadAsync([assetModule]);
        const uri = asset.localUri ?? asset.uri;
        if (!uri) throw new Error('Could not load ticket file');
        setFileUri(uri);
      } catch (e: any) {
        setError(e?.message ?? 'Unknown error');
      }
    })();
  }, [ticketKey]);

  const isLoading = !fileUri || webViewLoading;

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Could not load ticket:{'\n'}{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {fileUri && (
        <WebView
          style={styles.webview}
          source={{ uri: fileUri }}
          originWhitelist={['*']}
          onLoadStart={() => setWebViewLoading(true)}
          onLoadEnd={() => setWebViewLoading(false)}
          onError={e => setError(e.nativeEvent.description)}
        />
      )}
      {isLoading && !error && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#6750A4" />
          <Text style={styles.loadingText}>Loading ticket…</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  webview: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: '#666', marginTop: 8 },
  errorText: { color: '#c00', textAlign: 'center', lineHeight: 22 },
});
