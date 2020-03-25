import React, { useState } from "react";
import "antd/dist/antd.css";

import { Layout, Menu, Button, Tooltip } from "antd";
import {
  UserOutlined,
  CreditCardOutlined,
  LogoutOutlined,
  DollarOutlined
} from "@ant-design/icons";

import HomePage from "./components/HomePage";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("pocetna");

  const componentsSwitch = key => {
    switch (key) {
      case "pregledProfila":
        return <h1>Profil</h1>;
      case "uredjivanjeProfila":
        return <h1>Uređivanje profila</h1>;
      case "dodaniRacuni":
        return <h1>Pregled bankovnih racuna</h1>;
      case "dodavanjeRacuna":
        return <h1>Dodavanje bankovnih racuna</h1>;
      case "brisanjeRacuna":
        return <h1>Brisanje bankovnih racuna</h1>;
      case "transakcije24":
        return <h1>Pregled transakcija u posljednja 24h</h1>;
      case "transakcijeMjesec":
        return <h1>Pregled transakcija u posljednjih mjesec dana</h1>;
      case "transakcijeMerchant":
        return <h1>Pregled transakcija po merchantima</h1>;
      case "transakcijeProizvod":
        return <h1>Pregled transakcija po proizvodima</h1>;
      case "pocetna":
        return <HomePage></HomePage>;
    }
  };

  return (
    <Layout height="100vh">
      <Header className="header">
        <div className="logo">
          <p>Payment Dashboard</p>
        </div>
        <Tooltip title="Odjava">
          <Button
            className="logoutBtn"
            shape="circle"
            icon={<LogoutOutlined />}
          />
        </Tooltip>
      </Header>
      <Layout height="100vh">
        <Sider width={200} className="site-layout-background">
          <Menu
            selectedKeys={selectedMenuItem}
            onClick={e => setSelectedMenuItem(e.key)}
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="pocetna">Početna stranica</Menu.Item>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined />
                  Profil
                </span>
              }
            >
              <Menu.Item key="pregledProfila">Pregled profila</Menu.Item>
              <Menu.Item key="uredjivanjeProfila">Uređivanje profila</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <CreditCardOutlined />
                  Bankovni računi
                </span>
              }
            >
              <Menu.Item key="dodaniRacuni">Pregled dodanih računa</Menu.Item>
              <Menu.Item key="dodavanjeRacuna">Dodavanje računa</Menu.Item>
              <Menu.Item key="brisanjeRacuna">Brisanje računa</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <DollarOutlined />
                  Troškovi
                </span>
              }
            >
              <Menu.Item key="transakcije24">Posljednja 24h</Menu.Item>
              <Menu.Item key="transakcijeMjesec">
                Posljednjih mjesec dana
              </Menu.Item>
              <Menu.Item key="transakcijeMerchant">Po merchantima</Menu.Item>
              <Menu.Item key="transakcijeProizvod">Po proizvodima</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: "100vh"
            }}
          >
            {componentsSwitch(selectedMenuItem)}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
