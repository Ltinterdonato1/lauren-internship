import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from "axios";
import AOS from 'aos';

const Explore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();

    async function fetchExploreItems() {
      setLoading(true);
      try {
        const url = filter 
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
          : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        
        const { data } = await axios.get(url);
        setItems(data);
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExploreItems();
  }, [filter]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
          data-aos="fade-in"
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems 
                items={items} 
                loading={loading} 
                setFilter={setFilter} 
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;