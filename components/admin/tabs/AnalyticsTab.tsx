import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Loader2, RefreshCw } from 'lucide-react';
import { getDailyStats, getTotalPageViews, DailyStats } from '../../../lib/analytics.service';
import { Segmented } from '../ui';

type Lang = 'EN' | 'TR';

interface AnalyticsTabProps {
  editLang: Lang;
}

const PERIODS = [7, 30, 90] as const;
type Period = typeof PERIODS[number];

const GA_URL = 'https://analytics.google.com/analytics/web/#/p476927206/reports/intelligenthome';

// Hostnames that mean "came from this site itself" rather than a real referrer
const OWN_HOSTS = ['atakanclskn.me', 'www.atakanclskn.me', 'atakanclskn-portfolio.web.app', 'atakanclskn-portfolio.firebaseapp.com'];
const DEV_HOSTS = ['localhost', '127.0.0.1'];

const isoDay = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
};

type Breakdown = { key: string; count: number }[];

const sumField = (days: DailyStats[], field: 'pages' | 'referrers' | 'devices' | 'browsers' | 'countries') => {
  const totals = new Map<string, number>();
  days.forEach(day => Object.entries(day[field] || {}).forEach(([key, count]) => {
    totals.set(key, (totals.get(key) ?? 0) + (count as number));
  }));
  return totals;
};

const toRanked = (totals: Map<string, number>): Breakdown =>
  [...totals.entries()].map(([key, count]) => ({ key, count })).filter(r => r.count > 0).sort((a, b) => b.count - a.count);

// Old data still contains admin and local-dev traffic; keep it out of the visitor lists
const cleanPages = (totals: Map<string, number>) => {
  const out = new Map<string, number>();
  totals.forEach((count, path) => {
    if (path.startsWith('/admin')) return;
    const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path;
    out.set(normalized, (out.get(normalized) ?? 0) + count);
  });
  return out;
};

const cleanReferrers = (totals: Map<string, number>) => {
  const out = new Map<string, number>();
  totals.forEach((count, host) => {
    if (DEV_HOSTS.includes(host)) return;
    const key = host === 'Direct' || OWN_HOSTS.includes(host) ? 'Direct' : host.replace(/^www\./, '');
    out.set(key, (out.get(key) ?? 0) + count);
  });
  return out;
};

const StatTile: React.FC<{ label: string; value: string; detail?: React.ReactNode }> = ({ label, value, detail }) => (
  <div className="p-5 rounded-3xl border border-black/[0.08] bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</p>
    <p className="mt-3 font-display text-4xl font-bold tracking-tight tabular-nums text-gray-900 dark:text-white">{value}</p>
    {detail && <p className="mt-1 text-xs text-gray-500">{detail}</p>}
  </div>
);

const RankedList: React.FC<{ title: string; rows: Breakdown; format: (n: number) => string; label?: (key: string) => string; empty: string; limit?: number }> = ({
  title, rows, format, label = k => k, empty, limit = 6,
}) => {
  const total = rows.reduce((sum, r) => sum + r.count, 0);
  return (
    <section className="p-6 rounded-3xl border border-black/[0.08] bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
      <h3 className="mb-4 font-display text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500">{empty}</p>
      ) : (
        <ul className="space-y-3">
          {rows.slice(0, limit).map(row => {
            const share = total ? row.count / total : 0;
            return (
              <li key={row.key}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate text-gray-700 dark:text-gray-300" title={label(row.key)}>{label(row.key)}</span>
                  <span className="shrink-0 tabular-nums">
                    <span className="font-semibold text-gray-900 dark:text-white">{format(row.count)}</span>
                    <span className="ml-2 text-xs text-gray-500">{Math.round(share * 100)}%</span>
                  </span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-black/[0.05] dark:bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(2, share * 100)}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ editLang }) => {
  const tr = editLang === 'TR';
  const locale = tr ? 'tr-TR' : 'en-US';
  const [period, setPeriod] = useState<Period>(30);
  const [days, setDays] = useState<DailyStats[] | null>(null);
  const [allTime, setAllTime] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // Always load the longest period plus the one before it, so switching periods needs no refetch
  const load = useCallback(async () => {
    setIsRefreshing(true);
    setError(false);
    try {
      const [stats, total] = await Promise.all([
        getDailyStats(isoDay(-(PERIODS[PERIODS.length - 1] * 2 - 1))),
        getTotalPageViews().catch(() => null),
      ]);
      setDays(stats);
      setAllTime(total);
      setUpdatedAt(new Date());
    } catch (e) {
      console.error('Analytics fetch error:', e);
      setError(true);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const number = (n: number) => n.toLocaleString(locale);

  const data = useMemo(() => {
    if (!days) return null;
    const byDate = new Map(days.map(d => [d.date, d]));
    const series = Array.from({ length: period }, (_, i) => {
      const date = isoDay(i - (period - 1));
      return { date, views: byDate.get(date)?.pageViews ?? 0 };
    });
    const current = days.filter(d => d.date >= isoDay(-(period - 1)));
    const previous = days.filter(d => d.date >= isoDay(-(period * 2 - 1)) && d.date < isoDay(-(period - 1)));
    const views = current.reduce((s, d) => s + (d.pageViews || 0), 0);
    const prevViews = previous.reduce((s, d) => s + (d.pageViews || 0), 0);
    return {
      series,
      views,
      visitors: current.reduce((s, d) => s + (d.uniqueVisitors || 0), 0),
      change: prevViews ? (views - prevViews) / prevViews : null,
      pages: toRanked(cleanPages(sumField(current, 'pages'))),
      referrers: toRanked(cleanReferrers(sumField(current, 'referrers'))),
      devices: toRanked(sumField(current, 'devices')),
      browsers: toRanked(sumField(current, 'browsers')),
      countries: toRanked(sumField(current, 'countries')),
    };
  }, [days, period]);

  const peak = Math.max(0, ...(data?.series.map(d => d.views) ?? [0]));
  const maxViews = Math.max(1, peak);
  const formatDay = (date: string, opts: Intl.DateTimeFormatOptions) => new Date(`${date}T12:00:00`).toLocaleDateString(locale, opts);
  const periodLabel = (p: number) => tr ? `${p} gün` : `${p} days`;
  const empty = tr ? 'Bu dönemde veri yok.' : 'No data for this period.';
  const changeText = data?.change == null
    ? (tr ? 'Önceki dönemle karşılaştırılacak veri yok' : 'No previous period to compare')
    : `${data.change >= 0 ? '▲' : '▼'} ${Math.abs(Math.round(data.change * 100))}% ${tr ? `önceki ${period} güne göre` : `vs previous ${period} days`}`;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          value={String(period) as `${Period}`}
          onChange={(value) => setPeriod(Number(value) as Period)}
          options={PERIODS.map(p => ({ value: String(p) as `${Period}`, label: periodLabel(p) }))}
        />
        <div className="flex items-center gap-2">
          {updatedAt && (
            <span className="hidden sm:inline text-xs text-gray-500 tabular-nums">
              {tr ? 'Güncellendi' : 'Updated'} {updatedAt.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button
            onClick={load}
            disabled={isRefreshing}
            className="p-2.5 rounded-full border border-black/[0.08] bg-white/60 text-gray-600 hover:text-gray-900 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 disabled:opacity-50 transition-colors"
            aria-label={tr ? 'Yenile' : 'Refresh'}
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
          <a
            href={GA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-black/[0.08] bg-white/60 text-gray-700 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            Google Analytics <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {error && (
        <p className="px-5 py-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-sm text-red-500">
          {tr ? 'Veriler yüklenemedi. Yenilemeyi deneyin.' : 'Could not load analytics. Try refreshing.'}
        </p>
      )}

      {!data ? (
        !error && <div className="flex justify-center py-24"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
      ) : (
        <>
          {/* Key numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile label={tr ? 'Görüntülenme' : 'Page views'} value={number(data.views)} detail={changeText} />
            <StatTile
              label={tr ? 'Ziyaretçi' : 'Visitors'}
              value={number(data.visitors)}
              detail={tr ? 'Günlük tekil ziyaretçilerin toplamı' : 'Sum of daily unique visitors'}
            />
            <StatTile
              label={tr ? 'Günlük ortalama' : 'Daily average'}
              value={number(Math.round(data.views / period))}
              detail={tr ? 'görüntülenme / gün' : 'page views / day'}
            />
            <StatTile label={tr ? 'Tüm zamanlar' : 'All time'} value={allTime == null ? '–' : number(allTime)} detail={tr ? 'görüntülenme' : 'page views'} />
          </div>

          {/* Daily views */}
          <section className="p-6 rounded-3xl border border-black/[0.08] bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-baseline justify-between gap-4 mb-6">
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">{tr ? 'Günlük görüntülenme' : 'Daily page views'}</h3>
              <span className="text-xs text-gray-500 tabular-nums">{tr ? 'En yüksek' : 'Peak'}: {number(peak)}</span>
            </div>
            <div className="relative h-48">
              <div className="absolute inset-x-0 top-0 border-t border-dashed border-black/[0.08] dark:border-white/10" />
              <div className="absolute inset-0 flex items-end gap-[2px]" onMouseLeave={() => setHovered(null)}>
                {data.series.map((day, i) => (
                  <div key={day.date} className="relative flex-1 h-full flex items-end" onMouseEnter={() => setHovered(i)}>
                    <div
                      className={`w-full rounded-t-[4px] transition-opacity ${day.views ? 'bg-primary' : 'bg-black/[0.06] dark:bg-white/[0.08]'} ${
                        hovered !== null && hovered !== i ? 'opacity-40' : ''
                      }`}
                      style={{ height: day.views ? `${Math.max(3, (day.views / maxViews) * 100)}%` : '2px' }}
                    />
                    {hovered === i && (
                      <div className={`absolute bottom-full mb-2 z-10 px-3 py-2 rounded-xl text-xs whitespace-nowrap bg-gray-900 text-white shadow-lg dark:bg-white dark:text-gray-900 ${
                        i < period / 4 ? 'left-0' : i > period * 0.75 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                      }`}>
                        <span className="font-bold tabular-nums">{number(day.views)}</span> {tr ? 'görüntülenme' : 'views'}
                        <span className="block opacity-60">{formatDay(day.date, { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-gray-500 tabular-nums">
              <span>{formatDay(data.series[0].date, { day: 'numeric', month: 'short' })}</span>
              <span>{formatDay(data.series[Math.floor(period / 2)].date, { day: 'numeric', month: 'short' })}</span>
              <span>{tr ? 'Bugün' : 'Today'}</span>
            </div>
          </section>

          {/* Breakdowns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RankedList title={tr ? 'Sayfalar' : 'Pages'} rows={data.pages} format={number} empty={empty} label={k => k === '/' ? (tr ? 'Ana sayfa' : 'Home') : k} />
            <RankedList title={tr ? 'Kaynaklar' : 'Sources'} rows={data.referrers} format={number} empty={empty} label={k => k === 'Direct' ? (tr ? 'Doğrudan' : 'Direct') : k} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RankedList title={tr ? 'Ülkeler' : 'Countries'} rows={data.countries} format={number} empty={empty} />
            <RankedList title={tr ? 'Cihazlar' : 'Devices'} rows={data.devices} format={number} empty={empty} />
            <RankedList title={tr ? 'Tarayıcılar' : 'Browsers'} rows={data.browsers} format={number} empty={empty} />
          </div>

          <p className="text-xs text-gray-500">
            {tr
              ? 'Admin paneli, geliştirme ortamı ve admin olarak giriş yaptığınız tarayıcı artık sayılmıyor. Eski günlerin toplamlarında bu ziyaretler hâlâ yer alabilir.'
              : 'The admin panel, local development and your signed-in browser are no longer counted. Totals for older days may still include those visits.'}
          </p>
        </>
      )}
    </div>
  );
};
