// Analytics Service - Tracks page views and events in Firestore
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// ==================== PAGE VIEW TRACKING ====================

interface DailyStats {
  date: string; // YYYY-MM-DD
  pageViews: number;
  uniqueVisitors: number;
  visitors: string[]; // anonymized visitor IDs
  pages: Record<string, number>; // page path -> view count
  referrers: Record<string, number>; // referrer -> count
  devices: Record<string, number>; // device type -> count
  browsers: Record<string, number>; // browser -> count
  countries: Record<string, number>; // country -> count (from timezone)
}

interface AnalyticsSummary {
  totalPageViews: number;
  totalVisitors: number;
  todayPageViews: number;
  todayVisitors: number;
  weekPageViews: number;
  monthPageViews: number;
  dailyStats: DailyStats[];
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; count: number }[];
  deviceBreakdown: Record<string, number>;
  browserBreakdown: Record<string, number>;
}

// Generate anonymous visitor ID (not personally identifiable)
const getVisitorId = (): string => {
  let id = localStorage.getItem('_vid');
  if (!id) {
    id = 'v_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('_vid', id);
  }
  return id;
};

// Get device type
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  if (/mobile|iphone|android/i.test(ua)) return 'Mobile';
  return 'Desktop';
};

// Get browser name
const getBrowserName = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'Other';
};

// Get country estimate from timezone
const getCountryFromTimezone = (): string => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzMap: Record<string, string> = {
      'Europe/Istanbul': 'Türkiye',
      'Europe/London': 'UK',
      'Europe/Berlin': 'Germany',
      'Europe/Paris': 'France',
      'America/New_York': 'USA',
      'America/Los_Angeles': 'USA',
      'America/Chicago': 'USA',
      'Asia/Tokyo': 'Japan',
      'Asia/Shanghai': 'China',
      'Asia/Kolkata': 'India',
      'Asia/Dubai': 'UAE',
      'Australia/Sydney': 'Australia',
      'America/Sao_Paulo': 'Brazil',
      'America/Toronto': 'Canada',
      'Europe/Amsterdam': 'Netherlands',
      'Europe/Rome': 'Italy',
      'Europe/Madrid': 'Spain',
      'Europe/Moscow': 'Russia',
      'Asia/Seoul': 'South Korea',
      'Europe/Stockholm': 'Sweden',
      'Europe/Warsaw': 'Poland',
      'Europe/Bucharest': 'Romania',
      'Europe/Athens': 'Greece',
    };
    // Try exact match first
    if (tzMap[tz]) return tzMap[tz];
    // Try region match
    if (tz.startsWith('Europe/')) return tz.split('/')[1];
    if (tz.startsWith('America/')) return 'Americas';
    if (tz.startsWith('Asia/')) return 'Asia';
    if (tz.startsWith('Africa/')) return 'Africa';
    if (tz.startsWith('Australia/')) return 'Australia';
    return 'Other';
  } catch {
    return 'Unknown';
  }
};

// Get today's date string
const getTodayStr = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Track a page view
export const trackPageView = async (path: string = '/'): Promise<void> => {
  try {
    const today = getTodayStr();
    const visitorId = getVisitorId();
    const device = getDeviceType();
    const browser = getBrowserName();
    const country = getCountryFromTimezone();
    const referrer = document.referrer ? new URL(document.referrer).hostname : 'Direct';

    const docRef = doc(db, 'analytics', today);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as DailyStats;
      const isNewVisitor = !data.visitors?.includes(visitorId);
      
      const pages = data.pages || {};
      pages[path] = (pages[path] || 0) + 1;

      const referrers = data.referrers || {};
      referrers[referrer] = (referrers[referrer] || 0) + 1;

      const devices = data.devices || {};
      devices[device] = (devices[device] || 0) + 1;

      const browsers = data.browsers || {};
      browsers[browser] = (browsers[browser] || 0) + 1;

      const countries = data.countries || {};
      countries[country] = (countries[country] || 0) + 1;

      await updateDoc(docRef, {
        pageViews: (data.pageViews || 0) + 1,
        uniqueVisitors: isNewVisitor ? (data.uniqueVisitors || 0) + 1 : (data.uniqueVisitors || 0),
        visitors: isNewVisitor ? [...(data.visitors || []), visitorId] : data.visitors,
        pages,
        referrers,
        devices,
        browsers,
        countries,
      });
    } else {
      await setDoc(docRef, {
        date: today,
        pageViews: 1,
        uniqueVisitors: 1,
        visitors: [visitorId],
        pages: { [path]: 1 },
        referrers: { [referrer]: 1 },
        devices: { [device]: 1 },
        browsers: { [browser]: 1 },
        countries: { [country]: 1 },
      });
    }

    // Update total counter
    const totalRef = doc(db, 'analytics', '_totals');
    const totalSnap = await getDoc(totalRef);
    if (totalSnap.exists()) {
      await updateDoc(totalRef, {
        totalPageViews: increment(1),
      });
    } else {
      await setDoc(totalRef, {
        totalPageViews: 1,
      });
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Get analytics summary
export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const summary: AnalyticsSummary = {
    totalPageViews: 0,
    totalVisitors: 0,
    todayPageViews: 0,
    todayVisitors: 0,
    weekPageViews: 0,
    monthPageViews: 0,
    dailyStats: [],
    topPages: [],
    topReferrers: [],
    deviceBreakdown: {},
    browserBreakdown: {},
  };

  try {
    // Get totals
    const totalRef = doc(db, 'analytics', '_totals');
    const totalSnap = await getDoc(totalRef);
    if (totalSnap.exists()) {
      summary.totalPageViews = totalSnap.data().totalPageViews || 0;
    }

    // Get daily stats (last 30 days)
    const analyticsRef = collection(db, 'analytics');
    const q = query(analyticsRef, orderBy('date', 'desc'), limit(31));
    const snapshot = await getDocs(q);
    
    const today = getTodayStr();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const monthAgoStr = monthAgo.toISOString().split('T')[0];

    const allPages: Record<string, number> = {};
    const allReferrers: Record<string, number> = {};
    const allDevices: Record<string, number> = {};
    const allBrowsers: Record<string, number> = {};

    snapshot.docs.forEach(d => {
      if (d.id === '_totals') return;
      const data = d.data() as DailyStats;
      summary.dailyStats.push(data);
      summary.totalVisitors += data.uniqueVisitors || 0;

      if (data.date === today) {
        summary.todayPageViews = data.pageViews || 0;
        summary.todayVisitors = data.uniqueVisitors || 0;
      }

      if (data.date >= weekAgoStr) {
        summary.weekPageViews += data.pageViews || 0;
      }

      if (data.date >= monthAgoStr) {
        summary.monthPageViews += data.pageViews || 0;
      }

      // Aggregate
      if (data.pages) {
        Object.entries(data.pages).forEach(([p, c]) => {
          allPages[p] = (allPages[p] || 0) + c;
        });
      }
      if (data.referrers) {
        Object.entries(data.referrers).forEach(([r, c]) => {
          allReferrers[r] = (allReferrers[r] || 0) + c;
        });
      }
      if (data.devices) {
        Object.entries(data.devices).forEach(([d, c]) => {
          allDevices[d] = (allDevices[d] || 0) + c;
        });
      }
      if (data.browsers) {
        Object.entries(data.browsers).forEach(([b, c]) => {
          allBrowsers[b] = (allBrowsers[b] || 0) + c;
        });
      }
    });

    // Sort daily stats by date ascending for chart
    summary.dailyStats.sort((a, b) => a.date.localeCompare(b.date));

    // Top pages
    summary.topPages = Object.entries(allPages)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Top referrers
    summary.topReferrers = Object.entries(allReferrers)
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    summary.deviceBreakdown = allDevices;
    summary.browserBreakdown = allBrowsers;

  } catch (error) {
    console.error('Analytics fetch error:', error);
  }

  return summary;
};
