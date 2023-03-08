import {api_key} from "./api_key";
import React, {useState, useEffect} from "react";
import NavigationBar from "../../addition/navigation-bar";
import styled from "styled-components";
import "../summoner/Summoner.css";
import {withRouter} from "react-router-dom";
import axios from "axios";
import defaulticon from "../../img/default.png"
import blank from "../../img/blank.png"

const SummonerHeader = styled.div`
  position: relative;
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0 0 0;
`;

const Summoner = ({match, history}) => {
    if (match.params === null) {
        history.goBack();
    }
    const [toggleId, setToggleId] = useState(0);
    const summoner = match.params.summoner;
    const [userinfo, setUserInfo] = useState([]);
    const [solo, setSolo] = useState([]);
    const [sub, setSub] = useState([]);
    const [matchid, setMatchId] = useState([]);
    const [user, setUser] = useState([]);
    const [games, setGames] = useState([{}]);
    const [mainRune, setMainRune] = useState();
    const [subRune, setSubRune] = useState();

    const [winteam, setWinTeam] = useState([]);
    const [winmember, setWinMember] = useState([]);

    const [loseteam, setLoseTeam] = useState([]);
    const [losemember, setLoseMember] = useState([]);

    const [isUpdate, setIsUpdate] = useState(false);


    useEffect(() => {
        axios.get("/riot/lol/summoner/v4/summoners/by-name/" + `${summoner}` + '?api_key=' + `${api_key}`)
            .then((res) => {
                setUserInfo(res.data);
            })
            .catch((err) => {
                alert("해당 소환사가 없습니다.");
            })
    }, []);

    useEffect(() => {
        axios.get("/riot/lol/league/v4/entries/by-summoner/" + `${userinfo.id}` + '?api_key=' + `${api_key}`)
            .then((res) => {
                if (res.data.length === 3) {
                    if ((res.data[0].queueType).length === 15) {
                        setSolo(res.data[0]);
                        if ((res.data[1].queueType).length === 14) {
                            setSub(res.data[1]);
                        } else if ((res.data[2].queueType).length === 14) {
                            setSub(res.data[2]);
                        }
                    } else if ((res.data[1].queueType).length === 15) {
                        setSolo(res.data[1]);
                        if ((res.data[0].queueType).length === 14) {
                            setSub(res.data[0]);
                        } else if ((res.data[2].queueType).length === 14) {
                            setSub(res.data[2]);
                        }
                    } else if ((res.data[2].queueType).length === 15) {
                        setSolo(res.data[2]);
                        if ((res.data[0].queueType).length === 14) {
                            setSub(res.data[0]);
                        } else if ((res.data[1].queueType).length === 14) {
                            setSub(res.data[1]);
                        }
                    }
                } else if (res.data.length === 2) {
                    if ((res.data[0].queueType).length === 15 && (res.data[1].queueType).length === 14) {
                        setSolo(res.data[0]);
                        setSub(res.data[1]);
                    } else if ((res.data[1].queueType).length === 15 && (res.data[0].queueType).length === 14) {
                        setSolo(res.data[1]);
                        setSub(res.data[0]);
                    }
                } else if (res.data.length === 1) {
                    if ((res.data[0].queueType).length === 15) {
                        setSolo(res.data[0]);
                    } else if ((res.data[0].queueType).length === 14) {
                        setSub(res.data[0]);
                    }
                }
            })
            .catch((err) => {
            })
    }, [userinfo]);

    useEffect(() => {
        axios.get("/game/lol/match/v5/matches/by-puuid/" + `${userinfo.puuid}` + "/ids?&type=ranked&start=0&count=1&api_key=" + `${api_key}`)
            .then((res) => {
                setMatchId(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [userinfo]);

    useEffect(() => {
        axios.get("/game/lol/match/v5/matches/" + `${matchid}` + "?api_key=" + `${api_key}`)
            .then((res) => {
                setGames(res.data.info);
                if(winmember.length<5){
                    for (var i = 0; i < 5; i++) {
                        setWinMember(winmember => [...winmember, res.data.info.participants[i]]);
                    }
                }
                if(losemember.length<5){
                    for (var i = 5; i < 10; i++) {
                        setLoseMember(losemember => [...losemember, res.data.info.participants[i]]);
                    }
                }
                if (res.data.info.teams[0].win === true) {
                    setWinTeam(res.data.info.teams[0]);
                    setLoseTeam(res.data.info.teams[1]);
                } else {
                    setWinTeam(res.data.info.teams[1]);
                    setLoseTeam(res.data.info.teams[0]);
                }

                for (var i = 0; i < 10; i++) {
                    if (res.data.info.participants && res.data.info.participants.length > 0) {
                        if (res.data.info.participants[i].puuid === userinfo.puuid) {
                            setUser(res.data.info.participants[i]);
                            setMainRune(res.data.info.participants[i].perks.styles[0].selections[0].perk);
                            setSubRune(res.data.info.participants[i].perks.styles[1].style);
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [matchid]);

    const updateInfo = (summonerName) => {
        setIsUpdate(true);
        axios
            .get("/riot/lol/summoner/v4/summoners/by-name/" + `${summoner}` + '?api_key=' + `${api_key}`)
            .then((res) => {
                alert("갱신이 완료되었습니다.");
                setUserInfo(res.data);
                setIsUpdate(false);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    const getCreation = (creation) => {
        Date.prototype.yyyymmdd = function () {
            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth() + 1).toString();
            var dd = this.getDate().toString();

            return (
                yyyy +
                "-" +
                (mm[1] ? mm : "0" + mm[0]) +
                "-" +
                (dd[1] ? dd : "0" + dd[0])
            );
        };

        if (creation + 86400000 > Date.now()) {
            let temp = Date.now() - creation;
            if (temp < 60000) {
                return (temp / 1000).toFixed(0) + "초 전";
            } else if (temp < 3600000) {
                return (temp / 60000).toFixed(0) + "분 전";
            } else {
                return (temp / 3600000).toFixed(0) + "시간 전";
            }
        }
        return new Date(creation).yyyymmdd();
    };

    const getDuration = (duration) => {
        let minutes = (duration / 60).toFixed(0);
        let seconds = (duration % 60).toFixed(0);

        if ((minutes + "").length === 1) {
            minutes = "0" + minutes;
        }

        if ((seconds + "").length === 1) {
            seconds = "0" + seconds;
        }

        return minutes + ":" + seconds;
    };

    const getChampImg = (data) => {
        return (
            "/rank/meta/images/lol/champion/" +
            `${data}` +
            ".png"
        );
    };

    const getSpellImg = (spellId) => {
        let spellName = null;

        if (spellId === 21) {
            spellName = "SummonerBarrier";
        } else if (spellId === 1) {
            spellName = "SummonerBoost";
        } else if (spellId === 14) {
            spellName = "SummonerDot";
        } else if (spellId === 3) {
            spellName = "SummonerExhaust";
        } else if (spellId === 4) {
            spellName = "SummonerFlash";
        } else if (spellId === 6) {
            spellName = "SummonerHaste";
        } else if (spellId === 7) {
            spellName = "SummonerHeal";
        } else if (spellId === 13) {
            spellName = "SummonerMana";
        } else if (spellId === 30) {
            spellName = "SummonerPoroRecall";
        } else if (spellId === 31) {
            spellName = "SummonerPoroThrow";
        } else if (spellId === 11) {
            spellName = "SummonerSmite";
        } else if (spellId === 39) {
            spellName = "SummonerSnowURFSnowball_Mark";
        } else if (spellId === 32) {
            spellName = "SummonerSnowball";
        } else if (spellId === 12) {
            spellName = "SummonerTeleport";
        }

        return (
            "/rank/meta/images/lol/spell/" +
            spellName +
            ".png"
        );
    };

    const getRuneImg = (perkId) => {
        return (
            "/rank/meta/images/lol/perk/" + `${perkId}` + ".png"
        );
    };

    const getsubRuneImg = (perkId) => {
        return (
            "/rank/meta/images/lol/perkStyle/" + `${perkId}` + ".png"
        );
    };

    const getGrade = (kill, death, assist) => {
        if (death === 0) {
            return "Perfect 평점";
        }

        let grade = ((kill + assist) / death).toFixed(2);

        return grade + ":1 평점";
    };

    const getItemImg = (itemId) => {
        if (itemId == 0) {
            return blank;
        } else if (itemId !== null && itemId !== "" && itemId !== "null") {
            return (
                "/rank/meta/images/lol/item/" +
                itemId +
                ".png"
            );
        }
    };

    const getTotalGolds = (matchSummonerModels) => {
        let totalGolds = 0;

        matchSummonerModels.map((matchSummonerModel) => {
            totalGolds = totalGolds + matchSummonerModel.goldEarned;
        });

        return totalGolds;
    };

    // 팀별 토탈킬
    const getTotalKills = (matchSummonerModels) => {
        let totalKills = 0;

        matchSummonerModels.map((matchSummonerModel) => {
            totalKills = totalKills + matchSummonerModel.kills;
        });

        return totalKills;
    };

    const solo_rank = solo.tier || '';
    const sub_rank = sub.tier || '';

    return (
        <>
            <NavigationBar/>
            <div>
                <div className="header">
                    <div className="face">
                        <div className="profileIcon">
                            <img
                                className="profileImage"
                                src={"/info/cdn/10.16.1/img/profileicon/" + userinfo.profileIconId + ".png"}
                            />
                            <span className="level">
                                {userinfo.summonerLevel}
                            </span>
                        </div>
                    </div>
                    <div className="profile">
                        <div className="information">
                            <span className="name">
                                {userinfo.name}
                            </span>
                            <div className="button">
                                {isUpdate === false ? (
                                    <button
                                        className="button__blue"
                                        onClick={() => {
                                            updateInfo(userinfo.name);
                                        }}
                                    >
                                        전적갱신
                                    </button>
                                ) : (<button className="button__blue">갱신중</button>)}
                            </div>
                        </div>
                    </div>
                    <div className="contentWrap">
                        <div className="tabItem__content">
                            <div className="sideContent">
                                <div className="tierbox">
                                    <div className="summonerRating">
                                        <div className="medal">
                                            {solo.length === 0 ? (
                                                    <img
                                                        className="medalImage"
                                                        src={defaulticon}
                                                        alt="솔랭"/>
                                                )
                                                :
                                                (
                                                    <img
                                                        className="medalImage"
                                                        src={"/rank/images/medals_new/" + solo_rank.toLowerCase() + ".png"}
                                                        alt="솔랭"/>)}
                                        </div>
                                        <div className="tierRankInfo">
                                            <div className="rankType">솔로랭크</div>
                                            <div className="tierRank">
                                                {solo.tier}{" "}{solo.rank}
                                            </div>
                                            <div className="tierInfo">
                                             <span className="leaguePoints">
                                                 {solo.leaguePoints + " LP"}{" "}
                                             </span>
                                                <span className="winLose">
                                                <span className="wins">
                                                    {" "}{solo.wins}승{" "}
                                                </span>
                                                <span className="lossers">
                                                    {solo.losses}패{" "}
                                                </span>
                                                <br/>
                                                <span className="winRatio">
                                                    승률{" "}
                                                    {(solo.wins / (solo.wins + solo.losses) * 100).toFixed(2)}%
                                                </span>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sub-tier">
                                    {sub.length === 0 ?
                                        (<img
                                            className="medalImage"
                                            src={defaulticon}
                                            alt="자랭"/>)
                                        :
                                        (
                                            <img
                                                className="img-sub-tier__medal"
                                                src={"/rank/images/medals_new/" + sub_rank.toLowerCase() + ".png"}
                                                alt="자랭"
                                            />)}
                                    <div className="sub-tier__info__unranked">
                                        <div className="tierRankInfo">
                                            <div className="rankType">자유 5:5 랭크</div>
                                            <div className="tierRank">
                                                {sub.tier}{" "}{sub.rank}
                                            </div>
                                            <div className="tierInfo">
                                                <span className="leaguePoints">
                                                    {sub.leaguePoints + " LP"}
                                                </span>
                                                <span className="winLose">
                                                    <span className="wins">
                                                        {" "}{sub.wins}{" "}승{" "}
                                                    </span>
                                                    <span className="lossers">
                                                        {" "}{sub.losses}{" "}패{" "}
                                                    </span>
                                                    <br/>
                                                    <span className="winRatio">
                                                        승률{" "}
                                                        {(sub.wins / (sub.wins + sub.losses) * 100).toFixed(2)}%
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="realContent">
                                <div
                                    className="gameListContainer"
                                    data-summoer-id=""
                                    data-last-info=""
                                >
                                    <div className="content">
                                        {matchid.map(() => (
                                            <div className="gameItemList">
                                                <div
                                                    className="gameItemWrap"
                                                    key={userinfo.id}
                                                >
                                                    <div
                                                        className={
                                                            user.win === true
                                                                ? "gameItemWinExtended"
                                                                : "gameItemLoseExtended"
                                                        }
                                                    >
                                                        <div className="toggle-content">
                                                            <div className="gameStats">
                                                                <div className="gameType" title="솔랭">
                                                                    {games.queueId === 420 ? "솔랭" : "자유"}
                                                                </div>
                                                                <div className="timeStamp">
                                                                <span className="toggle-time">
                                                                    {getCreation(games.gameCreation)}
                                                                </span>
                                                                </div>
                                                                <div className={
                                                                    user.win === true ? "bar" : "bar bar-lose"
                                                                }
                                                                ></div>
                                                                <div className="gameResult">
                                                                    {user.win === true ? "승리" : "패배"}
                                                                </div>
                                                                <div className="gameLength">
                                                                    {" "}{getDuration(games.gameDuration)}{" "}
                                                                </div>
                                                            </div>
                                                            <div className="gameSettingInfo">
                                                                <div className="championImage">
                                                                    <img src={getChampImg(user.championName)}
                                                                         className="championIcon"/>
                                                                </div>
                                                                <div className="summonerSpell">
                                                                    <div className="spell1">
                                                                        <img src={getSpellImg(user.summoner1Id)}
                                                                             className="summonerSpell1"/>
                                                                    </div>
                                                                    <div className="spell2">
                                                                        <img src={getSpellImg(user.summoner2Id)}
                                                                             className="summonerSpell2"/>
                                                                    </div>
                                                                </div>
                                                                <div className="runes">
                                                                    <div className="rune1">
                                                                        <img src={getRuneImg(mainRune)}
                                                                             className="runeImage1"/>
                                                                    </div>
                                                                    <div className="rune2">
                                                                        <img src={getsubRuneImg(subRune)}
                                                                             className="runeImage2"/>
                                                                    </div>
                                                                </div>
                                                                <div className="championName">
                                                                    {user.championName}
                                                                </div>
                                                            </div>
                                                            <div className="kdaWrap">
                                                                <div className="kda">
                                                                <span className="kill">
                                                                    {user.kills}
                                                                </span>
                                                                    /
                                                                    <span className="death">
                                                                    {user.deaths}
                                                                </span>
                                                                    /
                                                                    <span className="assist">
                                                                    {user.assists}
                                                                </span>
                                                                </div>
                                                                <div className="kdaRatio">
                                                                <span className="kdaRatioSpan">
                                                                     {getGrade(
                                                                         user.kills,
                                                                         user.deaths,
                                                                         user.assists
                                                                     )}
                                                                </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="stats"
                                                                style={{
                                                                    display: "table-cell",
                                                                    height: "96px",
                                                                    verticalAlign: "middle",
                                                                }}
                                                            >
                                                                <div className="stateLevel">
                                                                    레벨{user.champLevel}
                                                                </div>
                                                                <div className="cs">
                                                                    <span className="">
                                                                        CS{" "}{user.totalMinionsKilled}{" "}({(user.totalMinionsKilled / (games.gameDuration / 60)).toFixed(1)})
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="items">
                                                                <div className="itemList">
                                                                    <div className="item">
                                                                        <img
                                                                            src={getItemImg(user.item0)}
                                                                            className="itemImg"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="item">
                                                                        <img
                                                                            src={getItemImg(user.item1)}
                                                                            className="itemImg"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="item">
                                                                        <img
                                                                            src={getItemImg(user.item2)}
                                                                            className="itemImg"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="item">
                                                                        <img
                                                                            src={getItemImg(user.item6)}
                                                                            className="itemImg"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="item">
                                                                        <img
                                                                            src={getItemImg(user.item3)}
                                                                            className="itemImg"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="item">
                                                                        <img
                                                                            src={getItemImg(user.item4)}
                                                                            className="itemImg"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="item">
                                                                        <img
                                                                            src={getItemImg(user.item5)}
                                                                            className="itemImg"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={user.win === true ? "statusBtn" : "statusBtn statusBtn-lose"}
                                                            >
                                                                <div className="content2">
                                                                    <a className="btnMatchDetail">
                                                                        <i onClick={() => {
                                                                            if (toggleId === 0 || toggleId !== games.gameId) {
                                                                                setToggleId(games.gameId);
                                                                            } else {
                                                                                setToggleId(0);
                                                                            }
                                                                        }}
                                                                           className={
                                                                               user.win === true ? "material-icons" : "material-icons material-icons-lose"
                                                                           }>
                                                                            arrow_drop_down
                                                                        </i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {toggleId === games.gameId && (
                                                            <div className="GameDetail">
                                                                <div className="MatchDetailLayout tabWrap _recognized">
                                                                    <div className="MatchDetailHeader"></div>
                                                                    <div className="MatchDetailContent tabItems">
                                                                        <div
                                                                            className="Content tabItem MatchDetailContent-overview"
                                                                            style={{display: "block"}}
                                                                        >
                                                                            <div className="GameDetailTableWrap">
                                                                                <table
                                                                                    className="GameDetailTable Result-WIN">
                                                                                    <colgroup>
                                                                                        <col className="ChampionImage"/>
                                                                                        <col className="SummonerSpell"/>
                                                                                        <col
                                                                                            className="KeystoneMastery"/>
                                                                                        <col className="SummonerName"/>
                                                                                        <col className="OPScore"/>
                                                                                        <col className="KDA"/>
                                                                                        <col className="Damage"/>
                                                                                        <col className="Ward"/>
                                                                                        <col className="CS"/>
                                                                                        <col className="Items"/>
                                                                                    </colgroup>
                                                                                    <thead className="Header">
                                                                                    <tr className="Row">
                                                                                        <th
                                                                                            className="HeaderCell"
                                                                                            colSpan="4"
                                                                                        >
                                                                                            <span
                                                                                                className="GameResult">승리{" "}</span>
                                                                                            {winteam.teamId === 100 ? "(블루팀)" : "(레드팀)"}
                                                                                        </th>
                                                                                        <th className="HeaderCell"></th>
                                                                                        <th className="HeaderCell">KDA</th>
                                                                                        <th className="HeaderCell">피해량</th>
                                                                                        <th className="HeaderCell">와드</th>
                                                                                        <th className="HeaderCell">CS</th>
                                                                                        <th className="HeaderCell">아이템</th>
                                                                                    </tr>
                                                                                    </thead>
                                                                                    <tbody className="Content">
                                                                                    {winmember.map((winmember) => {
                                                                                        return (
                                                                                            <tr className={"Row RowWin"}>
                                                                                                <td className="ChampionImage Cell">
                                                                                                    <a>
                                                                                                        <img
                                                                                                            src={getChampImg(
                                                                                                                winmember.championName
                                                                                                            )}
                                                                                                            title="제이스"
                                                                                                            className="detailChampIcon"
                                                                                                        />
                                                                                                        <div
                                                                                                            className="Level">
                                                                                                            {winmember.champLevel}
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </td>
                                                                                                <td className="SummonerSpell Cell">
                                                                                                    <img
                                                                                                        src={getSpellImg(
                                                                                                            winmember.summoner1Id
                                                                                                        )}
                                                                                                        className="summonerSpell1"
                                                                                                    />
                                                                                                    <img
                                                                                                        src={getSpellImg(
                                                                                                            winmember.summoner2Id
                                                                                                        )}
                                                                                                        className="summonerSpell2"
                                                                                                    />
                                                                                                </td>
                                                                                                <div className="runes">
                                                                                                    <div
                                                                                                        className="rune1">
                                                                                                        <img
                                                                                                            src={getRuneImg(winmember.perks.styles[0].selections[0].perk)}
                                                                                                            className="runeImage1"/>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="rune2">
                                                                                                        <img
                                                                                                            src={getsubRuneImg(winmember.perks.styles[1].style)}
                                                                                                            className="runeImage2"/>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <td className="SummonerName Cell">
                                                                                                    <span
                                                                                                        style={{
                                                                                                            whiteSpace: "nowrap",
                                                                                                        }}
                                                                                                    >
                                                                                                        {winmember.summonerName}
                                                                                                    </span>
                                                                                                </td>
                                                                                                <td className="OPScore Cell"></td>
                                                                                                <td className="KDA Cell">
                                                                                                    <span
                                                                                                        className="KDARatio green">
                                                                                                        {getGrade(
                                                                                                            winmember.kills,
                                                                                                            winmember.deaths,
                                                                                                            winmember.assists
                                                                                                        )}
                                                                                                    </span>
                                                                                                    <div
                                                                                                        className="KDA">
                                                                                                        <span
                                                                                                            className="Kill">
                                                                                                            {winmember.kills}
                                                                                                        </span>
                                                                                                        /
                                                                                                        <span
                                                                                                            className="Death">
                                                                                                            {winmember.deaths}
                                                                                                        </span>
                                                                                                        /
                                                                                                        <span
                                                                                                            className="Assist">
                                                                                                            {winmember.assists}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td className="Damage Cell tip">
                                                                                                    <div
                                                                                                        className="ChampionDamage">
                                                                                                        {winmember.totalDamageDealtToChampions}
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td className="Ward Cell tip">
                                                                                                    <div
                                                                                                        className="Stats">
                                                                                                        <span>
                                                                                                            {" "}
                                                                                                            {winmember.wardsPlaced}
                                                                                                        </span>
                                                                                                        {" "}
                                                                                                        /
                                                                                                        <span>
                                                                                                            {" "}
                                                                                                            {winmember.wardsKilled}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td className="CS Cell">
                                                                                                    <div className="CS">
                                                                                                        {winmember.totalMinionsKilled}
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="CSPerMinute">
                                                                                                        ({(winmember.totalMinionsKilled / (games.gameDuration / 60)).toFixed(1)})
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td className="Items Cell">
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                winmember.item0
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                winmember.item1
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                winmember.item2
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                winmember.item3
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                winmember.item4
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                winmember.item5
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                winmember.item6
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        )
                                                                                    })}
                                                                                    </tbody>
                                                                                </table>
                                                                                <div className="Summary">
                                                                                    <div
                                                                                        className="Team Team-200 Result-WIN">
                                                                                        <div className="ObjectScore">
                                                                                            <img
                                                                                                src="/rank/images/site/summoner/icon-baron-b.png"
                                                                                                className="Image tip"
                                                                                                title="바론"
                                                                                            />
                                                                                            {winteam.objectives.baron.kills}
                                                                                        </div>
                                                                                        <div className="ObjectScore">
                                                                                            <img
                                                                                                src="/rank/images/site/summoner/icon-dragon-b.png"
                                                                                                className="Image tip"
                                                                                                title="드래곤"
                                                                                            />
                                                                                            {winteam.objectives.dragon.kills}
                                                                                        </div>
                                                                                        <div className="ObjectScore">
                                                                                            <img
                                                                                                src="/rank/images/site/summoner/icon-tower-b.png"
                                                                                                className="Image tip"
                                                                                                title="타워"
                                                                                            />
                                                                                            {winteam.objectives.tower.kills}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="summary-graph">
                                                                                        <div
                                                                                            className="total--container">
                                                                                            <div
                                                                                                className="text graph--title">
                                                                                                Total Kill
                                                                                            </div>
                                                                                            <div
                                                                                                className="text graph--data graph--data__left">
                                                                                                {getTotalKills(winmember)}
                                                                                            </div>
                                                                                            <div
                                                                                                className="graph--container">
                                                                                                <div
                                                                                                    className="graph win--team"
                                                                                                    style={{flex: getTotalKills(winmember)}}
                                                                                                ></div>
                                                                                                <div
                                                                                                    className="graph lose--team"
                                                                                                    style={{flex: getTotalKills(losemember)}}
                                                                                                ></div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="text graph--data graph--data__right">
                                                                                                {getTotalKills(losemember)}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            className="total--container">
                                                                                            <div
                                                                                                className="text graph--title">
                                                                                                Total Gold
                                                                                            </div>
                                                                                            <div
                                                                                                className="text graph--data graph--data__left">
                                                                                                {getTotalGolds(winmember)}
                                                                                            </div>
                                                                                            <div
                                                                                                className="graph--container">
                                                                                                <div
                                                                                                    className="graph win--team"
                                                                                                    style={{flex: getTotalGolds(winmember)}}
                                                                                                ></div>
                                                                                                <div
                                                                                                    className="graph lose--team"
                                                                                                    style={{flex: getTotalGolds(losemember)}}
                                                                                                ></div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="text graph--data graph--data__right">
                                                                                                {getTotalGolds(losemember)}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="Team Team-100 Result-LOSE">
                                                                                        <div className="ObjectScore">
                                                                                            <img
                                                                                                src="/rank/images/site/summoner/icon-baron-r.png"
                                                                                                className="Image tip"
                                                                                                title="바론"
                                                                                            />
                                                                                            {loseteam.objectives.baron.kills}
                                                                                        </div>
                                                                                        <div className="ObjectScore">
                                                                                            <img
                                                                                                src="/rank/images/site/summoner/icon-dragon-r.png"
                                                                                                className="Image tip"
                                                                                                title="드래곤"
                                                                                            />
                                                                                            {loseteam.objectives.dragon.kills}
                                                                                        </div>
                                                                                        <div className="ObjectScore">
                                                                                            <img
                                                                                                src="/rank/images/site/summoner/icon-tower-r.png"
                                                                                                className="Image tip"
                                                                                                title="타워"
                                                                                            />
                                                                                            {loseteam.objectives.tower.kills}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <table
                                                                                    className="GameDetailTable Result-LOSE">
                                                                                    <colgroup>
                                                                                        <col className="ChampionImage"/>
                                                                                        <col className="SummonerSpell"/>
                                                                                        <col
                                                                                            className="KeystoneMastery"/>
                                                                                        <col className="SummonerName"/>
                                                                                        <col className="OPScore"/>
                                                                                        <col className="KDA"/>
                                                                                        <col className="Damage"/>
                                                                                        <col className="Ward"/>
                                                                                        <col className="CS"/>
                                                                                        <col className="Items"/>
                                                                                    </colgroup>
                                                                                    <thead className="Header">
                                                                                    <tr className="Row">
                                                                                        <th
                                                                                            className="HeaderCell"
                                                                                            colSpan="4"
                                                                                        >
                                                                                                <span
                                                                                                    className="GameResult">
                                                                                                    패배{" "}
                                                                                                </span>
                                                                                            {loseteam.teamId === 100 ? "(레드팀)" : "(블루팀)"}
                                                                                        </th>
                                                                                        <th className="HeaderCell"></th>
                                                                                        <th className="HeaderCell">
                                                                                            KDA
                                                                                        </th>
                                                                                        <th className="HeaderCell">
                                                                                            피해량
                                                                                        </th>
                                                                                        <th className="HeaderCell">
                                                                                            와드
                                                                                        </th>
                                                                                        <th className="HeaderCell">
                                                                                            CS
                                                                                        </th>
                                                                                        <th className="HeaderCell">
                                                                                            아이템
                                                                                        </th>
                                                                                    </tr>
                                                                                    </thead>
                                                                                    <tbody className="Content">
                                                                                    {losemember.map((losemember) => {
                                                                                        return (
                                                                                            <tr className={"Row RowLose"}>
                                                                                                <td className="ChampionImage Cell">
                                                                                                    <a
                                                                                                        href=""
                                                                                                        target="_blank"
                                                                                                    >
                                                                                                        <img
                                                                                                            src={getChampImg(losemember.championName)}
                                                                                                            title="제이스"
                                                                                                            className="detailChampIcon"
                                                                                                        />
                                                                                                        <div
                                                                                                            className="Level">
                                                                                                            {losemember.champLevel}
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </td>
                                                                                                <td className="SummonerSpell Cell">
                                                                                                    <img
                                                                                                        src={getSpellImg(
                                                                                                            losemember.summoner1Id
                                                                                                        )}
                                                                                                        className="Image tip"
                                                                                                    />
                                                                                                    <img
                                                                                                        src={getSpellImg(
                                                                                                            losemember.summoner2Id
                                                                                                        )}
                                                                                                        className="Image tip"
                                                                                                    />
                                                                                                </td>
                                                                                                <div className="runes">
                                                                                                    <div
                                                                                                        className="rune1">
                                                                                                        <img
                                                                                                            src={getRuneImg(losemember.perks.styles[0].selections[0].perk)}
                                                                                                            className="runeImage1"/>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="rune2">
                                                                                                        <img
                                                                                                            src={getsubRuneImg(losemember.perks.styles[1].style)}
                                                                                                            className="runeImage2"/>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <td className="SummonerName Cell">
                                                                                                    <span
                                                                                                        style={{
                                                                                                            whiteSpace: "nowrap",
                                                                                                        }}
                                                                                                    >
                                                                                                        {losemember.summonerName}
                                                                                                    </span>
                                                                                                </td>
                                                                                                <td className="OPScore Cell"></td>
                                                                                                <td className="KDA Cell">
                                                                                                    <span
                                                                                                        className="KDARatio green">
                                                                                                        {getGrade(
                                                                                                            losemember.kills,
                                                                                                            losemember.deaths,
                                                                                                            losemember.assists
                                                                                                        )}
                                                                                                    </span>
                                                                                                    <div
                                                                                                        className="KDA">
                                                                                                        <span
                                                                                                            className="Kill">
                                                                                                            {losemember.kills}
                                                                                                        </span>
                                                                                                        /
                                                                                                        <span
                                                                                                            className="Death">
                                                                                                            {losemember.deaths}
                                                                                                        </span>
                                                                                                        /
                                                                                                        <span
                                                                                                            className="Assist">
                                                                                                            {losemember.assists}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td className="Damage Cell tip">
                                                                                                    <div
                                                                                                        className="ChampionDamage">
                                                                                                        {losemember.totalDamageDealtToChampions}
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td className="Ward Cell tip">
                                                                                                    <div
                                                                                                        className="Stats">
                                                                                                        <span>
                                                                                                            {" "}
                                                                                                            {losemember.wardsPlaced}
                                                                                                        </span>
                                                                                                        {" "}
                                                                                                        /
                                                                                                        <span>
                                                                                                            {" "}
                                                                                                            {losemember.wardsKilled}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td className="CS Cell">
                                                                                                    <div className="CS">
                                                                                                        {losemember.totalMinionsKilled}
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="CSPerMinute">
                                                                                                        ({(losemember.totalMinionsKilled / (games.gameDuration / 60)).toFixed(1)})
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td className="Items Cell">
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                losemember.item0
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                losemember.item1
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                losemember.item2
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                losemember.item3
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                losemember.item4
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                losemember.item5
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="item">
                                                                                                        <img
                                                                                                            src={getItemImg(
                                                                                                                losemember.item6
                                                                                                            )}
                                                                                                            className="itemImg"
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        )
                                                                                    })}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                            </div>)
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Summoner);
