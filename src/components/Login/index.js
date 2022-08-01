import React from "react";
import { Row, Col, Typography, Button } from "antd";
import {
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { addDocument } from "../firebase/services";
const { Title } = Typography;
const fbProvider = new FacebookAuthProvider();

export default function Login() {
  const navigate = useNavigate();
  const handleFbLogin = async () => {
    const { user, operationType, providerId } = await signInWithPopup(
            auth,
            fbProvider
    );
    if(user){
      navigate('/');
      return
    }else{
      navigate('/login')
    }
    // onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     navigate("/");
    //     return;
    //   } else {
    //     const { user, operationType, providerId } = await signInWithPopup(
    //       auth,
    //       fbProvider
    //     );
    //     addDocument("users", {
    //       displayName: user.displayName,
    //       email: user.email,
    //       photoURL: user.photoURL,
    //       phone: user.phoneNumber,
    //       uid: user.displayName,
    //       providerId: user.providerId,
    //     });
    //   }
    // });
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
