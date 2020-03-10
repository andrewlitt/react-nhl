import React from 'react';
import './Game.css'
import RinkChart from '../../components/RinkChart/RinkChart';
import PlayerTable from '../../components/PlayerTable/PlayerTable';
import TeamBanner from '../../components/TeamBanner/TeamBanner';
import {LOGO_URL, PLAYER_URL, API_URL, API_URL_DEV } from '../../constants';
import { Link } from 'react-router-dom';

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
        const url = (process.env.NODE_ENV === 'development') ? API_URL_DEV : API_URL;
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

            if(isLoaded){
                if(linescore.currentPeriod > 0){

                    const columns = [
                        { accessor: 'jerseyNumber', Header: 'Jersey #'},
                        { accessor: 'fullName', Header: 'Full Name'},
                        { accessor: 'goals', Header: 'Goals'},
                        { accessor: 'shots', Header: 'Shots'},
                        { accessor: 'hits', Header: 'Hits'},
                        { accessor: 'timeOnIce', Header: 'TOI'}
                    ]
                    const awayColumns = [{
                        Header: away.name,
                        columns: columns
                    }];
                    const homeColumns = [{
                        Header:  home.name,
                        columns: columns
                    }];

                    return(
                        <div className="game-container">
                            <TeamBanner away={away} home={home}/>
                            <div className="game-time"><h3>{linescore.currentPeriodOrdinal} - {linescore.currentPeriodTimeRemaining}</h3></div>
                            <div className="last-play">
                                {plays.currentPlay.players && <img src={PLAYER_URL+plays.currentPlay.players[0].player.id+'.jpg'} alt = 'Player'/> } 
                                <p>{plays.currentPlay.result.description} ({plays.currentPlay.about.periodTime} {plays.currentPlay.about.ordinalNum})</p>
                            </div>
                            <RinkChart plays={plays.allPlays} away={away} home={home} homeStart = {linescore.periods[0].home.rinkSide}/>
                            <div className='team-tables'>
                                <PlayerTable columns={awayColumns} data={away.players} />
                                <PlayerTable columns={homeColumns} data={home.players} />
                            </div>
                            <Link className ="link back-link" to={'/'}>
                                <p className="back">Home</p>
                            </Link>
                        </div>
                    );
                }
                else{
                    const homeStyle = {
                        backgroundColor: home.color1,
                        borderColor: home.color2
                    }
                    const awayStyle = {
                        backgroundColor: away.color1,
                        borderColor: away.color2
                    }
                    return(
                        <div className="not-started-container">
                            <div className="not-started-half" style={awayStyle}>
                                <img src= {`${LOGO_URL}${away.id}.svg`} alt={`${away.name} Logo`}/>
                            </div>
                            <div className="not-started-half" style={homeStyle}>
                                <img src= {`${LOGO_URL}${home.id}.svg`} alt={`${home.name} Logo`}/>
                            </div>
                            <h1 className = "center top">This game hasn't started yet 😑</h1>
                            <Link className ="link backLink center bottom" to={'/'}>
                                <p className="back">Home</p>
                            </Link>
                        </div>
                    )
                }
            }
            return(<h1>Loading...</h1>);
        }
    }

export default Game;
