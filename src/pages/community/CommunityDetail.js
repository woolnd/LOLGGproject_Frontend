import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { CommunityWrap } from "./Community";
import NavigationBar from "../../addition/navigation-bar";
import Descript from "../../addition/Descript";
import MainForm from "./MainForm";
import moment from "moment";
import "moment/locale/ko";
import { Link} from "react-router-dom";
import { withRouter} from "react-router-dom";
import {boardDetail, boardDelete, replylist, replyWrite, replyDelete} from "../../_actions/userAction";
import {useDispatch} from "react-redux";
import recommend from "../../img/recommend.png"

const CommunityContentBox = styled.div`
  width: 100%;
  text-align: left;

  .detail {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  }
  
  .detail_header {
    padding-left: 24px;
    padding-right: 24px;
    padding: 24px 16px;
    border-bottom: 1px solid #ebeef1;
  }

  .detail_title {
    text-align: left;
    line-height: 36px;
    font-size: 24px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: auto;
  }

  .detail_sub {
    margin-top: 9px;
    line-height: 30px;
    font-size: 14px;
    color: #7b858e;
  }

  .detail_list {
    float: left;
    margin-top: 0;
  }

  .detail_content {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-left: 8px;
    padding-left: 9px;
  }

  .detail_list_right {
    float: right;
  }
  
  .detail_content_container {
    padding-right: 24px;
    padding-left: 24px;
    padding: 24px 16px;
  }

  .detail_content_size p {
    margin: 10px 0;
    color: #555;
  }

  .recommend_box {
    border-top: 1px solid #ebeef1;
    border-bottom: 1px solid #ebeef1;
    text-align: center;
  }

  .recommend_btn {
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #dddfe4;

    width: 88px;
    line-height: 17px;
    font-size: 14px;
    height: 43px;

    color: #1e2022;
  }

  .recommend_arrow {
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 16px;
    line-height: 999px;
    vertical-align: top;
    overflow: hidden;
    display: inline-block;
    margin-top: 1px;
    transition: all 0.5s;
  }

  .recommend_count {
    transition: all 0.3s;
    display: inline-block;
  }

  .recommend_container {
    padding: 12px 0;
  }
  
  .delete_modify_btn {
    margin-top: 0px;
  }

  .delete_modify_btn_lo:first-child {
    margin-left: 1%;
  }

  .delete_modify_btn_lo {
    display: inline-block;
    vertical-align: middle;
  }

  button,
  input {
    margin: 0;
    font-size: 14px;
    outline: 0;
    border: 1px solid #dddfe4;
    border-radius: 4px;
  }

  .delete_btn {
    line-height: 15px;
    font-size: 12px;
    padding: 8px 15px 7px;
    border-color: #f95b54;
    background: #fff;
    color: #f95b54;
    margin-right: 5px;
  }

  .modify_btn {
    border: 1px solid #dddfe4;

    border-radius: 4px;
    line-height: 15px;
    font-size: 12px;
    padding: 10px 15px 7px;
    color: black;
    box-sizing: border-box;
  }

  .reply {
    position: relative;
    padding: 10px;
  }
  
  .comment_meta {
    line-height: 17px;
    font-size: 14px;
    color: #7b858e;
  }

  .comment_content {
    line-height: 20px;
    font-size: 15px;
    color: #1e2022;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .reply_wrap {
    margin-bottom: 8px;
    background-color: #f8fafa;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  }
  
  .comment_date {
    margin-left: 19px;
  }
  .comment_writer {
    font-weight: 700;
    color: #1e2022;
  }

  .comment-vote {
    position: absolute;
    left: 0;
    top: 36px;
    width: 64px;
    text-align: center;
  }
  
`;

const CommunityDetail = ({ match, history }) => {
  const dispatch = useDispatch();
  moment.locale("ko");
  const id = match.params;
  const pno = id.pno;

  const [resp, setResp] = useState({});
  const [reply, setReply] = useState([]);
  const [replies, setReplies] = useState([]);

  const user= localStorage.getItem("nick");

  useEffect(() => {
    dispatch(boardDetail(pno)).then((res) => {
      if(res.payload.status === 200){
        setResp(res.payload.data);
      }else{
        alert("게시물 불러오기에 실패하였습니다.");
      }
    })
  }, []);


  useEffect(()=> {
    dispatch(replylist(resp.pno)).then((res)=> {
      if(res.payload.status === 200){
        setReplies(res.payload.data);
      }
    })
  },[resp, reply]);

  const onDeleteHandler  = () => {
    let body ={
      writer: user,
      pno: pno,
    }
    if (window.confirm("게시글을 삭제하시겠습니까?") == true) {
      dispatch(boardDelete(body)).then((res) => {
        if(res.payload.status === 200){
          alert("삭제가 완료되었습니다.");
          history.push("/community");
        }else{
          alert("삭제가 완료되지 않았습니다.");
        }
      })
    }
  };

  const replyOnChange = (e) => {
    setReply(e.target.value);
  };


  const addReply = (content) => {
    let body = {
      content: content,
      pno: resp.pno,
      writer: user,
    }
    dispatch(replyWrite(body)).then((res) => {
        console.log(body);
      if(res.payload.status === 200){
        alert("댓글 작성이 완료되었습니다.");
      }else{
        alert("댓글 작성에 실패하였습니다.")
      }
    })
  };

    const deleteReply = (replies) => {
        let body = {
            rno: replies.rno,
            writer: user,
        }
        dispatch(replyDelete(body)).then((res) => {
            console.log(body);
            if(res.payload.status === 200){
                alert("댓글이 삭제 되었습니다.");
                window.location.reload();
            }else{
                alert("실패하였습니다..")
            }
        })
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReply(reply);
      setReply("");
  };

  return (
    <div>
      <CommunityWrap>
        <NavigationBar />
        <div className="communityDetail_conatiner">
          <MainForm />
          <CommunityContentBox>
            <div key={resp.pno}>
              <div className="detail">
                <div className="detail_header">
                  <div className="detail_title">
                    {resp.title}
                  </div>
                  <div className="detail_sub">
                    <div className="detail_list">
                      <div className="detail_content">
                              <span>
                                {moment(resp.regDate)
                                    .startOf("second")
                                    .fromNow()}
                              </span>
                      </div>
                      <div className="detail_content">
                        {resp.writer}
                      </div>
                    </div>
                    <div className="detail_list detail_list_right">
                      <div className="detail_content">
                        <span>댓글 {replies.length}</span>
                      </div>
                      <div className="detail_content">
                        <span>추천 {resp.data}</span>
                      </div>
                    </div>
                  </div>
                  {resp.writer === user && (
                      <div className="delete_modify_btn">
                        <div className="delete_modify_btn_lo">
                          <button
                              className="delete_btn"
                              onClick={onDeleteHandler}
                          >
                            삭제
                          </button>
                        </div>
                        <div className="delete_modify_btn_lo">
                          <Link
                              to={{
                                pathname: "/edit",
                                state: {
                                  pno: pno,
                                  title: resp.title,
                                  content: resp.content,
                                },
                              }}
                              className="modify_btn"
                          >
                            수정
                          </Link>
                        </div>
                      </div>
                  )}
                </div>
                <div>
                  <div className="detail_content_container">
                    <p>{resp.content}</p>
                  </div>
                </div>
                <div className="recommend_box">
                  <div className="recommend_container">
                    <button
                        style={{ cursor: "pointer" }}
                        type="submit"
                        className="recommend_btn"
                    >
                      <img src={recommend} className="recommend_arrow"/>
                      <span className="recommend_count">
                              {resp.data}
                            </span>
                    </button>
                  </div>
                </div>
                <div className="reply">
                  <div
                      style={{
                        paddingTop: "5px",
                        marginTop: "9px",
                        marginLeft: "1%",
                        lineHeight: "21px",
                        fontSize: "20px",
                        color: "#1e2022",
                        fontWeight: "bold",
                      }}
                  >
                    댓글
                  </div>
                  <div>
                    <form
                        onSubmit={handleSubmit}
                        style={{paddingBottom: "15px", paddingTop: "15px"}}
                    >
                      <input
                          style={{
                            display: "inline-block",
                            width: "88%",
                            backgroundColor: "#fff",
                            border: "1px solid #dddfe4",
                            overflow: "hidden",
                            overflowWrap: "break-word",
                            marginLeft: "1%",
                            height: "44px",
                          }}
                          id="input1"
                          type="text"
                          onChange={replyOnChange}
                          value={reply}
                          className="text"
                          placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다."
                      />
                      <button
                          type="submit"
                          style={{
                            display: "inline-block",
                            width: "92px",
                            padding: "10px 9px",
                            lineHeight: "20px",
                            fontSize: "16px",
                            borderRadius: "0",
                            borderColor: "#46cfa7",
                            backgroundColor: "#46cfa7",
                            marginLeft: "8px",
                            color: "#fff",
                          }}
                      >
                        작성
                      </button>
                    </form>
                  </div>
                  {replies.map((replies) => (
                      <div key={replies.rno} className="reply_wrap">
                        <div
                            data-v-0e41a35e=""
                            className="reply_meta"
                            style={{marginBottom: "7px"}}
                        >
                        <span className="reply_writer" style={{
                            marginLeft: "1%",
                            fontSize: "20px",
                            color: "#1e2022"}}>
                            {" "}
                          {replies.writer}
                        </span>
                          <span className="reply_date">
                            {" "}{moment(replies.regDate).startOf("second").fromNow()}
                        </span>
                        </div>
                        {" "}
                        <div
                            className="reply_content"
                            style={{fontSize: "18px", marginBottom: "8px", marginLeft: "1%"}}
                        >
                          <p>{replies.content}</p>
                        </div>
                        {" "}
                        {replies.writer === user && (
                            <div
                                className="deleteReplyBtn"
                                style={{color: "red", cursor: "pointer", fontSize: "14px", marginLeft: "1%"}}
                                onClick={() => {
                                  if (window.confirm("댓글을 삭제하시겠습니까?") === true) {
                                      deleteReply(replies);
                                      console.log(replies);
                                  } else {
                                    return;
                                  }
                                }}
                            >
                                삭제
                            </div>
                        )}
                      </div>
                  ))}
                </div>
              </div>
            </div>
            <Descript />
          </CommunityContentBox>
        </div>
      </CommunityWrap>
    </div>
  );
};

export default withRouter(CommunityDetail);
