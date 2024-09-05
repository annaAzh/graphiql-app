import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAGVLcs2N-kQdAhga4JC3_PpsSALXiuIv0',
  authDomain: 'rest-graphiql.firebaseapp.com',
  projectId: 'rest-graphiql',
  storageBucket: 'rest-graphiql.appspot.com',
  messagingSenderId: '428336178307',
  appId: '1:428336178307:web:111e3f0343d2d93c1467b6',
  measurementId: 'G-D3CHN6PY5D',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
