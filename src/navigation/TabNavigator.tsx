import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import HomeScreen from '../screens/HomeScreen';
import CityDetailScreen from '../screens/CityDetailScreen';
import TicketViewerScreen from '../screens/TicketViewerScreen';
import ItineraryScreen from '../screens/ItineraryScreen';
import DayDetailScreen from '../screens/DayDetailScreen';
import PlacesScreen from '../screens/PlacesScreen';
import TripInfoScreen from '../screens/TripInfoScreen';
import LocationDetailScreen from '../screens/LocationDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const ItineraryStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const InfoStack = createNativeStackNavigator();

const STACK_HEADER_OPTIONS = {
  headerTitleStyle:     { fontSize: 15 },
  headerBackTitleStyle: { fontSize: 13 },
  headerStyle:          { height: 44 } as any,
};

function HomeStackNavigator() {
  const { t } = useLanguage();
  return (
    <HomeStack.Navigator screenOptions={STACK_HEADER_OPTIONS}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="CityDetail" component={CityDetailScreen} options={{ title: '', headerBackTitle: t('nav.back') }} />
      <HomeStack.Screen name="DayDetail" component={DayDetailScreen} options={({ route }: any) => ({ title: '', headerBackTitle: t('nav.back'), animation: route.params?.direction === 'prev' ? 'slide_from_left' : 'slide_from_right' })} />
      <HomeStack.Screen name="TicketViewer" component={TicketViewerScreen} options={{ title: t('nav.ticket'), headerBackTitle: t('nav.back') }} />
      <HomeStack.Screen name="LocationDetail" component={LocationDetailScreen} options={{ title: '', headerBackTitle: t('nav.back') }} />
    </HomeStack.Navigator>
  );
}

function InfoStackNavigator() {
  const { t } = useLanguage();
  return (
    <InfoStack.Navigator screenOptions={{ headerShown: false, ...STACK_HEADER_OPTIONS }}>
      <InfoStack.Screen name="InfoMain" component={TripInfoScreen} />
      <InfoStack.Screen name="TicketViewer" component={TicketViewerScreen} options={{ headerShown: true, title: t('nav.ticket'), headerBackTitle: t('nav.back') }} />
    </InfoStack.Navigator>
  );
}

function ItineraryStackNavigator() {
  const { t } = useLanguage();
  return (
    <ItineraryStack.Navigator screenOptions={STACK_HEADER_OPTIONS}>
      <ItineraryStack.Screen name="ItineraryList" component={ItineraryScreen} options={{ headerShown: false }} />
      <ItineraryStack.Screen name="DayDetail" component={DayDetailScreen} options={({ route }: any) => ({ title: '', headerBackTitle: t('nav.back'), animation: route.params?.direction === 'prev' ? 'slide_from_left' : 'slide_from_right' })} />
      <ItineraryStack.Screen name="TicketViewer" component={TicketViewerScreen} options={{ title: t('nav.ticket'), headerBackTitle: t('nav.back') }} />
      <ItineraryStack.Screen name="LocationDetail" component={LocationDetailScreen} options={{ title: '', headerBackTitle: t('nav.back') }} />
    </ItineraryStack.Navigator>
  );
}

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_ICONS: Record<string, [IconName, IconName]> = {
  Home:      ['home', 'home-outline'],
  Itinerary: ['calendar', 'calendar-outline'],
  Places:    ['map', 'map-outline'],
  Info:      ['information-circle', 'information-circle-outline'],
  Profile:   ['settings', 'settings-outline'],
};

export default function TabNavigator() {
  const { t } = useLanguage();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6750A4',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ focused, color, size }) => {
          const [active, inactive] = TAB_ICONS[route.name] ?? ['ellipse', 'ellipse-outline'];
          return <Ionicons name={focused ? active : inactive} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: t('tab.trip') }} />
      <Tab.Screen name="Itinerary" component={ItineraryStackNavigator} options={{ title: t('tab.days') }} />
      <Tab.Screen name="Places" component={PlacesScreen} options={{ title: t('tab.places') }} />
      <Tab.Screen name="Info" component={InfoStackNavigator} options={{ title: t('tab.info') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('tab.settings') }} />
    </Tab.Navigator>
  );
}
