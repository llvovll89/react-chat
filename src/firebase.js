import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'chatpp-3efa0.firebaseapp.com',
  projectId: 'chatpp-3efa0',
  storageBucket: 'chatpp-3efa0.appspot.com',
  messagingSenderId: '668493672397',
  appId: '1:668493672397:web:8bdd60a0409d1139985e84',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();