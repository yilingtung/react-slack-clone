import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export class DatabaseService {
  createChannel = async (channelName?: string) => {
    if (!channelName) {
      throw new Error('Empty Channel Name.');
    }
    const col = collection(db, 'rooms');
    const docRef = await addDoc(col, {
      name: channelName,
    });
    return docRef;
  };
}

const FirebaseService = new DatabaseService();
export default FirebaseService;
