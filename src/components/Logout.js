import React, { useState } from 'react';
import { LogoutOutlined } from "@ant-design/icons";
import { Modal, Button } from 'antd';
import { logoutUser } from '../utilities/Common';

function Logout(props) {
	const [state, setState] = useState({visible: true});


  const handleLogout = () => {
    logoutUser()
    console.log("user is logged out")
    setState({visible: false})
    props.history.push("/");

  }

  const handleCancel = () => {
    console.log("cancel logout")
    setState({visible: false})
    props.history.push("/");

  }
        return (
          <div >
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
