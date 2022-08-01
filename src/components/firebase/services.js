import { collection, addDoc} from "firebase/firestore";
import { db } from "./config";
export const addDocument = (collectionName, data)=>{
    const query = addDoc(collection(db,collectionName), {
        ...data,
    })
}