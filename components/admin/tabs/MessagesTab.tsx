import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { ContactMessage } from '../../../types';
import { 
  Mail, MailOpen, Star, Archive, Trash2, Reply, Send, 
  Inbox, StarIcon, ArchiveIcon, Clock, User, ArrowLeft,
  Search, MoreVertical, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Menu
} from 'lucide-react';

interface MessagesTabProps {
  theme: 'light' | 'dark';
}

type MailboxView = 'inbox' | 'starred' | 'archived' | 'all';

export const MessagesTab: React.FC<MessagesTabProps> = ({ theme }) => {
  const { 
    messages, markAsRead, toggleStar, archiveMessage, deleteMessage, addReply, unreadCount 
  } = useAdmin();
  
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [activeView, setActiveView] = useState<MailboxView>('inbox');
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [mailSidebarCollapsed, setMailSidebarCollapsed] = useState(false);
  const [messageListCollapsed, setMessageListCollapsed] = useState(false);

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
      return date.toLocaleDateString('tr-TR', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
    }
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
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

  // Handle reply
  const handleSendReply = () => {
    if (selectedMessage && replyText.trim()) {
      addReply(selectedMessage._id, replyText.trim());
      setReplyText('');
    }
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'inbox' as MailboxView, label: 'Gelen Kutusu', icon: Inbox, count: unreadCount },
    { id: 'starred' as MailboxView, label: 'Yıldızlı', icon: Star, count: messages.filter(m => m.isStarred && !m.isArchived).length },
    { id: 'archived' as MailboxView, label: 'Arşiv', icon: Archive, count: messages.filter(m => m.isArchived).length },
    { id: 'all' as MailboxView, label: 'Tümü', icon: Mail, count: messages.length },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex animate-fade-in-up">
      
      {/* Mail Sidebar */}
      <div className={`w-56 flex-shrink-0 border-r ${
        theme === 'dark' ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="p-4">
          <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Mesajlar
          </h3>
          
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveView(item.id); setSelectedMessage(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-primary/10 text-primary'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-primary text-black'
                        : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Message List */}
      <div className={`w-80 flex-shrink-0 border-r flex flex-col ${
        theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-white'
      }`}>
        {/* Search Bar */}
        <div className={`p-3 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <Search className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Mesajlarda ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 bg-transparent text-sm outline-none ${
                theme === 'dark' ? 'text-white placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-full p-6 text-center ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <Mail className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">Mesaj bulunamadı</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message._id}
                onClick={() => handleSelectMessage(message)}
                className={`p-4 border-b cursor-pointer transition-all ${
                  selectedMessage?._id === message._id
                    ? theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'
                    : theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                } ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    !message.isRead
                      ? 'bg-primary text-black'
                      : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {message.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm truncate ${
                        !message.isRead
                          ? theme === 'dark' ? 'text-white font-bold' : 'text-gray-900 font-bold'
                          : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {message.name}
                      </span>
                      <span className={`text-xs flex-shrink-0 ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    
                    <p className={`text-xs truncate mt-0.5 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {message.email}
                    </p>
                    
                    <p className={`text-sm truncate mt-1 ${
                      !message.isRead
                        ? theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {message.message}
                    </p>

                    {/* Status indicators */}
                    <div className="flex items-center gap-2 mt-2">
                      {message.isStarred && (
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      )}
                      {message.replies && message.replies.length > 0 && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                        }`}>
                          Yanıtlandı
                        </span>
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
      <div className={`flex-1 flex flex-col ${theme === 'dark' ? 'bg-gray-900/20' : 'bg-gray-50'}`}>
        {selectedMessage ? (
          <>
            {/* Message Header */}
            <div className={`p-4 border-b flex items-center justify-between ${
              theme === 'dark' ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className={`p-2 rounded-lg transition-colors md:hidden ${
                    theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-primary text-black`}>
                  {selectedMessage.name.charAt(0).toUpperCase()}
                </div>
                
                <div>
                  <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedMessage.name}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedMessage.email}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleStar(selectedMessage._id)}
                  className={`p-2 rounded-lg transition-colors ${
                    selectedMessage.isStarred
                      ? 'text-yellow-500'
                      : theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  title={selectedMessage.isStarred ? 'Yıldızı kaldır' : 'Yıldızla'}
                >
                  <Star className={`w-5 h-5 ${selectedMessage.isStarred ? 'fill-yellow-500' : ''}`} />
                </button>
                
                <button
                  onClick={() => archiveMessage(selectedMessage._id)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  title={selectedMessage.isArchived ? 'Arşivden çıkar' : 'Arşivle'}
                >
                  <Archive className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(selectedMessage._id)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? 'text-red-400 hover:bg-red-900/30' : 'text-red-500 hover:bg-red-50'
                  }`}
                  title="Sil"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Original Message */}
              <div className={`p-6 rounded-2xl mb-6 ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-white shadow-sm'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatFullDate(selectedMessage.createdAt)}
                  </span>
                </div>
                
                <p className={`text-base leading-relaxed whitespace-pre-wrap ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {selectedMessage.message}
                </p>
              </div>

              {/* Replies */}
              {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                <div className="space-y-4">
                  <h4 className={`text-sm font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    Yanıtlar
                  </h4>
                  
                  {selectedMessage.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className={`p-4 rounded-xl ml-8 border-l-4 border-primary ${
                        theme === 'dark' ? 'bg-primary/10' : 'bg-primary/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
                          Siz
                        </span>
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                          • {formatFullDate(reply.createdAt)}
                        </span>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reply Input */}
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'}`}>
              <div className={`flex items-start gap-3 p-3 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Reply className={`w-5 h-5 mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Yanıt yaz..."
                  rows={2}
                  className={`flex-1 bg-transparent resize-none outline-none text-sm ${
                    theme === 'dark' ? 'text-white placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-400'
                  }`}
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className={`p-2 rounded-lg transition-all ${
                    replyText.trim()
                      ? 'bg-primary text-black hover:opacity-80'
                      : theme === 'dark' ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                Not: Bu yanıt şu an sadece admin panelinde görünür. E-posta entegrasyonu sonra eklenecek.
              </p>
            </div>
          </>
        ) : (
          // No message selected
          <div className={`flex-1 flex flex-col items-center justify-center ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Mail className="w-10 h-10" />
            </div>
            <p className="text-lg font-medium mb-1">Mesaj seçin</p>
            <p className="text-sm">Okumak için bir mesaj seçin</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Mesajı Sil
            </h3>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Bu mesajı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                İptal
              </button>
              <button
                onClick={() => {
                  deleteMessage(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                  setSelectedMessage(null);
                }}
                className="flex-1 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
