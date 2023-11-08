import { storage, db } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const uploadAvatar = async (uri, directory) => {
  const res = await fetch(uri);
  const blob = await res.blob();

  const imgRef = ref(storage, `${directory}/` + new Date().getTime());
  await uploadBytesResumable(imgRef, blob);

  const savedPhotoURL = await getDownloadURL(imgRef);
  return savedPhotoURL;
};

export const uploadDataToDB = async (collectionName, data) => {
  const newCollectionRef = collection(db, collectionName);
  const createdDoc = await addDoc(newCollectionRef, data);

  return createdDoc;
};

export const getAllCollection = async (collectionName, dataSetFunc) => {
  try {
    const collectionRef = collection(db, collectionName);
    const subscription = onSnapshot(collectionRef, (data) => {
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dataSetFunc(posts);
    });
    return subscription;
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionByQuery = async (
  collectionName,
  currentUserId,
  dataSetFunc
) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("userId", "==", currentUserId));

    const subscription = onSnapshot(q, (data) => {
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dataSetFunc(posts);
    });

    return subscription;
  } catch (error) {
    console.log(error);
  }
};
