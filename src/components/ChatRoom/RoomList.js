import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { useFirestore } from "../../hooks/useFirestore";
import { AuthContext } from "../../Context/AuthProvider";
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;
const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const RoomList = () => {
  const {
    user: { uid },
  } = useContext(AuthContext);
  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore("rooms", roomsCondition);
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách các phòng" key={"1"}>
        {rooms.map((room) => (
          <LinkStyled key={room.id}>{room.name}</LinkStyled>
        ))}
        {/* <LinkStyled> Room 1</LinkStyled>
        <LinkStyled> Room 2</LinkStyled>
        <LinkStyled> Room 3</LinkStyled> */}

        <Button type="text" icon={<PlusSquareOutlined />} className="add-room">
          Thêm phòng
        </Button>
      </PanelStyled>
    </Collapse>
  );
};
export default RoomList;
