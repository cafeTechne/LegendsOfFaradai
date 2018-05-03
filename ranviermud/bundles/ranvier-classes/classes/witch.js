'use strict';


module.exports = srcPath => {
    return {
        name: 'Witch',
        description: "Witchery is an amalgamation of nefarious sub-practices associated with being born the blood of one who consorted with a Demon or a Dread. This odd clustering is very random and not always so nefarious in the powers manifested through reflective development. The nefarious associations with Witchery are mainly derived from clansmen societies, where the act of consorting with a demon or a dread results in instant banishment from the tribal lands--and a loss of all titles earned through sacrifice. Most witches are not followers of the dread or extra planar forces, although some may have access to abilities from those domains through inheritance.",

        abilityTable: {
            3: { skills: ['random'] },
            5: { skills: ['random'] },
            7: { skills: ['random'] },
            10: { skills: ['random'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
