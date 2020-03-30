
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import HomePage from "./components/HomePage";
import Prijava from "./components/Prijava";
import Registracija from "./components/registration/RegistrationForm";
import OporavkaLozinke from "./components/OporavkaLozinke";
import SigurnosnoPitanje from "./components/SigurnosnoPitanje";
import PrikazNoveSifre from "./components/PrikazNoveSifre";
import RecoveryProvider from "./context/PasswordRecovery/Provider";
import RegistrationSuccess from "./components/registration/RegistrationSuccess";

function App() {
  return (
      <RecoveryProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Prijava}></Route>
            <Route path="/pocetna" component={HomePage}></Route>
            <Route path="/oporavkaLozinke" component={OporavkaLozinke}></Route>

            <Route
                path="/sigurnosnoPitanje"
                component={SigurnosnoPitanje}
            ></Route>

            <Route path="/novaSifra" component={PrikazNoveSifre}></Route>
            <Route path="/prijava" component={Prijava}></Route>

            <Route path="/registracija" component={Registracija}></Route>
            <Route path="/registracijaUspjeh" component={RegistrationSuccess}></Route>
          </Switch>
        </Router>
      </RecoveryProvider>
  );
}

export default App;