import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const fbProvider = new FacebookAuthProvider();

export default function Login() {
    const navigate = useNavigate();
    const handleFbLogin = async () => {
        const result = await signInWithPopup(auth, fbProvider);
        const user = result.user;
        if (user) {
          navigate("/");
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
