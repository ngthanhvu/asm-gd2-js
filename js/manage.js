
function hienthithongtinnguoidung(danhsachuser) {
    let divUser = document.getElementById('hien-thi-nguoi-dung');
    divUser.innerHTML = "";

    for (let i = 0; i < danhsachuser.length; i++) {
        let user = danhsachuser[i];
        divUser.innerHTML += `
         <div class="main-body">
         <div class="row">
             <div class="col-lg-8">
                 <div class="card">
                     <div class="card-body">
                         <h6 class="mb-4" style="font-size: 25px;">Quản lý thông tin cá nhân</h6>
                         <div class="row mb-3">
                             <div class="col-sm-3">
                                 <h6 class="mb-0">ID user</h6>
                             </div>
                             <div class="col-sm-9 text-secondary">
                                 <input type="text" class="form-control" value="${user.id}">
                             </div>
                         </div>
                         <div class="row mb-3">
                             <div class="col-sm-3">
                                 <h6 class="mb-0">Username</h6>
                             </div>
                             <div class="col-sm-9 text-secondary">
                                 <input type="text" class="form-control" value="${user.username}">
                             </div>
                         </div>
                         <div class="row mb-3">
                             <div class="col-sm-3">
                                 <h6 class="mb-0">Họ Tên</h6>
                             </div>
                             <div class="col-sm-9 text-secondary">
                                 <input type="text" class="form-control" value="${user.hoten}">
                             </div>
                         </div>
                         <div class="row mb-3">
                             <div class="col-sm-3">
                                 <h6 class="mb-0">Email</h6>
                             </div>
                             <div class="col-sm-9 text-secondary">
                                 <input type="email" class="form-control" value="${user.email}">
                             </div>
                         </div>
                         <div class="row mb-3">
                             <div class="col-sm-3">
                                 <h6 class="mb-0">Điện Thoại</h6>
                             </div>
                             <div class="col-sm-9 text-secondary">
                                 <input type="tel" class="form-control" value="${user.sdt}">
                             </div>
                         </div>
                         <div class="row mb-3">
                             <div class="col-sm-3">
                                 <h6 class="mb-0">Số CCCD</h6>
                             </div>
                             <div class="col-sm-9 text-secondary">
                                 <input type="text" class="form-control" value="${user.cccd}">
                             </div>
                         </div>
                         <div class="row mb-3">
                             <div class="col-sm-3">
                                 <h6 class="mb-0">Địa Chỉ</h6>
                             </div>
                             <div class="col-sm-9 text-secondary">
                                 <input type="text" class="form-control" value="${user.diachi}">
                             </div>
                         </div>
                         <div class="row">
                             <div class="col-sm-3"></div>
                             <div class="col-sm-9 text-secondary">
                                 <input type="button" class="btn btn-primary px-4" value="Save Changes">
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
         `;
    }
}

window.onload = function () {
    let danhsachuser = JSON.parse(localStorage.getItem("user")) || [];
    hienthithongtinnguoidung(danhsachuser);
}
