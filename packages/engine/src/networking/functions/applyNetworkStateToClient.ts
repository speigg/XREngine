import { Quaternion, Vector3 } from "three";
import { getComponent, hasComponent, removeEntity } from '../../ecs/functions/EntityFunctions';
import { Input } from '../../input/components/Input';
import { LocalInputReceiver } from '../../input/components/LocalInputReceiver';
import { InputType } from '../../input/enums/InputType';
import { Network } from '../components/Network';
import { addSnapshot } from '../functions/NetworkInterpolationFunctions';
import { WorldStateInterface } from "../interfaces/WorldState";
import { initializeNetworkObject } from './initializeNetworkObject';
import { CharacterComponent } from "../../templates/character/components/CharacterComponent";

let test = 0

export function applyNetworkStateToClient(worldStateBuffer:WorldStateInterface, delta = 0.033):void {
  const worldState = worldStateBuffer; // worldStateModel.fromBuffer(worldStateBuffer);

  if (Network.tick < worldState.tick - 1) {
    // we dropped packets
    // Check how many
    // If our queue empty? Request immediately
    // Is our queue not empty? Inspect tick numbers
    // Did they fall in our range?
    // Send a request for the ones that didn't
  }

  Network.tick = worldState.tick;

  Network.instance.worldState = worldState;

  // Handle all clients that connected this frame
  for (const connectingClient in worldState.clientsConnected) {
    // Add them to our client list
    Network.instance.clients[worldState.clientsConnected[connectingClient].userId] = {
      userId: worldState.clientsConnected[connectingClient].userId
    };
    console.log(worldState.clientsConnected[connectingClient].userId, " connected");
  }

  // Handle all clients that disconnected this frame
  for (const disconnectingClient in worldState.clientsDisconnected) {
    if (worldState.clientsConnected[disconnectingClient] !== undefined) {
      // Remove them from our client list
      console.log(worldState.clientsConnected[disconnectingClient].userId, " disconnected");
      delete Network.instance.clients[worldState.clientsConnected[disconnectingClient].userId];
    } else {
      console.warn("Client disconnected but was not found in our client list");
    }
  }

  // Handle all network objects created this frame
  for (const objectToCreateKey in worldState.createObjects) {
    // If we already have a network object with this network id, throw a warning and ignore this update
    if (Network.instance.networkObjects[worldState.createObjects[objectToCreateKey].networkId] !== undefined)
      console.warn("Not creating object because it already exists");
    else {
      const objectToCreate = worldState.createObjects[objectToCreateKey];
      let position = null;
      let rotation = null;
      if (
        typeof objectToCreate.x === 'number' ||
        typeof objectToCreate.y === 'number' ||
        typeof objectToCreate.z === 'number'
      ) {
        position = new Vector3( objectToCreate.x, objectToCreate.y, objectToCreate.z );
      }

      if (
        typeof objectToCreate.qX === 'number' ||
        typeof objectToCreate.qY === 'number' ||
        typeof objectToCreate.qZ === 'number' ||
        typeof objectToCreate.qW === 'number'
      ) {
        rotation = new Quaternion( objectToCreate.qX, objectToCreate.qY, objectToCreate.qZ, objectToCreate.qW );
      }

      initializeNetworkObject(
        String(objectToCreate.ownerId),
        objectToCreate.networkId,
        objectToCreate.prefabType,
        position,
        rotation,
      );
      test++
    }
  }



    if( worldState.snapshot != undefined ) {
      if (test != 0) {
        addSnapshot(worldState.snapshot);
      }
    } else {
      console.warn('server do not send Interpolation Snapshot');
    }






  // TODO: Re-enable for snapshot interpolation
  // if (worldState.transforms !== undefined && worldState.transforms.length > 0) {
  //   // Add world state to our snapshot vault
  //   addSnapshot(createSnapshot(worldState.transforms));
  //   // Interpolate it
  //   const snapshot = calculateInterpolation('x y z q(quat)');
  //   const { state } = snapshot;
  //   Network.instance.worldState.transforms = state;
  // }

  // Handle all network objects destroyed this frame
  for (const objectToDestroy in worldState.destroyObjects) {
    const networkId = worldState.destroyObjects[objectToDestroy].networkId;
    console.log("Destroying ", networkId);
    if (Network.instance.networkObjects[networkId] === undefined)
      return console.warn("Can't destroy object as it doesn't appear to exist");
    console.log("Destroying network object ", Network.instance.networkObjects[networkId].component.networkId);
    // get network object
    const entity = Network.instance.networkObjects[networkId].component.entity;
    // Remove the entity and all of it's components
    removeEntity(entity);
    console.warn("Entity is removed, but character imight not be");
    // Remove network object from list
    delete Network.instance.networkObjects[networkId];
  }

  worldState.inputs?.forEach(inputData => {
    if (Network.instance === undefined)
    return console.warn("Network.instance undefined");

    if(Network.instance.networkObjects[inputData.networkId] === undefined)
      return console.warn("network object undefined, but inputs not");
    // Get network object with networkId
    const networkComponent = Network.instance.networkObjects[inputData.networkId].component;

    // Ignore input applied to local user input object that the client is currently controlling
    if(networkComponent.ownerId === Network.instance.userId && hasComponent(networkComponent.entity, LocalInputReceiver)) return; //

    // set view vector
    const actor = getComponent(networkComponent.entity, CharacterComponent);
    actor.viewVector.set(
      inputData.viewVector.x,
      inputData.viewVector.y,
      inputData.viewVector.z,
    );

    // Get input object attached
    const input = getComponent(networkComponent.entity, Input);

    // Clear current data
    input.data.clear();

    // Apply new input
    for (let i = 0; i < inputData.buttons.length; i++) {
      input.data.set(inputData.buttons[i].input,
        {
          type: InputType.BUTTON,
          value: inputData.buttons[i].value,
          lifecycleState: inputData.buttons[i].lifecycleState
        });
    }

    // Axis 1D input
    for (let i = 0; i < inputData.axes1d.length; i++)
      input.data.set(inputData.axes1d[i].input,
        {
          type: InputType.BUTTON,
          value: inputData.axes1d[i].value,
          lifecycleState: inputData.axes1d[i].lifecycleState
        });

    // Axis 2D input
    for (let i = 0; i < inputData.axes2d.length; i++)
      input.data.set(inputData.axes2d[i].input,
        {
          type: InputType.BUTTON,
          value: inputData.axes2d[i].value,
          lifecycleState: inputData.axes2d[i].lifecycleState
        });

  });

  // worldState.states?.forEach(stateData => {
  //   if (Network.instance.networkObjects[stateData.networkId] === undefined)
  //   return console.warn("network object undefined, but state is not not");
  // // Get network object with networkId
  // const networkComponent = Network.instance.networkObjects[stateData.networkId].component;

  // // Ignore state applied to local user input object that the client is currently controlling
  // if(networkComponent.ownerId === Network.instance.userId && hasComponent(networkComponent.entity, LocalInputReceiver))
  //   return;





//worldState
  // // Ignore state applied to local user input object that the client is currently controlling



  //   const state = getComponent(networkComponent.entity, State);

  //   console.warn("Setting state to ", stateData.states);
  //   stateData.data.set(stateData.states);
  //   console.log("stateData.data is now: ", stateData.states);
  // });

  if(worldState.transforms === undefined || worldState.transforms.length < 1)
    return;// console.warn("Worldstate transforms is null");





}