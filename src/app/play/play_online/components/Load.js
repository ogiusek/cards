import React from "react";
import { link, headers, checkResponse } from "../../../../other/api/api";
import AuthContext from "../../../../other/AuthContext";

function Load({ setMatch, dispatchMatch, back }) {
    const ctx = React.useContext(AuthContext);

    fetch(link + 'match/find/', {
        method: "POST", headers: headers,
        body: JSON.stringify({
            'user': localStorage.getItem('login'),
            'deck': localStorage.getItem('deck')
        })
    }).then(checkResponse).then(res => {
        if (res.value !== 'error') {
            setMatch(res.match_id);
            dispatchMatch({
                "user_avatar": ctx.user[3],
                "enemy_avatar": res.enemy_avatar,
                "cards": res.cards,
                "turn": res.turn,
                "invitee_id": res.invitee_id,
                "invited_id": res.invited_id
            });
        }
    })

    const stop = () => {
        fetch(link + 'match/stop/', {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify({ 'user': localStorage.getItem('login') })
        }).then(checkResponse).then((result) => result.value === "done" ? back() : alert('error'));
    }

    return <div style={{
        "display": "flex", "flexDirection": "column",
        "justifyContent": "center", "alignItems": "center"
    }}>
        <svg style={{ width: '100px', height: '100px', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#93dbe9" stroke="none">
                <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
            </path>
        </svg>
        <button style={{
            "textAlign": "center",
            "backgroundColor": "red", "color": "white",
            "cursor": "default", "fontSize": "20px",
            "padding": "5px", "border": "none"
        }} onClick={stop}>Cancel</button>
    </div>;
}

export default Load;