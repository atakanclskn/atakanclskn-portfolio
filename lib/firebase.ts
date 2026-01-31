// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

// Environment variables kullanarak config (güvenli)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Admin email - sadece bu email giriş yapabilir
const ADMIN_EMAIL = "calskanatakan55@gmail.com";

// Google Sign In
export const signInWithGoogle = async (): Promise<{ success: boolean; error?: string; user?: User }> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Sadece admin email'i kabul et
    if (user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      return { success: false, error: "Bu hesapla giriş yapamazsınız. Sadece admin giriş yapabilir." };
    }
    
    return { success: true, user };
  } catch (error: any) {
    console.error("Google sign in error:", error);
    return { success: false, error: error.message };
  }
};

// Sign Out
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

// Auth State Observer
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    // Sadece admin email'i için callback çağır
    if (user && user.email === ADMIN_EMAIL) {
      callback(user);
    } else {
      callback(null);
    }
  });
};

// Initialize Analytics (only in browser)
export const initAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
