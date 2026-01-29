import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCollections() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollections(data);
      setLoading(false);
    }
    getCollections();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
          <div className="row">
          {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap" style={{ height: "200px", background: "#d3d3d3" }}></div>
                <div className="nft_coll_pp" style={{ background: "#d3d3d3", borderRadius: "50%", width: "50px", height: "50px" }}></div>
                <div className="nft_coll_info">
                  <div style={{ background: "#d3d3d3", height: "20px", width: "60%", margin: "auto" }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <OwlCarousel className="owl-theme" {...options}>
          {collections.map((item) => (
            <div className="item" key={item.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={item.nftImage} className="lazy img-fluid" alt={item.title} />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={item.authorImage} alt={item.title} />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.title}</h4>
                  </Link>
                  <span>ERC-{item.code}</span>
                </div>
              </div>
            </div>
          ))}
          </OwlCarousel>
        )} 
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
