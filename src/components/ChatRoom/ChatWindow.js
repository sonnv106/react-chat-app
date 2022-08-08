import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { useFirestore } from "../../hooks/useFirestore";
import { addDocument } from "../firebase/services";
import Message from "./Message";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;
const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;
const WrapperStyled = styled.div`
  height: 100vh;
`;
const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

//search 'tung'
//db: collection: 'users'
//{
//displayName: 'Tung Nguyen David' =>[ "Tung", "Nguyen", "David"] => [  "Nguyen", "Tung", "David"] =>[ "David","Tung", "Nguyen", ] ....
//keywords: ["T", "Tu", "Tun", "Tung", "Tung N" ...., "N", "Ng" ,....]
//}

export default function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    form.resetFields(["message"]);
  };
  const condition = useMemo(()=>(
    {
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id 
    }
  ), [selectedRoom.id])
  const messages = useFirestore('messages',condition)


  useEffect(()=>{

  }, [messages])
  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">
                {selectedRoom && selectedRoom.name}
              </p>
              <span className="header__description">
                {selectedRoom && selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              <Avatar.Group size={"small"} maxCount={2}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member?.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.name?.chatAt(0)?.toUperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {
                messages.map(mes=>(
                  <Message
                  key={mes.id}
                  displayName={mes.displayName}
                  photoURL={mes.photoURL}
                  createAt={mes.createdAt}
                  text={mes.text}
                />
                ))
              }
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  placeholder="Nhập tin nhắn"
                  bordered={false}
                  autoComplete="off"
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                />
              </Form.Item>
              <Button type="primary" onClick={()=>{handleOnSubmit()}}>Gửi</Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Hay chon phong"
          showIcon
          type="info"
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}
