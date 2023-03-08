import React, {useState, useEffect} from "react";
import NavigationBar from "../../addition/navigation-bar";
import write from "../../img/write.png"
import searchicon from "../../img/searchicon.png"
import Left from "../../img/Left.png"
import Right from "../../img/Right.png"
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import MainForm from "./MainForm";
import moment from "moment";
import {useDispatch} from "react-redux";
import {board} from "../../_actions/userAction";
import "moment/locale/ko";


export const CommunityWrap = styled.div`
  margin: 0 auto;
  background-color: #5383e8;
  vertical-align: middle;
  justify-content: center;
  width: 100%;

  .community_container {
    text-align: center;
  }
`;

const ContentBox = styled.div`
  width: 100%;

  .content_header {
    position: relative;
    width: 100%;
    margin-bottom: 8px;
    background-color: #fff;
  }

  .content_header_sub {
    height: 48px;
    position: relative;
  }

  .header_location {
    display: flex;
    padding-top: 18px;
    padding-bottom: 0px;
    justify-content: space-between;
  }

  .header_text {
    padding-left: 16px;
    line-height: 21px;
    font-size: 18px;
    color: #1e2022;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .board_box {
    display: flex;
    margin-top: 0;
    border-top: 1px solid #ebeef1;
    background: #ffffff;

    line-height: 18px;
    font-size: 14px;
    color: #7b858e;
    min-height: 76px;
  }

  .article-list-item:first-child {
    border-top: none;

    .article-list-item__title {
      display: flex;
      overflow: auto;
      vertical-align: top;
      line-height: 15px;
      font-size: 14px;
      color: #1e2022;
      word-break: break-all;
    }


  }

  .board_info {
    vertical-align: middle;
  }

  .board_no {
    vertical-align: middle;
    margin-top: 5px;
    line-height: 17px;
    font-size: 14px;
    color: #7b858e;
  }

  .board_title {
    color: black;
    padding-right: 5px;
    display: block;
    max-width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .board_writer {
    display: inline-block;
    line-height: 18px;
    font-size: 14px;
    color: #98a0a7;
    padding-left: 8px;
  }

  .sub_search {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 6px;
    margin-bottom: 6px;
  }

  .sub_search_select {
    float: left;
    width: 122px;
    padding: 9px 0 8px 15px;
    box-sizing: border-box;
    border: 1px solid #ebeef1;
    border-radius: 4px 0 0 4px;
    line-height: 17px;
    font-size: 14px;
    color: #98a0a7;
    background-image: url("/img/iconDropdown.png");
    background-size: 24px;
    background-position: top 5px right 5px;
    background-repeat: no-repeat;
    -moz-appearance: none;
    appearance: none;
    outline: none;
  }

  .sub_search_input {
    float: left;
    border: none;
    width: 200px;
    box-sizing: border-box;
    padding: 10px 32px 9px 16px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #ebeef1;
    line-height: 17px;
    font-size: 14px;
  }

  .sub_search_btn {
    float: left;
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 6px;
    margin-right: 8px;
  }

  .sub_search_img {
    width: 24px;
    height: 24px;
  }

  .article-list-paging {
    height: 64px;
    background: #f8f9fa;
  }

  .article-list-paging__button {
    line-height: 17px;
    font-size: 14px;
    color: #7b858e;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #dddfe4;
    width: 77px;
    height: 40px;
    margin-top: 12px;
  }

`;

const Community = ({history}) => {
    const dispatch = useDispatch();
    moment.locale("ko");

    const [communityDtos, setCommunityDtos] = useState([]);
    const [statusCode, setStatusCode] = useState("");
    const [find, setFind] = useState("");
    const [index, setIndex] = useState("0");
    const [postPage, setPostPage] = useState(0);

    useEffect(() => {
        dispatch(board(postPage)).then((res) => {
            if (res.payload.status === 200 || res.payload.status === 210) {
                setStatusCode(res.payload.status);
                setCommunityDtos(res.payload.data);
            } else {
                alert("게시물 불러오기에 실패하였습니다.");
            }
        })
    }, []);

    const handlePrevPage = () => {
        let prevPage = postPage - 1;
        if (postPage < 0) {
            return;
        }
        dispatch(board(prevPage)).then((res) => {
            if (res.payload.status === 200 || res.payload.status === 210) {
                setStatusCode(res.payload.status);
                setCommunityDtos(res.payload.data);
                setPostPage(prevPage);
            } else {
                alert("게시물 불러오기에 실패하였습니다.");
            }
        })
    };

    const handleNextPage = () => {
        let nextPage = postPage + 1;
        dispatch(board(nextPage)).then((res) => {
            if (res.payload.status === 200 || res.payload.status === 210) {
                setPostPage(nextPage);
                setStatusCode(res.payload.status);
                setCommunityDtos(res.payload.data);
            } else {
                alert("게시물 불러오기에 실패하였습니다.");
            }
        })
    };

    const filteredPost_title = communityDtos.filter(post => {
        return post.title.includes(find);
    });

    const filteredPost_writer = communityDtos.filter(post => {
        return post.writer.includes(find);
    });
    const search = (e) => {
        e.preventDefault();
        if(index == 0){
            setCommunityDtos(filteredPost_title);
        }
        else{
            setCommunityDtos(filteredPost_writer);
        }
    };

    const onChangeSearch = (e) => {
        e.preventDefault();
        setFind(e.currentTarget.value);
        if(e.currentTarget.value === null || e.currentTarget.value === ""){
            window.location.reload();
        }
    };

    const onSelect = (e) => {
        setIndex(e.target.value);
    };

    return (
        <div>
            <CommunityWrap>
                <NavigationBar/>
                <div className="community_container">
                    <MainForm/>
                    <ContentBox>
                        <div className="content_header">
                            <div className="header_location">
                                <h2 className="header_text">게시글</h2>
                                <div style={{marginRight: "24px"}}>
                                    {localStorage.getItem("jwtToken") !== null && (
                                        <Link to="/write">
                                            <img
                                                src={write}
                                                style={{width: "24px"}}
                                                alt="글쓰기"
                                            />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div
                                className="content_header_sub"
                            >
                                <div className="sub_search">
                                    <form onSubmit={search}>
                                        <select value={index} onChange={onSelect} className="sub_search_select">
                                            <option value="0">제목</option>
                                            <option value="1">닉네임</option>
                                        </select>
                                        {index === "0" ?
                                            <input
                                                type="text"
                                                className="sub_search_input"
                                                placeholder="검색"
                                                onChange={onChangeSearch}
                                            />
                                            : <input
                                                type="text"
                                                className="sub_search_input"
                                                placeholder="검색"
                                                onChange={onChangeSearch}
                                            /> }
                                        <button className="sub_search_btn">
                                            <img
                                                className="sub_search_img"
                                                src={searchicon}
                                                alt="검색"
                                            />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div>
                            {communityDtos.map((list, key) => {
                                return (
                                    <div className="board_box" key={key}>
                                        <div
                                            className="board_item"
                                            style={{display: "contents"}}
                                        >
                                            <div
                                                className="board_no"
                                                style={{alignSelf: "center", width: "72px"}}
                                            >
                                                {list.pno}
                                            </div>
                                            <div
                                                className="board_info"
                                                style={{alignSelf: "center"}}
                                            >
                                                <Link
                                                    to={`/${list.pno}`}
                                                    style={{cursor: "pointer"}}
                                                >
                                                    <div
                                                        className="board_title"
                                                        style={{textAlign: "left"}}
                                                    >
                              <span className="board_title">
                                {list.title}
                              </span>
                                                    </div>
                                                </Link>
                                                <div>
                                                    <div className="board_date">
                              <span style={{color: "#98a0a7"}}>
                                {moment(list.regDate)
                                    .startOf("second")
                                    .fromNow()}
                              </span>
                                                        <span className="board_writer">
                                {list.writer}
                              </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div>
                                <div className="article-list-paging">
                                    <div>
                                        {postPage > 0 && (
                                            <div style={{display: "inline-block"}}>
                                                <button
                                                    style={{marginRight: "6px"}}
                                                    onClick={handlePrevPage}
                                                    className="article-list-paging__button"
                                                >
                                                    <img
                                                        src={Left}
                                                        alt="이전"
                                                        style={{
                                                            width: "24px",
                                                            height: "24px",
                                                            verticalAlign: "middle",
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                    이전
                                                </button>
                                            </div>
                                        )}

                                        {statusCode !== 210 ? (
                                            <div style={{display: "inline-block"}}>
                                                <button
                                                    style={{marginLeft: "6px"}}
                                                    onClick={handleNextPage}
                                                    className="article-list-paging__button"
                                                >
                                                    다음
                                                    <img
                                                        src={Right}
                                                        alt="다음"
                                                        style={{
                                                            width: "24px",
                                                            height: "24px",
                                                            verticalAlign: "middle",
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContentBox>
                </div>
            </CommunityWrap>
        </div>
    );
};

export default withRouter(Community);
