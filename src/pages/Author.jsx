import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import AOS from 'aos'; 

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();

    async function getAuthorData() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getAuthorData();
    }
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          style={{ 
            background: `url(${AuthorBanner}) center`, 
            height: "300px", 
            backgroundSize: "cover" 
          }}
          data-aos="fade-in"
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex" data-aos="fade-up" data-aos-delay="200">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <div className="skeleton-box" style={{ width: "150px", height: "150px", borderRadius: "100%" }}></div>
                      ) : (
                        <img src={author?.authorImage} alt="author" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <div className="skeleton-box" style={{ width: "200px", height: "26px" }}></div>
                          ) : (
                            author?.authorName
                          )}
                          <span className="profile_username">
                            {loading ? (
                              <div className="skeleton-box" style={{ width: "100px", height: "20px" }}></div>
                            ) : (
                              author?.tag ? `@${author.tag}` : ""
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? (
                              <div className="skeleton-box" style={{ width: "250px", height: "20px" }}></div>
                            ) : (
                              author?.address
                            )}
                          </span>
                          {!loading && author && (
                            <button id="btn_copy" title="Copy Text" className="btn-main" style={{marginLeft: "10px", padding: "4px 12px"}}>Copy</button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <div className="skeleton-box" style={{ width: "150px", height: "40px" }}></div>
                      ) : (
                        author && (
                          <>
                            <div className="profile_follower">
                              {following ? (author.followers || 0) + 1 : (author.followers || 0)} followers
                            </div>
                            <button className="btn-main" onClick={() => setFollowing(!following)}>
                              {following ? "Unfollow" : "Follow"}
                            </button>
                          </>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple" data-aos="fade-up" data-aos-delay="400">
                  <AuthorItems 
                    nftData={author?.nftCollection} 
                    authorImage={author?.authorImage} 
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;