import React from 'react';
import './Home.css'
import GameCard from '../../components/GameCard/GameCard';
import { API_URL, API_URL_DEV, NHL_LOGO, MONTHS} from '../../constants';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      date: '',
      games: []
    }
  }
  componentDidMount(){
    const url = (process.env.NODE_ENV === 'development') ? API_URL_DEV : API_URL;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            date: result.date,
            games: result.games
          })
        }
      )
  }
  render(){
    const {isLoaded, date, games} = this.state;
    var today = new Date(date);
    var mm = MONTHS[today.getMonth()];
    var dd = String(today.getDate()+1);
    
    const cards = games.map((game,num) =>
      <GameCard key={num} id={game.gamePk} status={game.status} home={game.home} away={game.away}/>
    );

    if(isLoaded){
      return(
        <div className="home">
          <Paper className="intro">
            <img src={NHL_LOGO} alt='NHL Logo'/>
            <h1>Today's Games</h1>
            <h2>{mm} {dd}</h2>
          </Paper>
          <Paper className='PSA'>
            <p>
              Well... it seems the NHL is going to be on hold for a little while.<br/>
              In the meantime, you can check out some examples of this app below.
            </p>
            <div className='PSA-buttons'>
              <Link className ='link back-link' to={'/game/2019020901'}>
                  <Button size='large' color='primary'>
                    Example 1
                  </Button>
              </Link>
              <Link className ='link back-link' to={'/game/2019020100'}>
                  <Button size='large' color='primary'>
                    Example 2
                  </Button>
              </Link>
              <Link className ='link back-link' to={'/game/2019020150'}>
                  <Button size='large' color='primary'>
                    Example 3
                  </Button>
              </Link>
            </div>
          </Paper>
          <div className="card-list">
            {cards}
          </div>
        </div>
      )
    }
      return(
      <div className = 'loading'>
        <h1>Loading...</h1>
      </div>
      );
  }
}

export default Home;
