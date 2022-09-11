import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { api } from "../constants/Api";
import { Link, useNavigate } from "react-router-dom";
// รหัส เบอร์
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [tel, setTel] = useState();
  const [mail, setMail] = useState();
  const [passWord, setPassWord] = useState();
  const [cPassWord, setcPassWord] = useState();

  const onclick_signup = () => {
    if (!name || !tel || !mail || !passWord || !cPassWord) {
      Swal.fire("กรอกข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบถ้วน", "question");
    } else {
      if (passWord !== cPassWord) {
        Swal.fire("รหัสผ่านไม่ตรงกัน", "กรุณากรอกรหัสผ่านให้ตรงกัน", "error");
      } else {
        if (tel.length != 10) {
          Swal.fire(
            "เบอร์โทรศัพไม่ถูกต้อง",
            "กรุณากรอกเบอร์โทรศัพให้ถูกต้อง",
            "error"
          );
        } else {
          axios
            .post(api + "api/auth/register", {
              name: name,
              email: mail,
              password: passWord,
              permission: "MARKET",
              tel: tel,
            })
            .then((res) => {
              if (res.data.status) {
                // console.log("success");
                // history.push("/signin");

                Swal.fire(
                  "สมัครสมาชิกสำเร็จ",
                  "คุฯได้สมัครเป็นสมาชิกแล้ว ไปยังหน้าเข้าสู่ระบบ",
                  "success"
                ).then((res) => {
                  navigate("/signin");
                });
              } else {
                Swal.fire(
                  "อีเมลนี้มีผู้ใช้งานแล้ว",
                  "กรุณากรอกใช้อีเมลอื่น",
                  "question"
                );
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    }
  };
  return (
    <div className="home-bg">
      <div className="home-bg3 d-flex justify-content-center d-flex align-items-center">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 bg-white p-5 rounded-2">
              <h4>สมัครสมาชิก</h4>
              <div className="row text-start">
                <div className="col-6  mt-2 ">
                  <label for="username">&nbsp; ชื่อ-นามสกุล</label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="form-control mt-2"
                    type="text"
                    id="username"
                    placeholder="ชื่อ-นามสกุล"
                    required
                  />
                </div>
                <div className="col-6 mt-2">
                  <label for="tel">&nbsp; เบอร์โทรสัพท์</label>
                  <input
                    value={tel}
                    onChange={(e) => {
                      setTel(e.target.value);
                    }}
                    placeholder="เบอร์โทรสัพท์"
                    className="form-control mt-2"
                    type="number"
                    id="tel"
                    required
                  />
                </div>

                <div className="col-12 mt-3">
                  <label for="mail">&nbsp; อีเมล</label>
                  <input
                    value={mail}
                    onChange={(e) => {
                      setMail(e.target.value);
                    }}
                    placeholder="อีเมล"
                    className="form-control mt-2"
                    type="email"
                    id="mail"
                    required
                  />
                </div>
                <div className="col-6 mt-3">
                  <label for="pass">&nbsp; รหัสผ่าน</label>
                  <input
                    value={passWord}
                    onChange={(e) => {
                      setPassWord(e.target.value);
                    }}
                    placeholder="รหัสผ่าน"
                    className="form-control mt-2"
                    type="password"
                    id="pass"
                    required
                  />
                </div>
                <div className="col-6 mt-3">
                  <label for="cpass">&nbsp; ยืนยันรหัสผ่าน</label>
                  <input
                    value={cPassWord}
                    onChange={(e) => {
                      setcPassWord(e.target.value);
                    }}
                    placeholder="ยืนยันรหัสผ่าน"
                    className="form-control mt-2"
                    type="password"
                    id="cpass"
                    required
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <div className="d-grid gap-2 col-12 mt-4 mb-3">
                    <button
                      className="btn btn-info"
                      type="buttom"
                      onClick={() => {
                        onclick_signup();
                      }}
                    >
                      สมัครสมาชิก
                    </button>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                  <div className="d-grid gap-2 col-12 mt-4 mb-3">
                    <Link className="btn btn-danger" type="buttom" to="/">
                      ยกเลิก
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
