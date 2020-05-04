import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import { logoutUser } from "../utilities/Common";
import { useHistory } from "react-router-dom";

function Logout(props) {
  const [state, setState] = useState({ visible: true });

  const history = useHistory();

  const handleLogout = () => {
    logoutUser();
    console.log("user is logged out");
    setState({ visible: false });
    history.push("/prijava");
    props.location.stompClient.disconnect();
  };

  const handleCancel = () => {
    console.log("cancel logout");
    setState({ visible: false });
    history.push("/");
  };
  return (
    <div>
      <Modal
        title="Logout"
        okText="Logout"
        visible={state.visible}
        onOk={handleLogout}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
}

export default Logout;
