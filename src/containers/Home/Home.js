import React from 'react';
import './Home.css'
import GameCard from '../../components/GameCard/GameCard';
import { API_URL, API_URL_DEV, NHL_LOGO, MONTHS} from '../../constants';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
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
            games: result
          })
        }
      )

  }
  render(){

    const cards = this.state.games.map((game,num) =>
      <GameCard key={num} id={game.gamePk} status={game.status} home={game.home} away={game.away}/>
    );

    var today = new Date();
    var mm = MONTHS[today.getMonth()];
    var dd = String(today.getDate());

    return(
      <div className="home">
        <img src={NHL_LOGO} alt='NHL Logo'/>
        <h1>NHL Games</h1>
        <h2>{mm} {dd}</h2>
        <div className="card-list">
          {cards}
        </div>
      </div>
    )
  }
}

export default Home;
