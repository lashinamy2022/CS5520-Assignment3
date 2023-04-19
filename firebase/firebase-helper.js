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
  getDocs,
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
    await setDoc(doc(firestore, "itinerary", itineraryID), itinerary, {
      merge: true,
    });
    
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
    const startDate = await getFirstDateInIntinerary(itineraryID);
    await updateStartDate(itineraryID, startDate);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log("writeItineraryItemToDB", err);
  }
}

export async function getFirstDateInIntinerary(itineraryID) {
  try {
    const q = query(collection(firestore, "itinerary", itineraryID, "items"));
    const querySnapshot = await getDocs(q);
    let startDate = null;
    querySnapshot.forEach((doc) => {
      if (!startDate) {
        startDate = doc.data().time;
      } else {
        if (doc.data().time < startDate) {
          startDate = doc.data().time;
        }
      }
    });
    return startDate;
  } catch (err) {
    console.log("getFirstDateInIntinerary", err);
  }
}

export async function updateStartDate(itineraryID, startDate) {
  try {
    const docRef = doc(firestore, "itinerary", itineraryID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && (!docSnap.data().startDate)) {
      await setDoc(
        doc(firestore, "itinerary", itineraryID),
        {
          startDate: startDate,
        },
        {
          merge: true,
        }
      );
    }
  } catch (err) {
    console.log("updateStartDate", err);
  }
}

export async function getStartDate(itineraryID) {
  try {
    const docRef = doc(firestore, "itinerary", itineraryID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().startDate) {
      return docSnap.data().startDate;
    }
    return "";
  } catch (err) {
    console.log("getStartDate", err);
  }
}

export async function getNotificationID(itineraryID) {
  try {
    const docRef = doc(firestore, "itinerary", itineraryID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().notificationID) {
      return docSnap.data().notificationID;
    }
    return "";
  } catch (err) {
    console.log("getNotificationID", err);
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
    const startDate = await getFirstDateInIntinerary(itineraryID);
    await updateStartDate(itineraryID, startDate);
  } catch (err) {
    console.log("editItineraryItemToDB", err);
  }
}

export async function deleteItineraryItemById(itineraryID, itineraryItemID) {
  try {
    await deleteDoc(
      doc(firestore, "itinerary", itineraryID, "items", itineraryItemID)
    );
    const startDate = await getFirstDateInIntinerary(itineraryID);
    await updateStartDate(itineraryID, startDate);
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

export async function saveUserDiary(data) {
  try {
    await setDoc(doc(firestore, "userDiary", auth.currentUser.uid), data, {
      merge: true,
    });
  } catch (err) {
    console.log("saveUserDiary", err);
  }
}

export async function saveDiaryUser(diaryId, data) {
  try {
    await setDoc(doc(firestore, "diaryUser", diaryId), data, {
      merge: true,
    });
  } catch (err) {
    console.log("saveDiaryUser", err);
  }
}

export async function saveCollection(diaryId, flag) {
  try {
    await saveUserDiary({ [diaryId]: flag });
    await saveDiaryUser(diaryId, { [auth.currentUser.uid]: flag });
  } catch (err) {
    console.log("saveCollection", err);
  }
}

export async function hasCollected(diaryId) {
  try {
    const docRef = doc(firestore, "userDiary", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data()[diaryId]) {
      return docSnap.data()[diaryId];
    }
    return false;
  } catch (err) {
    console.log("getUserInfo", err);
  }
}

export async function diaryCollectionCount(diaryId) {
  let count = 0;
  try {
    const docRef = doc(firestore, "diaryUser", diaryId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      let keys = Object.keys(data);
      keys.forEach((key) => {
        if (data[key]) {
          count++;
        }
      });
    }
    return count;
  } catch (err) {
    console.log("diaryCollectionCount", err);
  }
}

export async function getCollectedDiaryId() {
  const diaryIdList = [];
  try {
    const docRef = doc(firestore, "userDiary", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      let keys = Object.keys(data);
      keys.forEach((key) => {
        if (data[key]) {
          diaryIdList.push(key);
        }
      });
    }
    return diaryIdList;
  } catch (err) {
    console.log("getCollectedDiaryId", err);
  }
}

export async function getDiaryById(diaryId) {
  try {
    const docRef = doc(firestore, "travelDiary", diaryId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (err) {
    console.log("getDiaryById", err);
  }
}
