
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebase/config";
import { Spin } from "antd";
export const AuthContext = React.createContext();


export default function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    
    const unsubcribe = auth.onAuthStateChanged((user) => {
      console.log(user)
      
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        navigate("/");
        return;
      }else{
        setIsLoading(false)
        navigate("/login");
       
      }
      
    });
    return () => {
      unsubcribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}
