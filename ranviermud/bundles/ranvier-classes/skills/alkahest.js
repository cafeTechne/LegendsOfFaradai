'use strict';

/**
 * Tier 2 Transmutor spell
 */
module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const Damage = require(srcPath + 'Damage');
  const SkillType = require(srcPath + 'SkillType');

  const damagePercent = Math.floor((Math.random() * 100) + 1); //rng 1-100
  let randomBase =  Math.floor((Math.random() * 100) + 1); //rng 1-100
  const manaCost = 100;

  function getDamage(player) {
    return player.getAttribute('Crystallized_Intelligence') *(.25) *(damagePercent / random);
  }

  return {
    name: 'Alkahest',
    type: SkillType.SPELL,
    requiresTarget: true,
    initiatesCombat: true,
    resource: {
      attribute: 'mana',
      cost: manaCost,
    },
    cooldown: 15,

    run: state => function (args, player, target) {
      const damage = new Damage({
        attribute: 'health',
        amount: getDamage(player),
        attacker: player,
        type: 'physical',
        source: this
      });

      Broadcast.sayAt(player, '<bold>As you bark an Arcane Invocation, a <red>stream of universal solvent</red></bold><yellow>b<bold>all</bold></yellow> <bold>rains upon your target!</bold>');
      Broadcast.sayAtExcept(player.room, `<bold>While barking an Arcane Invocation, ${player.name} sends forth <red>a rain of universal solvent</red></bold><yellow>b<bold>all</bold></yellow> <bold>upon ${target.name}!</bold>`, [player, target]);
      if (!target.isNpc) {
        Broadcast.sayAt(target, `<bold>While barking an Arcane Invocation, ${player.name} sends forth--from out of thin air!--<red>a stream of universal solvent</red></bold><yellow>b<bold>all</bold></yellow> <bold>at you!</bold>`);
      }
      damage.commit(target);
    },

    info: (player) => {
      return `Your solvent quickly begins dissolving alchemical bonds of your victim!`;
    }
  };
};
