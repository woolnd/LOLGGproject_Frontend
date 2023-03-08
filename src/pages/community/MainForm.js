import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import searchBtn from "../../img/searchBtn.gif"
import lolicon from "../../img/lolicon.png"
export const MainFormBox = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;

  .icon_form {
    margin-left: 30px;
    justify-content: flex-start;
    margin-top: 28px;

    align-items: center;
  }
  .icon_text {
    display: inline-block;
    vertical-align: middle;
    line-height: 39px;
    margin-bottom: 46px;
    margin-left: 8px;
    font-size: 32px;
    color: #fff;
    font-weight: bold;
  }
`;

export const SearchForm = styled.div`
  position: relative;
  justify-content: flex-end;
  .main_input {
    border-radius: 2px;
    background: #fff;
    border: none;
    width: 268px;
    line-height: 17px;
    font-size: 14px;
    padding: 12px 62px 11px 12px;
    box-sizing: border-box;
    height: 40px;
    margin-right: 8px;
  }

  .main_btn {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 5px;
    margin-right: 15px;
    position: absolute;
    background: none;
  }
`;

const MainForm = ({ history }) => {
  const [username, setUsername] = useState("");

  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push("/summoner/" + username);
  };

  return (
    <MainFormBox>
      <Link to="/community">
        <div className="icon_form">
          <img
            src={lolicon}
            alt="아이콘"
          />
          <div className="icon_text">리그오브레전드</div>
        </div>
      </Link>
      <SearchForm>
        <form onSubmit={handleOnSubmit}>
          <input
            onChange={handleOnChange}
            type="text"
            className="main_input"
            placeholder="소환사명..."
          />
          <button className="main_btn" type="submit">
            <img src={searchBtn} alt="검색" />
          </button>
        </form>
      </SearchForm>
    </MainFormBox>
  );
};

export default withRouter(MainForm);
