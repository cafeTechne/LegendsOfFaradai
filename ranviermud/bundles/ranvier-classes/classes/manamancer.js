'use strict';


module.exports = srcPath => {
    return {
        name: 'Manamancer',
        description: "Manamancers study the Channeler domain that focuses on amplifying local mana fields to make the spell casting of those around the caster more powerful. They have also mastered the ability of channeling mana into raw energy for attacks. The secrets of the Manamancer are taught only to members of proven houses.",

        abilityTable: {
            1: { spells: ['mana-beam'] },
            2: { spells: ['manawave'] },
            3: { spells: ['share-energy'] },
            4: { spells: ['mana-field-anomaly'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
