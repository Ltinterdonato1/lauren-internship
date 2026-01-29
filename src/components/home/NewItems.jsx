import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = expiryDate - now;

      if (distance < 0) {
        setTimeLeft("Expired");
        clearInterval(timer);
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNewItems() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setItems(data);
      setLoading(false);
    }
    getNewItems();
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
             <div className="row">
             {new Array(4).fill(0).map((_, index) => (
               <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                 <div className="nft__item">
                    <div className="author_list_pp" style={{ background: "#d3d3d3", width: "50px", height: "50px", borderRadius: "50%" }}></div>
                    <div className="nft__item_wrap" style={{ height: "250px", background: "#d3d3d3" }}></div>
                    <div className="nft__item_info">
                      <div style={{ background: "#d3d3d3", height: "20px", width: "70%", marginTop: "10px" }}></div>
                      <div style={{ background: "#d3d3d3", height: "20px", width: "40%", marginTop: "10px" }}></div>
                    </div>
                  </div>
               </div>
             ))}
           </div>
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              {items.map((item) => (
                <div className="item" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`} title={`Creator: ${item.title}`}>
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg"></i></a>
                            <a href="" target="_blank" rel="noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
                            <a href=""><i className="fa fa-envelope fa-lg"></i></a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
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

export default NewItems;