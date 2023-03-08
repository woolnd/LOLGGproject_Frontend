import React from "react";

import "./App.css";

import {Route, Switch} from "react-router-dom";

import Home from "./pages/home/Home";
import Join from "./pages/join/Join";
import Login from "./pages/login/Login";
import Modify from "./pages/modify/Modify";
import ModifyAuth from "./pages/modify/ModifyAuth";
import FindPw from "./pages/find/FindPw";
import Community from "./pages/community/Community";
import Write from "./pages/community/CommunityWrite";
import CommunityDetail from "./pages/community/CommunityDetail";
import CommunityEdit from "./pages/community/CommunityEdit";
import Summoner from "./pages/summoner/Summoner";

function App() {
    return (
        <>

            <Switch>
                <Route path="/home" component={Home} exact={true}/>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/login" component={Login}/>
                <Route path="/join" component={Join}/>
                <Route path="/modify" component={Modify}/>
                <Route path="/find" component={FindPw}/>
                <Route path="/auth" component={ModifyAuth} />
                <Route path="/write" component={Write} />
                <Route path="/community" component={Community} />
                <Route path="/edit" component={CommunityEdit} />
                <Route path="/summoner/:summoner" component={Summoner} />
                <Route path="/:pno" component={CommunityDetail} />
            </Switch>
        </>
    );
}

export default App;
