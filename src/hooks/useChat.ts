import { useState, useEffect } from 'react';
import { Message, chatService } from '../services/chatService';

export const useChat = (receiverId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      if (message.senderId === receiverId || message.receiverId === receiverId) {
        setMessages(prev => [...prev, message]);
      }
    };

    const handleMessageRead = (messageId: string) => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    };

    const unsubscribeNewMessage = chatService.onNewMessage(handleNewMessage);
    const unsubscribeMessageRead = chatService.onMessageRead(handleMessageRead);

    return () => {
      unsubscribeNewMessage();
      unsubscribeMessageRead();
    };
  }, [receiverId]);

  const sendMessage = (content: string) => {
    try {
      const message = chatService.sendMessage(receiverId, content);
      setMessages(prev => [...prev, message]);
      return message;
    } catch (error) {
      setError('Failed to send message');
      throw error;
    }
  };

  const markAsRead = (messageId: string) => {
    try {
      chatService.markAsRead(messageId);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    } catch (error) {
      setError('Failed to mark message as read');
      throw error;
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    markAsRead
  };
};