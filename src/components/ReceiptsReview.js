import React, { useState, useEffect } from "react";
import { Spin, Collapse,  } from "antd";
import ReceiptComponent from "./receiptListComponent/receiptComponent"
import {CaretRightOutlined} from "@ant-design/icons";

import "./receiptListComponent/receiptComponent.css"

const { Panel } = Collapse;

function ReceiptsReview() {
  const [receipts, setReseipts] = useState([]);

  const loadData = () => {
    // tryout url
    const API_KEY = "5cd663914eac4d66954c1d704b412c3c";
    const url =
        "http://newsapi.org/v2/everything?q=bitcoin&from=2020-02-26&sortBy=publishedAt&apiKey=" +
        API_KEY;
    fetch(url)
        .then(res => res.json())
        .then(posts => {
          console.log(posts);
          posts.status === "ok" ? setReseipts(posts.articles) : setReseipts(null);
        })
        .catch(e => {
          console.log(e);
        });
  };

  const deleteReceipt = (id) => {
    // delete receipt

    setReseipts(null);
    loadData();
  };

  // componentDidMount
  useEffect(loadData, []);

  let index = 1;

  return (
    <div>
      {receipts == null ? (
        <Spin size="large" style={{ "margin": "0" }}></Spin>
      ) : (
        <Collapse accordion bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
          className="site-collapse-custom-collapse">
          {receipts.map(element =>
              <Panel header={element.title} key={index++} className="site-collapse-custom-panel" forceRender={true}>
                <ReceiptComponent receipt = {element} deleteReceipt = {deleteReceipt}/>
              </Panel>
          )}
        </Collapse>

      )}
    </div>
  );
}

export default ReceiptsReview;
