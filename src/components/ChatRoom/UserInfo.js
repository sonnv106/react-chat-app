import React from "react";
import { Avatar, Button, Typography } from "antd";
import styled from "styled-components";
import {auth} from '../firebase/config'
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    margin-left: 5px;
    color: white
  }
`;
export default function UserInfo() {
  return (
    <WrapperStyled>
      <div>
        <Avatar>A</Avatar>
        <Typography.Text className="username">ABC</Typography.Text>
      </div>
      <Button ghost onClick={()=>auth.signOut()}>Đăng xuất</Button>
    </WrapperStyled>
  );
}
