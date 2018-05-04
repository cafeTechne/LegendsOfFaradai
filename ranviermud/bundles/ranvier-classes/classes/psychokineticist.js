'use strict';

/**
 * This example definition of a class file is a guideline. The class system is
 * left intentionally vague so as to not be too opinionated. Class files are
 * assumed to be js files instead of blank yaml files just to future proof the
 * bundle-loading of class files in case someone wants extra functionality in
 * their classes.
 */
module.exports = srcPath => {
  return {
    name: 'Psychokineticist',
    description: 'Psychokineticists derive their name from their ability to control space-time with their determination and will (and native attunement to a cluster of transcendental vectors). Psychokineticists are more dogged and grittier than any other profession given the absolute sacrifice and focus required for advancement in their esoteric art. The activity itself is reminiscent of weight lifting, a practice of exerting an intense short term burst of explosive force.',

    abilityTable: {
      1: { spells: ['telekinetic-dash'] },
      2: { spells: ['bind'] },
      3: { spells: ['telekinetic-blast'] },
      4: { spells: ['teletransplanar-wave'] },
    },

    setupPlayer: player => {
      player.addAttribute('mana', 100);
      player.prompt = '[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>mana</b> ]';
    }
  };
};
