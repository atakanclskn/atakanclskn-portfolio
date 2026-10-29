import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronRight, EyeOff } from 'lucide-react';
import { useAdmin } from '../../../lib/adminContext';
import { getAnalyticsSummary, AnalyticsSummary } from '../../../lib/analytics.service';
import { HideableSection } from '../../../types';

type Lang = 'EN' | 'TR';

interface DashboardTabProps {
  editLang: Lang;
  onNavigate: (tabId: string) => void;
  onViewSite: () => void;
}

const CHART_DAYS = 14;

// Fills days without visits with zero so the chart has one bar per calendar day
const lastDays = (summary: AnalyticsSummary | null) => {
  const byDate = new Map(summary?.dailyStats.map(d => [d.date, d.pageViews || 0]) ?? []);
  return Array.from({ length: CHART_DAYS }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (CHART_DAYS - 1 - i));
    const date = day.toISOString().split('T')[0];
    return { date, views: byDate.get(date) ?? 0 };
  });
};

const StatTile: React.FC<{ label: string; value: React.ReactNode; detail?: React.ReactNode; onClick?: () => void }> = ({ label, value, detail, onClick }) => {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      onClick={onClick}
      className={`text-left p-5 rounded-3xl border border-black/[0.08] bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] ${
        onClick ? 'hover:border-black/15 dark:hover:border-white/25 transition-colors' : ''
      }`}
    >
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-3 font-display text-4xl font-bold tracking-tight tabular-nums text-gray-900 dark:text-white">{value}</p>
      {detail && <p className="mt-1 text-xs text-gray-500">{detail}</p>}
    </Tag>
  );
};

export const DashboardTab: React.FC<DashboardTabProps> = ({ editLang, onNavigate, onViewSite }) => {
  const {
    heroContent, aboutContent, statsContent, hobbies, techStack, projects, experiences, socials,
    messages, unreadCount, siteSettings,
  } = useAdmin();
  const tr = editLang === 'TR';
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    getAnalyticsSummary().then(setSummary);
  }, []);

  const days = lastDays(summary);
  const maxViews = Math.max(1, ...days.map(d => d.views));
  const number = (n: number | undefined) => summary ? (n ?? 0).toLocaleString(tr ? 'tr-TR' : 'en-US') : '–';
  const formatDay = (date: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${date}T12:00:00`).toLocaleDateString(tr ? 'tr-TR' : 'en-US', opts);

  const hidden = (id?: HideableSection) => !!id && !!siteSettings.hiddenSections?.includes(id);
  const sections: { tab: string; name: string; summary: string; id?: HideableSection }[] = [
    { tab: 'hero', name: 'Hero', summary: typeof heroContent.role === 'string' ? heroContent.role : heroContent.role[editLang] },
    {
      tab: 'about', id: 'about', name: tr ? 'Hakkımda' : 'About',
      summary: tr
        ? `${aboutContent.paragraphs.length} paragraf · ${statsContent.stats.length} istatistik · ${hobbies.length} hobi`
        : `${aboutContent.paragraphs.length} paragraphs · ${statsContent.stats.length} stats · ${hobbies.length} hobbies`,
    },
    { tab: 'tech', id: 'tech-stack', name: tr ? 'Teknolojiler' : 'Tech Stack', summary: `${techStack.length} ${tr ? 'teknoloji' : 'technologies'}` },
    { tab: 'projects', id: 'projects', name: tr ? 'Projeler' : 'Projects', summary: `${projects.length} ${tr ? 'proje' : 'projects'}` },
    { tab: 'experience', id: 'experience', name: tr ? 'Deneyim' : 'Experience', summary: `${experiences.length} ${tr ? 'kayıt' : 'entries'}` },
    { tab: 'contact', id: 'contact', name: tr ? 'İletişim' : 'Contact', summary: `${socials.length} ${tr ? 'sosyal hesap' : 'social accounts'}` },
    { tab: 'footer', name: 'Footer', summary: tr ? 'Telif ve ek bağlantılar' : 'Copyright and extra links' },
  ];

  const recentMessages = messages.filter(m => !m.isArchived).slice(0, 4);
  const firstName = heroContent.name.split(' ')[0];
  const cardClass = 'rounded-3xl border border-black/[0.08] bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]';
  const rowClass = 'w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors';

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString(tr ? 'tr-TR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h2 className="mt-1 font-display text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {tr ? `Merhaba, ${firstName}.` : `Hi, ${firstName}.`}
          </h2>
        </div>
        <button
          onClick={onViewSite}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-black/[0.08] bg-white/60 text-gray-700 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 transition-colors"
        >
          {tr ? 'Siteyi aç' : 'Open site'} <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Key numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile
          label={tr ? 'Bugün' : 'Today'}
          value={number(summary?.todayPageViews)}
          detail={summary && `${number(summary.todayVisitors)} ${tr ? 'ziyaretçi' : 'visitors'}`}
          onClick={() => onNavigate('analytics')}
        />
        <StatTile label={tr ? 'Son 7 gün' : 'Last 7 days'} value={number(summary?.weekPageViews)} detail={tr ? 'görüntülenme' : 'page views'} onClick={() => onNavigate('analytics')} />
        <StatTile label={tr ? 'Toplam' : 'All time'} value={number(summary?.totalPageViews)} detail={tr ? 'görüntülenme' : 'page views'} onClick={() => onNavigate('analytics')} />
        <StatTile
          label={tr ? 'Okunmamış' : 'Unread'}
          value={unreadCount}
          detail={tr ? `${messages.length} mesajdan` : `of ${messages.length} messages`}
          onClick={() => onNavigate('messages')}
        />
      </div>

      {/* Daily views */}
      <section className={`${cardClass} p-6`}>
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
            {tr ? `Günlük görüntülenme · son ${CHART_DAYS} gün` : `Daily page views · last ${CHART_DAYS} days`}
          </h3>
          <button onClick={() => onNavigate('analytics')} className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            {tr ? 'Detaylar' : 'Details'} →
          </button>
        </div>
        <div className="relative h-40 flex items-end gap-[2px]" onMouseLeave={() => setHovered(null)}>
          {days.map((day, i) => (
            <div
              key={day.date}
              className="relative flex-1 h-full flex items-end"
              onMouseEnter={() => setHovered(i)}
            >
              <div
                className={`w-full rounded-t-[4px] transition-opacity ${day.views ? 'bg-primary' : 'bg-black/[0.06] dark:bg-white/[0.08]'} ${
                  hovered !== null && hovered !== i ? 'opacity-40' : ''
                }`}
                style={{ height: day.views ? `${Math.max(4, (day.views / maxViews) * 100)}%` : '2px' }}
              />
              {hovered === i && (
                <div className={`absolute bottom-full mb-2 z-10 px-3 py-2 rounded-xl text-xs whitespace-nowrap bg-gray-900 text-white shadow-lg dark:bg-white dark:text-gray-900 ${
                  i < 3 ? 'left-0' : i > CHART_DAYS - 4 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                }`}>
                  <span className="font-bold tabular-nums">{day.views}</span> {tr ? 'görüntülenme' : 'views'}
                  <span className="block opacity-60">{formatDay(day.date, { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[11px] text-gray-500 tabular-nums">
          <span>{formatDay(days[0].date, { day: 'numeric', month: 'short' })}</span>
          <span>{tr ? 'Bugün' : 'Today'}</span>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page sections */}
        <section className={`${cardClass} overflow-hidden`}>
          <h3 className="px-5 pt-5 pb-3 font-display text-lg font-bold text-gray-900 dark:text-white">{tr ? 'Sayfa bölümleri' : 'Page sections'}</h3>
          <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
            {sections.map((section, i) => (
              <button key={section.tab} onClick={() => onNavigate(section.tab)} className={rowClass}>
                <span className="w-6 font-mono text-xs text-gray-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">{section.name}</span>
                  <span className="block text-xs text-gray-500 truncate">{section.summary}</span>
                </span>
                {hidden(section.id) && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-black/[0.08] text-gray-500 dark:border-white/10">
                    <EyeOff size={12} /> {tr ? 'Gizli' : 'Hidden'}
                  </span>
                )}
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
        </section>

        {/* Recent messages */}
        <section className={`${cardClass} overflow-hidden flex flex-col`}>
          <div className="flex items-baseline justify-between px-5 pt-5 pb-3">
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">{tr ? 'Son mesajlar' : 'Recent messages'}</h3>
            <button onClick={() => onNavigate('messages')} className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              {tr ? 'Tümü' : 'All'} →
            </button>
          </div>
          {recentMessages.length === 0 ? (
            <p className="flex-1 flex items-center justify-center px-5 pb-8 text-sm text-gray-500">
              {tr ? 'Henüz mesaj yok.' : 'No messages yet.'}
            </p>
          ) : (
            <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
              {recentMessages.map(message => (
                <button key={message._id} onClick={() => onNavigate('messages')} className={rowClass}>
                  <span className={`w-2 h-2 shrink-0 rounded-full ${message.isRead ? 'bg-transparent' : 'bg-primary'}`} />
                  <span className="flex-1 min-w-0">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className={`text-sm truncate text-gray-900 dark:text-white ${message.isRead ? '' : 'font-semibold'}`}>{message.name}</span>
                      <span className="shrink-0 text-[11px] text-gray-500 tabular-nums">
                        {new Date(message.createdAt).toLocaleDateString(tr ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'short' })}
                      </span>
                    </span>
                    <span className="block text-xs text-gray-500 truncate">{message.message}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
