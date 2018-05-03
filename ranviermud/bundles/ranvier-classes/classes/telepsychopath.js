'use strict';


module.exports = srcPath => {
    return {
        name: 'Telepsychopath',
        description: "Telepsychopaths are practitioners of the ancient art of counseling and they are known for healing persons afflicted with mental illness.",

        abilityTable: {
            1: { skills: ['Sedate'] },
            1: { skills: ['Hypomania'] },
            1: { skills: ['Dissociative Field'] },
            2: { skills: ['Dissociate Identity'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
