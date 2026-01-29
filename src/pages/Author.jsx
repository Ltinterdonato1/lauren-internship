import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchAuthor() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors"
        );

        if (Array.isArray(data)) {
          const found = data.find((a) => 
            String(a.authorId || a.id || a.AuthorId || a.userId || a.ID) === String(id)
          );

          if (found) {
            setAuthor({
              authorName: found.authorName || found.name || found.AuthorName || "Unknown Author",
              tag: found.tag || found.username || found.handle || found.userName || "",
              authorImage: found.authorImage || found.image || found.avatar || found.pp || "",
              address: found.address || found.wallet || found.walletAddress || "",
              followers: Number(found.followers || found.followerCount || 0),
              nftCollection: found.nftCollection || found.nfts || found.items || [],
            });
          } else {
            setAuthor(null);
          }
        } else {
          setAuthor(null);
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchAuthor();
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
            backgroundSize: "cover",
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <div className="skeleton-box" style={{ width: "150px", height: "150px", borderRadius: "100%" }} />
                      ) : author ? (
                        <img src={author.authorImage} alt="author" />
                      ) : (
                        <div className="skeleton-box" style={{ width: "150px", height: "150px", borderRadius: "100%" }} />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <div className="skeleton-box" style={{ width: "200px", height: "26px" }} />
                          ) : author ? (
                            author.authorName
                          ) : (
                            "Author Not Found"
                          )}
                          <span className="profile_username">
                            {loading ? (
                              <div className="skeleton-box" style={{ width: "100px", height: "20px" }} />
                            ) : author?.tag ? (
                              `@${author.tag}`
                            ) : (
                              ""
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? (
                              <div className="skeleton-box" style={{ width: "250px", height: "20px" }} />
                            ) : author?.address || "No wallet address"}
                          </span>
                          {!loading && author?.address && (
                            <button id="btn_copy" title="Copy Text" className="btn-main" style={{ marginLeft: "10px", padding: "4px 12px" }}>
                              Copy
                            </button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <div className="skeleton-box" style={{ width: "150px", height: "40px" }} />
                      ) : author ? (
                        <>
                          <div className="profile_follower">
                            {author.followers} followers
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems 
                    nftData={author?.nftCollection || []} 
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