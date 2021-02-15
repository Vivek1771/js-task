function store() {
  var name = document.getElementById("name").value;
  var pw = document.getElementById("pw").value;
  var userName = document.getElementById("userName").value;
  var mobile = document.getElementById("mobile").value;
  var dob = document.getElementById("dob").value;

  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;

  let stored_users = JSON.parse(localStorage.getItem("users"));
  if (name.length == 0) {
    alert("Please fill in email");
  } else if (pw.length == 0) {
    alert("Please fill in password");
  } else if (name.length == 0 && pw.length == 0) {
    alert("Please fill in email and password");
  } else if (pw.length < 8) {
    alert("Max of 8");
  } else if (!pw.match(numbers)) {
    alert("please add 1 number");
  } else if (!pw.match(upperCaseLetters)) {
    alert("please add 1 uppercase letter");
  } else if (!pw.match(lowerCaseLetters)) {
    alert("please add 1 lovercase letter");
  } else {
    alert("Account Created Successfully");
    addUser();
  }

  function addUser() {
    if (stored_users) {
      stored_users.push({
        name: name,
        password: pw,
        userName: userName,
        mobile: mobile,
        dob: dob,
      });
      localStorage.setItem("users", JSON.stringify(stored_users));
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            name: name,
            password: pw,
            userName: userName,
            mobile: mobile,
            dob: dob,
          },
        ])
      );
    }
  }
}
function check() {
  var usrName = document.getElementById("userEmail").value;
  var usrPw = document.getElementById("userPw").value;

  let stored_users = JSON.parse(localStorage.getItem("users"));
  if (stored_users) {
    for (let u = 0; u < stored_users.length; u++) {
      if (
        usrName == stored_users[u].name &&
        usrPw == stored_users[u].password
      ) {
        alert("You are logged in " + usrName);
        localStorage.setItem("active", usrName);
        return location.replace("../dashboard/index.html");
      }
    }
  } else {
    localStorage.setItem("users", "[]");
  }
  return alert("Access denied. Valid username and password is required.");
}
