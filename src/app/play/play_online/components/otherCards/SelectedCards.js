import React from "react";
import style from "./otherCards.module.css";

import AuthContext from "../../../../../other/AuthContext";

function SelectedCards({ selectedCards, setSelectedCards, match }) {
    const ctx = React.useContext(AuthContext);
    return <div className={style.selectedCards}>
        {selectedCards.map(element => {
            return <img className={style.sideCard} key={element} src={ctx.cards[element - 1].image} alt='' onClick={() => {
                if (!match.turn) {
                    return;
                }
                let nSelectedCards = structuredClone(selectedCards);
                nSelectedCards = nSelectedCards.filter(e => e !== element);
                setSelectedCards(nSelectedCards);
            }} />
        })}
    </div>
}

export default SelectedCards;