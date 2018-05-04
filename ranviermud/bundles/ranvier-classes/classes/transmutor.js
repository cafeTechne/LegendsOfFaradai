'use strict';


module.exports = srcPath => {
    return {
        name: 'Transmutor',
        description: "The domain of Transmutor is a study of vector transformations invoking the flux of the ever-changing river of Being. They are an odd lot of mystics and it is quite often hard to make sense of their poetic ramblings.",

        abilityTable: {
            1: { spells: ['skin-to-scales'] },
            1: { spells: ['earth-to-acid'] },
            1: { spells: ['lighten-elements'] },
            2: { spells: ['alkahest'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
