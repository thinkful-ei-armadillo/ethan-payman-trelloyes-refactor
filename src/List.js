import React from 'react';
import Card from './Card';
import './List.css';

export default class List extends React.Component {
  render() {
    return (
      <section className="List">
        <header className="List-header">
          <h2>{this.props.header}</h2>
        </header>
        <div className="List-cards">
          {this.props.cards.map(card => (
            <Card
              key={card.id}
              title={card.title}
              content={card.content}
              onDelete={() => {
                this.props.onDelete(card.id, this.props.id);
              }}
            />
          ))}
          <button
            type="button"
            onClick={() => this.props.onAddRandom(this.props.id)}
            className="List-add-button"
          >
            + Add Random Card
          </button>
        </div>
      </section>
    );
  }
}
