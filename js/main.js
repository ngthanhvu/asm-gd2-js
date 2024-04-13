// class
class account {
     constructor(id,username, hoten, email, cccd, sdt, diachi, password) {
          this.id = id
          this.username = username
          this.hoten = hoten
          this.email = email
          this.cccd = cccd
          this.sdt = sdt
          this.diachi = diachi
          this.password = password
     }
}



document.getElementById("email").addEventListener("blur", kiemtraemail);
document.getElementById("password").addEventListener("blur", kiemtrapass);
document.getElementById("username").addEventListener("blur", kiemtrausername);
document.getElementById("confirmpass").addEventListener("blur", kiemtraconfimpass);
document.getElementById("sdt").addEventListener("blur", kiemtrasdt);
document.getElementById("cccd").addEventListener("blur", kiemtracccd);
document.getElementById("diachi").addEventListener("blur", kiemtradiachi);
document.getElementById("hoten").addEventListener("blur", kiemtrahoten);
document.getElementById("checkbox").addEventListener("blur", kiemtracheckbox);


function kiemtradiachi() {
     let diachi = document.getElementById("diachi").value.trim()
     let errorElement = document.getElementById("error-diachi")

     if (diachi == "") {
          errorElement.innerHTML = "Dia chi is required"
     } else {
          errorElement.innerHTML = ""
     }

}

function kiemtracheckbox() {
     let check = document.getElementById("checkbox")
     let errorElement = document.getElementById("error-checkbox")

     if (check.checked) {
          errorElement.innerHTML = ""
     } else {
          errorElement.innerHTML = "Ban chua dong y dieu khoan"
     }
}

function kiemtrahoten() {
     let hoten = document.getElementById("hoten").value.trim()
     let errorElement = document.getElementById("error-hoten")

     if (hoten == "") {
          errorElement.innerHTML = "Ho ten is required"
     } else if (hoten.length > 30) {
          errorElement.innerHTML = "Ho ten khong qua 30 ky tu"
     } else {
          errorElement.innerHTML = ""
     }
}

function kiemtracccd() {
     let cccd = document.getElementById("cccd").value.trim();
     let errorElement = document.getElementById("error-cccd")

     if (cccd == "") {
          errorElement.innerHTML = "CCCD is required"
     } else if (isNaN(cccd)) {
          errorElement.innerHTML = "CCCD khong phai la so"
     } else if (cccd.length !== 12) {
          errorElement.innerHTML = "CCCD phai dung 12 so"
     } else {
          errorElement.innerHTML = ""
     }

}

function kiemtrasdt() {
     let sdt = document.getElementById("sdt").value.trim();
     let errorElement = document.getElementById("error-sdt")

     if (sdt == "") {
          errorElement.innerHTML = "Sdt is required"
     } else if (isNaN(sdt)) {
          errorElement.innerHTML = "Sdt khong phai la so"
     } else if (sdt.length > 10 || sdt.charAt(0) !== "0") {
          errorElement.innerHTML = "Sdt khong hop le"
     } else {
          errorElement.innerHTML = ""
     }

}

function kiemtraemail() {
     const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     let email = document.getElementById("email").value.trim()
     let errorElement = document.getElementById("error-email")

     if (email == "") {
          errorElement.innerHTML = "Email is required";
     } else if (!pattern.test(email)) {
          errorElement.innerHTML = "Email must be correct format"
     } else {
          errorElement.innerHTML = "";
     }
}

function kiemtrapass() {
     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
     let password = document.getElementById("password").value.trim();
     let errorElement = document.getElementById("error-password");

     if (password == "") {
          errorElement.innerHTML = "Password is required";
     } else if (!passwordPattern.test(password)) {
          errorElement.innerHTML = "Password it nhat mot chu hoa, mot chu thuong va mot so"
     } else {
          errorElement.innerHTML = "";
     }
}

function kiemtrausername() {
     let username = document.getElementById("username").value.trim();
     let errorElement = document.getElementById("error-username")

     if (username == "") {
          errorElement.innerHTML = "Username is required";
     } else if (username.length > 15) {
          errorElement.innerHTML = "Username khong qua 15 ki tu"
     } else {
          errorElement.innerHTML = ""
     }
}

function kiemtraconfimpass() {
     let confimpass = document.getElementById("confirmpass").value.trim();
     let password = document.getElementById("password").value.trim();
     let errorElement = document.getElementById("error-confimpass")

     if (confimpass == "") {
          errorElement.innerHTML = "Confimpass is required"
     } else if (password !== confimpass) {
          errorElement.innerHTML = "Password not mactch"
     } else {
          errorElement.innerHTML = ""
     }
}

// register

let danhsachuser = []

function idtutang () {
     let id = parseInt(localStorage.getItem("lastUserId")) || 0;
     id++;
     localStorage.setItem('lastUserId',id.toString());
     return id;
}

document.getElementById("register-btn").addEventListener("click", function (event) {
     event.preventDefault(); // Ngăn chặn hành vi mặc định của nút đăng ký

     let username = document.getElementById("username").value.trim()
     let hoten = document.getElementById("hoten").value.trim()
     let email = document.getElementById("email").value.trim()
     let cccd = document.getElementById("cccd").value.trim()
     let sdt = document.getElementById("sdt").value.trim()
     let diachi = document.getElementById("diachi").value.trim()
     let password = document.getElementById("password").value.trim()

     if (username === "" || hoten === "" || email === "" || cccd === "" || sdt === "" || diachi === "" || password === "") {
          Swal.fire({
               title: "Thất bại!",
               text: "Vui lòng điền đầy đủ thông tin",
               icon: "error"
          });
          return;
     }

     danhsachuser = JSON.parse(localStorage.getItem("user")) || []; 

     let id = idtutang();

     let usernew = new account(id,username, hoten, email, cccd, sdt, diachi, password);
     danhsachuser.push(usernew);

     localStorage.setItem("user", JSON.stringify(danhsachuser));

     Swal.fire({
          title: "Thành công!",
          text: "Đăng ký thành công",
          icon: "success"
     }).then((result) => {
          if (result.isConfirmed) {
               location.assign("login.html"); // Chuyển hướng sang trang đăng nhập sau khi người dùng đồng ý
          }
     });
});


// login
document.getElementById("login-btn").addEventListener("click", login);

function login(event) {
     event.preventDefault()

     const email = document.getElementById("email").value.trim()
     const password = document.getElementById("password").value.trim()

     const users = JSON.parse(localStorage.getItem("user"))
     const founduser = users.find((user) => user.email === email && user.password == password)
     if (founduser) {
          Swal.fire({
               title: "Thành công!",
               text: "Đăng nhập thành công",
               icon: "success",
               timer: 1000,
          }).then(() => {
               location.assign("index.html");
          });
     } else {
          Swal.fire({
               title: "Thất bại!",
               text: "Email hoặc mật khẩu sai",
               icon: "error"
          });
          // alert("Đăng nhập thất bại")
     }
}

