import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import saveCard from '../store/actionsCreators/saveCard';
import '../styles/EditCard.css';

function EditCard(props) {
    const {save} = props;
    
    return (
        <div className="card-edit">
           
               <input className="card-edit__name" type="text" />
               <button onClick = { save }>Save</button>
           
        </div>
    );
}

function mapStateToProps(state) {
    return {
        cardsCount: state.cardsCount,
        activeCardId: state.activeCardId,
        cards: state.cards
    }
}

function mapDispatchToProps(dispatch ) {
    

    return {
        save: () => {
            const name = document.querySelector('.card-edit__name');
            const cardDetail = {
                name: name.value,
                account: 111,
            }  
            
            dispatch(saveCard(cardDetail))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard)
