import React from 'react';
import './Home.css'
import GameCard from '../../components/GameCard/GameCard';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      games: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:8000/')
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
    return(
      <div className="home">
        <div className="card-list">
          {cards}
        </div>
      </div>
    )
  }
}

export default Home;
