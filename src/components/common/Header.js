import axios from "axios";
import React, { useState, useEffect } from "react";
import { api } from "../../constants/Api";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Header() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [name, setName] = useState(null);

  useEffect(() => {
    const key_name = localStorage.getItem("key_name");
    console.log("key_name", key_name);
    setName(key_name);
  }, []);

  const signOut = () => {
    Swal.fire({
      title: "ออกจากระบบ",
      text: "กดยืนยันเพื่อออกจากระบบ",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "ยืนยัน",
      denyButtonText: `ยกเลิก`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("key_name");
        setName("");
        Swal.fire({
          icon: "success",
          title: `ออกจากระบบสำเร็จ`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload(false);
        });
      }
    });
  };
  return (
    <div className="pt-2">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand ps-5" to="/">
            LOGO
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav me-auto mb-2 mb-lg-0"></div>
            <form className="d-flex" role="search">
              <input
                className="input-search px-3 form-control "
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <button
                className="btn-search mx-2"
                onClick={() => {
                  navigate("/head");
                  setTimeout(() => {
                    navigate("/seaechmarket", { state: { name: data } });
                  }, 50);
                }}
              >
                ค้นหาตลาด
              </button>
            </form>
            {name != null ? (
              <ul className="navbar-nav mb-lg-0">
                <li className="nav-item text-center px-2">
                  <Link className="nav-link text-warning" to="/">
                    ยินดีต้อนรับ
                  </Link>
                </li>
                <li className="nav-item text-center px-2">
                  <Link className="nav-link text-warning" to="/">
                    คุณ {name}
                  </Link>
                </li>
                <li className="nav-item text-center px-2">
                  <Link
                    className="nav-link text-danger"
                    to="/"
                    onClick={() => signOut()}
                  >
                    ออกจากระบบ
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link text-warning mx-2" to="/signup">
                    สมัครสมาชิก
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link text-info mx-2" to="/signin">
                    เข้าสู่ระบบ
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
