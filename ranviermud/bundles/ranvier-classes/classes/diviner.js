'use strict';


module.exports = srcPath => {
    return {
        name: 'Diviner',
        description: "Diviners prophesier based on the diffraction of the two aspects of their psyche: the [[ipsem] and the idem. They transpose one of the two into the Astral plane adjacent to nearby possible worlds in order to reveal truth from fiction and see through illusion and photomancy. Diviners can channel astral energy, which turns out being high unstable in this vector of Existence, to great detriment of those who would underestimate them. The costs associated with the material reagents needed for an introductory education into Divination make this particular discipline very expensive to study. Only the most well to do houses will be able to afford to send their ilk to become Diviners, for the school is very expensive and there is no telling how long a given program might take! There are tales of Centrithite Nobles from the Inner Circle sending their houses into ruin from runaway costs of a haywire scions misadventures in one of the prestigious Adademies of Divination on a far off Island!",

        abilityTable: {
            1: { spells: ['de-ja-vu'] },
            2: { spells: ['astral-projection'] },
            3: { spells: ['astral-pulse'] },
            4: { spells: ['sight-of-the-seer'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
