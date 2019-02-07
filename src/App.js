import React, { Component } from 'react';
import STORE from './STORE'
import List from './List'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = STORE;
  }

  deleteCard = (cardID) => {
    console.log(`Delete card ${cardID} from all lists`);
  }

  addRandomCard = () => {
    console.log(`Add random card to list XXX`);
  }

  render() {
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
              onAddRandomClick={this.addRandomCard}
              onDeleteCardClick={this.deleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
