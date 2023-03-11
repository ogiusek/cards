import React, { useEffect, useState } from "react";
import style from "./DeckEdit.module.css";

import { link, headers, checkResponse } from "../../../other/api/api";
import AuthContext from "../../../other/AuthContext";
import arrayEquals from "../../../other/arrayEquals";

function DeckEdit({ deck, decks, setDecks }) {
    const [nDeck, setNDeck] = useState(structuredClone(deck));
    const ctx = React.useContext(AuthContext);

    useEffect(() => {
        setNDeck(structuredClone(deck));
    }, [ctx]);

    if (ctx.cards.length <= 0) {
        return;
    }

    const restCards = structuredClone(ctx.cards).filter(item => !nDeck.includes(item.id));
    return (<div className={style.container}>
        <div style={{ 'display': 'flex', 'flexDirection': 'row', }}>
            <div>
                <div style={{ textAlign: 'center' }}>Cards</div>
                <div className={style.cards}>
                    {
                        restCards.map((element, index) => {
                            return <div key={restCards[0] + '' + index}>
                                <img className={style.card} src={element.image} alt=''
                                    onClick={() => { nDeck.length < 14 && setNDeck([...nDeck, element.id]) }} />
                            </div>;
                        })
                    }
                </div>
            </div>
            <div style={{ marginLeft: '10px', 'direction': 'rtl' }}>
                <div style={{ textAlign: 'center' }}>Deck</div>
                <div className={style.cards}>
                    <div style={{ width: '260px' }} />
                    {
                        nDeck.map((element, index) => {
                            return <div key={nDeck[0] + '' + index} className={style.cardPlaceholder}>
                                <img className={style.card} src={ctx.cards[element - 1].image}
                                    onClick={() => setNDeck(nDeck.filter(e => e !== element))} alt='' />
                            </div>;
                        })
                    }
                </div>
            </div>
        </div>

        <div className="buttonContainer">
            <button className={style.save} onClick={() => {
                let id = -1;
                decks.map(element => { arrayEquals(element[2], deck) && (id = element[0]) });
                if (id === -1 || arrayEquals(deck, nDeck) || nDeck.length < 14) { return; }
                fetch(link + 'decks/update/', {
                    method: 'PATCH', headers: headers,
                    body: JSON.stringify({ 'user_id': ctx.user[0], 'deck': nDeck, 'id': id })
                }).then(checkResponse).then(result => {
                    if (result.value === "done") {
                        setDecks(decks.map(e => [e[0], e[1], arrayEquals(e[2], deck) ? nDeck : e[2]]));
                    }
                });
            }}>save</button>
        </div>
    </div>);
}

export default DeckEdit;