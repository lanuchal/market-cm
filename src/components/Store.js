import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../constants/Api";
import Header from "./common/Header";

function Store() {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [detail, setDetail] = useState();

  const [dataImg, setDataImg] = useState([]);

  useEffect(() => {
    getMarket();
    getImgs();
  }, []);

  const getMarket = async () => {
    await axios.get(api + "api/store?id=" + location.state.id).then((res) => {
      const { data } = res;
      const market = data.data[0];
      setName(market.name);
      setDetail(market.details);
    });
  };

  const getImgs = async () => {
    await axios
      .get(api + "api/store/listimage?market_id=" + location.state.id)
      .then((res) => {
        const { data } = res;
        const datas = data.data;
        setDataImg(datas);
      });
  };
  // console.log(store.length);
  return (
    <div className="position-relative">
      <div className="head-bg shadow ">
        <Header />
        <div className="container-lg">
          <div className="row mt-2">
            <div className="col-md-6">
              <span className="d-flex align-items-center">
                <h1 className="text-color fst-italic">
                  <strong>{name}</strong>
                </h1>
                <span className="ms-5 text-color"> รายละเอียด : {detail}</span>
              </span>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-1 p-0">
              <button
                className="btn-search p-2 px-3 text-sm"
                onClick={() => {
                  navigate("/");
                }}
              >
                <p className="text-success m-0 p-0">ตลาดยอดฮิต</p>
              </button>
            </div>
            <div className="col-md-1 p-0">
              <button
                className="btn-search p-2 px-3"
                onClick={() => {
                  navigate("/seaechmarket", { state: { name: "" } });
                }}
              >
                <p className="text-success m-0 p-0">ค้นหาตลาด</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="market-bg pt-3">
        <div className="container mt-5">
          <div className="row shadow p-3 mb-5 bg-white rounded mt-5">
            <div className="col-md-12 text-color m-4">
              <h4> <strong>รูปภาพเพิ่มเติม</strong> </h4>
            </div>
            {dataImg.map((index, key) => {
              return (
                <div className="col-md-4 p-2" key={key}>
                  <img src={index.path} alt="" className="d-block w-100" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
