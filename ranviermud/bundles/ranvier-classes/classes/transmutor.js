'use strict';


module.exports = srcPath => {
    return {
        name: 'Transmutor',
        description: "The domain of Transmutor is a study of vector transformations invoking the flux of the ever-changing river of Being. They are an odd lot of mystics and it is quite often hard to make sense of their poetic ramblings.",

        abilityTable: {
            1: { skills: ['Skin to Scales'] },
            1: { skills: ['Earth to Acid'] },
            1: { skills: ['Lighten Elements'] },
            2: { skills: ['Alkahest'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
