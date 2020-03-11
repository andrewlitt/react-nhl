import React from 'react';
import './LastPlay.css'
import { PLAYER_URL } from '../../constants';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const LastPlay = ({ play }) => {
    return (
        <Paper className="last-play">
            {play.players && <Avatar src={PLAYER_URL+play.players[0].player.id+'.jpg'} alt = 'Player'/> } 
            <p>{play.result.description} ({play.about.periodTime} {play.about.ordinalNum})</p>
        </Paper>
    );
}

export default LastPlay;


