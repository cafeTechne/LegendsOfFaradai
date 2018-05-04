'use strict';


module.exports = srcPath => {
    return {
        name: 'Chakrist',
        description: "The Chakrist mines the sacred geometry of the monks for practical applications in the alignment of idem, ipsem, and body. They are mystical healers whose magical training and development comes from experience and meditation of the fundamental equations underpinning reality.",

        abilityTable: {
            1: { spells: ['transcendent-balance'] },
            2: { spells: ['meditation'] },
            3: { spells: ['chakra-beam'] },
            4: { spells: ['transubstantiation'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
