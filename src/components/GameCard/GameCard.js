import React from 'react';
import './GameCard.css'
import { LOGO_URL } from '../../constants';
import { Link } from 'react-router-dom';

const GameCard = ({ id, status, home, away }) => {
    return (
        <Link className ="link" to={'/game/'+ id}>
         <div className='card'>
            <div className='team'>
                <div className='team-description'>
                    <img src={LOGO_URL + away.team.id + ".svg"}/>
                    <div>
                        <h2>{away.team.name}</h2>
                        <p>({away.leagueRecord.wins}-{away.leagueRecord.losses}-{away.leagueRecord.ot})</p>
                    </div>
                </div>
                <h1>{away.score}</h1>
            </div>
            <div className='team'>
                <div className='team-description'>
                    <img src={LOGO_URL + home.team.id + ".svg"}/>
                    <div>
                        <h2>{home.team.name}</h2>
                        <p>({home.leagueRecord.wins}-{home.leagueRecord.losses}-{home.leagueRecord.ot})</p>
                    </div>
                </div>
                <h1>{home.score}</h1>
            </div>
            <h3>{status.detailedState}</h3>
        </div>
        </Link>
    );
}

export default GameCard;