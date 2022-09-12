import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api, null_img } from "../constants/Api";
import Header from "./common/Header";
import MapShow from "./MapShow";
import MapShow2 from "./MapShow2";

function SeaMarket() {
  const location = useLocation();
  const navigate = useNavigate();

  const [dataId, setdataId] = useState(0);
  const [name, setName] = useState("ตลาด");
  const [detail, setDetail] = useState("รายละเอียด");
  const [oTime, setOTime] = useState("00.00.00");
  const [cTime, setCTime] = useState("00.00.00");
  const [map_lt, setMap_lt] = useState(0);
  const [map_lg, setMap_lg] = useState(0);

  const [data, setData] = useState([]);

  const [search, setNewSearch] = useState("");
  useEffect(() => {
    getdata();
    setNewSearch(location.state.name)
    // location.state.id
  }, []);

  const getdata = async () => {
    await axios.get(api + "api/market").then((res) => {
      const { data } = res;
      setData(data.data);
    });
  };

  const getMarket = async (data) => {
    await axios.get(api + "api/market?id=" + data).then((res) => {
      const { data } = res;
      const market = data.data[0];
      setdataId(market.id);
      setName(market.name);
      setDetail(market.details);
      setOTime(market.openTime);
      setCTime(market.closeTime);
      setMap_lt(market.location_lat);
      setMap_lg(market.location_lng);
    });
  };

  //   const [APIData, setAPIData] = useState([]);


  const filtered = !search
    ? data
    : data.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );


  return (
    <div className="position-relative">
      <div className="head-bg shadow ">
        <Header />
        <div className="row mt-0">
          <div className="col-md-11"></div>
          <div className="col-md-1 p-0 mb-3 text">
            <button
              className="btn-search p-2 px-3 text-sm"
              onClick={() => {
                navigate("/");
              }}
            >
              <p className="text-success m-0 p-0 nh">ตลาดยอดฮิต</p>
            </button>
          </div>
        </div>
      </div>
      <div className="market-bg pt-1">
        <div className="container-lg  mt-5 ">
          <div className="row shadow p-1 mb-2 bg-white rounded mt-3">
            <div className="col-md-8">
              <h4 className="text-color mt-3">
                <strong>ตลาดทั้งหมด</strong>{" "}
              </h4>
              <div className="row box-map0">
                {filtered.map((index, key) => {
                  return (
                    <div
                      className="col-md-3 mt-2 p-1 curcer"
                      key={key}
                      onClick={() => {
                        getMarket(index.id);
                      }}
                    >
                      <div className="shadow pb-2 boxx-map">
                        <img
                          src={index.img != null ? index.img : null_img}
                          alt=""
                          className="d-block w-100"
                        />
                        <p className="px-2 m-0 base-box mt-1">
                          {index.name}
                          <p className="details">{index.details}</p>
                        </p>
                        <strong className="px-2">เปิดเวลา</strong>
                        <div className="px-2">
                          {index.openTime.slice(0, -3)} -{" "}
                          {index.closeTime.slice(0, -3)} น.
                        </div>
                      </div>
                    </div>
                  );
                })}

                
              </div>
            </div>
            <div className="col-md-4 position-relative p-0">
              <div className="row">
                <div className="box-map p-2 col-md-3">
                  <div className="bg-map p-2 pt-4">
                    <MapShow2 m_lat={map_lt} m_lng={map_lg} />
                    <div className="shadow p-3 mb-5 bg-body  bb">
                      <strong className="text-color"> {name}</strong>
                      <p className="text-color">{detail}</p>
                      <p className="text-color">
                        เปิดเวลา {oTime.slice(0, -3)} - {cTime.slice(0, -3)} น.
                      </p>
                      <div className="text-end">
                        <button
                          type=""
                          className="btn base-box"
                          onClick={() => {
                            navigate("/market", { state: { id: dataId } });
                          }}
                        >
                          ดูรายละเอียด
                        </button>
                      </div>
                    </div>
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

export default SeaMarket;
