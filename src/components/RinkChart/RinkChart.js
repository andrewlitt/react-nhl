import React, { useState } from 'react';
import { PLAYER_URL } from '../../constants';
import Triangle from '../../static/img/triangle.png';
import Circle from '../../static/img/circle.png';
import Square from '../../static/img/square.png';
import Diamond from '../../static/img/diamond.png';
import Wye from '../../static/img/wye.png';


import './RinkChart.css'
import {
    ResponsiveContainer,ScatterChart, Scatter, XAxis, YAxis, Tooltip
} from 'recharts';

const RinkChart = ({ plays, away, home, homeStart }) => {

    const getCoords = (teamID, playType, plays) =>{
        const validPlays = plays.filter(play => {
            if(play.team && play.coordinates.x && play.team.id === teamID && play.result.eventTypeId === playType){
                return play;
            } 
            return null;
        });
        const coords = validPlays.map(play => {
            var mult = ((play.about.period === 2) ? -1 : 1);
            if(homeStart === "left") mult = -1*mult;
            
            var color = ((teamID === home.id) ? home.color1 : away.color1);
            return { name: play.result.description, playerID: play.players[0].player.id, x: mult*play.coordinates.x, y: mult*play.coordinates.y, color:color }
        });
        return coords;
    }

    const PlayTooltip = ({ active, payload }) => {
        if (active) {
            console.log(payload[1])
            return (
                <div className="tooltip" style={{backgroundColor: payload[1].payload.color, color: 'white' }}>
                    <img src={PLAYER_URL+payload[1].payload.playerID+'.jpg'} alt = 'Player' />
                    <p className="label">{payload[1].payload.name}</p>
                </div>
            );
        }
        return null;
    };

    const[showHome, setHome]   = useState(true);
    const[showAway, setAway]   = useState(true);
    const[goals, setGoals]     = useState(true);
    const[shots, setShots]     = useState(true);
    const[missed, setMissed]   = useState(true);
    const[blocked, setBlocked] = useState(true);
    const[hits, setHits]       = useState(true);
    
    return (
        <div className="chart-container"> 
            <ResponsiveContainer className="chart" width="90%" aspect={2.35}>
                <ScatterChart>
                    <XAxis type="number" dataKey="x" domain={[-100, 100]} hide={true}/>
                    <YAxis type="number" dataKey="y" domain={[-43, 43]} hide={true} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<PlayTooltip />}/>

                    <Scatter name="home-goals"   hide={!(showHome && goals)  } data={getCoords(home.id,'GOAL',plays)}         fill={home.color1} stroke={home.color2} shape="triangle"/>
                    <Scatter name="home-shots"   hide={!(showHome && shots)  } data={getCoords(home.id,'SHOT',plays)}         fill={home.color1} stroke={home.color2} shape="circle"/>
                    <Scatter name="home-missed"  hide={!(showHome && missed) } data={getCoords(home.id,'MISSED_SHOT',plays)}  fill={home.color1} stroke={home.color2} shape="square"/>
                    <Scatter name="home-blocked" hide={!(showHome && blocked)} data={getCoords(home.id,'BLOCKED_SHOT',plays)} fill={home.color1} stroke={home.color2} shape="diamond"/>
                    <Scatter name="home-hits"    hide={!(showHome && hits)   } data={getCoords(home.id,'HIT',plays)}          fill={home.color1} stroke={home.color2} shape="wye"/>

                    <Scatter name="away-goals"   hide={!(showAway && goals)  } data={getCoords(away.id,'GOAL',plays)}         fill={away.color2} stroke={away.color1} shape="triangle"/>
                    <Scatter name="away-shots"   hide={!(showAway && shots)  } data={getCoords(away.id,'SHOT',plays)}         fill={away.color2} stroke={away.color1} shape="circle"/>
                    <Scatter name="away-missed"  hide={!(showAway && missed) } data={getCoords(away.id,'MISSED_SHOT', plays)} fill={away.color2} stroke={away.color1} shape="square"/>
                    <Scatter name="away-blocked" hide={!(showAway && blocked)} data={getCoords(away.id,'BLOCKED_SHOT',plays)} fill={away.color2} stroke={away.color1} shape="diamond"/>
                    <Scatter name="away-hits"    hide={!(showAway && hits)   } data={getCoords(away.id,'HIT',plays)}          fill={away.color2} stroke={away.color1} shape="wye"/>
                </ScatterChart>
            </ResponsiveContainer>
            <div className="legend">
                <div className="legend-plays">
                    <button className={ !goals   ? 'strike' : ''} onClick={ () => setGoals(!goals)     }><img src={Triangle} alt='Triangle'/><p>Goals</p></button>
                    <button className={ !shots   ? 'strike' : ''} onClick={ () => setShots(!shots)     }><img src={Circle} alt='Circle'/><p>Shots</p></button>
                    <button className={ !missed  ? 'strike' : ''} onClick={ () => setMissed(!missed)   }><img src={Square} alt='Square'/><p>Missed Shots</p></button>
                    <button className={ !blocked ? 'strike' : ''} onClick={ () => setBlocked(!blocked) }><img src={Diamond} alt='Diamond'/><p>Blocked Shots</p></button>
                    <button className={ !hits    ? 'strike' : ''} onClick={ () => setHits(!hits)       }><img src={Wye} alt='Wye'/><p>Hits</p></button>
                </div>
                <div className="legend-teams">
                    <button className={!showAway ? 'strike' : ''} style={{color: away.color1}} onClick={ () => setAway(!showAway) }><p>{away.teamName}</p></button>
                    <button className={!showHome ? 'strike' : ''} style={{color: home.color1}} onClick={ () => setHome(!showHome) }><p>{home.teamName}</p></button>
                </div>
            </div>
        </div>      
    );
}

export default RinkChart;