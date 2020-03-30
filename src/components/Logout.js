import React, { useState } from 'react';
import { LogoutOutlined } from "@ant-design/icons";
import { Modal, Button } from 'antd';
// Uncomment after merge
// import { logoutUser } from '../utilities/Common';

class Logout extends React.Component {
    state = { visible: false };
    maskStyle = { 
        float: 'right', 
        margin: '16px 0px 16px 0px'
    }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    // Uncomment after merge
    // logoutUser()
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div float="right">
        <Button 
        shape="circle" 
        style = {this.maskStyle}
        icon={<LogoutOutlined />} 
        onClick={this.showModal}>
        </Button>
        <Modal
          title="Logout"
          okText="Logout"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Are you sure you want to logout?</p>
        </Modal>
      </div>
    );
  }
}

export default Logout