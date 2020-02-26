import React, { useState } from 'react';
import { PLAYER_URL } from '../../constants';
import './RinkChart.css'
import {
    ResponsiveContainer,ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from 'recharts';


const RinkChart = ({ plays, away, home, homeStart }) => {

    const getCoords = (teamID, playType, plays) =>{
        const validPlays = plays.filter(play => {
            if(play.team && play.coordinates.x && play.team.id == teamID && play.result.eventTypeId === playType){
                return play;
            }  
        });
        const coords = validPlays.map(play => {
            var mult = ((play.about.period == 2) ? '-1' : '1');
            if(homeStart =="left") mult = -1*mult;
            return { name: play.result.description, playerID: play.players[0].player.id,x: mult*play.coordinates.x, y: mult*play.coordinates.y}
        });
        return coords;
    }

    const PlayTooltip = ({ active, payload }) => {
        if (active) {
            return (
                <div className="tooltip">
                    <img src={PLAYER_URL+payload[1].payload.playerID+'.jpg'} />
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
            <div className="legend">
                <div>
                    <button className={!showAway && 'strike'} onClick={ () => setAway(!showAway) }><div id="triangle"></div><p>{away.teamName}</p></button>
                    <button className={!showHome && 'strike'} onClick={ () => setHome(!showHome) }><div id="circle"></div><p>{home.teamName}</p></button>
                </div>
                <div>
                    <button className={ !goals   && 'strike' } onClick={ () => setGoals(!goals)     }><p className='goals'>Goals</p></button>
                    <button className={ !shots   && 'strike' } onClick={ () => setShots(!shots)     }><p className='shots'>Shots</p></button>
                    <button className={ !missed  && 'strike' } onClick={ () => setMissed(!missed)   }><p className='missed'>Missed Shots</p></button>
                    <button className={ !blocked && 'strike' } onClick={ () => setBlocked(!blocked) }><p className='blocked'>Blocked Shots</p></button>
                    <button className={ !hits    && 'strike' } onClick={ () => setHits(!hits)       }><p className='hits'>Hits</p></button>
                </div>
            </div>
            <ResponsiveContainer className="chart" width="80%" aspect={2.35}>
                <ScatterChart>
                    <XAxis type="number" dataKey="x" domain={[-100, 100]} hide={true}/>
                    <YAxis type="number" dataKey="y" domain={[-43, 43]} hide={true} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<PlayTooltip />}/>

                    <Scatter name="home-goals"   hide={!(showHome && goals)  } data={getCoords(home.id,'GOAL',plays)}         fill="red"   />
                    <Scatter name="home-shots"   hide={!(showHome && shots)  } data={getCoords(home.id,'SHOT',plays)}         fill="blue"  />
                    <Scatter name="home-missed"  hide={!(showHome && missed) } data={getCoords(home.id,'MISSED_SHOT',plays)}  fill="black" />
                    <Scatter name="home-blocked" hide={!(showHome && blocked)} data={getCoords(home.id,'BLOCKED_SHOT',plays)} fill="purple"/>
                    <Scatter name="home-hits"    hide={!(showHome && hits)   } data={getCoords(home.id,'HIT',plays)}          fill="green" />

                    <Scatter name="away-goals"   hide={!(showAway && goals)  } data={getCoords(away.id,'GOAL',plays)}         fill="red"   shape="triangle"/>
                    <Scatter name="away-shots"   hide={!(showAway && shots)  } data={getCoords(away.id,'SHOT',plays)}         fill="blue"  shape="triangle"/>
                    <Scatter name="away-missed"  hide={!(showAway && missed) } data={getCoords(away.id,'MISSED_SHOT', plays)} fill="black" shape="triangle"/>
                    <Scatter name="away-blocked" hide={!(showAway && blocked)} data={getCoords(away.id,'BLOCKED_SHOT',plays)} fill="purple"   shape="triangle"/>
                    <Scatter name="away-hits"    hide={!(showAway && hits)   } data={getCoords(away.id,'HIT',plays)}          fill="green" shape="triangle"/>
                </ScatterChart>
            </ResponsiveContainer>
        </div>      
    );
}

export default RinkChart;