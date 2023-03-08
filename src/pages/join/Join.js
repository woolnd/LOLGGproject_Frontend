import React, {useState} from "react";
import "./join.css";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import lol from "../../img/lol.png";
import {useDispatch} from "react-redux";
import {registerUser, checkEmail, checkNick} from "../../_actions/userAction";

const Join = ({history}) => {

    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    const [NickName, setNickName] = useState(null);
    const dispatch = useDispatch();

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onNickNameHandler = (e) => {
        setNickName(e.currentTarget.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onChkEmailHandler = (e) => {
        e.preventDefault();
        let body = {
            email: Email
        }
        dispatch(checkEmail(body))
            .then((res) => {
                if(res.payload.status === 200){
                    alert("사용 가능한 이메일 입니다..");
                }else {
                    alert("사용 중인 이메일 입니다.");
                }
            })
    }

    const onChkNickHandler = (e) => {
        e.preventDefault();
        let body = {
            nickname: NickName
        }
        dispatch(checkNick(body))
            .then((res) => {
                if(res.payload.status === 200){
                    alert("사용 가능한 닉네임 입니다..");
                }else {
                    alert("사용 중인 닉네임 입니다.");
                }})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            email: Email,
            password: Password,
            nickname: NickName,
        };

        dispatch(registerUser(body))
            .then((res) => {

                if(res.payload.status === 200){
                    alert("가입에 성공하였습니다.");
                    history.push("/login");
                }else {
                    alert("가입에 실패하였습니다.");
                }
        })
    };

    const cancelHome = () => {
        history.push("/login");
    };

    const chkRegex = () => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

        if (!emailRegex.test(Email)){
            alert("이메일 형식이 올바르지 않습니다.");
            setEmail(null);
        }
        if(!passwordRegex.test(Password)){
            alert("비밀번호 형식에 올바르지 않습니다.");
            console.log(null);
            setPassword(null);
        }
        if(NickName.length < 2 || NickName.length > 8){
            alert("닉네임 형식에 올바르지 않습니다.")
            setNickName(null);
        }
    }

    return (
        <div className="join_container">
            <div className="join_layout">
                <div className="join_layout_inside">
                    <div className="register_header">
                        <Link to={"/home"}>
                            <img src={lol} className="join_layout_logo_img"/>
                        </Link>
                    </div>
                    <h2 className="top_text">기본정보 입력</h2>
                    <div className="top_sub">
                        회원가입을 위해 이메일 주소를 기입해주시길 바랍니다.
                        <br/>
                        이메일 형식: test@test.com
                        <br/>
                        비밀번호 형식: 숫자+영문자+특수문자 조합으로 8자리 이상
                        <br/>
                        닉네임 형식: 2자리 이상 8자리 이하
                    </div>
                    <div>
                        <form onSubmit={onSubmitHandler}>
                            <div>
                                <div className="join_input_chk">
                                    <input
                                        onChange={onEmailHandler}
                                        className="join_input_box_chk"
                                        type="text"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="이메일 주소"
                                    />
                                </div>
                                <button type="submit" onClick={onChkEmailHandler} className="check_btn">
                                    중복확인
                                </button>
                                <p className="message"></p>
                            </div>
                            <div>
                                <div className="join_input">
                                    <input
                                        onChange={onPasswordHandler}
                                        className="join_input_box"
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="비밀번호"
                                    />
                                </div>
                                <p className="message"></p>
                            </div>
                            <div>
                                <div className="join_input_chk">
                                    <input
                                        onChange={onNickNameHandler}
                                        className="join_input_box_chk"
                                        type="text"
                                        autoComplete="off"
                                        name="nickname"
                                        placeholder="닉네임"
                                    />
                                </div>
                                <button type="submit" onClick={onChkNickHandler} className="check_btn">
                                    중복확인
                                </button>
                                <p className="message"></p>
                            </div>
                            <div>
                                <button
                                    onClick={cancelHome}
                                    type="button"
                                    className="cancel_btn"
                                >
                                    취소
                                </button>
                                <button type="submit" onClick={chkRegex} className="sumbit_btn">
                                    가입하기
                                </button>
                            </div>
                        </form>
                    </div>
                    <br/>
                    <br/>
                    <div className="join_to_login">
                        이미 회원이신가요?
                        <Link
                            to={"/login"}
                            href=""
                            type="button"
                            className="join_to_login_btn"
                            alt="ff"
                        >
                            로그인하기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Join);
