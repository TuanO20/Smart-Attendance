import { deleteDoc, getDocs, setDoc, updateDoc, doc, collection, query, orderBy, where, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function Create(docRef, data) {
    try {
        await setDoc(docRef, data);
        alert("Create successfully");
    } catch (error) {
        alert("Error: " + error.message);
    }
}

export async function ReadCol(colRef) {
    try {
        const snapshot = await getDocs(colRef);
        return snapshot.docs.map(item => item.data());
    } catch (error) {
        //alert("Error: " + error.message);
        console.log("Error: "+ error.message);
        return [];
    }
}

export async function ReadDoc(docRef) {
    try {
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            return snapshot.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.log("Error: " + error.message);
        return null;
    }
}


export async function Update(docRef, data) {
    try {
        await updateDoc(docRef, data);
        alert("Update successfully");
    } catch (error) {
        alert("Error: " + error.message);
    }
}

export async function Delete(docRef) {
    try {
        await deleteDoc(docRef);
        alert("Delete successfully");
    } catch (error) {
        alert("Error: " + error.message);
    }
}

export async function Search(colRef, field, keyword) {
    try {
        const q = query(
            collection(db, colRef), 
            where(field, '>=', keyword),
            where(field, '<=', `${keyword}\uf8ff`),
            orderBy(field)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(item => item.data());
    } catch (error) {
        console.log("Not found");
        return [];
    }
}
