import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from './firebaseConfig';
import { getErrorMessage } from 'shared/lib/dataConverters';

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User | string> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    updateProfile(user, {
      displayName: name,
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
