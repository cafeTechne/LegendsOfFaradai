'use strict';


module.exports = srcPath => {
    return {
        name: 'Invoker',
        description: "Invokers are born naturally aligned to elemental vectors and are thus predisposed towards casting from the Elementalism domains. Invokers learn twice the number of spells, and cast them stronger, than do magic users who derive their power from manipulating mana by means of conscious and deliberate vector transformations--as opposed to intuitive sub-conscious manipulations which arrive at the same mana vectors--but have absolutely no control over what spells they learn in their development. This is due to the fact that the development of the Invoker is guided by meditative self-expansion and the intimate natural outgrowth from intuitions.",

        abilityTable: {
            1: { skills: ['random'] },
            1: { skills: ['random'] },
            1: { skills: ['random'] },
            2: { skills: ['random'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
