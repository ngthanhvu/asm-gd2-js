function hienthisphome(mangsp) {
    let divsp = document.getElementById('hien-thi-home');
    divsp.innerHTML = "";
    let i = 0;
    for (let sph of mangsp) {
        divsp.innerHTML += `
         <div class="card">
             <img src="${sph.linksp}"
                     class="card-img-top" alt="...">
             <div class="card-body">
                     <h5 class="card-title">${sph.tensp}</h5>
                     <p class="card-text">$${sph.giasp}</p>
                     <a style="margin-left: 75px;" href="./assets/sanpham.html" class="btn btn-success">Xem chi tiết</a>
             </div>
         </div>
  `;
        i++;
    }
}

function giohang() {
    let dsgiohang = JSON.parse(localStorage.getItem("cartlist"));
    let divgiohang = document.getElementById("hien-thi-giohang");

    divgiohang.innerHTML = "";
    let i = 0;
    if (dsgiohang) {
        dsgiohang.forEach(item => {
            let tongGia = item.soluong * parseFloat(item.giasp)
            divgiohang.innerHTML += `
                 <li>
                     <div class="d-flex">
                         <img style="width: 100px; height: 100px; flex-shrink: 0; margin-right: 10px;"
                             src="${item.linksp}"
                             alt="">
                         <div>
                             <span>Tên: ${item.tensp}</span><br>
                             <span>Giá: ${item.giasp}$</span><br>
                             <span>Số lượng: </span><input type="number" id="sl-${i}" value="${item.soluong}" onchange="capNhatSoLuong(${i})" style="width: 50px;"> <br>
                             <span>Tổng tiền: ${tongGia}$</span><br>
                             <button onclick="xoasp(${i})" class="btn btn-danger">xóa</button>
                             <button onclick="capnhatsoluong(${i}" class="btn btn-success">Cập nhật</button>
                         </div>
                     </div>
                 </li>
                 `;
            i++;
        });

    }
}


function capNhatSoLuong(index) {
    let input = document.getElementById(`sl-${index}`);
    let soluongmoi = parseInt(input.value);
    let gioHang = JSON.parse(localStorage.getItem("cartlist"));

    if (soluongmoi < 1) {
        alert("Số lượng không hợp lệ!");
        input.value = 1; // Reset lại số lượng thành 1
        return;
    }

    let sp = gioHang[index];
    let idSP = sp.id;

    let danhSachSP = JSON.parse(localStorage.getItem("products"));

    let sanPhamTrongKho = danhSachSP.find(sp => sp.id === idSP);

    let soLuongBanDau = parseInt(sanPhamTrongKho.soluong);

    let soLuongMoi = parseInt(sp.soluong);

    let soLuongThayDoi = soluongmoi - soLuongMoi;

    // Cập nhật số lượng mới vào giỏ hàng
    gioHang[index].soluong = soluongmoi;
    localStorage.setItem("cartlist", JSON.stringify(gioHang));

    // Cập nhật số lượng mới vào kho
    sanPhamTrongKho.soluong = soLuongBanDau - soLuongThayDoi;
    localStorage.setItem("products", JSON.stringify(danhSachSP));

    giohang();
}



function xoasp(i) {
    let danhSachSP = JSON.parse(localStorage.getItem("cartlist"));
    danhSachSP.splice(i, 1);
    localStorage.setItem("cartlist", JSON.stringify(danhSachSP));
    giohang(danhSachSP);
}


window.onload = function () {
    let danhsachsp = JSON.parse(localStorage.getItem("products")) || [];
    hienthisphome(danhsachsp);
    giohang();
}