'use strict';


module.exports = srcPath => {
    return {
        name: 'Elenori',
        description: "Followers of this more socially accepted form of blood magic fuel their sorcery with the blood of the guilty and chaotic. Sorcerers of this esoteric school are most often also ordained priests or Paladins of Vengeance. The vitae they steal from their opponents powers their Enthalpic oaths.",

        abilityTable: {
            1: { skills: ['Carnage'] },
            1: { skills: ['Oath Keeper'] },
            1: { skills: ['Sanguinara'] },
            2: { skills: ['Elenorial Sacrifice'] },
        },

        setupPlayer: player => {
            player.addAttribute('vitae', 100);
            player.prompt = '[ %health.current%/%health.max% <b>hp</b> %vitae.current%/%vitae.max% <b>vitae</b> ]';
        }
    };
};

//when they are at 10 hitpoints, they start to take damage to their vitae instead and can only die once their vitae reaches 0...
