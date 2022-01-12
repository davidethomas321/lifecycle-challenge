import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.clock = this.clock.bind(this)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      count: 0,
      shadow: 0,
      guess: false
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => {
      this.setState({
        pokeInfo: res,
        pokeSprite: res.sprites.front_default,
        pokeName: res.species.name,
      })
    })
    .catch((err) => console.log(err));
    this.timer = setInterval(this.clock, 1000);
    this.setState({count:10});
    this.setState({guess:true});
    this.setState({shadow:0});
  }

  clock(){
    if (this.state.count > 0) {
      this.setState({count: this.state.count - 1})
    } else {
      clearInterval(this.timer);
      this.setState({shadow: 100});
      this.setState({guess: false});
    }
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.count}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} style={{filter: `contrast(${this.state.shadow}%)`}} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{(this.state.guess)?"Guess Who?":this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;