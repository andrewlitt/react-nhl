import React from 'react';
import './Game.css'
import RinkChart from '../../components/RinkChart/RinkChart';
import PlayerTable from '../../components/PlayerTable/PlayerTable';
import {LOGO_URL, PLAYER_URL} from '../../constants';
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
        this.timer = setInterval(()=> this.getData(), 30000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        this.timer = null;
    }

    getData(){
        fetch(`http://localhost:8000/game/${this.state.id}`)
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
    getCoords(teamID, playType, plays){
        const validPlays = plays.filter(play => {
            if(play.coordinates.x && play.team.id == teamID && play.result.eventTypeId === playType){
                return play;
            }
            return null;
        });
        const coords = validPlays.map(play => {
            var mult = ((play.about.period == 2) ? '-1' : '1');
            if(this.state.linescore.periods[0].home.rinkSide =="left") mult = -1*mult;
            return { name: play.result.description, playerID: play.players[0].player.id,x: mult*play.coordinates.x, y: mult*play.coordinates.y}
        });
        return coords;
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
                            <div className="game-time"><h3>{linescore.currentPeriodOrdinal} - {linescore.currentPeriodTimeRemaining}</h3></div>
                            <div className='teams'>
                                <div className='team-line'>
                                    <div className='team-line-group'>
                                        <img src= {`${LOGO_URL}${away.id}.svg`}/>
                                        <h2>{away.teamName}</h2>
                                    </div>
                                    <h1>{linescore.teams.away.goals}</h1>
                                </div>
                                <div className='team-line'>
                                    <div className='team-line-group'>
                                        <img src={`${LOGO_URL}${home.id}.svg`}/>
                                        <h2>{home.teamName}</h2>
                                    </div>
                                    <h1>{linescore.teams.home.goals}</h1>
                                </div>    
                            </div>
                            <h3 className="">Last Play</h3>  
                            <div className="last-play">
                                {plays.currentPlay.players && <img src={PLAYER_URL+plays.currentPlay.players[0].player.id+'.jpg'}/> } 
                                <p>{plays.currentPlay.result.description} ({plays.currentPlay.about.periodTime} {plays.currentPlay.about.ordinalNum})</p>
                            </div>
                            <RinkChart plays={plays.allPlays} away={away} home={home} homeStart = {linescore.periods[0].home.rinkSide}/>
                            <div className='team-tables'>
                                <PlayerTable columns={columns} data={awayPlayerData} />
                                <PlayerTable columns={columns} data={homePlayerData} />
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
