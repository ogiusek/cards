import React, { useEffect, useState } from "react";
import style from "./Decks.module.css";

import { link, headers, checkResponse } from "../../other/api/api";
import { Link } from "react-router-dom";
import arrayEquals from "../../other/arrayEquals";
import AuthContext from "../../other/AuthContext";
import DeckEdit from "./deck_edit/DeckEdit";
import Deck from "./deck/Deck";
import addIcon from "./deck_edit/addIcon";

function Decks() {
    const ctx = React.useContext(AuthContext);
    const [decks, setDecks] = useState([]);
    const refresh = () => {
        if (ctx.user.length > 0 && decks.length === 0) {
            fetch(link + 'decks/get/' + ctx.user[0]).then(checkResponse)
                .then(result => {
                    if (result.length === 0) {
                        addDeck();
                        return;
                    }
                    setDecks(result.map(element => [element[0], element[1], element[2].split(',').map(e => Number(e))]));
                    let foundDeck = false;
                    result.map(element => arrayEquals(element[2].split(','), ctx.deck) && (foundDeck = true))
                    if (!foundDeck) {
                        localStorage.setItem('deck', result[0][2])
                        ctx.setDeck(result[0][2].split(',').map(e => Number(e)));
                    }
                })
        }
    }

    const addDeck = () => {
        const nd = [2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        fetch(link + 'decks/post/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ "user_id": ctx.user[0], "deck": nd })
        }).then(checkResponse).then(result => {
            if (result.value !== 'error') {
                let nDeck = structuredClone(decks);
                nDeck.push([result.id, ctx.user[0], nd]);
                setDecks(nDeck);
            }
        })
    }

    useEffect(() => {
        refresh();
    }, [ctx]);

    return (<div className={style.decks}>
        <div style={{ maxHeight: '80vh', overflowY: 'auto', overflowX: 'hidden' }}>
            {decks.map((deck, index) => {
                return <Deck key={index} deck={deck[2]} deck_id={deck[0]} setDecks={setDecks} decks={decks} />
            })}
            <img className={style.add} src={addIcon} onClick={addDeck} />
        </div>

        <DeckEdit deck={ctx.deck} refresh={refresh} decks={decks} setDecks={setDecks} />

        <hr style={{ width: '100%', opacity: '0' }} />
        <div className={style.home + ' buttonContainer'}>
            <Link to='/home'>Home</Link>
        </div>
    </div >);
}

export default Decks;