import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ItineraryScreen from '../screens/ItineraryScreen';
import DayDetailScreen from '../screens/DayDetailScreen';
import PlacesScreen from '../screens/PlacesScreen';
import TripInfoScreen from '../screens/TripInfoScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const ItineraryStack = createNativeStackNavigator();

function ItineraryStackNavigator() {
  return (
    <ItineraryStack.Navigator>
      <ItineraryStack.Screen name="ItineraryList" component={ItineraryScreen} options={{ headerShown: false }} />
      <ItineraryStack.Screen name="DayDetail" component={DayDetailScreen} options={{ title: 'Day Detail' }} />
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
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Trip' }} />
      <Tab.Screen name="Itinerary" component={ItineraryStackNavigator} options={{ title: 'Days' }} />
      <Tab.Screen name="Places" component={PlacesScreen} options={{ title: 'Places' }} />
      <Tab.Screen name="Info" component={TripInfoScreen} options={{ title: 'Info' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}
