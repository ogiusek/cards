import React from "react";
import style from "./MyCards.module.css";

import AuthContext from "../../../../../other/AuthContext";

function MyCards({ match, selectedCards, setSelectedCards }) {
    const ctx = React.useContext(AuthContext);
    return <div className={style.cards}>
        {match.cards.map(element => {
            return <img className={style.card + ' ' + (selectedCards.find(e => e === Number(element)) ? style.selectedCard : '')}
                src={ctx.cards[Number(element) - 1].image} alt='' key={element} onClick={() => {
                    if (!match.turn) {
                        return;
                    }
                    let nSelectedCards = structuredClone(selectedCards);
                    if (selectedCards.find(e => e === Number(element)) === undefined &&
                        CheckCardPos(
                            ctx.cards[selectedCards[selectedCards.length - 1] - 1],
                            ctx.cards[element - 1]) &&
                        selectedCards.length < 4) {
                        nSelectedCards.push(Number(element));
                    } else {
                        let fIndex = 5;
                        nSelectedCards = nSelectedCards.filter((e, index) => {
                            if (Number(e) === Number(element)) {
                                fIndex = index;
                                return false;
                            }
                            return !(index >= fIndex);
                        });
                    }
                    setSelectedCards(nSelectedCards);
                }} />
        })}
    </div>
}

function CheckCardPos(cardOne, cardTwo) {
    if (cardOne === undefined) {
        return true;
    }
    const posOne = cardOne.card_pos;
    const posTwo = cardTwo.card_pos;
    const arg0 = posOne === 2 || posTwo === 2;
    const arg1 = (posOne === 0 || posOne === 1) && [0, 3].find(e => e === posTwo) !== undefined;
    const arg2 = (posOne === 3 || posOne === 4) && [1, 4].find(e => e === posTwo) !== undefined;
    if (arg0 || arg1 || arg2) {
        return true;
    }
    return false;
}

export default MyCards;