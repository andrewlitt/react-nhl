import React from 'react';
import './GameCard.css'
import { LOGO_URL_LIGHT } from '../../constants';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

const GameCard = ({ id, status, home, away }) => {
    const showScore = status.codedGameState  > 2  ? true : false; 
    console.log(status.codedGameState)
    return (
        <Link className ="link" to={'/game/'+ id}>
         <Paper className='card'>
            <div className='team'>
                <div className='team-description'>
                    <img src={LOGO_URL_LIGHT + away.team.id + ".svg"} alt={`${away.team.name} Logo`}/>
                    <div>
                        <h2>{away.team.name}</h2>
                        <p>({away.leagueRecord.wins}-{away.leagueRecord.losses}-{away.leagueRecord.ot})</p>
                    </div>
                </div>
                {showScore && <h1>{away.score}</h1> }
            </div>
            <div className='team'>
                <div className='team-description'>
                    <img src={LOGO_URL_LIGHT + home.team.id + ".svg"} alt={`${home.team.name} Logo`}/>
                    <div>
                        <h2>{home.team.name}</h2>
                        <p>({home.leagueRecord.wins}-{home.leagueRecord.losses}-{home.leagueRecord.ot})</p>
                    </div>
                </div>
                {showScore && <h1>{home.score}</h1> }
            </div>
            <h3>{status.detailedState}</h3>
        </Paper>
        </Link>
    );
}

export default GameCard;