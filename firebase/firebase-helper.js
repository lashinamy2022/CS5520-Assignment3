import {
  collection,
  doc,
  addDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firestore, auth, updateProfile } from "./firebase-setup";

export async function saveUserInfo(user) {
  try {
    await setDoc(doc(firestore, "users", auth.currentUser.uid), user, {
      merge: true,
    });
  } catch (err) {
    console.log("saveUserInfo", err);
  }
}

// Add a new document with a generated id.
export async function writeTravelDiaryToDB(diary) {
  diary = {
    ...diary,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: auth.currentUser.uid,
  };
  //replace db with the firestore variable exported in firebase-setup
  try {
    const docRef = await addDoc(collection(firestore, "travelDiary"), diary);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log("writeTravelDiaryToDB", err);
  }
}

export async function deleteTravelDiary(deletedId) {
  try {
    await deleteDoc(doc(firestore, "travelDiary", deletedId));
  } catch (err) {
    console.log("deleteTravelDiary", err);
  }
}

export async function updateTravelDiaryById(updatedId, updatedData) {
  try {
    await updateDoc(doc(firestore, "travelDiary", updatedId), {
      ...updatedData,
      updateAt: new Date(),
    });
  } catch (err) {
    console.log("updateTravelDiaryById", err);
  }
}

export async function writeItineraryToDB(itinerary) {
  itinerary = {
    ...itinerary,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: auth.currentUser.uid,
  };
  try {
    const docRef = await addDoc(collection(firestore, "itinerary"), itinerary);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (err) {
    console.log("writeItineraryToDB", err);
  }
}

export async function editItineraryToDB(itineraryID, itinerary) {
  itinerary = { ...itinerary, updatedAt: new Date() };
  try {
    await updateDoc(doc(firestore, "itinerary", itineraryID), itinerary);
    return itineraryID;
  } catch (err) {
    console.log("editItineraryToDB", err);
  }
}

export async function writeItineraryItemToDB(itineraryID, item) {
  item = { ...item, createdAt: new Date(), updatedAt: new Date() };
  try {
    const docRef = await addDoc(
      collection(firestore, "itinerary", itineraryID, "items"),
      item
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log("writeItineraryItemToDB", err);
  }
}

export async function editItineraryItemToDB(
  itineraryID,
  itineraryItemID,
  item
) {
  item = { ...item, updatedAt: new Date() };
  try {
    await updateDoc(
      doc(firestore, "itinerary", itineraryID, "items", itineraryItemID),
      item
    );
  } catch (err) {
    console.log("editItineraryItemToDB", err);
  }
}

export async function deleteItineraryItemById(itineraryID, itineraryItemID) {
  try {
    await deleteDoc(
      doc(firestore, "itinerary", itineraryID, "items", itineraryItemID)
    );
  } catch (err) {
    console.log("deleteItineraryItemById", err);
  }
}

export async function writeCollectionToDB(diaryID) {
  const collection = {
    diaryID,
    createdAt: new Date(),
    user: auth.currentUser.uid,
  };
  //replace db with the firestore variable exported in firebase-setup
  try {
    const docRef = await addDoc(
      collection(firestore, "collection"),
      collection
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log("writeCollectionToDB", err);
  }
}

export async function deleteItinerary(itineraryID) {
  try {
    await deleteDoc(doc(firestore, "itinerary", itineraryID));
  } catch (err) {
    console.log("deleteItinerary", err);
  }
}

export async function hasUserInfo() {
  try {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (err) {
    console.log("hasUserInfo", err);
  }
}

export async function getCurrentUserInfo() {
  try {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (err) {
    console.log("getCurrentUserInfo", err);
  }
}

export async function getUserInfo(userId) {
  try {
    const docRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (err) {
    console.log("getUserInfo", err);
  }
}



