import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyBWPOYg0kUED5ZoTUYJ7EhCHvBZlTaNQLQ',
  authDomain: 'asotronomy-app.firebaseapp.com',
  projectId: 'asotronomy-app',
  storageBucket: 'asotronomy-app.appspot.com',
  messagingSenderId: '198897303608',
  appId: '1:198897303608:web:51103de2bf1f31c463e6cd',
  measurementId: 'G-FEPDTKY1HE',
};

export const collection_list = [
  'astrology',
  'aurora',
  // 'binarystar',
  // 'blackhole',
  'darkmatter',
  // 'dwarf',
  // 'eclipse',
  'galaxy',
  'meteor',
  'meteorite',
  'planet',
];

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
