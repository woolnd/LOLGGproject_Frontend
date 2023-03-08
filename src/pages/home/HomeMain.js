import React from "react";
import "./Home.css";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import intro from "../../img/intro.gif";
import search from "../../img/searchBtn.gif";

const HomeMain = ({ history }) => {
  const [username, setUsername] = useState("");

  const handleInput = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/summoner/" + username);
  };

  return (
      <div className="container">
        <div className="logo">
          <div id="logo">
            <img
                src={intro}
            />
          </div>
        </div>
        <form
            onSubmit={handleSubmit}
            className="summoner_search"
            autoComplete="off"
        >
          <input
              type="text"
              name="username"
              onChange={handleInput}
              className="summoner_search_input"
              placeholder="소환사명 ..."
              autoComplete="off"
          />
          <button type="submit" className="summoner_search_btn">
            <img src={search} alt="검색"/>
          </button>
        </form>
      </div>
  );
};

export default withRouter(HomeMain);
