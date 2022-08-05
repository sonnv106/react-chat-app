import React, { useContext, useEffect } from "react";
import { Avatar, Button, Typography } from "antd";
import styled from "styled-components";
import { auth, db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../../Context/AuthProvider";
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    margin-left: 5px;
    color: white;
  }
`;
export default function UserInfo() {
  // useEffect(() => {
  //   const callApi = async () => {
  //     const colRef =  collection(db, "users");
  //     const querySnapshot = await getDocs(colRef);
  //     querySnapshot.forEach((doc) => {
  //       console.log( "=>", doc.data());
  //     });
      
  //   };
  //   callApi()
  // }, []);
  const {user:{
    displayName,
    photoURL
  }} = useContext(AuthContext);
  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>{photoURL? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button ghost onClick={() => auth.signOut()}>
        Đăng xuất
      </Button>
    </WrapperStyled>
  );
}
