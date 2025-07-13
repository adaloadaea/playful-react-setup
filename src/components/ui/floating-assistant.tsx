import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, User, Bot, Camera } from 'lucide-react';
import { Button } from './button';
import { Dialog, DialogContent } from './dialog';
import { Input } from './input';
import { Label } from './label';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface Message {
  text: string;
  isUser: boolean;
  imageUrl?: string;
  imageName?: string;
}

interface FloatingAssistantProps {
  onClose?: () => void;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [agentsOnline, setAgentsOnline] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [userInfoCollected, setUserInfoCollected] = useState(false);
  const [isPollingMessages, setIsPollingMessages] = useState(false);
  const [tempSessionId, setTempSessionId] = useState<string>('');
  const [hasInitialGreeting, setHasInitialGreeting] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagePollingRef = useRef<NodeJS.Timeout | null>(null);
  
  // Notification sound using Web Audio API
  const playNotificationSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  }, []);

  // Check agent status
  const checkAgentStatus = useCallback(async () => {
    try {
      const response = await fetch('https://draminesaid.com/lucci/api/agent_status.php', {
        method: 'GET',
        headers: { 
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Agent status response:', data); // Debug log
        if (data.success && data.status) {
          const isOnline = data.status.is_online === '1' || data.status.is_online === 1 || data.status.is_online === true;
          setAgentsOnline(isOnline);
          console.log('Agent online status:', isOnline); // Debug log
        }
      } else {
        console.error('Agent status API response not ok:', response.status, response.statusText);
        setAgentsOnline(false);
      }
    } catch (error) {
      console.error('Error checking agent status:', error);
      setAgentsOnline(false);
    }
  }, []);

  // Initial setup
  useEffect(() => {
    // Generate session IDs
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setTempSessionId(tempId);
    
    // Show assistant after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check agent status periodically
  useEffect(() => {
    checkAgentStatus();
    const interval = setInterval(checkAgentStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [checkAgentStatus]);
  
  // Start polling for new messages
  const startMessagePolling = useCallback(() => {
    if (isPollingMessages) return;
    
    setIsPollingMessages(true);
    console.log('Starting message polling for session:', sessionId);
    
    messagePollingRef.current = setInterval(async () => {
      try {
        if (!sessionId) return;
        
        const response = await fetch(`https://draminesaid.com/lucci/api/chat_messages.php?session_id=${sessionId}`, {
          method: 'GET',
          headers: { 'Cache-Control': 'no-cache' }
        });
        const data = await response.json();
        
        if (data.success && data.messages?.length > 0) {
          const agentMessages = data.messages.filter((msg: any) => msg.sender_type === 'agent');
          
          if (agentMessages.length > 0) {
            setMessages(prev => {
              const newMessages = agentMessages.filter((msg: any) => 
                !prev.some(existingMsg => existingMsg.text === msg.message_content)
              );
              
              if (newMessages.length === 0) return prev;
              
              console.log('New messages received:', newMessages.length);
              
              // Always play notification sound for new messages
              playNotificationSound();
              
              // Increment unread count if chat is closed
              if (!isOpen) {
                setUnreadCount(prevCount => {
                  const newCount = prevCount + newMessages.length;
                  console.log('Unread count updated:', newCount);
                  return newCount;
                });
              }
              
              return [...prev, ...newMessages.map((msg: any) => ({
                text: msg.message_content,
                isUser: false,
                imageUrl: msg.image_url ? `https://draminesaid.com/lucci/${msg.image_url}` : undefined,
                imageName: msg.image_name
              }))];
            });
          }
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    }, 2000); // Check every 2 seconds for faster response
  }, [sessionId, isPollingMessages, playNotificationSound, isOpen]);

  const stopMessagePolling = useCallback(() => {
    if (messagePollingRef.current) {
      clearInterval(messagePollingRef.current);
      messagePollingRef.current = null;
    }
    setIsPollingMessages(false);
  }, []);
   
  // Clear unread count when chat is opened
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      setUnreadCount(0);
    }
  }, [isOpen, unreadCount]);

  // Start polling when session is created
  useEffect(() => {
    if (sessionId && userInfoCollected && !isPollingMessages) {
      console.log('Session created, starting polling immediately:', sessionId);
      startMessagePolling();
    }
  }, [sessionId, userInfoCollected, isPollingMessages, startMessagePolling]);

  // Store initial message before contact form
  const storeInitialMessage = async (messageContent: string, messageType: string = 'text') => {
    try {
      await fetch('https://draminesaid.com/lucci/api/store_initial_message.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temp_session_id: tempSessionId,
          message_content: messageContent,
          message_type: messageType
        }),
      });
    } catch (error) {
      console.error('Error storing initial message:', error);
    }
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleContactFormChange = useCallback((field: keyof typeof contactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSendMessage = useCallback(() => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    
    setMessage('');
    setMessages(prev => [...prev, { text: trimmedMessage, isUser: true }]);

    // Show contact form if user info not collected
    if (!userInfoCollected && !showContactForm) {
      storeInitialMessage(trimmedMessage, 'text');
      
      setTimeout(() => {
        setShowContactForm(true);
        setMessages(prev => [...prev, {
          text: "Pour mieux vous aider, pouvez-vous nous donner vos coordonnées ?",
          isUser: false
        }]);
      }, 1000);
      return;
    }

    // Send to chat system if user info collected
    if (userInfoCollected && sessionId) {
      fetch('https://draminesaid.com/lucci/api/chat_messages.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          sender_type: 'client',
          sender_name: contactForm.name,
          message_content: trimmedMessage,
          message_type: 'text'
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success && !isPollingMessages) {
          startMessagePolling();
        }
      })
      .catch(error => console.error('Error sending message:', error));
    }
  }, [message, userInfoCollected, showContactForm, sessionId, contactForm.name, isPollingMessages, startMessagePolling, storeInitialMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleContactSubmit = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.phone) return;
    
    try {
      const sessionResponse = await fetch('https://draminesaid.com/lucci/api/chat_sessions.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          client_name: contactForm.name,
          client_email: contactForm.email,
          client_phone: contactForm.phone
        }),
      });
      
      const sessionData = await sessionResponse.json();
      
      if (sessionData.success) {
        setSessionId(sessionData.session_id);
        setUserInfoCollected(true);
        setShowContactForm(false);
        
        // Transfer temporary messages
        if (tempSessionId) {
          await fetch('https://draminesaid.com/lucci/api/transfer_temp_messages.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              temp_session_id: tempSessionId,
              real_session_id: sessionData.session_id,
              client_name: contactForm.name
            }),
          });
        }
        
        startMessagePolling();
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: `Merci ${contactForm.name} ! Comment puis-je vous aider aujourd'hui ?`,
            isUser: false
          }]);
        }, 1000);
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMessagePolling();
    };
  }, [stopMessagePolling]);

  if (!isVisible) return null;

  const ChatContent = () => (
    <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm">
      <div className="bg-gradient-to-r from-primary via-accent to-primary p-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center ring-2 ring-white/30">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-white font-semibold block">Assistant Luxe</span>
            <span className="text-white/80 text-xs">{agentsOnline ? 'En ligne' : 'Hors ligne'}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 h-8 w-8 p-0 relative z-10">
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="h-64 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/30">
        {messages.map((msg, index) => (
          <div key={index} className={cn("flex gap-2 items-start", msg.isUser ? "flex-row-reverse" : "flex-row")}>
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", msg.isUser ? "bg-primary text-primary-foreground" : "bg-gradient-to-r from-accent to-primary text-white")}>
              {msg.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
           <div className={cn("max-w-[75%] rounded-2xl text-sm shadow-sm", msg.isUser ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-white text-foreground border border-border rounded-tl-sm")}>
              {msg.imageUrl ? (
                <div className="p-2">
                  <img 
                    src={msg.imageUrl} 
                    alt={msg.imageName || "Image partagée"} 
                    className="max-w-full max-h-48 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(msg.imageUrl, '_blank')}
                    loading="lazy"
                  />
                  {msg.text && <p className="mt-2 p-2">{msg.text}</p>}
                </div>
              ) : (
                <div className="p-3">{msg.text}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {showContactForm && (
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-xs font-medium">Nom complet</Label>
              <Input
                id="name"
                value={contactForm.name}
                onChange={(e) => handleContactFormChange('name', e.target.value)}
                placeholder="Votre nom complet"
                className="mt-1 h-8 text-xs"
                autoComplete="off"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={contactForm.email}
                onChange={(e) => handleContactFormChange('email', e.target.value)}
                placeholder="votre@email.com"
                className="mt-1 h-8 text-xs"
                autoComplete="off"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-xs font-medium">Téléphone</Label>
              <Input
                id="phone"
                value={contactForm.phone}
                onChange={(e) => handleContactFormChange('phone', e.target.value)}
                placeholder="Votre numéro de téléphone"
                className="mt-1 h-8 text-xs"
                autoComplete="off"
              />
            </div>
            <Button 
              onClick={handleContactSubmit} 
              className="w-full h-8 text-xs bg-gradient-to-r from-primary to-accent"
              disabled={!contactForm.name || !contactForm.email || !contactForm.phone}
            >
              Envoyer
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Tapez votre message..."
              className="w-full h-12 px-4 py-3 rounded-full border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-input transition-all duration-200"
              autoComplete="off"
            />
          </div>
          
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg disabled:shadow-none"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isMobile && (
        <div className="fixed bottom-6 right-6 z-50">
          {isOpen ? (
            <div className="w-80">
              <ChatContent />
            </div>
          ) : (
            <Button 
              onClick={() => setIsOpen(true)} 
              size="lg" 
              className="rounded-full w-16 h-16 bg-gradient-to-r from-primary via-accent to-primary shadow-xl ring-4 ring-primary/20"
            >
              <div className="relative">
                <User className="w-6 h-6" />
                {/* Online status indicator - top right */}
                <div className={cn(
                  "absolute -top-2 -right-2 w-3 h-3 rounded-full border-2 border-white",
                  agentsOnline ? "bg-green-400 animate-pulse" : "bg-red-400"
                )}></div>
                {/* Unread message badge - top left */}
                {unreadCount > 0 && (
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold border-2 border-white animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </div>
                )}
              </div>
            </Button>
          )}
        </div>
      )}

      {isMobile && (
        <div className="fixed bottom-6 right-6 z-50">
          {isOpen ? (
            <div className="w-72">
              <ChatContent />
            </div>
          ) : (
            <Button 
              onClick={() => setIsOpen(true)} 
              size="lg" 
              className="rounded-full w-14 h-14 bg-gradient-to-r from-primary via-accent to-primary shadow-xl ring-4 ring-primary/20"
            >
              <div className="relative">
                <User className="w-5 h-5" />
                {/* Online status indicator - top right */}
                <div className={cn(
                  "absolute -top-1 -right-1 w-2 h-2 rounded-full border border-white",
                  agentsOnline ? "bg-green-400 animate-pulse" : "bg-red-400"
                )}></div>
                {/* Unread message badge - top left */}
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold border border-white animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </div>
                )}
              </div>
            </Button>
          )}
        </div>
      )}
    </>
  );
};