import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { db } from "../components/firebase/config";
export const useFirestore =  (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const fetData = async () => {
      let q;
      let colRef = collection(db, collectionName);
      console.log(collectionName, condition)
      if (condition) {
        if (!condition.compareValue || !condition.compareValue.length) {
          return;
        }
        q = query(
          colRef,
          orderBy('createdAt'),
          where(condition.fieldName, condition.operator, condition.compareValue)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log('doc', doc.data())
              setDocuments([...documents, {id: doc.id, data: doc.data() }])
          })
        
        console.log("document",documents)
      }
      
     
    };
    fetData()
    return () => {
        fetData()
    };
  }, [collection, condition]);
  return documents;
};
