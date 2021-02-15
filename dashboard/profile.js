let ls = window.localStorage;
let active = ls.getItem("active");
let stored_users = JSON.parse(ls.getItem("users"));
if (stored_users) {
  for (let u = 0; u < stored_users.length; u++) {
    if (stored_users[u].name == active) {
      var output = document.getElementById("output");
      output.innerHTML = `
            <table>
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>${stored_users[u].name}</td>
                    </tr>
                    <tr>
              <td>Password</td>
              <td>${stored_users[u].password}</td>
          </tr>
          <tr>
              <td>Username</td>
              <td>${stored_users[u].userName}</td>
          </tr>
          <tr>
              <td>Mobile No.</td>
              <td>${stored_users[u].mobile}</td>
          </tr>
          <tr>
              <td>Date of Birth</td>
              <td>${stored_users[u].dob}</td>
          </tr>
                </tbody>
            </table>`;
    }
  }
}
