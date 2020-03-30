import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";

import { Layout, Menu, Button, Tooltip } from "antd";
import {
  UserOutlined,
  CreditCardOutlined,
  LogoutOutlined,
  DollarOutlined
} from "@ant-design/icons";

import HomePage from "./components/HomePage";
import Prijava from "./components/Prijava";
import PregledProfila from "./components/PregledProfila";
import Registracija from "./components/Registracija";
import DodaniRacuni from "./components/DodaniRacuni";
import DodavanjeRacuna from "./components/DodavanjeRacuna";
import BrisanjeRacuna from "./components/BrisanjeRacuna";
import PromjenaLozinke from "./components/PromjenaLozinke";
import Transakcije24 from "./components/Transakcije24";
import TransakcijeMjesec from "./components/TransakcijeMjesec";
import TransakcijeMerchant from "./components/TransakcijeMerchant";
import TransakcijeProizvod from "./components/TransakcijeProizvod";
import OporavkaLozinke from "./components/OporavkaLozinke";
import SigurnosnoPitanje from "./components/SigurnosnoPitanje";
import RecoveryProvider from "./context/PasswordRecovery/Provider";
import PrikazNoveSifre from "./components/PrikazNoveSifre";
import AccountComponent from "./components/accountListComponent/accountComponent";
import RacunUspjeh from "./components/RacunUspjeh";
import Logout from "./components/Logout";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("pocetna");

  // const componentsSwitch = key => {
  //   switch (key) {
  //     case "pregledProfila":
  //       return <h1>Profil</h1>;
  //     case "promjenaLozinke":
  //       return <PromjenaLozinke></PromjenaLozinke>;
  //     case "dodaniRacuni":
  //       return <AccountComponent></AccountComponent>;
  //     case "dodavanjeRacuna":
  //       return <DodavanjeRacuna></DodavanjeRacuna>;
  //     case "brisanjeRacuna":
  //       return <BrisanjeRacuna></BrisanjeRacuna>;
  //     case "transakcije24":
  //       return <h1>Pregled transakcija u posljednja 24h</h1>;
  //     case "transakcijeMjesec":
  //       return <h1>Pregled transakcija u posljednjih mjesec dana</h1>;
  //     case "transakcijeMerchant":
  //       return <h1>Pregled transakcija po merchantima</h1>;
  //     case "transakcijeProizvod":
  //       return <h1>Pregled transakcija po proizvodima</h1>;
  //     case "pocetna":
  //       return <HomePage></HomePage>;
  //     case "prijava":
  //       return <Prijava></Prijava>;
  //     case "registracija":
  //       return <Registracija></Registracija>;
  //     default:
  //       return <HomePage></HomePage>;
  //   }
  // };

  return (
    <RecoveryProvider>
      <Router>
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
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                selectedKeys={selectedMenuItem}
                onClick={e => setSelectedMenuItem(e.key)}
                mode="inline"
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="pocetna">
                  <Link to="/pocetna"> Home</Link>
                </Menu.Item>
                <Menu.Item key="prijava">
                  <Link to="/prijava"> Log in</Link>
                </Menu.Item>
                <Menu.Item key="registracija">
                  <Link to="/registracija"> Register</Link>
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
                  <Menu.Item key="transakcije24">
                    <Link to="/transakcije24">Last 24h</Link>
                  </Menu.Item>
                  <Menu.Item key="transakcijeMjesec">
                    <Link to="/transakcijeMjesec"> Last month</Link>
                  </Menu.Item>
                  <Menu.Item key="transakcijeMerchant">
                    <Link to="/transakcijeMerchant">Spent by merchant</Link>
                  </Menu.Item>
                  <Menu.Item key="transakcijeProizvod">
                    <Link to="/transakcijeProizvod"> Spent by product</Link>
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
                  <Menu.Item key="dodaniRacuni">
                    <Link to="/dodaniRacuni"> View added accounts</Link>
                  </Menu.Item>
                  <Menu.Item key="dodavanjeRacuna">
                    <Link to="/dodavanjeRacuna"> Add new account</Link>
                  </Menu.Item>
                  <Menu.Item key="brisanjeRacuna">
                    <Link to="/brisanjeRacuna"> Delete account</Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item>
                  <LogoutOutlined></LogoutOutlined>
                  Log out
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0px 24px" }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  height: "100vh"
                }}
              >
                <Switch>
                  <Route exact path="/" component={HomePage}></Route>

                  <Route
                    path="/pregledProfila"
                    component={PregledProfila}
                  ></Route>
                  <Route
                    path="/promjenaLozinke"
                    component={PromjenaLozinke}
                  ></Route>

                  <Route path="/dodaniRacuni" component={DodaniRacuni}></Route>

                  <Route
                    path="/dodavanjeRacuna"
                    component={DodavanjeRacuna}
                  ></Route>

                  <Route
                    path="/brisanjeRacuna"
                    component={BrisanjeRacuna}
                  ></Route>

                  <Route
                    exact
                    path="/transakcije24"
                    component={Transakcije24}
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
                    path="/transakcijeProizvod"
                    component={TransakcijeProizvod}
                  ></Route>

                  <Route
                    path="/oporavkaLozinke"
                    component={OporavkaLozinke}
                  ></Route>

                  <Route
                    path="/sigurnosnoPitanje"
                    component={SigurnosnoPitanje}
                  ></Route>

                  <Route path="/novaSifra" component={PrikazNoveSifre}></Route>

                  <Route path="/pocetna" component={HomePage}></Route>

                  <Route path="/prijava" component={Prijava}></Route>

                  <Route path="/registracija" component={Registracija}></Route>
                </Switch>
                {/* {componentsSwitch(selectedMenuItem)} */}
              </Content>
            </Layout>
          </Layout>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    </RecoveryProvider>
  );
  //const [selectedMenuItem, setSelectedMenuItem] = useState("pocetna");

  // const componentsSwitch = key => {
  //   switch (key) {
  //     case "pregledProfila":
  //       return <h1>Profil</h1>;
  //     case "promjenaLozinke":
  //       return <PromjenaLozinke></PromjenaLozinke>;
  //     case "dodaniRacuni":
  //       return <AccountComponent></AccountComponent>;
  //     case "dodavanjeRacuna":
  //       return <DodavanjeRacuna></DodavanjeRacuna>;
  //     case "brisanjeRacuna":
  //       return <BrisanjeRacuna></BrisanjeRacuna>;
  //     case "transakcije24":
  //       return <h1>Pregled transakcija u posljednja 24h</h1>;
  //     case "transakcijeMjesec":
  //       return <h1>Pregled transakcija u posljednjih mjesec dana</h1>;
  //     case "transakcijeMerchant":
  //       return <h1>Pregled transakcija po merchantima</h1>;
  //     case "transakcijeProizvod":
  //       return <h1>Pregled transakcija po proizvodima</h1>;
  //     case "pocetna":
  //       return <HomePage></HomePage>;
  //     case "prijava":
  //       return <Prijava></Prijava>;
  //     case "registracija":
  //       return <Registracija></Registracija>;
  //     default:
  //       return <HomePage></HomePage>;
  //   }
  // };

  return (
    <Router>
      <Layout height="100vh">
        <Header className="header">
          <div className="logo">
            <p>Payment Dashboard</p>
          </div>
          <Tooltip title="Odjava">
            {/* <Button
              className="logoutBtn"
              shape="circle"
              icon={<LogoutOutlined />}
            /> */}
            <Logout></Logout>
          </Tooltip>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              //  selectedKeys={selectedMenuItem}
              //     onClick={e => setSelectedMenuItem(e.key)}
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="pocetna">
                <Link to="/pocetna"> Home</Link>
              </Menu.Item>
              <Menu.Item key="prijava">
                <Link to="/prijava"> Log in</Link>
              </Menu.Item>
              <Menu.Item key="registracija">
                <Link to="/registracija"> Register</Link>
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
                <Menu.Item key="transakcije24">
                  <Link to="/transakcije24">Last 24h</Link>
                </Menu.Item>
                <Menu.Item key="transakcijeMjesec">
                  <Link to="/transakcijeMjesec"> Last month</Link>
                </Menu.Item>
                <Menu.Item key="transakcijeMerchant">
                  <Link to="/transakcijeMerchant">Spent by merchant</Link>
                </Menu.Item>
                <Menu.Item key="transakcijeProizvod">
                  <Link to="/transakcijeProizvod"> Spent by product</Link>
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
                <Menu.Item key="dodaniRacuni">
                  <Link to="/dodaniRacuni"> View added accounts</Link>
                </Menu.Item>
                <Menu.Item key="dodavanjeRacuna">
                  <Link to="/dodavanjeRacuna"> Add new account</Link>
                </Menu.Item>
                <Menu.Item key="brisanjeRacuna">
                  <Link to="/brisanjeRacuna"> Delete account</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item>
                <LogoutOutlined></LogoutOutlined>
                Log out
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                height: "100vh"
              }}
            >
              <Switch>
                <Route exact path="/" component={HomePage}></Route>

                <Route
                  path="/pregledProfila"
                  component={PregledProfila}
                ></Route>
                <Route
                  path="/promjenaLozinke"
                  component={PromjenaLozinke}
                ></Route>

                <Route path="/dodaniRacuni" component={DodaniRacuni}></Route>

                <Route
                  path="/dodavanjeRacuna"
                  component={DodavanjeRacuna}
                ></Route>

                <Route
                  path="/brisanjeRacuna"
                  component={BrisanjeRacuna}
                ></Route>

                <Route
                  exact
                  path="/transakcije24"
                  component={Transakcije24}
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
                  path="/transakcijeProizvod"
                  component={TransakcijeProizvod}
                ></Route>

                <Route path="/pocetna" component={HomePage}></Route>

                <Route path="/prijava" component={Prijava}></Route>

                <Route path="/registracija" component={Registracija}></Route>

                <Route path="/racunUspjeh" component={RacunUspjeh}></Route>
              </Switch>
              {/* {componentsSwitch(selectedMenuItem)} */}
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

export default App;
