import React from "react";
import style from "./Deck.module.css";

import { link, headers, checkResponse } from "../../../other/api/api";
import AuthContext from "../../../other/AuthContext";
import removeIcon from "./removeIcon";


function Deck({ deck, deck_id, setDecks, decks }) {
    const ctx = React.useContext(AuthContext);
    if (ctx.cards.length <= 0) {
        return;
    }

    const remove = () => {
        fetch(link + 'decks/delete/', {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify({ 'id': deck_id })
        }).then(checkResponse).then(res => { res.value === "done" && setDecks(decks.filter(e => e[0] !== deck_id)) })
    }

    return <div className={style.deck} onClick={() => {
        ctx.setDeck(deck);
        localStorage.setItem('deck', deck.join(','));
    }} >
        <img className={style.card} src={ctx.cards[deck[2] - 1].image} />
        <img className={style.card} src={ctx.cards[deck[1] - 1].image} />
        <img className={style.card} src={ctx.cards[deck[0] - 1].image} />
        <img className={style.remove} src={removeIcon} onClick={remove} />
    </div>
}

export default Deck;