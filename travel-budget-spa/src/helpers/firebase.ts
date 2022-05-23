import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { collection, CollectionReference, DocumentData, Firestore } from "firebase/firestore";
import { firebaseConfig } from '../firebaseSetup'

const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);

export const getCollection = <T = DocumentData>(db: Firestore, collectionName: string) => {
  // eslint-disable-next-line prettier/prettier
  return collection(db, collectionName) as CollectionReference<T>
};
