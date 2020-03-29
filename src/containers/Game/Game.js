import React from "react";
import "./Game.css"
import RinkChart from "../../components/RinkChart/RinkChart";
import PlayerTable from "../../components/PlayerTable/PlayerTable";
import TeamBanner from "../../components/TeamBanner/TeamBanner";
import LastPlay from "../../components/LastPlay/LastPlay";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {LOGO_URL, API_URL, API_URL_DEV } from "../../constants";
import { Link } from "react-router-dom";

class Game extends React.Component {
    
    constructor(props){
        super(props);
        const { gamePk } = this.props.match.params;
        this.state = {
            isLoaded: false,
            id: gamePk,
            home: {},
            away: {},
            players: {},
            plays: {},
        }
    }
    componentDidMount(){
        this.getData();
        this.timer = setInterval(()=> this.getData(), 20000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        this.timer = null;
    }

    getData(){
        const url = (process.env.NODE_ENV === "development") ? API_URL_DEV : API_URL;
        fetch(`${url}/game/${this.state.id}`)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                id: result.id,
                linescore: result.linescore,
                home: result.home,
                away: result.away,
                players: result.players,
                plays: result.plays
            })
            }
        )
    }
    
    render(){
            const {isLoaded, home, away, linescore, plays} = this.state;
            const homeStyle = {
                backgroundColor: home.color1,
                borderColor: home.color2
            }
            const awayStyle = {
                backgroundColor: away.color1,
                borderColor: away.color2
            }
            if(isLoaded){
                if(linescore.currentPeriod > 0){
                    return(
                        <div className="game-container">
                            <TeamBanner away={away} home={home}/>
                            <Paper className="game-time"><h3>{linescore.currentPeriodOrdinal} - {linescore.currentPeriodTimeRemaining}</h3></Paper>
                            <LastPlay play={plays.currentPlay} />
                            <RinkChart plays={plays.allPlays} away={away} home={home} homeStart = {linescore.periods[0].home.rinkSide}/>
                            <div className="team-tables">
                                <PlayerTable name={away.name} data={away.players} />
                                <PlayerTable name={home.name}  data={home.players} />
                            </div>
                            <Link className ="link back-link" to={"/"}>
                                <Button variant="contained" size="large" color="secondary">
                                    Home
                                </Button>
                            </Link>
                        </div>
                    );
                }
                else{
                    return(
                        <div className="not-started-container">
                            <h1>This game hasn't started yet <span role="img" aria-label="face">😑</span></h1>
                            <div className="not-started-teams">
                                <Paper className="not-started-half" style={awayStyle}>
                                    <img src= {`${LOGO_URL}${away.id}.svg`} alt={`${away.name} Logo`}/>
                                </Paper>
                                <h1> at </h1>
                                <Paper className="not-started-half" style={homeStyle}>
                                    <img src= {`${LOGO_URL}${home.id}.svg`} alt={`${home.name} Logo`}/>
                                </Paper>
                            </div>
                            <Link className ="link back-link" to={"/"}>
                                <Button variant="contained" size="large" color="secondary">
                                    Home
                                </Button>
                            </Link>
                        </div>
                    )
                }
            }
            return(
            <div className = "loading">
                <h1>Loading...</h1>
            </div>
            );
        }
    }

export default Game;
