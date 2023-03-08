import React, {useState} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "../../_actions/userAction";

import lol from "../../img/lol.png";

const LoginContent = ({history}) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const dispatch = useDispatch();
    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: Email,
            password: Password,
        };
        dispatch(loginUser(body))
            .then((res) => {
                if (res.payload.status === 200) {
                    localStorage.setItem("jwtToken", res.payload.data.token);
                    localStorage.setItem("nick", res.payload.data.nickname);
                    alert("로그인에 성공하였습니다.")
                    history.push("/home");
                } else {
                    alert("로그인에 실패하였습니다.");
                }
            })
    };

    return (
        <div className="app">
            {!localStorage.getItem("jwtToken") ? (
                <div className="login_layout">
                    <div className="login_layout_container">
                        <div className="login_layout_inside">
                            <Link to={"/home"}>
                                <h1 className="login_layout_logo">
                                    <img
                                        className="login_layout_logo_img"
                                        src={lol}
                                    />
                                </h1>
                            </Link>
                            <div className="login">
                                <form onSubmit={onSubmit}>
                                    <h2 className="login_email">이메일 로그인</h2>
                                    <div className="login_input">
                                        <input
                                            id="memberInput6908"
                                            className="login_input_box"
                                            type="text"
                                            autoComplete="off"
                                            name="email"
                                            placeholder="이메일"
                                            onChange={onEmailHandler}
                                        />
                                    </div>
                                    <div>
                                        <div className="login_input">
                                            <input
                                                id="memberInput3108"
                                                className="login_input_box"
                                                type="password"
                                                autoComplete="off"
                                                name="password"
                                                onChange={onPasswordHandler}
                                                placeholder="비밀번호"
                                            />
                                        </div>
                                        <Link className="login_link" to="/find">
                                            비밀번호를 잊으셨나요?
                                        </Link>
                                    </div>
                                    <button type="submit" className="login_btn_text login_btn">
                                        로그인
                                    </button>
                                    <div className="login_join">
                                        LOL.GG에 처음이세요?
                                        <Link className="login_link" to="/join">
                                            회원가입하기
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>{(alert("잘못된 접근입니다."), history.push("/"))}</div>
            )}
        </div>
    );
};

export default withRouter(LoginContent);
