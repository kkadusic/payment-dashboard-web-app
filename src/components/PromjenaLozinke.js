import React from "react";
import "../css/PromjenaLozinke.css";


function PromjenaLozinke() {
  return (
    <React.Fragment>
      <header style = {headerStyle}>Change password</header>
      <form>
        <label>
          Input current password:
          <input type="password" name="currPass" />
        </label>
        <label>
          New password:
          <input type="password" name="newPass" />
        </label>
        <br></br>
        <label>
          Retype new password:
          <input type="password" name="retypePass" />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    </React.Fragment>
  );
}

const headerStyle = {
  fontSize: 'large',
  fontWeight: 'bold',
  padding: '15px' 
}

export default PromjenaLozinke;
