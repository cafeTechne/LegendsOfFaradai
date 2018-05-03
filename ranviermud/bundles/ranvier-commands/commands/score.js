'use strict';

const sprintf = require('sprintf-js').sprintf;
const Combat = require('../../ranvier-combat/lib/Combat');

module.exports = (srcPath) => {
  const B = require(srcPath + 'Broadcast');

  return {
    aliases: [ 'stats' ],
    command : (state) => (args, p) => {
      const say = message => B.sayAt(p, message);

      say('<b>' + B.center(60, `${p.name}, level ${p.level} ${p.playerClass.config.name}`, 'green'));
      say('<b>' + B.line(60, '-', 'green'));

      let stats = {
        Agility: 50,
        Kinesthetic_IQ: 50,
        Crystallized_IQ: 50,
        Fluid_IQ: 50,
        Spatiality: 50,
        Musicality: 50,
        Logicality: 50,
        Sociality: 50,
        Intrapersonality: 50,
        Street_Wisdom: 50,
        Moral_Intelligence: 50,
        Anaerobic_Strength: 50,
        Aerobic_Strength: 50,
        Explosive_Strength: 50,
        Physical_Endurance: 50, 
        Social_Endurance: 50,
        Mental_Endurance: 50,
        Determination: 50,
        Sensation_Seeking: 50,
        Sense_Probability: 50,
        Self_Confidence: 50,
        Impulsivity: 50,
        Neuroticism: 50,
        Empathy: 50,
        Sociopathy: 50,
        Open_Mindedness: 50,
        Conscientiousness: 50,
        Extraversion: 50,
        Agreeableness: 50,
        Critical: 0,  
        
        intellect: 0,
        stamina: 0,
        armor: 0,
        health: 0,
        critical: 0
      };

      for (const stat in stats) {
        stats[stat] = {
          current: p.getAttribute(stat) || 0,
          base: p.getBaseAttribute(stat) || 0,
          max: p.getMaxAttribute(stat) || 0,
        };
      }

      B.at(p, sprintf(' %-9s: %12s', 'Health', `${stats.health.current}/${stats.health.max}`));
      say('<b><green>' + sprintf(
        '%36s',
        'Weapon '
      ));

      // class resource
      switch (p.playerClass.id) {
        case 'warrior':
          const energy = {
            current: p.getAttribute('energy'),
            max: p.getMaxAttribute('energy')
          };
          B.at(p, sprintf(' %-9s: %12s', 'Energy', `${energy.current}/${energy.max}`));
          break;
        case 'mage':
          const mana = {
            current: p.getAttribute('mana'),
            max: p.getMaxAttribute('mana')
          };
          B.at(p, sprintf(' %-9s: %12s', 'Mana', `${mana.current}/${mana.max}`));
          break;
        case 'paladin':
          const favor = {
            current: p.getAttribute('favor'),
            max: p.getMaxAttribute('favor')
          };
          B.at(p, sprintf(' %-9s: %12s', 'Favor', `${favor.current}/${favor.max}`));
          break;
        default:
          B.at(p, B.line(24, ' '));
          break;
      }
      say(sprintf('%35s', '.' + B.line(22)) + '.');

      B.at(p, sprintf('%37s', '|'));
      const weaponDamage = Combat.getWeaponDamage(p);
      const min = Combat.normalizeWeaponDamage(p, weaponDamage.min);
      const max = Combat.normalizeWeaponDamage(p, weaponDamage.max);
      say(sprintf(' %6s:<b>%5s</b> - <b>%-5s</b> |', 'Damage', min, max));
      B.at(p, sprintf('%37s', '|'));
      say(sprintf(' %6s: <b>%12s</b> |', 'Speed', B.center(12, Combat.getWeaponSpeed(p) + ' sec')));

      say(sprintf('%60s', "'" + B.line(22) + "'"));


      say('<b><green>' + sprintf('%1s', '     Gold ')); // right
      say(sprintf('%1s', '.' + B.line(12) + '.')); // right
      say(sprintf('%0s| <b>%10s</b> |', '', p.getMeta('currencies.gold') || 0)); // right
      say(sprintf('%1s', "'" + B.line(12) + "'")); // right
      say(sprintf('\b'));

      say('<b><green>' + sprintf(
        '%-24s',
        '             Stats'
      ) + '</green></b>');
      say('.' + B.line(31) + '.');


      const printStat = (stat, newline = true) => {
        const val = stats[stat];
        const statColor = (val.current > val.base ? 'green' : 'white');
        const str = sprintf(
          `| %-18s : <b><${statColor}>%8s</${statColor}></b> |`,
          stat[0].toUpperCase() + stat.slice(1),
          val.current
        );

        if (newline) {
          say(str);
        } else {
          B.at(p, str);
        }
      };

      
      
      say(':' + B.line(31) + ':');
      printStat('Agility', false); // left
      say(sprintf('\b|'));
      printStat('Kinesthetic_IQ', false); // left
      say(sprintf('\b|'));
      say("'" + B.line(31) + "'");
      printStat('Crystallized_IQ', false); // left
      say(sprintf('\b|'));
      printStat('Fluid_IQ', false); // left
      say(sprintf('\b|'));
      printStat('Spatiality', false); // left
      say(sprintf('\b|'));
      printStat('Musicality', false); // left
      say(sprintf('\b|'));
      printStat('Logicality', false); // left
      say(sprintf('\b|'));
      say("'" + B.line(31) + "'");
      printStat('Sociality', false); // left
      say(sprintf('\b|'));
      printStat('Intrapersonality', false); // left
      say(sprintf('\b|'));
      printStat('Street_Wisdom', false); // left
      say(sprintf('\b|'));
      printStat('Moral_Intelligence', false); // left
      say(sprintf('\b|'));
      say("'" + B.line(31) + "'");
      printStat('Anaerobic_Strength', false); // left
      say(sprintf('\b|'));
      printStat('Aerobic_Strength', false); // left
      say(sprintf('\b|'));
      printStat('Explosive_Strength', false); // left
      say(sprintf('\b|'));
      say("'" + B.line(31) + "'");
      printStat('Physical_Endurance', false); // left
      say(sprintf('\b|'));
      printStat('Social_Endurance', false); // left
      say(sprintf('\b|'));
      printStat('Mental_Endurance', false); // left
      say(sprintf('\b|'));
      printStat('Determination', false); // left
      say(sprintf('\b|'));
      say("'" + B.line(31) + "'");
      printStat('Sensation_Seeking', false); // left
      say(sprintf('\b|'));
      printStat('Sense_Probability', false); // left
      say(sprintf('\b|'));
      printStat('Self_Confidence', false); // left
      say(sprintf('\b|'));
      printStat('Impulsivity', false); // left
      say(sprintf('\b|'));
      printStat('Neuroticism', false); // left
      say(sprintf('\b|'));
      printStat('Empathy', false); // left
      say(sprintf('\b|'));
      printStat('Sociopathy', false); // left
      say(sprintf('\b|'));
      printStat('Open_Mindedness', false); // left
      say(sprintf('\b|'));
      printStat('Conscientiousness', false); // left
      say(sprintf('\b|'));
      printStat('Extraversion', false); // left
      say(sprintf('\b|'));
      printStat('Agreeableness', false); // left
      say(sprintf('\b|'));
      say("'" + B.line(31) + "'");
      printStat('armor');
      say("'" + B.line(31) + "'");
      
      
      
      
        
        
        
        
      
      
      
      
      



    }
  };
};