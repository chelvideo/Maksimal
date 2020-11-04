import React from 'react';
import { connect } from 'react-redux';
import '../styles/EditCard.css';
import Form from './Form';

function EditCard(props) {
    
    return (
        <div className="card-edit">
            

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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard)
