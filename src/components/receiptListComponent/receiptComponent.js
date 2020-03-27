import React, { useState } from "react";
import { Card, Button, Modal} from "antd";
import "./receiptComponent.css";

function ReceiptComponent(props) {

    const [state, setState] = useState({ visible: false });

    const showModal = () => {
        setState({ visible: true });
    };

    const handleOk = e => {
        //props.deleteReceipt(props.receipt.id);
        hideModal();
    };

    const hideModal = e => {
        // do nothing
        console.log(e);
        setState({ visible: false });
    }

    return (
        <Card>
            <div>
                <p>{props.receipt.description}</p>
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

export default ReceiptComponent;
