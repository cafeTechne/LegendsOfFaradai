'use strict';


module.exports = srcPath => {
    return {
        name: 'Telepsychopath',
        description: "Telepsychopaths are practitioners of the ancient art of counseling and they are known for healing persons afflicted with mental illness.",

        abilityTable: {
            1: { spells: ['sedate'] },
            1: { spells: ['hypomania'] },
            1: { spells: ['dissociative-field'] },
            2: { spells: ['dissociate-identity'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
