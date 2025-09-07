import { Homeproducts } from "@/constants/homeProduct";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const homeData = Homeproducts;

export const uploadData = async () => {
    try {
        for (let i = 0; i < homeData.length; i++) {
            const product = homeData[i];
            const docRef = doc(collection(db, "homeProducts"),`product${i+1}`);
            await setDoc(docRef, product);
        }
        console.log("Data uploaded successfully");
    }catch (error) {
        console.log("Error uploading data: ", error);
    }
};