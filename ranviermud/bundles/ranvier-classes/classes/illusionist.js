'use strict';


module.exports = srcPath => {
    return {
        name: 'Illusionist',
        description: "Masters of manipulating the vectors of meaning, they create empowered webs of Intentionality that enmesh all subjects in the casters apperceptive field. They can distort meaning making across cultural contexts using archetypal modulation to standardize effects in real time--the master Illusionist can contort other casters into shredding theirselves apart by instantiating raw mana into existential doubt and protophysical uncertainty within their targets.",

        abilityTable: {
            1: { spells: ['field-distortion'] },
            1: { spells: ['dispel-discurse'] },
            1: { spells: ['invisibility'] },
            2: { spells: ['invisibility-field'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
