import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getUser } from "../utilities/Common";
import "antd/dist/antd.css";

import { Layout, Menu, Avatar } from "antd";
import {
  UserOutlined,
  CreditCardOutlined,
  LogoutOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import Home from "./Home";
import Prijava from "./Prijava";
import PregledProfila from "./PregledProfila";
import DodaniRacuni from "./DodaniRacuni";
import DodavanjeRacuna from "./DodavanjeRacuna";
import PromjenaLozinke from "./PromjenaLozinke";
import TransakcijeGodina from "./transactions/TransakcijeGodina";
import TransakcijeMjesec from "./transactions/TransakcijeMjesec";
import TransakcijeMerchant from "./transactions/TransakcijeMerchant";
import OporavkaLozinke from "./OporavkaLozinke";
import SigurnosnoPitanje from "./SigurnosnoPitanje";
import PrikazNoveSifre from "./PrikazNoveSifre";
import RacunUspjeh from "./RacunUspjeh";
import Logout from "./Logout";
import NewPasswordAlert from "./NewPasswordAlert";
import PregledTransakcija from "./transactions/PregledTransakcija";
import BankAccTable from "./BankAccTable";
import TransakcijeIznos from "./transactions/TransakcijeIznos";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

function HomePage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("pocetna");

  return (
    <Router>
      <Layout height="100vh">
        <Header className="header">
          <div className="logo">
            <p style={{ color: "white" }}>Payment </p>
            <p style={{ color: "#597ef7" }}> Dashboard</p>
          </div>
          <Avatar
            style={{
              color: "white",
              backgroundColor: "#597ef7",
            }}
            className="avatar"
          >
            {JSON.parse(getUser()).firstName.charAt(0)}
          </Avatar>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              selectedKeys={selectedMenuItem}
              onClick={(e) => setSelectedMenuItem(e.key)}
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="pocetna">
                <Link to="/pocetna"> Home</Link>
              </Menu.Item>

              <SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined />
                    Profile
                  </span>
                }
              >
                <Menu.Item key="pregledProfila">
                  <Link to="/pregledProfila"> View profile </Link>
                </Menu.Item>

                <Menu.Item key="promjenaLozinke">
                  <Link to="/promjenaLozinke">Change password </Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub3"
                title={
                  <span>
                    <DollarOutlined />
                    Transactions
                  </span>
                }
              >
                <Menu.Item key="pregledTransakcija">
                  <Link to="/pregledTransakcija">All transactions</Link>
                </Menu.Item>
                <Menu.Item key="transakcijeGodina">
                  <Link to="/transakcijeGodina">Months of past year</Link>
                </Menu.Item>
                <Menu.Item key="transakcijeMjesec">
                  <Link to="/transakcijeMjesec"> Last month</Link>
                </Menu.Item>
                <Menu.Item key="transakcijeMerchant">
                  <Link to="/transakcijeMerchant">Spent on merchant</Link>
                </Menu.Item>
                <Menu.Item key="transakcijeIznos">
                  <Link to="/transakcijeIznos"> Spent by merchant</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <CreditCardOutlined />
                    My bank accounts
                  </span>
                }
              >
                <Menu.Item key="pregledRacuna">
                  <Link to="/pregledRacuna">Bank account details</Link>
                </Menu.Item>
                <Menu.Item key="dodaniRacuni">
                  <Link to="/dodaniRacuni"> View added accounts</Link>
                </Menu.Item>
                <Menu.Item key="dodavanjeRacuna">
                  <Link to="/dodavanjeRacuna"> Add new account</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="logout">
                <LogoutOutlined></LogoutOutlined>
                <Link to="/logout">Log out</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                height: "100vh",
              }}
            >
              <Switch>
                <Route exact path="/" component={Home}></Route>

                <Route
                  path="/pregledProfila"
                  component={PregledProfila}
                ></Route>
                <Route
                  path="/promjenaLozinke"
                  component={PromjenaLozinke}
                ></Route>

                <Route path="/pregledRacuna" component={BankAccTable} />

                <Route path="/dodaniRacuni" component={DodaniRacuni}></Route>

                <Route
                  path="/dodavanjeRacuna"
                  component={DodavanjeRacuna}
                ></Route>

                <Route
                  path="/pregledTransakcija"
                  component={PregledTransakcija}
                ></Route>

                <Route
                  exact
                  path="/transakcijeGodina"
                  component={TransakcijeGodina}
                ></Route>

                <Route
                  exact
                  path="/transakcijeMjesec"
                  component={TransakcijeMjesec}
                ></Route>
                <Route
                  exact
                  path="/transakcijeMerchant"
                  component={TransakcijeMerchant}
                ></Route>
                <Route
                  exact
                  path="/transakcijeIznos"
                  component={TransakcijeIznos}
                ></Route>

                <Route
                  path="/oporavkaLozinke"
                  component={OporavkaLozinke}
                ></Route>

                <Route
                  path="/sigurnosnoPitanje"
                  component={SigurnosnoPitanje}
                ></Route>

                <Route
                  path="/newPasswordAlert"
                  component={NewPasswordAlert}
                ></Route>

                <Route path="/novaSifra" component={PrikazNoveSifre}></Route>
                <Route path="/racunUspjeh" component={RacunUspjeh}></Route>

                <Route path="/pocetna" component={Home}></Route>
                <Route path="/logout" component={Logout}></Route>
                <Route path="/prijava" component={Prijava}></Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
}

export default HomePage;
