const Reducer = (state, action) => {
    let act = Object.entries(action);
    let res = structuredClone(state);
    act.map(e => {
        res[e[0]] = e[1];
    });
    return res;
}

const initState = {
    turn: true,

    cards: [],
    user_avatar: '',
    enemy_avatar: '',
    invitee_id: -1,
    invited_id: -1,
    invitee_hp: 1500,
    invited_hp: 1500,

    invitee_fire_damage: 0,
    invitee_fire_time: 0,
    invited_fire_damage: 0,
    invited_fire_time: 0,

    invitee_poison_damage: 0,
    invitee_poison_time: 0,
    invited_poison_damage: 0,
    invited_poison_time: 0,

    invitee_defense: 0,
    invited_defense: 0,

    last_move_cards: []
};

export { Reducer, initState };