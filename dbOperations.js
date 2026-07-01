import { db } from "./firebase.js";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

export async function createData(collectionName, dataObject) {
    const docRef = await addDoc(collection(db, collectionName), {
        ...dataObject,
        createdAt: serverTimestamp()
    });

    return docRef.id;
}

export async function readAllData(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const dataList = [];

    querySnapshot.forEach((documentSnapshot) => {
        dataList.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
    });

    return dataList;
}

export async function readSingleData(collectionName, docId) {
    const docRef = doc(db, collectionName, docId);
    const documentSnapshot = await getDoc(docRef);

    if (!documentSnapshot.exists()) {
        return null;
    }

    return { id: documentSnapshot.id, ...documentSnapshot.data() };
}

export async function updateData(collectionName, docId, updatedFields) {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedFields);
}

export async function deleteData(collectionName, docId) {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
}