import React from "react";


function PromjenaLozinke() {
  return (
    <div>
      <header style = {headerStyle}>Change password</header>
      <form style={formStyle}>
        <label style={column}>
          Input current password:
          <input type="password" name="currPass" />
        </label>
        <label style={column}>
          New password:
          <input type="password" name="newPass" />
        </label>
        <label style={column}>
          Retype new password:
          <input type="password" name="retypePass" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

const headerStyle = {
  fontSize: 'large',
  fontWeight: 'bold' 
}

const formStyle = {
  display: 'flex',
}

const column = {
  flex: '50%'
}

export default PromjenaLozinke;
