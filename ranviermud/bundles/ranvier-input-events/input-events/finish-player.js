'use strict';

/**
 * Finish player creation. Add the character to the account then add the player
 * to the game world
 */
module.exports = (srcPath) => {
  const EventUtil = require(srcPath + 'EventUtil');
  const Player = require(srcPath + 'Player');

  return {
    event: state => (socket, args) => {
      let player = new Player({
        name: args.name,
        account: args.account,
        // TIP:DefaultAttributes: This is where you can change the default attributes for players
        attributes: {
          Health: 100,
          Armor: 0,
          
          Agility: 50,
          Kinesthetic_Intelligence: 50,
          
          Crystallized_Intelligence: 50,
          Fluid_Intelligence: 50,
          Spatiality: 50,
          Musicality: 50,
          Logicality: 50,
          
          Sociality: 50,
          Intrapersonality: 50,
          Street_Wisdom: 50,
          Moral_Intelligence: 50,

          Anaerobic_Strength: 20,
          Aerobic_Strength: 50,
          Explosive_Strength: 50,

          Physical_Endurance: 50, //same as constitution/stamina
          Social_Endurance: 50,
          Mental_Endurance: 50,
          Determination: 50,
          Critical: 0,

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
          Agreeableness: 50
          
        }
      });

      args.account.addCharacter(args.name);
      args.account.save();

      player.setMeta('class', args.playerClass);

      const room = state.RoomManager.startingRoom;
      player.room = room;
      player.save();

      // reload from manager so events are set
      player = state.PlayerManager.loadPlayer(state, player.account, player.name);
      player.socket = socket;

      socket.emit('done', socket, { player });
    }
  };
};
