export type Lang = 'en' | 'zh';
type TranslationMap = Record<string, string>;

const en: TranslationMap = {
  // App / General
  'app.title': 'Spain Trip 2026',
  'general.day': 'Day',
  'general.days': 'Days',
  'general.cities': 'Cities',
  'general.attractions': 'Attractions',
  'general.freeEntries': 'Free Entries',
  'general.lunch': 'Lunch',
  'general.dinner': 'Dinner',
  'general.today': 'Today',
  'general.signOut': 'Sign Out',
  'general.email': 'Email',
  'general.userId': 'User ID',
  'general.memberSince': 'Member since',
  'general.language': 'Language',
  'general.checkIn': 'Check-in',
  'general.checkOut': 'Check-out',
  'general.nights': 'nights',
  'general.segments': 'transport segments',
  'general.totalNights': 'total nights',
  'general.free': 'free',
  'general.activities': 'activities',

  // Home Screen
  'home.tripTitle': '🇪🇸 Spain Trip 2026',
  'home.tripOver': 'Trip completed! Great memories 🎉',
  'home.dayOf': 'of your Spain adventure!',
  'home.daysUntil': 'days until departure ✈️',
  'home.departure': 'May 20, 2026 · Toronto → Barcelona',
  'home.todayLabel': '📍 Today —',
  'home.citiesTitle': '🗺️ Cities',
  'home.hotelsTitle': '🏨 Hotels',

  // Itinerary Screen
  'itinerary.title': '📅 15-Day Itinerary',
  'itinerary.today': 'TODAY',

  // Day Detail Screen
  'day.type.transport': 'transport',
  'day.type.sightseeing': 'sightseeing',
  'day.type.food': 'food',
  'day.type.accommodation': 'accommodation',
  'day.type.leisure': 'leisure',

  // Places Screen
  'places.progress': '🎯 {done} / {total} attractions visited',
  'places.freeEntry': 'Free entry',

  // Trip Info Screen
  'info.tabTransport': '✈️ Transport',
  'info.tabHotels': '🏨 Hotels',

  // Profile Screen
  'profile.title': 'Profile',
  'profile.switchLang': 'Switch to Chinese',

  // Login / Auth
  'auth.welcomeBack': 'Welcome Back',
  'auth.signInToContinue': 'Sign in to continue',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.rememberMe': 'Remember me',
  'auth.signIn': 'Sign In',
  'auth.noAccount': "Don't have an account? Sign Up",
  'auth.createAccount': 'Create Account',
  'auth.joinUs': 'Join us today',
  'auth.confirmPassword': 'Confirm Password',
  'auth.alreadyAccount': 'Already have an account? Sign In',
};

const zh: TranslationMap = {
  // App / General
  'app.title': '西班牙之旅 2026',
  'general.day': '第',
  'general.days': '天',
  'general.cities': '城市',
  'general.attractions': '景点',
  'general.freeEntries': '免费入场',
  'general.lunch': '午饭',
  'general.dinner': '晚饭',
  'general.today': '今天',
  'general.signOut': '退出登录',
  'general.email': '邮箱',
  'general.userId': '用户ID',
  'general.memberSince': '注册时间',
  'general.language': '语言',
  'general.checkIn': '入住',
  'general.checkOut': '退房',
  'general.nights': '晚',
  'general.segments': '段行程',
  'general.totalNights': '晚（总计）',
  'general.free': '免费',
  'general.activities': '项活动',

  // Home Screen
  'home.tripTitle': '🇪🇸 西班牙之旅 2026',
  'home.tripOver': '旅行结束！美好的回忆 🎉',
  'home.dayOf': '西班牙冒险旅途中！',
  'home.daysUntil': '天后出发 ✈️',
  'home.departure': '2026年5月20日 · 多伦多 → 巴塞罗那',
  'home.todayLabel': '📍 今天 —',
  'home.citiesTitle': '🗺️ 城市',
  'home.hotelsTitle': '🏨 酒店',

  // Itinerary Screen
  'itinerary.title': '📅 15天行程',
  'itinerary.today': '今天',

  // Day Detail Screen
  'day.type.transport': '交通',
  'day.type.sightseeing': '景点',
  'day.type.food': '餐饮',
  'day.type.accommodation': '住宿',
  'day.type.leisure': '休闲',

  // Places Screen
  'places.progress': '🎯 已游览 {done} / {total} 个景点',
  'places.freeEntry': '免费入场',

  // Trip Info Screen
  'info.tabTransport': '✈️ 交通',
  'info.tabHotels': '🏨 酒店',

  // Profile Screen
  'profile.title': '个人资料',
  'profile.switchLang': '切换为英文',

  // Login / Auth
  'auth.welcomeBack': '欢迎回来',
  'auth.signInToContinue': '登录以继续',
  'auth.email': '邮箱',
  'auth.password': '密码',
  'auth.rememberMe': '记住我',
  'auth.signIn': '登录',
  'auth.noAccount': '还没有账号？立即注册',
  'auth.createAccount': '创建账号',
  'auth.joinUs': '今天加入我们',
  'auth.confirmPassword': '确认密码',
  'auth.alreadyAccount': '已有账号？去登录',
};

export const TRANSLATIONS: Record<Lang, TranslationMap> = { en, zh };
