import React, { useEffect } from "react";
import "./App.css";
import { fetchDataFromApi } from "./utils/Api";
import { getApiConfiguration, getGenres } from "./slice/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
   
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      
      dispatch(getApiConfiguration(url));
    });
  };

  const genResCall = async () => {
    let promise = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((urll) => {
      promise.push(fetchDataFromApi(`/genre/${urll}/list`));
    });

    const data = await Promise.all(promise);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  useEffect(() => {
    fetchApiConfig();
    genResCall();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
