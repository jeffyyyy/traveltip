# Quick Start Guide

## ⚡ Get Running in 5 Minutes

### Step 1: Install Node.js
You don't have Node.js installed yet. Install it first:

**Option A: Using Homebrew (Recommended)**
```bash
brew install node
```

**Option B: Download Installer**
Go to https://nodejs.org/ and download the LTS version.

### Step 2: Install Dependencies
```bash
cd /Users/jeffyu/Projects/jeff-app
npm install
```

### Step 3: Set Up Firebase (5 minutes)

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add project"
   - Enter project name → Continue
   - Disable Google Analytics (optional) → Create project

2. **Enable Authentication**
   - In Firebase Console, click "Authentication"
   - Click "Get started"
   - Click "Email/Password" → Enable → Save

3. **Enable Firestore**
   - Click "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" → Next
   - Select location → Enable

4. **Get Firebase Config**
   - From the Firebase Console homepage, **click on your project name** to enter it
   - Once inside the project, look at the left sidebar — click the **gear icon ⚙️ next to "Project Overview"** (top-left)
   - Click **"Project settings"**
   - Scroll down to the **"Your apps"** section at the bottom of the page
   - Click the **web icon `</>`** to add a web app
   - Enter any nickname (e.g. "my-app") → Click **"Register app"**
   - You'll see a code block like this — copy the values inside `firebaseConfig`:
     ```js
     const firebaseConfig = {
       apiKey: "AIza...",
       authDomain: "your-app.firebaseapp.com",
       projectId: "your-app",
       storageBucket: "your-app.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abc123"
     };
     ```
   - Click **"Continue to console"** when done

5. **Add Config to App**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and paste your Firebase values:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=AIza...
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-app
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

### Step 4: Run the App
```bash
npm start
```

Then:
- Press `i` for iOS simulator (requires Xcode)
- Press `a` for Android emulator (requires Android Studio)
- Scan QR code with Expo Go app on your phone

### Step 5: Test It Out
1. Click "Sign Up" in the app
2. Enter an email and password
3. You should be logged in and see the home screen!

## 🎉 You're Done!

Now you can start building your features. Check out `README.md` for more details.

## 🆘 Need Help?

**"npm: command not found"**
→ Node.js isn't installed. See Step 1.

**"Cannot find module 'expo'"**
→ Run `npm install` first.

**"Firebase auth error"**
→ Double-check your `.env` file has the correct Firebase credentials.

**"No iOS simulator"**
→ Install Xcode from the Mac App Store, or use your phone with Expo Go.
