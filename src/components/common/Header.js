import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "./img_logo.jpg";
function Header() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [name, setName] = useState(null);

  useEffect(() => {
    const key_name = localStorage.getItem("key_name");
    setName(key_name);
  }, []);

  const signOut = () => {
    Swal.fire({
      title: "ออกจากระบบ",
      text: "กดยืนยันเพื่อออกจากระบบ",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: "#04af6e",
      denyButtonText: `ยกเลิก`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("key_name");
        setName("");
        Swal.fire({
          icon: "success",
          title: `ออกจากระบบสำเร็จ`,
          showConfirmButton: false,
          confirmButtonColor: "#fff",
          timer: 1500,
        }).then(() => {
          window.location.reload(false);
        });
      }
    });
  };
  return (
    <div>
      {/* <div className="pt-2">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand ps-5" to="/">
              <img
                src={logo}
                alt=""
                className="d-block rounded-circle"
                height={70}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            />
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
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
      </div> */}

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt=""
              className="d-block rounded-circle"
              height={70}
            />
          </Link>
          <button
            className="navbar-toggler bg-warning text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="me-auto"></div>
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
                <li className="nav-item ">
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
