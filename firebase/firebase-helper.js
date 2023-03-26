import {
  collection,
  doc,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { firestore, auth } from "./firebase-setup";
//
// Add a new document with a generated id.
export async function writeToDB(diary) {
  //replace db with the firestore variable exported in firebase-setup
  try {
    const docRef = await addDoc(collection(firestore, "travelDiary"), diary);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}
