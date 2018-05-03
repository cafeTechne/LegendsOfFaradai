'use strict';


module.exports = srcPath => {
    return {
        name: 'Entropist',
        description: "The study of the fundamental law of entropy. Entropy is not so much a vector as an all-pervasive tendency for things to fall apart. Entropists tend to the chaotic and can range from Decayers to Anarchists.",

        abilityTable: {
            1: { skills: ['Thermal Disequilibrium'] },
            1: { skills: ['Cosmic Wave'] },
            1: { skills: ['Gravity Hole'] },
            2: { skills: ['Dismiss Summoned Beings'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
