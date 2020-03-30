import React from "react";
import { useRecoveryContext } from "../context/PasswordRecovery/RecoveryContext";
import "../css/OporavkaLozinke.css";

function PrikazNoveSifre() {
	const { recoveryUser, setRecoveryUser } = useRecoveryContext();
	return (
		<div>
			<h2 id="recoveryTitle">Recovery successful!</h2>
            <div id="passwordBlock">
                <div id="passwordText">Your new password: </div>
                <div id="passwordd">{recoveryUser.password}</div>
            </div>


            <div id="loginPageLink">
			<a href="/prijava">
				Log in
			</a>
            </div>

		</div>
	);
}

export default PrikazNoveSifre;
