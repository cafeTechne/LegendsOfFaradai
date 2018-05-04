'use strict';


module.exports = srcPath => {
    return {
        name: "Set'tari",
        description: "Followers of this reviled practice of blood magic must fuel their sorcery with the blood of innocence to channel their Entropic spell matrices.",

        abilityTable: {
            1: { spells: ['sanguinara'] },
            1: { spells: ['thick-blood'] },
            1: { spells: ['blood-shadow'] },
            2: { spells: ['blood-decay'] },
        },

        setupPlayer: player => {
            player.addAttribute('vitae', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %vitae.current%/%vitae.max% <b>mana</b> ]';
        }
    };
};
//when they are at 10 hitpoints, they start to take damage to their vitae instead and can only die once their vitae reaches 0...