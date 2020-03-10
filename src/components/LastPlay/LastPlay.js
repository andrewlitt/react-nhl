import React from 'react';
import './LastPlay.css'
import { PLAYER_URL } from '../../constants';

const LastPlay = ({ play }) => {
    return (
        <div className="last-play">
            {play.players && <img src={PLAYER_URL+play.players[0].player.id+'.jpg'} alt = 'Player'/> } 
            <p>{play.result.description} ({play.about.periodTime} {play.about.ordinalNum})</p>
        </div>
    );
}

export default LastPlay;


