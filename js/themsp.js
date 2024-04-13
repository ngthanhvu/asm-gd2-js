class product {
     constructor(id,linksp,tensp,giasp,soluong,mota,size,mausac) {
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

function idtutang () {
     let id = parseInt(localStorage.getItem("lastUserId")) || 0;
     id++;
     localStorage.setItem('lastUserId',id.toString());
     return id;
}

// thêm size
// Khai báo mảng lưu trữ các kích thước
let cacKichThuoc = [];

document.getElementById("them_size").addEventListener("click", function () {
    let kichThuocMoi = document.getElementById("them-size").value.trim();

    if (kichThuocMoi !== "") {
        cacKichThuoc.push(kichThuocMoi);

        let selectKichThuoc = document.getElementById("select-size");
        let option = document.createElement("option");
        option.text = kichThuocMoi;
        option.value = kichThuocMoi;
        selectKichThuoc.add(option);

        document.getElementById("them-size").value = "";
    } else {
        // alert("Vui lòng nhập kích thước trước khi thêm.");
        Swal.fire({
            title: "Thất bại!",
            text: "Vui lòng nhập kích thước trước khi thêm.",
            icon: "error"
        });
    }
});

// thêm màu
let cacMauSac = []

document.getElementById("them_mau").addEventListener("click", function () {
    let newcolor = document.getElementById("them-mau").value.trim()

    if (newcolor !== "") {
        cacMauSac.push(newcolor);

        let chonColor = document.getElementById("select-color")
        let option = document.createElement("option");
        option.text = newcolor;
        option.value = newcolor;
        chonColor.add(option)
        document.getElementById("them-mau").value = "";
    } else {
        // alert("Vui lòng nhập kích thước trước khi thêm")
        Swal.fire({
            title: "Thất bại!",
            text: "Vui lòng nhập kích thước trước khi thêm",
            icon: "error"
        });
    }
});

document.getElementById("nut-new-product").addEventListener("click", function (event) {
    event.preventDefault();

    let linkanh = document.getElementById("linkanh").value.trim();
    let tensp = document.getElementById("tensp").value.trim();
    let giasp = document.getElementById("giasp").value.trim();
    let soluongsp = document.getElementById("soluong").value.trim();
    let mota = document.getElementById("motasp").value.trim();

    if (linkanh === "" || tensp === "" || giasp === "" || soluongsp === "" || mota === "") {
        Swal.fire({
            title: "Thất bại!",
            text: "Vui lòng điền đầy đủ thông tin",
            icon: "error"
        });
        return;
    }

    let id = idtutang(); // Hàm idtutang() để sinh id tự động
    let sanPhamMoi = new product(id, linkanh, tensp, giasp, soluongsp, mota);

    sanPhamMoi.size = cacKichThuoc;
    sanPhamMoi.mausac = cacMauSac;

    let danhSachSanPham = JSON.parse(localStorage.getItem("products")) || [];

    danhSachSanPham.push(sanPhamMoi);

    localStorage.setItem("products", JSON.stringify(danhSachSanPham));

    Swal.fire({
        title: "Thành công!",
        text: "Thêm sản phẩm thành công",
        icon: "success"
    });

    cacKichThuoc = [];
    cacMauSac = [];

    document.getElementById("linkanh").value = "";
    document.getElementById("tensp").value = "";
    document.getElementById("giasp").value = "";
    document.getElementById("soluong").value = "";
    document.getElementById("motasp").value = "";

    let selectKichThuoc = document.getElementById("select-size");
    selectKichThuoc.innerHTML = "";
    let selectMauSac = document.getElementById("select-color");
    selectMauSac.innerHTML = "";
});


