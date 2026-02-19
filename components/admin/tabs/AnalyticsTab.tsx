import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Eye, Monitor, Smartphone, Tablet,
  Globe, ArrowUpRight, ArrowDownRight, TrendingUp, 
  RefreshCw, ExternalLink, Loader2, Calendar, Clock
} from 'lucide-react';
import { getAnalyticsSummary } from '../../../lib/analytics.service';

interface AnalyticsTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

interface AnalyticsSummary {
  totalPageViews: number;
  totalVisitors: number;
  todayPageViews: number;
  todayVisitors: number;
  weekPageViews: number;
  monthPageViews: number;
  dailyStats: {
    date: string;
    pageViews: number;
    uniqueVisitors: number;
    pages?: Record<string, number>;
    referrers?: Record<string, number>;
    devices?: Record<string, number>;
    browsers?: Record<string, number>;
    countries?: Record<string, number>;
  }[];
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; count: number }[];
  deviceBreakdown: Record<string, number>;
  browserBreakdown: Record<string, number>;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ editLang, theme }) => {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  const t = {
    title: editLang === 'TR' ? 'Analitik Dashboard' : 'Analytics Dashboard',
    subtitle: editLang === 'TR' ? 'Ziyaretçi ve sayfa görüntüleme istatistikleri' : 'Visitor and page view statistics',
    totalViews: editLang === 'TR' ? 'Toplam Görüntüleme' : 'Total Views',
    totalVisitors: editLang === 'TR' ? 'Toplam Ziyaretçi' : 'Total Visitors',
    todayViews: editLang === 'TR' ? 'Bugün Görüntüleme' : 'Today Views',
    todayVisitors: editLang === 'TR' ? 'Bugün Ziyaretçi' : 'Today Visitors',
    thisWeek: editLang === 'TR' ? 'Bu Hafta' : 'This Week',
    thisMonth: editLang === 'TR' ? 'Bu Ay' : 'This Month',
    dailyChart: editLang === 'TR' ? 'Günlük Görüntüleme (Son 14 Gün)' : 'Daily Views (Last 14 Days)',
    topPages: editLang === 'TR' ? 'En Çok Görüntülenen Sayfalar' : 'Top Pages',
    topReferrers: editLang === 'TR' ? 'Trafik Kaynakları' : 'Traffic Sources',
    devices: editLang === 'TR' ? 'Cihazlar' : 'Devices',
    browsers: editLang === 'TR' ? 'Tarayıcılar' : 'Browsers',
    countries: editLang === 'TR' ? 'Ülkeler' : 'Countries',
    refresh: editLang === 'TR' ? 'Yenile' : 'Refresh',
    lastUpdated: editLang === 'TR' ? 'Son güncelleme' : 'Last updated',
    noData: editLang === 'TR' ? 'Henüz veri yok. Ziyaretçiler gelmeye başladığında burada görünecek.' : 'No data yet. Stats will appear as visitors start coming.',
    gaLink: editLang === 'TR' ? 'Google Analytics\'te Aç' : 'Open in Google Analytics',
    views: editLang === 'TR' ? 'görüntüleme' : 'views',
    visitors: editLang === 'TR' ? 'ziyaretçi' : 'visitors',
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await getAnalyticsSummary();
      setData(result);
      setLastRefresh(new Date().toLocaleTimeString());
    } catch (e) {
      console.error('Analytics load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const cardClass = `rounded-2xl border p-6 ${
    theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
  }`;

  const statCardClass = `rounded-xl border p-4 ${
    theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
  }`;

  // Simple bar chart renderer
  const renderBarChart = (stats: { date: string; pageViews: number }[]) => {
    const last14 = stats.slice(-14);
    if (last14.length === 0) return null;
    const maxViews = Math.max(...last14.map(s => s.pageViews), 1);

    return (
      <div className="flex items-end gap-1.5 h-40 mt-4">
        {last14.map((stat, i) => {
          const height = Math.max((stat.pageViews / maxViews) * 100, 4);
          const dayLabel = new Date(stat.date + 'T00:00:00').toLocaleDateString(editLang === 'TR' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'short' });
          return (
            <div key={stat.date} className="flex-1 flex flex-col items-center gap-1 group relative">
              {/* Tooltip */}
              <div className={`absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10 ${
                theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
              }`}>
                {stat.pageViews} {t.views}
              </div>
              <div 
                className="w-full rounded-t-md transition-all duration-300 group-hover:opacity-80"
                style={{ 
                  height: `${height}%`,
                  background: `linear-gradient(to top, rgb(var(--primary) / 0.6), rgb(var(--primary)))`
                }}
              />
              <span className={`text-[9px] ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} ${last14.length > 10 ? 'hidden md:block' : ''}`}>
                {dayLabel}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // Pie-like horizontal breakdown
  const renderBreakdown = (data: Record<string, number>, icon: React.ReactNode) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    if (total === 0) return null;
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const colors = ['bg-primary', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500', 'bg-purple-500'];

    return (
      <div className="space-y-3 mt-3">
        {/* Progress bar */}
        <div className="flex rounded-full overflow-hidden h-3">
          {sorted.map(([name, count], i) => (
            <div 
              key={name}
              className={`${colors[i % colors.length]} transition-all`}
              style={{ width: `${(count / total) * 100}%` }}
              title={`${name}: ${count}`}
            />
          ))}
        </div>
        {/* Legend */}
        <div className="space-y-2">
          {sorted.slice(0, 6).map(([name, count], i) => (
            <div key={name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]}`} />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{count}</span>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  ({((count / total) * 100).toFixed(0)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Country breakdown with flags
  const renderCountries = () => {
    if (!data?.dailyStats) return null;
    const countries: Record<string, number> = {};
    data.dailyStats.forEach(day => {
      if (day.countries) {
        Object.entries(day.countries).forEach(([c, count]) => {
          countries[c] = (countries[c] || 0) + count;
        });
      }
    });
    if (Object.keys(countries).length === 0) return null;

    const total = Object.values(countries).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(countries).sort((a, b) => b[1] - a[1]);

    return (
      <div className="space-y-2 mt-3">
        {sorted.slice(0, 8).map(([country, count]) => (
          <div key={country} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-primary" />
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{country}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-1.5 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} style={{ width: '60px' }}>
                <div className="h-full bg-primary rounded-full" style={{ width: `${(count / sorted[0][1]) * 100}%` }} />
              </div>
              <span className={`text-sm font-medium w-8 text-right ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{count}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className={cardClass}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <BarChart3 size={24} className="text-primary" />
              {t.title}
            </h2>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lastRefresh && (
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                <Clock size={12} className="inline mr-1" />
                {t.lastUpdated}: {lastRefresh}
              </span>
            )}
            <button 
              onClick={loadData}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              {t.refresh}
            </button>
            <a 
              href="https://analytics.google.com/analytics/web/#/p476927206/reports/intelligenthome"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-primary/20 text-primary hover:bg-primary/30 transition-all"
            >
              <ExternalLink size={16} />
              {t.gaLink}
            </a>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={statCardClass}>
          <div className="flex items-center justify-between mb-2">
            <Eye size={18} className="text-blue-500" />
            <TrendingUp size={14} className="text-emerald-500" />
          </div>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {data?.totalPageViews?.toLocaleString() || 0}
          </p>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.totalViews}</p>
        </div>

        <div className={statCardClass}>
          <div className="flex items-center justify-between mb-2">
            <Users size={18} className="text-emerald-500" />
            <TrendingUp size={14} className="text-emerald-500" />
          </div>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {data?.totalVisitors?.toLocaleString() || 0}
          </p>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.totalVisitors}</p>
        </div>

        <div className={statCardClass}>
          <div className="flex items-center justify-between mb-2">
            <Calendar size={18} className="text-amber-500" />
          </div>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {data?.todayPageViews?.toLocaleString() || 0}
          </p>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.todayViews}</p>
        </div>

        <div className={statCardClass}>
          <div className="flex items-center justify-between mb-2">
            <Users size={18} className="text-pink-500" />
          </div>
          <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {data?.todayVisitors?.toLocaleString() || 0}
          </p>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.todayVisitors}</p>
        </div>
      </div>

      {/* Week/Month Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className={statCardClass}>
          <p className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>📅 {t.thisWeek}</p>
          <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {data?.weekPageViews?.toLocaleString() || 0} <span className="text-sm font-normal text-gray-500">{t.views}</span>
          </p>
        </div>
        <div className={statCardClass}>
          <p className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>📆 {t.thisMonth}</p>
          <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {data?.monthPageViews?.toLocaleString() || 0} <span className="text-sm font-normal text-gray-500">{t.views}</span>
          </p>
        </div>
      </div>

      {/* Daily Chart */}
      {data?.dailyStats && data.dailyStats.length > 0 && (
        <div className={cardClass}>
          <h3 className={`text-sm font-bold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            📊 {t.dailyChart}
          </h3>
          {renderBarChart(data.dailyStats)}
        </div>
      )}

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Devices */}
        <div className={cardClass}>
          <h3 className={`text-sm font-bold uppercase flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <Monitor size={16} />
            {t.devices}
          </h3>
          {data?.deviceBreakdown && Object.keys(data.deviceBreakdown).length > 0 
            ? renderBreakdown(data.deviceBreakdown, <Monitor size={14} />)
            : <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>—</p>
          }
        </div>

        {/* Browsers */}
        <div className={cardClass}>
          <h3 className={`text-sm font-bold uppercase flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <Globe size={16} />
            {t.browsers}
          </h3>
          {data?.browserBreakdown && Object.keys(data.browserBreakdown).length > 0
            ? renderBreakdown(data.browserBreakdown, <Globe size={14} />)
            : <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>—</p>
          }
        </div>

        {/* Countries */}
        <div className={cardClass}>
          <h3 className={`text-sm font-bold uppercase flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <Globe size={16} />
            {t.countries}
          </h3>
          {renderCountries() || <p className={`text-sm mt-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>—</p>}
        </div>
      </div>

      {/* Two Column: Top Pages + Referrers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Pages */}
        <div className={cardClass}>
          <h3 className={`text-sm font-bold uppercase mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            🔗 {t.topPages}
          </h3>
          {data?.topPages && data.topPages.length > 0 ? (
            <div className="space-y-2">
              {data.topPages.map((page, i) => (
                <div key={page.path} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono w-5 text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {i + 1}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{page.path}</span>
                  </div>
                  <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {page.views}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>—</p>
          )}
        </div>

        {/* Top Referrers */}
        <div className={cardClass}>
          <h3 className={`text-sm font-bold uppercase mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            🌐 {t.topReferrers}
          </h3>
          {data?.topReferrers && data.topReferrers.length > 0 ? (
            <div className="space-y-2">
              {data.topReferrers.map((ref, i) => (
                <div key={ref.referrer} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono w-5 text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {i + 1}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {ref.referrer === 'Direct' ? (editLang === 'TR' ? '🔗 Doğrudan' : '🔗 Direct') : ref.referrer}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {ref.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>—</p>
          )}
        </div>
      </div>

      {/* No data message */}
      {(!data?.dailyStats || data.dailyStats.length === 0) && (
        <div className={`${cardClass} text-center py-12`}>
          <BarChart3 size={48} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.noData}
          </p>
        </div>
      )}
    </div>
  );
};
