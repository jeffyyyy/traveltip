import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
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
  return (
    <HomeStack.Navigator screenOptions={STACK_HEADER_OPTIONS}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false, title: 'Trip' }} />
      <HomeStack.Screen name="CityDetail" component={CityDetailScreen} options={{ title: '', headerBackTitle: 'Back' }} />
      <HomeStack.Screen name="DayDetail" component={DayDetailScreen} options={({ route }: any) => ({ title: '', headerBackTitle: 'Back', animation: route.params?.direction === 'prev' ? 'slide_from_left' : 'slide_from_right' })} />
      <HomeStack.Screen name="TicketViewer" component={TicketViewerScreen} options={{ title: 'Ticket', headerBackTitle: 'Back' }} />
      <HomeStack.Screen name="LocationDetail" component={LocationDetailScreen} options={{ title: '', headerBackTitle: 'Back' }} />
    </HomeStack.Navigator>
  );
}

function InfoStackNavigator() {
  return (
    <InfoStack.Navigator screenOptions={{ headerShown: false, ...STACK_HEADER_OPTIONS }}>
      <InfoStack.Screen name="InfoMain" component={TripInfoScreen} />
      <InfoStack.Screen name="TicketViewer" component={TicketViewerScreen} options={{ headerShown: true, title: 'Ticket', headerBackTitle: 'Back' }} />
    </InfoStack.Navigator>
  );
}

function ItineraryStackNavigator() {
  return (
    <ItineraryStack.Navigator screenOptions={STACK_HEADER_OPTIONS}>
      <ItineraryStack.Screen name="ItineraryList" component={ItineraryScreen} options={{ headerShown: false, title: 'Itinerary' }} />
      <ItineraryStack.Screen name="DayDetail" component={DayDetailScreen} options={({ route }: any) => ({ title: '', headerBackTitle: 'Back', animation: route.params?.direction === 'prev' ? 'slide_from_left' : 'slide_from_right' })} />
      <ItineraryStack.Screen name="TicketViewer" component={TicketViewerScreen} options={{ title: 'Ticket', headerBackTitle: 'Back' }} />
      <ItineraryStack.Screen name="LocationDetail" component={LocationDetailScreen} options={{ title: '', headerBackTitle: 'Back' }} />
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
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: 'Trip' }} />
      <Tab.Screen name="Itinerary" component={ItineraryStackNavigator} options={{ title: 'Days' }} />
      <Tab.Screen name="Places" component={PlacesScreen} options={{ title: 'Places' }} />
      <Tab.Screen name="Info" component={InfoStackNavigator} options={{ title: 'Info' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}
