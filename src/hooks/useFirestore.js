import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import { db } from "../components/firebase/config";
export const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  const fetData = async () => {
    let q;
    let colRef = collection(db, collectionName);
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      q = query(
        colRef,
        orderBy("createdAt", 'asc'),
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
      const querySnapshot = await getDocs(q);
      let rooms = []
      querySnapshot.forEach((doc) => {
        rooms.push({id: doc.id, ...doc.data()})
      });
      setDocuments(rooms)
    }
  };
  useEffect(() => {
    fetData();
    return () => {
      fetData();
    };
  }, [collection, condition]);
  return documents;
};
