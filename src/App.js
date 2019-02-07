import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';


function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}


class App extends Component {

  constructor(props) {
    super(props);
// console.log(STORE);
    this.state = STORE;
  }


  deleteCard = (cardID, listID) => {

    debugger;

    omit(this.state.allCards, cardID)

    this.state.lists.map((list) => {
      const newArr = list.cardIds.filter((c) => {
        return c.id !== cardID;
      })

      return { ...list, cardIds: newArr }
    });

    // omit(this.state.lists[listID].cardIds[xxxxxxx])

    console.log(`Delete card ${cardID} from ${listID}`);
  }

  addrandomCard = () => {
    console.log('Add random card');
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
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
              onDelete = {this.deleteCard}
              onAddRandom = {this.addRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
