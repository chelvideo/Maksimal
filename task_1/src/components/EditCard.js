import React from 'react';
import { connect } from 'react-redux';
import '../styles/EditCard.css';
import CardsBar from './CardsBar';
import Form from './Form';

function EditCard(props) {
    
    return (
        <div className="card-edit">
            <CardsBar save={props.save}/>            
            <Form />
        </div>
    );
}

function mapStateToProps(store) {
    return {
        cardsCount: store.cardsCount,
        activeCardId: store.activeCardId,
        cards: store.cards
    }
}

function mapDispatchToProps(dispatch ) {
    return {
        save: () => console.log(111),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard)
