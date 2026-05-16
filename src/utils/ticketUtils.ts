import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

export async function openTicketPDF(ticketAsset: any): Promise<void> {
  try {
    const [asset] = await Asset.loadAsync([ticketAsset]);
    if (!asset) throw new Error('Asset not found in bundle');

    // Prefer localUri (already on device), fall back to remote uri
    const sourceUri = asset.localUri ?? asset.uri;
    if (!sourceUri) throw new Error('No URI available for ticket asset');

    console.log('[Ticket] sourceUri:', sourceUri);

    const canShare = await Sharing.isAvailableAsync();
    if (!canShare) {
      Alert.alert('Not supported', 'Opening files is not available on this device.');
      return;
    }

    // If already a local file:// URI, share directly; otherwise copy to writable cache first
    if (sourceUri.startsWith('file://')) {
      await Sharing.shareAsync(sourceUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Open Ticket',
      });
    } else {
      const destUri = FileSystem.cacheDirectory + 'ticket.pdf';
      await FileSystem.downloadAsync(sourceUri, destUri);
      await Sharing.shareAsync(destUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Open Ticket',
      });
    }
  } catch (e: any) {
    console.error('[Ticket] Error:', e);
    Alert.alert('Could not open ticket', e?.message ?? String(e));
  }
}
