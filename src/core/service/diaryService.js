import {
  collection,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";

const diariesDB = collection(db, "diaries");

const createDiary = async (uid, userUid, userEmail, userName, userUrl, title, urlImage,  content, statusMood) => {
  try {
    await setDoc(doc(db, 'diaries', uid), {userUid, userEmail, userName, userUrl, title, urlImage, content, statusMood})
    toast.success("Create diary successsssssssss ^-^");
    const docSnap = await getDoc(doc(db, 'diaries', uid));
    if (docSnap.exists()) {
      return docSnap;
    }
  } catch (error) {
    console.log(error);
    toast.error("Create diary errorrrrrrr :(((");
  }
};

const updateDiary = async (uid, dataUpdate) => {
  try {
    const snap = doc(db, "diaries", uid);
    await updateDoc(snap, dataUpdate);
    toast.success("Update diary successsssssssss ^-^");
    const docSnapUpdate =  await getDoc(snap);
    if (docSnapUpdate.exists()) {
      return docSnapUpdate;
    }
  } catch (error) {
    console.log(error);
    toast.error("Update diary errorrrrrrr :(((");
  }
};

const getDiaries = async (userEmail) => {
  try {
    const q = query(diariesDB, where("userEmail", "==", userEmail));
    const diaries = await getDocs(q);
    if (diaries.docs.length > 0) {
      return diaries.docs;
    }
  } catch (error) {
    console.log(error);
  }
};

const getDiary = async (uid) => {
  try {
    const docSnap = await getDoc(doc(db, 'diaries', uid));
    if(docSnap.exists()) {
      return docSnap;
    }
  } catch (error) {
    console.log(error);
  }
}

const deleteDiary = async (uid) => {
  try {
    await deleteDoc(doc(db, 'diaries', uid)); 
    toast.success("Delete diary successsssssssss ^-^");
  } catch (error) {
    console.log(error);
    toast.error("Delete diary errorrrrrrr :(((");
  }
}

export { createDiary, updateDiary, getDiaries, getDiary, deleteDiary };
