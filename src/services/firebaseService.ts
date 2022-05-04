import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

type SendMessageFunc = (params: {
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  roomId: string;
  message: string;
}) => Promise<void>;

export class DatabaseService {
  createChannel = async (channelName?: string) => {
    if (!channelName) {
      throw new Error('Empty Channel Name.');
    }
    const colRef = collection(db, 'rooms');
    const docRef = await addDoc(colRef, {
      name: channelName,
    });
    return docRef;
  };
  sendMessage: SendMessageFunc = async ({ roomId, message, author }) => {
    const data = {
      content: message,
      timestamp: serverTimestamp(),
      author,
    };
    const col = collection(db, 'rooms', roomId, 'messages');
    await addDoc(col, data);
  };
}

const FirebaseService = new DatabaseService();
export default FirebaseService;
