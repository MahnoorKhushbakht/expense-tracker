import { initializeApp, getApps, getApp } from 'firebase/app';
import conf from '@/conf/conf';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: conf.apiKey,
  authDomain: conf.authDomain,
  projectId: conf.projectId,
  storageBucket: conf.storageBucket,
  messagingSenderId: conf.messagingSenderId,
  appId: conf.appId,
  measurementId: conf.measurementId,
};

// if(!getApps().length) {
//   initializeApp(firebaseConfig);
// }

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)