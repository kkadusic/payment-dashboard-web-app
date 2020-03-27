import React, { useState } from "react";
import { Button, Modal, Card} from "antd";
import "./accountComponent.css";

function AccountComponent(props) {

    const [state, setState] = useState({ visible: false });

    const showModal = () => {
        setState({ visible: true });
    };

    const handleOk = e => {
        props.deleteAccount(props.account.id);
        hideModal();
    };

    const hideModal = e => {
        // do nothing
        console.log(e);
        setState({ visible: false });
    };

    return (
        <Card>
            <div>
                <p>account Owner: {props.account.accountOwner}</p>
                <p>Expiration date: {props.account.expiryDate.substr(0, 10).replace(/-/g, "/")}</p>
                <p>Card number: {props.account.cardNumber}</p>
                <Button style={{ "float": "right"}} type="link" onClick={showModal} danger>Delete</Button>
            </div>
            <Modal
                title="Jeste li sigurni da zelite izbrisati ovaj racun?"
                visible={state.visible}
                onOk={handleOk}
                onCancel={hideModal}>
            </Modal>
        </Card>
    );
}

export default AccountComponent;
