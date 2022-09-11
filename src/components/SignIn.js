import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../constants/Api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const signIn = () => {
    axios
      .post(api + "api/auth/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        const { data } = res;
        if (data.status) {
          Swal.fire({
            icon: "success",
            title: `เข้าสู่ระบบ`,
            text: `เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ คุณ${data.data.user.name}`,
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            localStorage.setItem("key_name", data.data.user.name);
            navigate("/");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: `เข้าสู่ระบบ`,
            text: `เข้าสู่ระบบไม่สำเร็จ รหัสผ่านไม่ถูกต้อง`,
            showConfirmButton: false,
            timer: 3000,
          })
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="home-bg">
      <div className="home-bg3 d-flex justify-content-center d-flex align-items-center">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 bg-white p-5 rounded-1">
              <h4>เข้าสู่ระบบ</h4>
              <div className="row text-start">
                <div className="col-12">
                  <label for="username">Email</label>
                  <input
                    className="form-control mt-2"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="col-12 mt-2">
                  <label for="username">Password</label>
                  <input
                    className="form-control mt-2"
                    type="password"
                    id="username"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="d-grid gap-2  mt-4 mb-2">
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={() => signIn()}
                  >
                    เข้าสู่ระบบ
                  </button>
                  <Link class="btn btn-danger " type="button" to="/">
                    ยกเลิก
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
