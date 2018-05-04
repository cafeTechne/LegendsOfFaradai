'use strict';

/**
 * Basic Psychomancy buff
 */
module.exports = (srcPath) => {

  const SkillType = require(srcPath + 'SkillType');
  const SkillFlag = require(srcPath + 'SkillFlag');
  const Broadcast = require(srcPath + 'Broadcast');
  
  const interval = 2 * 60;
  const threshold = 30;
  const restorePercent = 50;

  return {
    name: 'Anger of the Abandoned',
    description: "You wallow in the depths of discord, focusing on pure abandonment.",
    duration: 180 * 1000,
    type: SkillType.SPELL,
    flags: [SkillFlag.PASSIVE],
    cooldown: interval,
    
    modifier: {
      attributes: {
        // For `buff` we just want to take the character's current strength and
        // increase it by this effect's `magnitude`
        Anaerobic_Strength: function (current) {
          return current + (current * (this.state.magnitude/100));
        },
        Aerobic_Strength: function (current) {
          return current + (current * (this.state.magnitude/100));
        },
        Explosive_Strength: function (current) {
          return current + (current * (this.state.magnitude/100));
        }
      }
    },
    info: function (player) {
      return `You are seething with righteous indignation.`;
    },

    listeners: {
      effectRefreshed: function (newEffect) {
        // For this buff if someone tries to refresh the effect then just restart
        // the duration timer
        this.startedAt = Date.now();
        Broadcast.sayAt(this.target, "You feel a spike of sharp resentment.");
      },

      effectActivated: function () {
        // For buff we'll just send some text to the user
        Broadcast.sayAt(this.target, "Self-righteous indignation courses through you!");
      },

      effectDeactivated: function () {
        Broadcast.sayAt(this.target, "You feel the anger of abandonment leave you.");
      }
    }
  };

    Broadcast.sayAt(player, '<bold>You turn inward and focus on the pain and isolation of <red>Being</red></bold><yellow>b<bold>all</bold></yellow> <bold>as you clench your fists!</bold>');  
    Broadcast.sayAtExcept(player.room, `<bold>${player.name} squints</bold>.`, [player, target]);
    if (!target.isNpc) {
      Broadcast.sayAt(target, '<bold>You turn inward and focus on the pain and isolation of <red>Being</red></bold>as you clench your fists!</bold>');
    }
  

    
};
