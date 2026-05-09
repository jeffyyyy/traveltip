import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Button, Avatar, Divider } from 'react-native-paper';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import { signOut } from '../services/authService';
import { useLanguage } from '../context/LanguageContext';

interface UserProfile {
  email: string;
  createdAt: { seconds: number };
}

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const { t, lang, setLang } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? '??';
  const memberSince = profile?.createdAt?.seconds
    ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString()
    : 'N/A';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Card style={styles.langCard}>
        <Card.Content style={styles.langRow}>
          <Text variant="titleSmall">{t('general.language')}</Text>
          <View style={styles.langButtons}>
            <TouchableOpacity
              style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
              onPress={() => setLang('en')}
            >
              <Text style={[styles.langBtnText, lang === 'en' && styles.langBtnTextActive]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langBtn, lang === 'zh' && styles.langBtnActive]}
              onPress={() => setLang('zh')}
            >
              <Text style={[styles.langBtnText, lang === 'zh' && styles.langBtnTextActive]}>中文</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* Sign out button hidden while login is disabled
      <Button
        mode="outlined"
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        {t('general.signOut')}
      </Button> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 28,
  },
  email: {
    marginTop: 12,
  },
  since: {
    marginTop: 4,
    opacity: 0.5,
  },
  card: {
    marginBottom: 16,
  },
  label: {
    opacity: 0.5,
    marginBottom: 2,
  },
  divider: {
    marginVertical: 12,
  },
  uid: {
    opacity: 0.6,
    fontFamily: 'monospace',
  },
  signOutButton: {
    marginTop: 'auto',
  },
  langCard: {
    marginBottom: 16,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  langButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  langBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6750A4',
  },
  langBtnActive: {
    backgroundColor: '#6750A4',
  },
  langBtnText: {
    color: '#6750A4',
    fontWeight: '600',
  },
  langBtnTextActive: {
    color: '#fff',
  },
});
