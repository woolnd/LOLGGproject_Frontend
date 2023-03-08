import React, {useState} from "react";
import { Link} from "react-router-dom";
import { withRouter } from "react-router-dom";
import {useDispatch} from "react-redux";
import {modifyAuth} from "../../_actions/userAction";
import "./ModifyAuth.css";

import lol from "../../img/lol.png";
const Modify = ({ history }) => {
    const dispatch = useDispatch();
    const [Password, setPassword] = useState("");
    const Token = localStorage.getItem("jwtToken");
    const onChangeForm = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            password: Password,
            token: Token,
        }
        dispatch(modifyAuth(body))
            .then((res) => {
                if (res.payload.status === 200) {
                    localStorage.setItem("email", res.payload.data.email);
                    alert("인증이 완료되었습니다.");
                    history.push("/modify");
                } else {
                alert("인증에 실패하였습니다.");
                }
            })
    };

    return (
        <div className="app">
            <div className="modifyauth_layout">
                <div className="modifyauth_layout_container">
                    <div className="modifyauth_layout_inside">
                        <Link to={"/home"}>
                            <h1 className="modifyauth_layout_logo">
                                <img
                                    className="modifyauth_layout_logo_img"
                                    src={lol}
                                />
                            </h1>
                        </Link>
                        <div className="modifyauth">
                            <form onSubmit={onSubmitHandler}>
                                <h2 className="modifyauth_pw">비밀번호 인증</h2>
                                <div>
                                    <div className="modifyauth_input">
                                        <input
                                            id="memberInput3108"
                                            className="modifyauth_input_box"
                                            type="password"
                                            autoComplete="off"
                                            name="password"
                                            onChange={onChangeForm}
                                            placeholder="비밀번호"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="modifyauth_btn_text modifyauth_btn">
                                    인증하기
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Modify);
