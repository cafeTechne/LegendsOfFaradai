'use strict';


module.exports = srcPath => {
    return {
        name: "Set'tari",
        description: "Followers of this reviled practice of blood magic must fuel their sorcery with the blood of innocence to channel their Entropic spell matrices.",

        abilityTable: {
            1: { skills: ['Sanguinara'] },
            1: { skills: ['Thick Blood'] },
            1: { skills: ['Blood Shadow'] },
            2: { skills: ['Blood Decay'] },
        },

        setupPlayer: player => {
            player.addAttribute('vitae', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %vitae.current%/%vitae.max% <b>mana</b> ]';
        }
    };
};
//when they are at 10 hitpoints, they start to take damage to their vitae instead and can only die once their vitae reaches 0...