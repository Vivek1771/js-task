function update() {
  let ls = window.localStorage;
  let active = ls.getItem("active");
  var name1 = document.getElementById("name1");
  var name = document.getElementById("name");
  var mobile = document.getElementById("mobile");
  var pw = document.getElementById("pw");
  let stored_users = JSON.parse(ls.getItem("users"));
  if (stored_users) {
    for (let u = 0; u < stored_users.length; u++) {
      if (stored_users[u].name == active) {
        stored_users[u].userName = name1.value;
        stored_users[u].name = name.value;
        stored_users[u].mobile = mobile.value;
        stored_users[u].password = pw.value;
        localStorage.setItem("users", JSON.stringify(stored_users));
        alert("Profile Updated Successfully");
      }
    }
  }
}
