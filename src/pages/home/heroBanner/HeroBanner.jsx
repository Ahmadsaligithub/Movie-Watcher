import React, { useState, useEffect } from "react";
import "./HeroBanner.css";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const navigate = useNavigate();
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { backdrop, poster, profile } = useSelector((state) => state.home.url);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const handleSearch = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    } else {
    }
    setQuery("");
  };
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    } else {
    }
  };
  return (
    <>
      <div className="heroBanner">
        {!loading && (
          <div className="backdrop-img">
            <Img src={background} />
          </div>
        )}

        <div className="opacity-layer"></div>

        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
              Millions of movies,TV shows are people to discover. Explore Now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or TV show..."
                value={query}
                onKeyUp={searchQueryHandler}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <button className="search" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};

export default HeroBanner;
