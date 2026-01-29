import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ nftData, authorImage, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="row">
        {loading
          ? // Skeleton Loading State
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div className="skeleton-box" style={{ width: "50px", height: "50px", borderRadius: "100%" }}></div>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="skeleton-box" style={{ width: "100%", height: "250px" }}></div>
                  </div>
                  <div className="nft__item_info">
                    <div className="skeleton-box" style={{ width: "100px", height: "20px" }}></div>
                    <div className="skeleton-box" style={{ width: "60px", height: "20px" }}></div>
                  </div>
                </div>
              </div>
            ))
          : // Actual Data State
            nftData?.map((nft) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    {/* Link back to the author (even if it's the current page) */}
                    <Link to={`/author/${nft.authorId}`}>
                      <img className="lazy" src={authorImage} alt="Author" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${nft.nftId}`}>
                      <img src={nft.nftImage} className="lazy nft__item_preview" alt={nft.title} />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nft.nftId}`}>
                      <h4>{nft.title}</h4>
                    </Link>
                    <div className="nft__item_price">{nft.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default AuthorItems;