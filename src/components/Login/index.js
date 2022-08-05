import React from "react";
import { Row, Col, Typography, Button } from "antd";
import {
  FacebookAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import {Timestamp} from 'firebase/firestore'
import { auth } from "../firebase/config";
import { addDocument } from "../firebase/services";
const { Title } = Typography;
const fbProvider = new FacebookAuthProvider();

export default function Login() {

  const handleFbLogin = async () => {
    const user = await signInWithPopup(
      auth,
      fbProvider
    );
    
    const checkNewUser = getAdditionalUserInfo(user);
    if(checkNewUser?.isNewUser){
      addDocument('users', {
        displayName: user.user.displayName,
        email: user.user.email,
        phone: user.user.phoneNumber,
        photoURL: user.user.photoURL,
        uid: user.user.uid,
        providerId: user.user.providerId, 
        createdAt: Timestamp.now()
      })
    }
  };
  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            React Chat App
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFbLogin}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
