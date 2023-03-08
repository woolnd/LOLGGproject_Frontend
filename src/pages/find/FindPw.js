import React, {useState} from "react";
import "./FindPw.css";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {findPw} from "../../_actions/userAction";
import lol from "../../img/lol.png";


const FindPw = ({history}) => {

    const [Email, setEmail] = useState("");
    const [NickName, setNickName] = useState("");
    const dispatch = useDispatch();

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onNickNameHandler = (e) => {
        setNickName(e.currentTarget.value);
    };

    const cancelHome = () => {
        history.push("/login");
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            email: Email,
            nickname: NickName,
        }
        dispatch(findPw(body))
            .then((res) => {
                if(res.payload.status === 200){
                    alert("임시 비밀번호를 해당 이메일로 전송하였습니다.");
                    history.push("/login");
                }else {
                    alert("유저 정보가 올바르지 않습니다.");
                }
        })
    };

    return (
        <div className="find_container">
            <div className="find_layout">
                <div className="find_layout_inside">
                    <div className="register_header">
                        <Link to={"/home"}>
                            <img src={lol} className="find_layout_logo_img"/>
                        </Link>
                    </div>
                    <h2 className="top_text">비밀번호 찾기</h2>
                    <div className="top_sub">
                        이메일과 닉네임을 입력 시 해당 이메일로 임시 비밀번호를 보내드립니다.
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="find_input">
                                <input
                                    onChange={onEmailHandler}
                                    className="find_input_box"
                                    type="text"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="이메일 주소"
                                />
                            </div>
                            <div className="find_input">
                                <input
                                    onChange={onNickNameHandler}
                                    className="find_input_box"
                                    type="text"
                                    autoComplete="off"
                                    name="nickname"
                                    placeholder="닉네임"
                                />
                            </div>
                            <div>
                                <button
                                    onClick={cancelHome}
                                    type="button"
                                    className="cancel_btn"
                                >
                                    취소
                                </button>
                                <button type="submit" className="sumbit_btn">
                                    메일 받기
                                </button>
                            </div>
                        </form>
                    </div>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default withRouter(FindPw);
