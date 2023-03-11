import React from "react";
import style from "./otherCards.module.css";

import AuthContext from "../../../../../other/AuthContext";

function LastMoveCards({ match }) {
    const ctx = React.useContext(AuthContext);
    return <div className={style.lastMoveCards}>
        {match.last_move_cards.map(e => {
            return <img className={style.sideCard} key={e} src={ctx.cards[e - 1].image} alt='' />
        })}
    </div>
}

export default LastMoveCards;