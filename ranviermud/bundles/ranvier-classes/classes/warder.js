'use strict';


module.exports = srcPath => {
    return {
        name: 'Warder',
        description: "Warders are a scholars of arcane magic and diplomats by trade. They prefer non-violent resolution, but are able to hold their own. Their focus is on the development and advancement of defensive magic and the dissolution of curses and everything demonic. The Warders have no qualms with negotiating with practitioners of Necromancy or Golemancy, despite their misgivings about members of other professions.",

        abilityTable: {
            1: { spells: ['arcane-shield'] },
            1: { spells: ['elemental-cloak'] },
            1: { spells: ['wall-of-force'] },
            2: { spells: ['warding-field'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
