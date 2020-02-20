import React from 'react';
import './RinkChart.css'
import { PLAYER_URL } from '../../constants';
import {
    ResponsiveContainer,ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from 'recharts';


class RinkChart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            home: true,
            away: true,
            goals: true,
            shots: true,
            missed: true,
            blocked: true,
            hits: true
        }
    }
    
    getCoords(teamID, playType, plays){
        const validPlays = plays.filter(play => {
            if(play.team && play.coordinates.x && play.team.id == teamID && play.result.eventTypeId === playType){
                return play;
            }  
        });
        const coords = validPlays.map(play => {
            var mult = ((play.about.period == 2) ? '-1' : '1');
            if(this.props.homeStart =="left") mult = -1*mult;
            return { name: play.result.description, playerID: play.players[0].player.id,x: mult*play.coordinates.x, y: mult*play.coordinates.y}
        });
        return coords;
    }
    
    render(){
        const CustomTooltip = ({ active, payload, label }) => {
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

        const { plays, home, away } = this.props;
        console.log(plays)
        return (
            <div className="chart-container">
                <div className="legend">
                    <div>
                        <button className={!this.state.away && 'strike'} onClick={ () => this.setState({ away: !this.state.away}) }><div id="triangle"></div><p>{away.teamName}</p></button>
                        <button className={!this.state.home && 'strike'} onClick={ () => this.setState({ home: !this.state.home}) }><div id="circle"></div><p>{home.teamName}</p></button>
                    </div>
                    <div>
                        <button className={!this.state.goals && 'strike'}    onClick={ () => this.setState({ goals: !this.state.goals}) }><p className='goals'>Goals</p></button>
                        <button className={!this.state.shots && 'strike'}    onClick={ () => this.setState({ shots: !this.state.shots}) }><p className='shots'>Shots</p></button>
                        <button className={!this.state.missed && 'strike'}   onClick={ () => this.setState({ missed: !this.state.missed}) }><p className='missed'>Missed Shots</p></button>
                        <button className={!this.state.blocked && 'strike'}  onClick={ () => this.setState({ blocked: !this.state.blocked}) }><p className='blocked'>Blocked Shots</p></button>
                        <button className={!this.state.hits && 'strike'}     onClick={ () => this.setState({ hits: !this.state.hits}) }><p className='hits'>Hits</p></button>
                    </div>
                </div>
                <ResponsiveContainer className="chart" width="80%" aspect={2.35}>
                    <ScatterChart>
                        <XAxis type="number" dataKey="x" domain={[-100, 100]} hide={true}/>
                        <YAxis type="number" dataKey="y" domain={[-43, 43]} hide={true} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />}/>

                        <Scatter name="home-goals"   hide={!(this.state.home && this.state.goals)}   data={this.getCoords(home.id,'GOAL',plays)}         fill="red"   />
                        <Scatter name="home-shots"   hide={!(this.state.home && this.state.shots)}   data={this.getCoords(home.id,'SHOT',plays)}         fill="blue"  />
                        <Scatter name="home-missed"  hide={!(this.state.home && this.state.missed)}  data={this.getCoords(home.id,'MISSED_SHOT',plays)}  fill="black" />
                        <Scatter name="home-blocked" hide={!(this.state.home && this.state.blocked)} data={this.getCoords(home.id,'BLOCKED_SHOT',plays)} fill="purple"/>
                        <Scatter name="home-hits"    hide={!(this.state.home && this.state.hits)}    data={this.getCoords(home.id,'HIT',plays)}          fill="green" />

                        <Scatter name="away-goals"   hide={!(this.state.away && this.state.goals)}   data={this.getCoords(away.id,'GOAL',plays)}         fill="red"   shape="triangle"/>
                        <Scatter name="away-shots"   hide={!(this.state.away && this.state.shots)}   data={this.getCoords(away.id,'SHOT',plays)}         fill="blue"  shape="triangle"/>
                        <Scatter name="away-missed"  hide={!(this.state.away && this.state.missed)}  data={this.getCoords(away.id,'MISSED_SHOT', plays)} fill="black" shape="triangle"/>
                        <Scatter name="away-blocked" hide={!(this.state.away && this.state.blocked)} data={this.getCoords(away.id,'BLOCKED_SHOT',plays)} fill="purple"   shape="triangle"/>
                        <Scatter name="away-hits"    hide={!(this.state.away && this.state.hits)}    data={this.getCoords(away.id,'HIT',plays)}          fill="green" shape="triangle"/>


                    </ScatterChart>
                </ResponsiveContainer>
            </div>      
    );
    }
}

export default RinkChart;