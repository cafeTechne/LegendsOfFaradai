'use strict';


module.exports = srcPath => {
    return {
        name: 'Photomancer',
        description: "Photomancy is an exotic study of the vector of photionic phenomena. Their ability to bend light and amplify it makes the Photomancer a radically powerful warrior on the battlefield--both in terms of raw power channeling ability and the tactical advantages conferred by the ability. The privilege of learning the secrets of Photomancy is taught only to those who proven they worthy in the Trials of Faradai.",

        abilityTable: {
            1: { spells: ['blinding-flash'] },
            1: { spells: ['ion-blast'] },
            1: { spells: ['suture'] },
            2: { spells: ['photoionic-beam'] },
        },

        setupPlayer: player => {
            player.addAttribute('mana', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
        }
    };
};
