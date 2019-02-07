import React, { Component } from 'react';
import List from './List';
import './App.css';
import STORE from './STORE';

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
      key === keyToOmit ? newObj : { ...newObj, [key]: value },
    {}
  );
}

const newRandomCard = () => {
  const id =
    Math.random()
      .toString(36)
      .substring(2, 4) +
    Math.random()
      .toString(36)
      .substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum'
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    // console.log(STORE);
    this.state = STORE;
  }

  deleteCard = (cardID, listID) => {
    this.setState({
      allCards: omit(this.state.allCards, cardID)
    });
    this.setState({
      lists: this.state.lists.map(list => {
        const newArr = list.cardIds.filter(c => {
          return c !== cardID;
        });
        return { ...list, cardIds: newArr };
      })
    });

    // omit(this.state.lists[listID].cardIds[xxxxxxx])
    console.log(`Delete card ${cardID} from ${listID}`);
  };

  addRandomCard = id => {
    const card = newRandomCard();

    const list = this.state.lists.find(element => element.id === id);
    const newArr = [...list.cardIds, card.id];
    const newAllCards = { ...this.state.allCards };
    newAllCards[card.id] = card;

    this.setState({
      allCards: newAllCards,
      lists: this.state.lists.map(element => {
        if (element === list) {
          return { ...element, cardIds: newArr };
        }
        return element;
      })
    });
  };

  render() {
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {this.state.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
              onDelete={this.deleteCard}
              onAddRandom={this.addRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
