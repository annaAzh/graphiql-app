import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { getErrorMessage } from 'shared/lib/dataConverters';

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User | string> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, ' users'), {
      uid: user.uid,
      name,
      authProvider: ' local',
      email,
    });
    return user;
  } catch (e) {
    const err = e as Error;
    const respError: string = getErrorMessage(err.message);
    return respError;
  }
};

export const logInUser = async (
  email: string,
  password: string
): Promise<User | string> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    return user;
  } catch (e) {
    const err = e as Error;
    const respError: string = getErrorMessage(err.message);
    return respError;
  }
};

export const logoutUser = () => {
  signOut(auth);
};
