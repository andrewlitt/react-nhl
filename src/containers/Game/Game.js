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
        const url = (process.env.NODE_ENV =='development') ? API_URL_DEV : API_URL;
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
                    const homePlayerData = home.players.filter(player => player.stats.skaterStats).map(player => {
                        const info = {
                            jerseyNumber: player.jerseyNumber,
                            fullName: player.person.fullName,
                            goals: player.stats.skaterStats.goals,
                            shots: player.stats.skaterStats.shots,
                            hits: player.stats.skaterStats.hits,
                            timeOnIce: player.stats.skaterStats.timeOnIce
                        };
                        return info;
                    });
                    const awayPlayerData = away.players.filter(player => player.stats.skaterStats).map(player => {
                        const info = {
                            jerseyNumber: player.jerseyNumber,
                            fullName: player.person.fullName,
                            goals: player.stats.skaterStats.goals,
                            shots: player.stats.skaterStats.shots,
                            hits: player.stats.skaterStats.hits,
                            timeOnIce: player.stats.skaterStats.timeOnIce
                        };
                        return info;
                    });

                    console.log(awayPlayerData)

                    const columns = [{
                        Header: 'Team',
                        columns: [
                            { accessor: 'jerseyNumber', Header: 'Jersey #'},
                            { accessor: 'fullName', Header: 'Full Name'},
                            { accessor: 'goals', Header: 'Goals'},
                            { accessor: 'shots', Header: 'Shots'},
                            { accessor: 'hits', Header: 'Hits'},
                            { accessor: 'timeOnIce', Header: 'TOI'}
                        ]
                    }];
                    
                    return(
                        <div className="game-container">
                            <TeamBanner away={away} home={home}/>
                            <RinkChart plays={plays.allPlays} away={away} home={home} homeStart = {linescore.periods[0].home.rinkSide}/>

                            <div className="game-time"><h3>{linescore.currentPeriodOrdinal} - {linescore.currentPeriodTimeRemaining}</h3></div>
                            <div className='team-tables'>
                                <PlayerTable columns={columns} data={awayPlayerData} />
                                <PlayerTable columns={columns} data={homePlayerData} />
                            </div>
                            <h3 className="">Last Play</h3>  
                            <div className="last-play">
                                {plays.currentPlay.players && <img src={PLAYER_URL+plays.currentPlay.players[0].player.id+'.jpg'}/> } 
                                <p>{plays.currentPlay.result.description} ({plays.currentPlay.about.periodTime} {plays.currentPlay.about.ordinalNum})</p>
                            </div>

                            <Link className ="link back-link" to={'/'}>
                                <p className="back">Home</p>
                            </Link>
                        </div>
                    );
                }
                else{
                    return(
                        <div className="not-started-container">
                            <h1>This game hasn't started yet. Come back in a bit!</h1>
                            <div className='not-started'>
                                <img src= {`${LOGO_URL}${away.id}.svg`}/>
                                <h1>at</h1>
                                <img src= {`${LOGO_URL}${home.id}.svg`}/>
                            </div>
                            <Link className ="link backLink" to={'/'}>
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
