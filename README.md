# Jeff App - React Native Startup Template

A modern React Native mobile app built with Expo, Firebase, and TypeScript. Perfect for building your startup MVP quickly.

## 🚀 Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type-safe JavaScript
- **Firebase** - Authentication & Database
- **React Navigation** - Navigation library
- **Zustand** - State management
- **React Native Paper** - Material Design UI components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Or install via Homebrew: `brew install node`

2. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

3. **Expo Go App** (for testing on physical device)
   - iOS: Download from App Store
   - Android: Download from Google Play

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd /Users/jeffyu/Projects/jeff-app
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** → **Email/Password** sign-in method
4. Enable **Firestore Database**
5. Go to Project Settings → General → Your apps
6. Add a new Web app and copy the configuration

### 3. Set Up Environment Variables

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Firebase credentials:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### 4. Run the App

```bash
npm start
```

This will start the Expo development server. You can then:
- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan the QR code with Expo Go app on your phone

## 📁 Project Structure

```
jeff-app/
├── App.tsx                      # Main app entry point
├── src/
│   ├── config/
│   │   └── firebase.ts         # Firebase configuration
│   ├── services/
│   │   └── authService.ts      # Authentication service
│   ├── store/
│   │   └── authStore.ts        # Zustand state management
│   ├── screens/
│   │   ├── LoginScreen.tsx     # Login screen
│   │   ├── SignUpScreen.tsx    # Sign up screen
│   │   └── HomeScreen.tsx      # Home screen (authenticated)
│   └── navigation/
│       └── AppNavigator.tsx    # Navigation configuration
├── package.json
├── tsconfig.json
└── app.json
```

## 🎨 Features

### ✅ Implemented
- Email/Password authentication with Firebase
- Auto-login on app restart
- Beautiful Material Design UI
- Type-safe TypeScript
- State management with Zustand
- Navigation with React Navigation
- Form validation
- Error handling

### 🔜 Next Steps
- Add password reset functionality
- Implement user profile screen
- Add social authentication (Google, Apple)
- Set up push notifications
- Add data persistence
- Implement your core features!

## 🧪 Development

### Running on iOS Simulator
```bash
npm run ios
```

### Running on Android Emulator
```bash
npm run android
```

### Running on Web
```bash
npm run web
```

## 📱 Building for Production

### Build for iOS
```bash
expo build:ios
```

### Build for Android
```bash
expo build:android
```

### Using EAS Build (Recommended)
```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## 🔧 Customization

### Change App Name
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Change Bundle Identifier
Edit `app.json`:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    }
  }
}
```

### Customize Theme
Edit the colors in your screen files or create a theme file using React Native Paper's theming system.

## 📚 Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Navigation Docs](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

## 🐛 Troubleshooting

### TypeScript Errors
The TypeScript errors you see are expected until you run `npm install`. They will disappear once dependencies are installed.

### Metro Bundler Issues
```bash
expo start --clear
```

### iOS Simulator Not Opening
Make sure Xcode is installed:
```bash
xcode-select --install
```

### Android Emulator Not Opening
Make sure Android Studio is installed and you have created an AVD (Android Virtual Device).

## 📄 License

MIT License - feel free to use this template for your startup!

## 🤝 Contributing

This is a starter template. Fork it and make it your own!

---

**Happy Building! 🚀**
