import axios from "axios";
import React, { useState, useEffect } from "react";
import { api, null_img } from "../constants/Api";
import { Carousel } from "3d-react-carousal";
import Header from "./common/Header";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    await axios.get(api + "api/market").then((res) => {
      const { data } = res;
      setData(data.data);
    });
  };

  let slides = data.map((index, key) => {
    return (
      <div className="curcer h-100">
        <img
          src={index.img != null ? index.img : null_img}
          alt={key + 1}
          onClick={() => {
            selectMarket(index.id);
          }}
        />
      </div>
    );
  });

  const selectMarket = (data) => {
    navigate("/market", { state: { id: data } });
  };
  return (
    <div>
      <div className="home-bg">
        <div className="crop">
          <Header />
          <div className="container h-100">
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-md-6 header-market">
                <h1>ตลาดเชียงใหม่</h1>
                <div>เว็ปแอพพลิเคชั่น </div>
                <div>การจัดการตลาดนัด</div>
                <div>(เชียงใหม่).</div>
                <button
                  className="btn-search-2"
                  onClick={() => {
                    navigate("/seaechmarket", { state: { name: "" } });
                  }}
                >
                  ค้นหาตลาด
                </button>
              </div>
              <div className="col-md-6 mt-5">
                <div className="mt-5">
                  <Carousel
                    slides={slides}
                    autoplay={true}
                    arrows={false}
                    interval={2000}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="btn-top">ตลาดยอดฮิต</button>
        </div>
      </div>
      <div className="home-bg2">
        <div className="container boxbg2 mt-5 mb-5">
          <div className="row">
            {data.map((index, key) => {
              return (
                <div
                  className="col-md-4 p-4"
                  key={key}
                  onClick={() => selectMarket(index.id)}
                >
                  <div className="shadow mb-1 box-market curcer">
                    <img
                      className="w-100 d-block box-img-mk"
                      src={index.img != null ? index.img : null_img}
                    />
                    <label className="row px-2 mt-2 curcer">
                      <div className="col-8">
                        <h5>
                          <b>{index.name}</b>
                        </h5>
                        <p>{index.details}</p>
                      </div>
                      <div className="col-4 pt-2 text-center">
                        <div>เปิด</div>
                        <div>
                          {index.openTime.slice(0, -3)} -{" "}
                          {index.closeTime.slice(0, -3)}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
