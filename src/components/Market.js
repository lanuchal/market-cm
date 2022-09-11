import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import { api } from "../constants/Api";
import Header from "./common/Header";
import MapShow from "./MapShow";

function Market() {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [moD, setMoD] = useState(0);
  const [tuD, setTuD] = useState(0);
  const [weD, setWeD] = useState(0);
  const [thD, setThd] = useState(0);
  const [frD, setFrd] = useState(0);
  const [saD, setSaD] = useState(0);
  const [suD, setSud] = useState(0);
  const [oTime, setOTime] = useState(0);
  const [cTime, setCTime] = useState(0);
  const [map_lt, setMap_lt] = useState(0);
  const [map_lg, setMap_lg] = useState(0);

  const [store, setStore] = useState([]);
  const [dataImg, setDataImg] = useState([]);

  useEffect(() => {
    getMarket();
    getStore();
    getImgs();
  }, []);

  const getMarket = async () => {
    await axios.get(api + "api/market?id=" + location.state.id).then((res) => {
      const { data } = res;
      const market = data.data[0];
      setName(market.name);
      setDetail(market.details);
      setMoD(market.mondayOpen);
      setTuD(market.tuesdayOpen);
      setWeD(market.wednesdayOpen);
      setThd(market.thursdayOpen);
      setFrd(market.fridayOpen);
      setSaD(market.saturdayOpen);
      setSud(market.sundayOpen);
      setOTime(market.openTime);
      setCTime(market.closeTime);
      setMap_lt(market.location_lat);
      setMap_lg(market.location_lng);
    });
  };
  const getStore = async () => {
    await axios
      .get(api + "api/store?market_id=" + location.state.id)
      .then((res) => {
        const { data } = res;
        const stores = data.data;
        setStore(stores);
      });
  };
  const getImgs = async () => {
    await axios
      .get(api + "api/market/listimage?market_id=" + location.state.id)
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
              <h1 className="text-color fst-italic">
                <strong>{name}</strong>
              </h1>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-1 p-0">
              
              <button className="btn-search p-2 px-3 text-sm" onClick={()=>{
                navigate("/")
              }}>
                <p className="text-success m-0 p-0">ตลาดยอดฮิต</p>
              </button>
            </div>
            <div className="col-md-1 p-0">
              <button className="btn-search p-2 px-3"  onClick={()=>{
                    navigate("/seaechmarket", { state: { name: "" } });
              }}>
                <p className="text-success m-0 p-0">ค้นหาตลาด</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="market-bg">
        <div className="container  mt-5 mb-5">
          <div className="row pt-4">
            <div className="col-md-3 text-center">
              <h3 className="">ข้อมูลตลาด</h3>
              <div className="shadow p-3 mb-5 bg-body rounded-2">
                <div className="row text-color text-start">
                  <div className="col-4">
                    <b>ชื่อ</b>
                  </div>
                  <div className="col-8">{name}</div>
                  <div className="col-4">
                    <b>รายละเอียด</b>
                  </div>
                  <div className="col-8">{detail}</div>
                </div>
                <div className="row text-center pt-3">
                  <div className="col-6 text-end">วันจันทร์</div>
                  <div className="col-6 text-start">
                    {moD ? (
                      <p className="text-success m-0">เปิด</p>
                    ) : (
                      <p className="text-danger m-0">ปิด</p>
                    )}
                  </div>
                  <div className="col-6 text-end">วันอังคาร</div>
                  <div className="col-6 text-start">
                    {tuD ? (
                      <p className="text-success m-0">เปิด</p>
                    ) : (
                      <p className="text-danger m-0">ปิด</p>
                    )}
                  </div>
                  <div className="col-6 text-end">วันพุธ</div>
                  <div className="col-6 text-start">
                    {weD ? (
                      <p className="text-success m-0">เปิด</p>
                    ) : (
                      <p className="text-danger m-0">ปิด</p>
                    )}
                  </div>
                  <div className="col-6 text-end">วันพฤหัสบดี</div>
                  <div className="col-6 text-start">
                    {thD ? (
                      <p className="text-success m-0">เปิด</p>
                    ) : (
                      <p className="text-danger m-0">ปิด</p>
                    )}
                  </div>
                  <div className="col-6 text-end">วันศุกร์</div>
                  <div className="col-6 text-start">
                    {frD ? (
                      <p className="text-success m-0">เปิด</p>
                    ) : (
                      <p className="text-danger m-0">ปิด</p>
                    )}
                  </div>
                  <div className="col-6 text-end">วันเสาร์</div>
                  <div className="col-6 text-start">
                    {saD ? (
                      <p className="text-success m-0">เปิด</p>
                    ) : (
                      <p className="text-danger m-0">ปิด</p>
                    )}
                  </div>
                  <div className="col-6 text-end">วันอาทิต</div>
                  <div className="col-6 text-start">
                    {suD ? (
                      <p className="text-success m-0">เปิด</p>
                    ) : (
                      <p className="text-danger m-0">ปิด</p>
                    )}
                  </div>
                </div>
                <div className="row text-center pt-3 ">
                  <div className="col-4 text-end text-color">เวลาเปิด</div>
                  <div className="col-8 text-start">
                    {oTime} - {cTime}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9 shadow p-0 rounded-4">
              <MapShow m_lat={map_lt} m_lng={map_lg} />
            </div>
          </div>
          <div className="container px-5">
            <div className="row shadow p-3 mb-5 bg-white rounded mt-3">
              <div className="d-flex align-items-center scroll">
                {dataImg.length != 0 ? (
                  <>
                    {dataImg.map((index, key) => {
                      return (
                        <div key={key} className="box-store p-2">
                          <img
                            src={index.path}
                            alt=""
                            className="d-block h-100 rounded-3"
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>

              <h4 className="px-5 mt-4 text-color">
                <strong>ร้านค้าในตลาด</strong>{" "}
              </h4>
              {store.length != 0 ? (
                <>
                  {store.map((index, key) => {
                    return (
                      <div key={key} className="col-md-6 p-3">
                        <div className="row">
                          <div className="col-md-6">
                            <img
                              src={index.img}
                              alt=""
                              className="d-block w-100 rounded-2"
                            />
                          </div>
                          <div className="col-md-6 text-start pt-5">
                            <h5>
                              ร้าน <strong>{index.name}</strong>{" "}
                            </h5>
                            <br />
                            รายละเอียด
                            <br />
                            {index.details}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;
