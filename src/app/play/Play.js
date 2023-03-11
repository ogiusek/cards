import React, { useState } from "react";
import style from "./Play.module.css";

import { Link, useNavigate } from "react-router-dom";
import PlayOnline from "./play_online/PlayOnline";
import PlayOffline from "./play_offline/PlayOffline";

const playModes = {
    menu: 0,
    offline: 1,
    online: 2
};

function Play() {
    const [playMode, setPlayMode] = useState(playModes.menu);
    const navigate = useNavigate();
    const back = () => { setPlayMode(playModes.menu) };
    const home = () => { navigate('/home', { replace: true }, navigate) };
    return (<div className={style.main}>
        {playMode === playModes.menu && <div className="buttonContainer"
            style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <button onClick={() => { setPlayMode(playModes.online) }}>Play Online</button>
            {/* <button onClick={() => { setPlayMode(playModes.offline) }}>Play Offline</button> */}
            <Link to='/home'>Home</Link>
        </div>}
        {playMode === playModes.online && <PlayOnline back={back} home={home} />}
        {playMode === playModes.offline && <PlayOffline back={back} home={home} />}
    </div>);
}

export { playModes };
export default Play;