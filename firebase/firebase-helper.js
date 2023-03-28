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
export async function writeTravelDiaryToDB(diary) {
  //replace db with the firestore variable exported in firebase-setup
  try {
    const docRef = await addDoc(collection(firestore, "travelDiary"), diary);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log("writeTravelDiaryToDB", err);
  }
}

export function queryTravelDiary(articleStatus) {
  const q =  query(collection(firestore, "travelDiary"),  where("articleStatus", "==", articleStatus), orderBy("createAt", "desc"));

}

export async function deleteTravelDiary(deletedId) {
  try {
    await deleteDoc(doc(firestore, "travelDiary", deletedId));
  } catch (err) {
    console.log("deleteTravelDiary",err);
  }
}


export async function updateTravelDiaryById(updatedId, updatedData) {
  try {
    await updateDoc(doc(firestore, "travelDiary", updatedId), {...updatedData, updateAt: new Date()});
  } catch (err) {
    console.log("updateTravelDiaryById",err);
  }
}