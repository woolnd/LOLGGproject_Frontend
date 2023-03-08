import React, { useState } from "react";
import styled from "styled-components";
import { CommunityWrap } from "./Community";
import NavigationBar from "../../addition/navigation-bar";
import MainForm from "./MainForm";
import Descript from "../../addition/Descript";
import { withRouter } from "react-router-dom";
import {boardWrite} from "../../_actions/userAction";
import {useDispatch} from "react-redux";

const WriteBox = styled.div`
  text-align: center;
  width: 100%;

  .write_container {
    background: rgb(255, 255, 255);
    padding: 20px 10px;
  }
  
  .write_title {
    color: rgb(30, 32, 34);
    text-align: left;
    font-weight: 700;
  }
  .write_area {
    margin-top: 16px;
  }
  .write_header {
    position: static;
    text-align: left;
    padding-bottom: 0px;
    padding-top: 8px;
    background: rgb(255, 255, 255);
  }

  .write_area_title {
    display: block;
    width: 100%;
    background-color: rgb(255, 255, 255);
    line-height: 19px;
    font-size: 16px;
    color: rgb(30, 32, 34);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(221, 223, 228);
    border-image: initial;
    padding: 10px 16px 9px;
  }

  .write_content {
    width: 100%;
  }
  
  .write_area_content {
    width: 97.8%;
    margin-top: 13px;
    border: 1px solid rgb(221, 223, 228);
    color: rgb(30, 32, 34);
    resize: none;
    height: 350px;
    font-size: 17px;
    padding: 10px;
  }

  .write_submit_btn {
    margin-top: 16px;
    position: static;
    border: 0;
    color: #fff;
    border-radius: 4px;
    background-color: #46cfa7;
    width: 154px;
    height: 48px;
    line-height: 19px;
    font-size: 16px;
  }

  .write_cancel_btn {
    margin-top: 16px;
    line-height: 19px;
    font-size: 16px;
    color: #7b858e;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #dddfe4;
    width: 154px;
    height: 48px;
  }

  .write_btn {
    display: flex;
    text-align: center;
    justify-content: space-between;
  }
`;

const CommunityWrite = ({ history }) => {

  const dispatch = useDispatch();

  const user= localStorage.getItem("jwtToken");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);

    let body = {
      title: title,
      content: content,
      token: user,
    }
    dispatch(boardWrite(body)).then((res) => {
      if(res.payload.status === 200){
        console.log(res);
        alert("글작성이 완료되었습니다.");
        history.push("/community");
      }else{
        alert("글 작성에 실패하였습니다.");
      }
    })
  };

  return (
    <div>
      <CommunityWrap>
        <NavigationBar />
        <div className="communityWrite_conatiner">
          <MainForm />
          <div>
            <WriteBox>
              <div className="content">
                <form onSubmit={handleSubmit}>
                  <div className="write_container">
                    <div className="write_header">
                      <div className="write_title">글쓰기</div>
                    </div>
                    <div className="write_area">
                      <input
                        onChange={handleChangeTitle}
                        type="text"
                        name="title"
                        className="write_area_title"
                        placeholder="제목"
                        autoComplete="off"
                      />
                    </div>
                    <div className="write_content">
                      <textarea
                        onChange={handleChangeContent}
                        className="write_area_content"
                      ></textarea>
                    </div>
                    <div className="write_btn">
                      <button
                        className="write_cancel_btn"
                        type="button"
                        onClick={() => history.push("/community")}
                      >
                        취소
                      </button>
                      <button
                        className="write_submit_btn"
                        type="submit"
                      >
                        작성완료
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </WriteBox>
          </div>
          <Descript />
        </div>
      </CommunityWrap>
    </div>
  );
};

export default withRouter(CommunityWrite);
