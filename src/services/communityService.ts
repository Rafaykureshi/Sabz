import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  limit,
  Timestamp,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ForumPost {
  id?: string;
  userId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: Date;
}

interface Comment {
  id?: string;
  postId: string;
  userId: string;
  content: string;
  likes: number;
  createdAt: Date;
}

interface Event {
  id?: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  registered: number;
  organizer: string;
}

interface SuccessStory {
  id?: string;
  userId: string;
  title: string;
  content: string;
  images: string[];
  likes: number;
  createdAt: Date;
}

export const communityService = {
  // Forum posts
  async createPost(post: Omit<ForumPost, 'id' | 'likes' | 'comments'>) {
    const postsRef = collection(db, 'forum_posts');
    const newPost = {
      ...post,
      likes: 0,
      comments: 0,
      createdAt: Timestamp.fromDate(new Date())
    };
    
    const docRef = await addDoc(postsRef, newPost);
    return { id: docRef.id, ...newPost };
  },

  async getPosts(category?: string, tag?: string, limit = 10) {
    const postsRef = collection(db, 'forum_posts');
    let q = query(postsRef, orderBy('createdAt', 'desc'));
    
    if (category) {
      q = query(q, where('category', '==', category));
    }
    
    if (tag) {
      q = query(q, where('tags', 'array-contains', tag));
    }
    
    q = query(q, limit);
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Comments
  async addComment(comment: Omit<Comment, 'id' | 'likes'>) {
    const commentsRef = collection(db, 'comments');
    const newComment = {
      ...comment,
      likes: 0,
      createdAt: Timestamp.fromDate(new Date())
    };
    
    const docRef = await addDoc(commentsRef, newComment);
    
    // Update post comments count
    const postRef = doc(db, 'forum_posts', comment.postId);
    await updateDoc(postRef, {
      comments: increment(1)
    });
    
    return { id: docRef.id, ...newComment };
  },

  // Events
  async createEvent(event: Omit<Event, 'id' | 'registered'>) {
    const eventsRef = collection(db, 'events');
    const newEvent = {
      ...event,
      registered: 0,
      createdAt: Timestamp.fromDate(new Date())
    };
    
    const docRef = await addDoc(eventsRef, newEvent);
    return { id: docRef.id, ...newEvent };
  },

  async getUpcomingEvents(limit = 5) {
    const eventsRef = collection(db, 'events');
    const now = new Date();
    
    const q = query(
      eventsRef,
      where('date', '>=', now),
      orderBy('date'),
      limit
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Success Stories
  async shareSuccessStory(story: Omit<SuccessStory, 'id' | 'likes'>) {
    const storiesRef = collection(db, 'success_stories');
    const newStory = {
      ...story,
      likes: 0,
      createdAt: Timestamp.fromDate(new Date())
    };
    
    const docRef = await addDoc(storiesRef, newStory);
    return { id: docRef.id, ...newStory };
  },

  async getSuccessStories(limit = 10) {
    const storiesRef = collection(db, 'success_stories');
    const q = query(
      storiesRef,
      orderBy('createdAt', 'desc'),
      limit
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};