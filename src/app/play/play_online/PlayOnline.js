import React, { useEffect, useReducer, useState } from "react";
import style from "./PlayOnline.module.css";

import { Reducer, initState } from "./components/Reducer";
import AuthContext from "../../../other/AuthContext";
import { link, headers, checkResponse } from "../../../other/api/api";

import Load from "./components/Load";
import EnemyCards from "./components/enemyCards/EnemyCards";
import Character from "./components/character/Character";
import SelectedCards from "./components/otherCards/SelectedCards";
import LastMoveCards from "./components/otherCards/LastMoveCards";
import MyCards from "./components/myCards/MyCards";
import Winner from "./components/winner/Winner";
import arrayEquals from "../../../other/arrayEquals";

function PlayOnline({ back, home }) {
    const ctx = React.useContext(AuthContext);
    const [match, dispatchMatch] = useReducer(Reducer, initState);
    const [matchId, setMatchId] = useState(undefined);
    const [selectedCards, setSelectedCards] = useState([]);
    const [winner, setWinner] = useState('');

    const myKey = ctx.user[0] === match.invitee_id ? 'invitee_' : 'invited_';
    const enemyKey = ctx.user[0] === match.invitee_id ? 'invited_' : 'invitee_';

    const confirmMove = () => {
        if (winner !== '') {
            return;
        }
        let newCards = match.cards.filter(e => !(selectedCards.find(element => element === e) + 1));
        if (!arrayEquals(newCards, match.cards)) {
            dispatchMatch({ cards: newCards });
            return;
        }

        fetch(link + 'match/play/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "user": ctx.login,
                "match_id": matchId,
                "cards": selectedCards
            })
        }).then(checkResponse).then(result => {
            console.log(result);
            if (result.value === "done") {
                setSelectedCards([]);
                const res = result.result;
                dispatchMatch(dispachRes(res, ctx.user));
            }
        })
    }

    useEffect(() => {
        if (match[myKey + 'hp'] <= 0) {
            setWinner('You Lose');
            return;
        }
        if (match[enemyKey + 'hp'] <= 0) {
            setWinner('You Won');
            return;
        }
        if (!match.turn) {
            confirmMove();
        }
    }, [match]);
    // ￼￼￼￼
    return <div className={style.playContainer}>
        {typeof matchId !== typeof 1 && <Load setMatch={setMatchId} dispatchMatch={dispatchMatch} back={back} />}
        {typeof matchId === typeof 1 && <div className={style.match}>
            <div className={style.half}>
                <Character avatar={match.enemy_avatar} health={match[enemyKey + 'hp']} replace={false}
                    poison={{ damage: match[myKey + 'poison_damage'], time: match[myKey + 'poison_time'] }}
                    fire={{ damage: match[myKey + 'fire_damage'], time: match[myKey + 'fire_time'] }}
                    defense={{ damage: match[enemyKey + 'defense'] }}
                />
                <EnemyCards />
            </div>
            {winner && <Winner winner={winner} />}
            <SelectedCards selectedCards={selectedCards} setSelectedCards={setSelectedCards} match={match} />
            <LastMoveCards match={match} />
            <div className="buttonContainer">
                <button className={style.playButton} disabled={!match.turn}
                    onClick={confirmMove}>{match.turn ? 'Your turn' : 'Enemy turn'}</button>
            </div>
            <div className={style.half}>
                <MyCards match={match} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />
                <Character avatar={match.user_avatar} health={match[myKey + 'hp']} replace={true}
                    poison={{ damage: match[enemyKey + 'poison_damage'], time: match[enemyKey + 'poison_time'] }}
                    fire={{ damage: match[enemyKey + 'fire_damage'], time: match[enemyKey + 'fire_time'] }}
                    defense={{ damage: match[myKey + 'defense'] }}
                />
            </div>
        </div>}
    </div>;
}

const dispachRes = (res, usr) => {
    return {
        turn: usr[0] === res.invitee_id ? res.invitee_turn : !res.invitee_turn,
        cards: res.cards.split(',').map(e => e),
        invitee_hp: res.invitee_hp,
        invited_hp: res.invited_hp,
        invitee_fire_damage: res.invitee_fire_damage,
        invitee_fire_time: res.invitee_fire_time,
        invited_fire_damage: res.invited_fire_damage,
        invited_fire_time: res.invited_fire_time,
        invitee_poison_damage: res.invitee_poison_damage,
        invitee_poison_time: res.invitee_poison_time,
        invited_poison_damage: res.invited_poison_damage,
        invited_poison_time: res.invited_poison_time,
        invitee_defense: res.invitee_defense,
        invited_defense: res.invited_defense,
        last_move_cards: res.last_move_cards.split(',').map(e => Number(e))
    };
}

export default PlayOnline;