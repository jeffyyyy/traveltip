const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

module.exports = {
  expo: {
    name: 'jeff-app',
    slug: 'jeff-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.jeffyu.spaintrip',
      config: {
        googleMapsApiKey,
      },
      infoPlist: {
        LSApplicationQueriesSchemes: ['comgooglemaps', 'googlemaps'],
        ITSAppUsesNonExemptEncryption: false,
        NSLocationWhenInUseUsageDescription: 'Your location is used to show your position on the trip map.',
        NSLocationAlwaysAndWhenInUseUsageDescription: 'Your location is used to show your position on the trip map.',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.yourcompany.jeffapp',
      config: {
        googleMaps: {
          apiKey: googleMapsApiKey,
        },
      },
    },
    web: { favicon: './assets/favicon.png' },
    scheme: 'jeffapp',
    plugins: [
      'expo-font',
      'expo-asset',
    ],
    extra: {
      eas: {
        projectId: '98c4a8a0-76ea-4575-b81e-776cf53b5255',
      },
    },
  },
};
