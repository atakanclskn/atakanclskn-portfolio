import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { ContactMessage } from '../../../types';
import { 
  Mail, Star, Archive, Trash2, Inbox, Clock, Search, ChevronLeft, ChevronRight, Copy, ExternalLink
} from 'lucide-react';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';

interface MessagesTabProps {
  editLang: 'EN' | 'TR';
}

type MailboxView = 'inbox' | 'starred' | 'archived' | 'all';

export const MessagesTab: React.FC<MessagesTabProps> = ({ editLang }) => {
  const { 
    messages, markAsRead, toggleStar, archiveMessage, deleteMessage, unreadCount 
  } = useAdmin();
  
  const t = adminTranslations.messages;
  
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [activeView, setActiveView] = useState<MailboxView>('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [mailSidebarCollapsed, setMailSidebarCollapsed] = useState(false);

  // Filter messages based on view
  const getFilteredMessages = () => {
    let filtered = messages;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.message.toLowerCase().includes(query)
      );
    }

    // Apply view filter
    switch (activeView) {
      case 'inbox':
        return filtered.filter(m => !m.isArchived);
      case 'starred':
        return filtered.filter(m => m.isStarred && !m.isArchived);
      case 'archived':
        return filtered.filter(m => m.isArchived);
      case 'all':
      default:
        return filtered;
    }
  };

  const filteredMessages = getFilteredMessages();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Dün';
    } else if (diffDays < 7) {
      return date.toLocaleDateString(editLang === 'TR' ? 'tr-TR' : 'en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString(editLang === 'TR' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'short' });
    }
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(editLang === 'TR' ? 'tr-TR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle message selection
  const handleSelectMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message._id);
    }
  };

  // Copy email to clipboard
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'inbox' as MailboxView, label: getTranslation(t.inbox, editLang), icon: Inbox, count: unreadCount },
    { id: 'starred' as MailboxView, label: getTranslation(t.starred, editLang), icon: Star, count: messages.filter(m => m.isStarred && !m.isArchived).length },
    { id: 'archived' as MailboxView, label: getTranslation(t.archived, editLang), icon: Archive, count: messages.filter(m => m.isArchived).length },
    { id: 'all' as MailboxView, label: getTranslation(t.all, editLang), icon: Mail, count: messages.length },
  ];

  return (
    <div className={`h-full min-h-[480px] flex animate-fade-in-up rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/10`}>
      
      {/* Mail Sidebar - Collapsible */}
      <div className={`${mailSidebarCollapsed ? 'w-14' : 'w-48'} flex-shrink-0 border-r transition-all duration-300 border-black/[0.08] bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]`}>
        <div className="p-2">
          {/* Collapse Toggle */}
          <button
            onClick={() => setMailSidebarCollapsed(!mailSidebarCollapsed)}
            className={`w-full flex items-center justify-center p-2 mb-2 rounded-xl transition-colors hover:bg-black/[0.06] text-gray-500 hover:text-gray-900 dark:hover:bg-white/[0.06] dark:text-gray-400 dark:hover:text-white`}
            title={mailSidebarCollapsed ? (editLang === 'TR' ? 'Genişlet' : 'Expand') : (editLang === 'TR' ? 'Daralt' : 'Collapse')}
          >
            {mailSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {!mailSidebarCollapsed && (
            <h3 className={`text-lg font-display font-bold mb-4 px-2 text-gray-900 dark:text-white`}>
              {getTranslation(t.title, editLang)}
            </h3>
          )}
          
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveView(item.id); setSelectedMessage(null); }}
                  title={mailSidebarCollapsed ? item.label : undefined}
                  className={`relative w-full flex items-center ${mailSidebarCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-gray-600 hover:bg-black/[0.06] hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${mailSidebarCollapsed ? '' : 'gap-3'}`}>
                    <Icon className="w-4 h-4" />
                    {!mailSidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {item.count > 0 && !mailSidebarCollapsed && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-gray-300 text-gray-600 dark:bg-white/10 dark:text-gray-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                  {item.count > 0 && mailSidebarCollapsed && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Message List */}
      <div className={`w-72 lg:w-80 flex-shrink-0 border-r flex flex-col transition-all duration-300 border-black/[0.08] bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]`}>
        {/* Search Bar */}
        <div className={`p-3 border-b border-black/[0.08] dark:border-white/10`}>
          <div className="flex items-center gap-2">
            <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06]`}>
              <Search className={`w-4 h-4 text-gray-400 dark:text-gray-500`} />
              <input
                type="text"
                placeholder={getTranslation(t.search, editLang)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500`}
              />
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-full p-6 text-center text-gray-400 dark:text-gray-500`}>
              <Mail className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">{getTranslation(t.noMessages, editLang)}</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message._id}
                onClick={() => handleSelectMessage(message)}
                className={`p-4 border-b cursor-pointer transition-all ${
                  selectedMessage?._id === message._id
                    ? 'bg-blue-50 dark:bg-white/[0.06]'
                    : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.06]'
                } border-black/[0.05] dark:border-white/10`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    !message.isRead
                      ? 'bg-primary text-white'
                      : 'bg-black/[0.06] text-gray-600 dark:bg-white/10 dark:text-gray-300'
                  }`}>
                    {message.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm truncate ${
                        !message.isRead
                          ? 'text-gray-900 font-bold dark:text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {message.name}
                      </span>
                      <span className={`text-xs flex-shrink-0 text-gray-400 dark:text-gray-500`}>
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    
                    <p className={`text-xs truncate mt-0.5 text-gray-500`}>
                      {message.email}
                    </p>
                    
                    <p className={`text-sm truncate mt-1 ${
                      !message.isRead
                        ? 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-500'
                    }`}>
                      {message.message}
                    </p>

                    {/* Status indicators */}
                    <div className="flex items-center gap-2 mt-2">
                      {message.isStarred && (
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      )}
                      {!message.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Detail / Preview */}
      <div className={`flex-1 flex flex-col min-w-0 bg-white/60 backdrop-blur-xl dark:bg-white/[0.02]`}>
        {selectedMessage ? (
          <>
            {/* Message Header */}
            <div className={`p-4 border-b flex items-center justify-between border-black/[0.08] bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]`}>
              <div className="flex items-center gap-3">
                
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-display font-bold bg-primary text-white`}>
                  {selectedMessage.name.charAt(0).toUpperCase()}
                </div>
                
                <div>
                  <h3 className={`font-bold text-gray-900 dark:text-white`}>
                    {selectedMessage.name}
                  </h3>
                  <p className={`text-sm text-gray-500 dark:text-gray-400`}>
                    {selectedMessage.email}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleStar(selectedMessage._id)}
                  className={`p-2 rounded-xl transition-colors ${
                    selectedMessage.isStarred
                      ? 'text-yellow-500'
                      : 'text-gray-500 hover:bg-black/[0.04] dark:text-gray-400 dark:hover:bg-white/[0.06]'
                  }`}
                  title={selectedMessage.isStarred ? getTranslation(t.unstar, editLang) : getTranslation(t.star, editLang)}
                >
                  <Star className={`w-5 h-5 ${selectedMessage.isStarred ? 'fill-yellow-500' : ''}`} />
                </button>
                
                <button
                  onClick={() => archiveMessage(selectedMessage._id)}
                  className={`p-2 rounded-xl transition-colors text-gray-500 hover:bg-black/[0.04] dark:text-gray-400 dark:hover:bg-white/[0.06]`}
                  title={selectedMessage.isArchived ? getTranslation(t.unarchive, editLang) : getTranslation(t.archive, editLang)}
                >
                  <Archive className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(selectedMessage._id)}
                  className={`p-2 rounded-xl transition-colors text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30`}
                  title={getTranslation(adminTranslations.actions.delete, editLang)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Contact Info Card */}
              <div className={`p-4 rounded-xl mb-6 bg-white/70 shadow-sm dark:bg-white/[0.05]`}>
                <h4 className={`text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300`}>
                  {getTranslation(t.contactInfo, editLang)}
                </h4>
                <div className="flex items-center gap-2">
                  <span className={`text-sm text-gray-500 dark:text-gray-400`}>
                    {selectedMessage.email}
                  </span>
                  <button
                    onClick={() => copyEmail(selectedMessage.email)}
                    className={`p-1.5 rounded-xl transition-colors hover:bg-black/[0.04] text-gray-400 dark:hover:bg-white/10 dark:text-gray-500`}
                    title={getTranslation(t.copyEmail, editLang)}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className={`p-1.5 rounded-xl transition-colors hover:bg-black/[0.04] text-gray-400 dark:hover:bg-white/10 dark:text-gray-500`}
                    title={getTranslation(t.sendEmail, editLang)}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div className={`p-6 rounded-2xl bg-white/70 shadow-sm dark:bg-white/[0.05]`}>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className={`w-4 h-4 text-gray-400 dark:text-gray-500`} />
                  <span className={`text-sm text-gray-500 dark:text-gray-400`}>
                    {formatFullDate(selectedMessage.createdAt)}
                  </span>
                </div>
                
                <p className={`text-base leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-200`}>
                  {selectedMessage.message}
                </p>
              </div>
            </div>
          </>
        ) : (
          // No message selected
          <div className={`flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-black/[0.04] dark:bg-white/[0.06]`}>
              <Mail className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium mb-1">{getTranslation(t.selectMessage, editLang)}</p>
            <p className="text-sm">{getTranslation(t.selectToRead, editLang)}</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 bg-white/70 backdrop-blur-xl dark:bg-white/[0.04]`}>
            <h3 className={`text-lg font-display font-bold mb-2 text-gray-900 dark:text-white`}>
              {getTranslation(t.deleteMessage, editLang)}
            </h3>
            <p className={`text-sm mb-6 text-gray-600 dark:text-gray-400`}>
              {getTranslation(t.deleteConfirm, editLang)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className={`flex-1 py-2 rounded-xl font-medium transition-colors bg-black/[0.04] text-gray-700 hover:bg-black/[0.06] dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/10`}
              >
                {getTranslation(adminTranslations.actions.cancel, editLang)}
              </button>
              <button
                onClick={() => {
                  deleteMessage(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                  setSelectedMessage(null);
                }}
                className="flex-1 py-2 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                {getTranslation(adminTranslations.actions.delete, editLang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
