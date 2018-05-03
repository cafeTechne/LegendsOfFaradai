'use strict';


module.exports = srcPath => {
  return {
    name: 'Psychomancer',
    description: "The art of Psychomancy is the art of channeling through the lens of a matrix of pure emotion into psychic energy towards the intended targets of their magical effects. Psychomancers are born leaders and adept at managing crowds of assailants--and adoring fans--through the manipulation of subjects' emotions. Psychomancers have the blood of the first kings about them--and it is well established to this day that the Centrithian Royal Family selectively breeds with those who have latent or manifest psychomantic abilities. Unlike Telepsychopathic magic, which involves very intricate and delicate arcane patterns, Psychomancers channel pure emotion via magical matrices--which can manifest in very strange ways. A Psychomancer's usual approach is to overtake their opponent with an overwhelming discharge of raw emotional energy. Some people may be born with nascent telepsychomantic abilities, but only those that learn how to apply the Sorcerer's techniques of meditative self-expansion can develop their raw talent.",

    abilityTable: {
      1: { skills: ['Intimidating Shout'] },
      1: { skills: ['Anger of the Abandoned'] },
      1: { skills: ['Reign of the Nightmare God'] },
      2: { skills: ['Slumber of the Ancient Psychomancer King'] },
    },

    setupPlayer: player => {
      player.addAttribute('psyche', 100);
      player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
    }
  };
};
