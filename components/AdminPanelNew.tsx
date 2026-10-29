import React, { useState, useEffect } from 'react';
import {
  Settings, Briefcase, Code, Share2,
  Layers, FileText, Heart, Moon, Sun, X, Mail, Layout, PanelBottom,
  Loader2, Check, BarChart3, RotateCcw, AlertCircle
} from 'lucide-react';
import { useAdmin } from '../lib/adminContext';
import { setTheme, useIsDark } from '../lib/theme';
import { AdminSidebar, TabItem } from './admin/AdminSidebar';
import { AdminLogin } from './admin/AdminLogin';
import {
  GeneralTab, AboutTab, HobbiesTab,
  TechTab, ProjectsTab, ExperienceTab, SocialsTab,
  SectionsTab, FooterTab, AnalyticsTab
} from './admin/tabs';
import { MessagesTab } from './admin/tabs/MessagesTab';
import { adminTranslations, getTranslation } from '../lib/adminTranslations';
import { ConfirmProvider, useConfirm } from './admin/ui';

const isAdminPath = (path: string) => path.startsWith('/admin');

const AdminPanelContent: React.FC<{
  editLang: 'EN' | 'TR';
  setEditLang: (lang: 'EN' | 'TR') => void;
}> = ({ editLang, setEditLang }) => {
  const [isOpen, setIsOpen] = useState(isAdminPath(window.location.pathname));
  const [activeTab, setActiveTab] = useState('sections');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const isDark = useIsDark();
  const confirm = useConfirm();
  const { isLoggedIn, loginWithGoogle, logout, unreadCount, navbarSettings,
    saveToFirebase, discardChanges, isDirty, isSaving, isLoading, lastSyncTime, isAuthLoading, currentUser } = useAdmin();

  const tr = editLang === 'TR';

  // Disable body scroll when admin panel is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Sync URL when panel opens/closes
  useEffect(() => {
    if (isOpen && !isAdminPath(window.location.pathname)) {
      window.history.pushState({}, '', '/admin');
      window.dispatchEvent(new Event('adminRouteChange'));
    } else if (!isOpen && isAdminPath(window.location.pathname)) {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('adminRouteChange'));
    }
  }, [isOpen]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => setIsOpen(isAdminPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Warn before leaving the page with unsaved edits
  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleSave = async () => {
    if (isSaving) return;
    setSaveError(false);
    const ok = await saveToFirebase();
    setSaveError(!ok);
  };

  // Ctrl/Cmd + S saves
  useEffect(() => {
    if (!isOpen || !isLoggedIn) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (isDirty) handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const confirmLoseChanges = async () => !isDirty || confirm({
    title: tr ? 'Kaydedilmemiş değişiklikler' : 'Unsaved changes',
    message: tr ? 'Kaydetmeden çıkarsanız yaptığınız düzenlemeler kaybolur.' : 'If you leave now, your edits will be lost.',
    confirmLabel: tr ? 'Kaydetmeden çık' : 'Leave without saving',
  });

  const handleDiscard = async () => {
    const ok = await confirm({
      title: tr ? 'Değişiklikler geri alınsın mı?' : 'Discard changes?',
      message: tr ? 'Son kayıttan sonraki tüm düzenlemeler silinecek.' : 'Everything since your last save will be reverted.',
      confirmLabel: tr ? 'Geri al' : 'Discard',
    });
    if (!ok) return;
    setSaveError(false);
    await discardChanges();
  };

  const handleClose = async () => {
    if (await confirmLoseChanges()) setIsOpen(false);
  };

  const handleLogout = async () => {
    if (!(await confirmLoseChanges())) return;
    logout();
    setIsOpen(false);
  };

  const groups = {
    content: tr ? 'İçerik' : 'Content',
    site: tr ? 'Site' : 'Site',
    inbox: tr ? 'Gelen' : 'Inbox',
  };

  const tabs: TabItem[] = [
    { id: 'sections', group: groups.content, label: getTranslation(adminTranslations.tabs.sections, editLang), icon: Layout },
    { id: 'about', group: groups.content, label: getTranslation(adminTranslations.tabs.about, editLang), icon: FileText },
    { id: 'hobbies', group: groups.content, label: getTranslation(adminTranslations.tabs.hobbies, editLang), icon: Heart },
    { id: 'tech', group: groups.content, label: getTranslation(adminTranslations.tabs.tech, editLang), icon: Layers },
    { id: 'projects', group: groups.content, label: getTranslation(adminTranslations.tabs.projects, editLang), icon: Code },
    { id: 'experience', group: groups.content, label: getTranslation(adminTranslations.tabs.experience, editLang), icon: Briefcase },
    { id: 'general', group: groups.site, label: getTranslation(adminTranslations.tabs.general, editLang), icon: Settings },
    { id: 'socials', group: groups.site, label: getTranslation(adminTranslations.tabs.socials, editLang), icon: Share2 },
    { id: 'footer', group: groups.site, label: getTranslation(adminTranslations.tabs.footer, editLang), icon: PanelBottom },
    { id: 'messages', group: groups.inbox, label: getTranslation(adminTranslations.tabs.messages, editLang), icon: Mail, badge: unreadCount },
    { id: 'analytics', group: groups.inbox, label: getTranslation(adminTranslations.tabs.analytics, editLang), icon: BarChart3 },
  ];
  const activeTabItem = tabs.find(tab => tab.id === activeTab) ?? tabs[0];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'messages':
        return <MessagesTab editLang={editLang} />;
      case 'general':
        return <GeneralTab editLang={editLang} />;
      case 'about':
        return <AboutTab editLang={editLang} />;
      case 'hobbies':
        return <HobbiesTab editLang={editLang} />;
      case 'tech':
        return <TechTab editLang={editLang} />;
      case 'projects':
        return <ProjectsTab editLang={editLang} />;
      case 'experience':
        return <ExperienceTab editLang={editLang} onTabChange={setActiveTab} />;
      case 'socials':
        return <SocialsTab editLang={editLang} />;
      case 'sections':
        return <SectionsTab editLang={editLang} />;
      case 'footer':
        return <FooterTab editLang={editLang} />;
      case 'analytics':
        return <AnalyticsTab editLang={editLang} />;
      default:
        return null;
    }
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString(tr ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' });

  const saveStatus = isSaving
    ? { dot: 'bg-gray-400 animate-pulse', text: tr ? 'Kaydediliyor…' : 'Saving…' }
    : saveError
    ? { dot: 'bg-red-500', text: tr ? 'Kaydedilemedi, tekrar deneyin' : 'Save failed, try again' }
    : isDirty
    ? { dot: 'bg-amber-500', text: tr ? 'Kaydedilmemiş değişiklikler' : 'Unsaved changes' }
    : { dot: 'bg-green-500', text: lastSyncTime
        ? `${tr ? 'Kaydedildi' : 'Saved'} · ${formatTime(lastSyncTime)}`
        : (tr ? 'Tüm değişiklikler kayıtlı' : 'All changes saved') };

  const roundButton = 'p-2.5 rounded-full border border-black/[0.08] bg-white/60 text-gray-600 hover:text-gray-900 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 transition-colors';

  if (!isOpen) return null;

  return (
    <div lang={tr ? 'tr' : 'en'} className="admin-root fixed inset-0 z-[9999] bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Ambient glow, echoing the site's background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-32 w-[560px] h-[560px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute -bottom-56 -right-32 w-[560px] h-[560px] rounded-full bg-[#d946ef]/10 blur-[160px]" />
      </div>

      <div className="relative flex h-full">
        {isLoggedIn && (
          <AdminSidebar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
            onViewSite={handleClose}
            editLang={editLang}
            logoText={navbarSettings.logoText || 'Admin'}
            userEmail={currentUser?.email}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}

        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top Bar */}
          <header className="m-3 mb-0 flex items-center gap-2 md:gap-3 min-h-16 px-4 md:px-5 py-2 rounded-3xl border border-black/[0.08] bg-white/60 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.03]">
            <div className="min-w-0 flex-1">
              <h1 className="font-display font-bold text-lg tracking-tight truncate">
                {isLoggedIn ? activeTabItem.label : getTranslation(adminTranslations.adminPanel, editLang)}
              </h1>
              {isLoggedIn && (
                <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400" aria-live="polite">
                  <span className={`w-1.5 h-1.5 rounded-full ${saveStatus.dot}`} />
                  <span className="truncate">{saveStatus.text}</span>
                </p>
              )}
            </div>

            {isLoggedIn && (
              <>
                <button
                  onClick={handleDiscard}
                  disabled={!isDirty || isLoading || isSaving}
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-black/[0.08] bg-white/60 text-gray-700 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  title={tr ? 'Kaydedilmemiş değişiklikleri geri al' : 'Revert unsaved changes'}
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <RotateCcw size={16} />}
                  <span className="hidden lg:inline">{tr ? 'Geri Al' : 'Discard'}</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isDirty || isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-black text-white dark:bg-white dark:text-black shadow-lg hover:scale-[1.03] disabled:opacity-40 disabled:shadow-none disabled:pointer-events-none transition-all"
                  title={tr ? 'Kaydet (Ctrl+S)' : 'Save (Ctrl+S)'}
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" />
                    : saveError ? <AlertCircle size={16} /> : <Check size={16} />}
                  <span>{tr ? 'Kaydet' : 'Save'}</span>
                </button>
              </>
            )}

            {/* Edit language */}
            <div className="flex items-center p-1 rounded-full border border-black/[0.08] bg-white/60 dark:border-white/10 dark:bg-white/5" title={tr ? 'Düzenleme dili' : 'Editing language'}>
              {(['EN', 'TR'] as const).map(code => (
                <button
                  key={code}
                  onClick={() => setEditLang(code)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold font-mono transition-all ${
                    editLang === code
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={roundButton}
              aria-label={tr ? 'Temayı değiştir' : 'Toggle theme'}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button onClick={handleClose} className={roundButton} aria-label={tr ? 'Paneli kapat' : 'Close panel'}>
              <X size={16} />
            </button>
          </header>

          {/* Mobile tab bar */}
          {isLoggedIn && (
            <nav className="md:hidden flex gap-2 overflow-x-auto px-3 pt-3">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                    activeTab === tab.id
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'border-black/[0.08] bg-white/60 text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                  {tab.badge ? <span className="w-1.5 h-1.5 rounded-full bg-primary" /> : null}
                </button>
              ))}
            </nav>
          )}

          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            {!isLoggedIn ? (
              <div className="min-h-full flex items-center justify-center p-6">
                {isAuthLoading
                  ? <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  : <AdminLogin onLoginWithGoogle={loginWithGoogle} editLang={editLang} isLoading={isAuthLoading} />}
              </div>
            ) : activeTab === 'messages' ? (
              <div className="h-full p-3 md:p-6">{renderTabContent()}</div>
            ) : (
              <div key={activeTab} className="max-w-5xl mx-auto px-3 py-6 md:px-8 md:py-8">{renderTabContent()}</div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export const AdminPanel: React.FC = () => {
  const [editLang, setEditLang] = useState<'EN' | 'TR'>('EN');
  return (
    <ConfirmProvider lang={editLang}>
      <AdminPanelContent editLang={editLang} setEditLang={setEditLang} />
    </ConfirmProvider>
  );
};
