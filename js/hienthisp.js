class danhsachgiohang {
    constructor(id, linksp, tensp, giasp, soluong, mota, size, mausac) {
        this.id = id
        this.linksp = linksp
        this.tensp = tensp
        this.giasp = giasp
        this.soluong = soluong
        this.mota = mota
        this.size = size || [];
        this.mausac = mausac || []
    }
}

function hienthisp(mangsp) {
    let divsp = document.getElementById('hien-thi-sp');
    divsp.innerHTML = "";
    let i = 0;
    for (let sp of mangsp) {
        let danhSachSP = JSON.parse(localStorage.getItem("products"));
        let sizes = danhSachSP[i].size || [];
        let colors = danhSachSP[i].mausac || [];

        let sizeOptions = sizes.map(size => `<option value="${size}">${size}</option>`).join("");
        let colorOptions = colors.map(mausac => `<option value="${mausac}">${mausac}</option>`).join("");
        divsp.innerHTML += `
         <div class="card card-sp">
             <img src="${sp.linksp}" alt="no img">
             <div class="card-body">
                 <h5 class="card-title">${sp.tensp}</h5>
                 <p class="card-text">$${sp.giasp}</p>
                 <p class="card-text">Số lượng trong kho: <strong>${sp.soluong}</strong></p>
                 <div class="card-add">
                     <button onclick="back(${i})" class="qty-btn">-</button>
                     <input id="soLuongInput-${i}" type="text" name="quantity" value="1" min="1">
                     <button onclick="next(${i})" class="qty-btn">+</button>
                 </div>
                 <div class="card-select">
                     <label for="">Size:</label>
                     <select name="" id="">${sizeOptions}</select><br>
                     <label for="">Color:</label>
                     <select name="" id="">${colorOptions}</select>
                 </div>
                 <div class="card-delup">
                     <button onclick="xoasp(${i})" class="btn btn-danger">delete</button>
                 </div><br>
                 <button style="margin-left:45px" onclick="themsp(${i})" class="btn btn-success">Thêm vào giỏ hàng</button>
             </div>
         </div>
         `;
        i++;
    }
}

function back(i) {
    let input = document.getElementById(`soLuongInput-${i}`);
    let soLuong = parseInt(input.value);
    if (soLuong > 1) {
        soLuong--;
        input.value = soLuong;
    }
}

function next(i) {
    let input = document.getElementById(`soLuongInput-${i}`);
    let soLuong = parseInt(input.value);
    soLuong++;
    input.value = soLuong;
}


window.onload = function () {
    let danhsachsp = JSON.parse(localStorage.getItem("products")) || [];
    hienthisp(danhsachsp);
}

// Xóa sản phẩm
function xoasp(i) {
    let danhSachSP = JSON.parse(localStorage.getItem("products"));
    danhSachSP.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(danhSachSP));
    hienthisp(danhSachSP);
}

function themsp(i) {
    let danhSachSP = JSON.parse(localStorage.getItem("products")) || []; // Lấy danh sách sản phẩm từ localStorage
    let sp = danhSachSP[i];

    let input = document.getElementById(`soLuongInput-${i}`);
    let soLuong = parseInt(input.value);

    // Kiểm tra nếu số lượng trong kho không đủ
    if (soLuong > sp.soluong) {
        Swal.fire({
            title: "Lỗi!",
            text: "Số lượng sản phẩm trong giỏ hàng vượt quá số lượng trong kho!",
            icon: "error"
        });
        return;
    }

    let gioHang = JSON.parse(localStorage.getItem("cartlist")) || [];

    let index = gioHang.findIndex(item => item.id === sp.id);
    if (index !== -1) {
        gioHang[index].soluong += soLuong;
    } else {
        gioHang.push({
            id: sp.id,
            linksp: sp.linksp,
            tensp: sp.tensp,
            giasp: sp.giasp,
            soluong: soLuong,  // Số lượng sản phẩm trong giỏ hàng
            mota: sp.mota,
            size: sp.size || [],
            mausac: sp.mausac || []
        });
    }

    localStorage.setItem("cartlist", JSON.stringify(gioHang));

    sp.soluong -= soLuong;

    danhSachSP[i] = sp;
    localStorage.setItem("products", JSON.stringify(danhSachSP));

    Swal.fire({
        title: "Thành công!",
        text: "Đã thêm thành công sản phẩm vào giỏ hàng!",
        icon: "success"
    });
    setTimeout(function() {
        hienthisp(danhSachSP);
    }, 1000);
}
