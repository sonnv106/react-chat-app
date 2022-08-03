import { collection, addDoc} from "firebase/firestore";
import { db } from "./config";
export const addDocument = async (collectionName, data)=>{
    const docRef = await addDoc(collection(db,collectionName), {
        ...data,
    })
    return docRef.id;
    
}