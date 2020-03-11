import React from 'react';
import './TeamBanner.css'
import { LOGO_URL } from '../../constants';
import AppBar from '@material-ui/core/AppBar';

const TeamBanner = ({ away, home }) => {

    const awayStyle = {
        backgroundColor: away.color1,
        borderColor: away.color2
    }
    const homeStyle = {
        backgroundColor: home.color1,
        borderColor: home.color2
    }
    return (
        <AppBar position='fixed' className='banner-wrapper'>
            <header className ='banner'>
                <div className='banner-team'>
                    <div className='banner-content banner-away' style={awayStyle}>
                        <div className='banner-logo'>
                            <h2>{away.teamName}</h2>
                            <img src= {`${LOGO_URL}${away.id}.svg`} alt={`${away.name} Logo`}/>
                        </div>
                    </div>
                    <div className='banner-goals'>
                        <h1>{away.teamSkaterStats.goals}</h1>
                    </div>
                </div>
                <div className='banner-team'>
                    <div className='banner-goals'>
                        <h1>{home.teamSkaterStats.goals}</h1>
                    </div>
                    <div className='banner-content' style={homeStyle}>
                        <div className='banner-logo'>
                            <img src={`${LOGO_URL}${home.id}.svg`} alt={`${home.name} Logo`}/>
                            <h2>{home.teamName}</h2>
                        </div>
                    </div>
                </div>
            </header>
        </AppBar>
        
    );
}

export default TeamBanner;