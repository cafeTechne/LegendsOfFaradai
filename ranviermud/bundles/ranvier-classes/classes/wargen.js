'use strict';


module.exports = srcPath => {
    return {
        name: 'Wargen',
        description: "Wargen are children of the Father of the Forest of Night, these Sorcerers are wholly subject to the blood of the demi-god running through their veins and must take a Sorcerer level every other Character Level automatically. Wargen can master the power of lycanthropy and start a pack--but if they die, their whole pack will lose all of their Wargen levels--and associated experience-- and become wholly mortal again. If they survive the transformation at all.",

        abilityTable: {
            1: { skills: ['howl'] },
            2: { skills: ['lunge'] },
            3: { skills: ['rend'] },
            4: { skills: ['bite'] },
            5: { skills: ['hide']},
            6: { skills: ['stalk']},
            7: { skills: ['frenzy'] }
        },

        setupPlayer: player => {
            player.addAttribute('energy', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %energy.current%/%energy.max% <b>energy</b> ]';
        }
    };
};
