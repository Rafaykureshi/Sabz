import { socket } from '../lib/socket';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export const chatService = {
  sendMessage: (receiverId: string, content: string) => {
    const message: Message = {
      id: uuidv4(),
      senderId: socket.auth.userId as string,
      receiverId,
      content,
      timestamp: new Date(),
      read: false
    };

    socket.emit('send_message', message);
    return message;
  },

  markAsRead: (messageId: string) => {
    socket.emit('mark_as_read', messageId);
  },

  onNewMessage: (callback: (message: Message) => void) => {
    socket.on('new_message', callback);
    return () => socket.off('new_message', callback);
  },

  onMessageRead: (callback: (messageId: string) => void) => {
    socket.on('message_read', callback);
    return () => socket.off('message_read', callback);
  }
};