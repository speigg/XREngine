import { Entity } from '../../ecs/classes/Entity';
import { Component } from "../../ecs/classes/Component";
import { ComponentConstructor } from '../../ecs/interfaces/ComponentInterfaces';
import { isServer } from '../../common/functions/isServer';
import { isClient } from '../../common/functions/isClient';

import { GamesSchema } from "../../templates/game/GamesSchema";
import { Network } from "../../networking/classes/Network";
import { Game } from "../components/Game";
import { GameMode, StateObject } from "../types/GameMode";
import { GameObject } from "../components/GameObject";
import { GamePlayer } from "../components/GamePlayer";

import { addComponent, getComponent, getMutableComponent, hasComponent, removeComponent } from '../../ecs/functions/EntityFunctions';
import { getHisGameEntity, getHisEntity, getRole, getGame, getUuid } from './functions';
import { GameStateUpdateMessage, ClientGameActionMessage } from "../types/GameMessage";

import { Open } from "../../templates/game/gameDefault/components/OpenTagComponent";
import { Closed } from "../../templates/game/gameDefault/components/ClosedTagComponent";
import { ButtonUp } from "../../templates/game/gameDefault/components/ButtonUpTagComponent";
import { ButtonDown } from "../../templates/game/gameDefault/components/ButtonDownTagComponent";

// TODO: create schema states
const gameStateComponents = {
  'Open': Open,
  'Closed': Closed,
  'ButtonUp': ButtonUp,
  'ButtonDown': ButtonDown
};

export const initState = (game: Game, gameSchema: GameMode): void => {
  Object.keys(gameSchema.gameObjectRoles).forEach(role => game.gameObjects[role] = []);
  Object.keys(gameSchema.gamePlayerRoles).forEach(role => game.gamePlayers[role] = []);
};

export const saveInitStateCopy = (entity: Entity): void => {
  const game = getMutableComponent(entity, Game);
  game.initState = JSON.stringify(game.state);
};

export const reInitState = (game: Game): void => {
  game.state = JSON.parse(game.initState);
  applyState(game);
  console.warn('reInitState', applyStateToClient);
};

export const sendState = (game: Game, playerComp: GamePlayer): void => {
  if (isServer && game.isGlobal) {
    const message: GameStateUpdateMessage = { game: game.name, ownerId: playerComp.uuid, state: game.state };
    console.warn('sendState', message);
    Network.instance.worldState.gameState.push(message);
  }
};

export const requireState = (game: Game, playerComp: GamePlayer): void => {
  if (isClient && game.isGlobal && playerComp.uuid === Network.instance.userId) {
    const message: ClientGameActionMessage = { type: 'require', game: game.name, ownerId: playerComp.uuid };
    Network.instance.clientGameAction.push(message);
  }
};

export const applyStateToClient = (stateMessage: GameStateUpdateMessage): void => {
  const entity = getHisGameEntity(stateMessage.game);
  const game = getMutableComponent(entity, Game)
  game.state = stateMessage.state;
  console.warn('applyStateToClient', game.state);
  applyState(game);
};

export const applyState = (game: Game): void => {
  const gameSchema = GamesSchema[game.gameMode]

  // clean all states
  Object.keys(game.gamePlayers).concat(Object.keys(game.gameObjects)).forEach((role: string) => {
    (game.gameObjects[role] || game.gamePlayers[role]).forEach((entity: Entity) => {
      const uuid = getUuid(entity);
/*
      gameSchema.registerActionTagComponents.forEach(component => {
        hasComponent(entity, component ) ? removeComponent(entity, component):'';
      });
*/
      gameSchema.registerStateTagComponents.forEach(component => {
        hasComponent(entity, component ) ? removeComponent(entity, component):'';
      });
      // add all states
    //  console.warn('// add all states');
    //  console.warn(uuid);
      const stateObject = game.state.find((v: StateObject) => v.uuid === uuid);
    //  console.warn(stateObject);
      if (stateObject != undefined) {
        stateObject.components.forEach((componentName: string) => {
          addComponent(entity, gameStateComponents[componentName] );
        });
      } else {
        console.warn('state players dont worl yet');
      }
    })
  })

  console.warn('applyState', game.state);
};

export const correctState = (): void => {
  //TODO:
};

export const addStateComponent = (entity: Entity, component: ComponentConstructor<Component<any>>): void => {

  const uuid = getUuid(entity);
  const role = getRole(entity);
  const game = getGame(entity);

  addComponent(entity, component);

  const objectState = game.state.find(v => v.uuid === uuid) ?? { uuid: uuid, role: role, components: [], storage: [] };
  const index = objectState.components.findIndex(name => name === component.name);
  if (index === -1) {
    objectState.components.push(component.name);
    game.state.push(objectState);
  } else {
    console.warn('we have this gameState already, why?', component.name);
  }
  //console.log(game.state);
};


export const removeStateComponent = (entity: Entity, component: ComponentConstructor<Component<any>>): void => {

  const uuid = getUuid(entity);
  const game = getGame(entity);

  removeComponent(entity, component);

  const objectState = game.state.find(v => v.uuid === uuid);
  const index = objectState.components.findIndex(name => name === component.name);
  if (index === -1) {
    console.warn('dont exist in gameState already, why?', component.name);
  } else {
    objectState.components.splice(index, 1);
  }
  console.warn(game.state);
};