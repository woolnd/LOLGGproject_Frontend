import React from "react";
import NavigationBar from "../../addition/navigation-bar";
import Descript from "../../addition/Descript";
import "./Home.css";
import HomeMain from "./HomeMain";

const Home = () => {
  return (
    <div className="home_container">
      <NavigationBar />
      <HomeMain />
      <Descript />
    </div>
  );
};

export default Home;
