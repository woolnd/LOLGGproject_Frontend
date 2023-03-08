import React, {useState} from "react";
import styled from "styled-components";
import {CommunityWrap} from "./Community";
import NavigationBar from "../../addition/navigation-bar";
import MainForm from "./MainForm";
import Descript from "../../addition/Descript";
import {withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {boardModify} from "../../_actions/userAction";

const WriteBox = styled.div`
  text-align: center;
  width: 100%;

  .article-write {
    background: rgb(255, 255, 255);
    padding: 20px 10px;
  }

  .article-write__title {
    text-align: left;
  }

  .article-write__title {
    color: rgb(30, 32, 34);
    font-weight: 700;
  }

  .article-write-input {
    margin-top: 16px;
  }

  .article-write-header {
    position: static;
    text-align: left;
    padding-bottom: 0px;
    padding-top: 8px;
    background: rgb(255, 255, 255);
  }

  .article-write__text {
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

  .article-write-content {
    width: 100%;
  }

  .article-write__textarea {
    font-size: 17px;
    padding: 10px;
    width: 97.8%;
    margin-top: 13px;
    border: 1px solid rgb(221, 223, 228);
    color: rgb(30, 32, 34);
    resize: none;
    height: 350px;
  }

  .article-write__button--submit {
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

  .article-write__button--cancel {
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

  .article-write__btn {
    display: flex;
    justify-content: space-between;
  }
`;

const CommunityEdit = ({history}) => {
    const dispatch = useDispatch();

    const Title = history.location.state.title;
    const Content = history.location.state.content;
    const Pno = history.location.state.pno;
    const [updateTitle, setUpdateTitle] = useState(Title);
    const [updateContent, setUpdateContent] = useState(Content);

    const handleChangeTitle = (e) => {
        setUpdateTitle(e.currentTarget.value);
    };

    const handleChangeContent = (e) => {
        setUpdateContent(e.currentTarget.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            content: updateContent,
            pno: Pno,
            title: updateTitle,
        }
        dispatch(boardModify(body)).then((res) => {
            if (res.payload.status === 200) {
                alert("수정 완료되었습니다.")
                history.push(`/${Pno}`);
            } else {
                alert("수정에 실패하였습니다.")
            }
        })

    };

    return (
        <div>
            <CommunityWrap>
                <NavigationBar/>
                <div className="communityWrite-conatiner">
                    <MainForm/>
                    <div>
                        <WriteBox>
                            <div className="content">
                                <form onSubmit={handleSubmit}>
                                    <div className="article-write">
                                        <div className="article-write-header">
                                            <div className="article-write__title">글수정</div>
                                        </div>
                                        <div className="article-write-input">
                                            <input
                                                onChange={handleChangeTitle}
                                                type="text"
                                                name="title"
                                                value={updateTitle}
                                                className="article-write__text"
                                                placeholder="제목"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="article-write-content">
                                            <textarea
                                                onChange={handleChangeContent}
                                                className="article-write__textarea"
                                                value={updateContent}
                                            ></textarea>
                                        </div>
                                        <div className="article-write__btn">
                                            <button
                                                className="article-write__button article-write__button--cancel"
                                                type="button"
                                                onClick={() => history.push("/community")}
                                            >
                                                취소
                                            </button>
                                            <button
                                                className="article-write__button article-write__button--submit"
                                                type="submit"
                                            >
                                                수정완료
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </WriteBox>
                    </div>
                    <Descript/>
                </div>
            </CommunityWrap>
        </div>
    );
};

export default withRouter(CommunityEdit);