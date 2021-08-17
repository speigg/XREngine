import { Entity } from '@xrengine/engine/src/ecs/classes/Entity'
import { TransformComponent } from '@xrengine/engine/src/transform/components/TransformComponent'
import { ColliderComponent } from '@xrengine/engine/src/physics/components/ColliderComponent'
import { GolfCollisionGroups, GolfColours, GolfPrefabTypes } from '../GolfGameConstants'
import {
  BoxBufferGeometry,
  DoubleSide,
  Euler,
  Group,
  Material,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  Quaternion
} from 'three'
import {
  Body,
  BodyType,
  ColliderHitEvent,
  PhysXInstance,
  RaycastQuery,
  SceneQueryType,
  SHAPES,
  ShapeType
} from 'three-physx'
import { CollisionGroups } from '@xrengine/engine/src/physics/enums/CollisionGroups'
import { Object3DComponent } from '@xrengine/engine/src/scene/components/Object3DComponent'
import {
  hasComponent,
  addComponent,
  getComponent,
  removeComponent
} from '@xrengine/engine/src/ecs/functions/EntityFunctions'
import { Network } from '@xrengine/engine/src/networking/classes/Network'
import { NetworkObjectComponent } from '@xrengine/engine/src/networking/components/NetworkObjectComponent'
import { GolfClubComponent } from '../components/GolfClubComponent'
import { getHandTransform } from '@xrengine/engine/src/xr/functions/WebXRFunctions'
import { GameObject } from '@xrengine/engine/src/game/components/GameObject'
import { NetworkObjectComponentOwner } from '@xrengine/engine/src/networking/components/NetworkObjectComponentOwner'
import { spawnPrefab } from '@xrengine/engine/src/networking/functions/spawnPrefab'
import { VelocityComponent } from '@xrengine/engine/src/physics/components/VelocityComponent'
import { DebugArrowComponent } from '@xrengine/engine/src/debug/DebugArrowComponent'
import { isClient } from '../../../../../engine/src/common/functions/isClient'
import { isEntityLocalClient } from '../../../../../engine/src/networking/functions/isEntityLocalClient'
import { ClientAuthoritativeComponent } from '../../../../../engine/src/physics/components/ClientAuthoritativeComponent'

const vector0 = new Vector3()
const vector1 = new Vector3()
const vector2 = new Vector3()
const eulerX90 = new Euler(Math.PI * 0.5, 0, 0)

/**
 * @author Josh Field <github.com/HexaField>
 */

export const spawnClub = (entityPlayer: Entity): void => {
  const playerNetworkObject = getComponent(entityPlayer, NetworkObjectComponent)

  const networkId = Network.getNetworkId()
  const uuid = MathUtils.generateUUID()

  const parameters: GolfClubSpawnParameters = {}

  // this spawns the club on the server
  spawnPrefab(GolfPrefabTypes.Club, playerNetworkObject.ownerId, uuid, networkId, parameters)

  // this sends the club to the clients
  Network.instance.worldState.createObjects.push({
    networkId,
    ownerId: playerNetworkObject.ownerId,
    uniqueId: uuid,
    prefabType: GolfPrefabTypes.Club,
    parameters
  })
}

export const setClubOpacity = (golfClubComponent: ReturnType<typeof GolfClubComponent.get>, opacity: number): void => {
  //@ts-ignore
  golfClubComponent?.meshGroup?.traverse((obj: Mesh) => {
    if (obj.material) {
      ;(obj.material as Material).opacity = opacity
    }
  })
}

export const enableClub = (entityClub: Entity, enable: boolean): void => {
  const golfClubComponent = getComponent(entityClub, GolfClubComponent)
  if (golfClubComponent.canHitBall === enable) return
  golfClubComponent.canHitBall = enable
  setClubOpacity(golfClubComponent, enable ? 1 : golfClubComponent.disabledOpacity)
}

export const hideClub = (entityClub: Entity, hide: boolean, yourTurn: boolean): void => {
  const golfClubComponent = getComponent(entityClub, GolfClubComponent)
  const maxOpacity = yourTurn ? 1 : golfClubComponent.disabledOpacity
  setClubOpacity(golfClubComponent, hide ? 0 : maxOpacity)
}

/**
 * @author Josh Field <github.com/HexaField>
 */

export const updateClub = (entityClub: Entity): void => {
  const ownerNetworkId = getComponent(entityClub, NetworkObjectComponentOwner).networkId
  const ownerEntity = Network.instance.networkObjects[ownerNetworkId]?.entity
  if (!ownerEntity) return

  const golfClubComponent = getComponent(entityClub, GolfClubComponent)
  if (!golfClubComponent.raycast) return

  const transformClub = getComponent(entityClub, TransformComponent)
  const collider = getComponent(entityClub, ColliderComponent)

  const handTransform = getHandTransform(ownerEntity)
  const { position, rotation } = handTransform

  collider.body.updateTransform({
    translation: position,
    rotation
  })

  transformClub.position.copy(position)
  transformClub.rotation.copy(rotation)

  golfClubComponent.raycast.origin.copy(position)
  golfClubComponent.raycast.direction.set(0, 0, -1).applyQuaternion(rotation)

  const hit = golfClubComponent.raycast.hits[0]

  const headDistance = !hit?.distance ? clubLength : Math.min(hit.distance, clubLength)

  // update position of club
  golfClubComponent.headGroup.position.setZ(-(headDistance - clubPutterLength * 0.5))
  golfClubComponent.neckObject.position.setZ(-headDistance * 0.5)
  golfClubComponent.neckObject.scale.setZ(headDistance * 0.5)

  golfClubComponent.headGroup.quaternion.setFromEuler(eulerX90)
  golfClubComponent.headGroup.getWorldDirection(vector2)
  golfClubComponent.raycast1.origin.copy(position.addScaledVector(vector2, -clubHalfWidth * 2))
  golfClubComponent.raycast1.direction.set(0, 0, -1).applyQuaternion(rotation)

  const hit1 = golfClubComponent.raycast1.hits[0]

  if (hit && hit1) {
    // Update the head's up direction using ground normal
    // We can use interpolated normals between two ray hits for more accurate result
    vector0.set(hit.normal.x, hit.normal.y, hit.normal.z)

    // Only apply the rotation on nearly horizontal surfaces
    if (vector0.dot(vector1.set(0, 1, 0)) >= 0.75) {
      golfClubComponent.headGroup.up.copy(vector0)

      vector2.set(hit1.position.x - hit.position.x, hit1.position.y - hit.position.y, hit1.position.z - hit.position.z)

      golfClubComponent.headGroup.getWorldPosition(vector1)
      vector1.addScaledVector(vector2, -1)
      golfClubComponent.headGroup.lookAt(vector1)
    }
  }

  // calculate velocity of the head of the golf club
  // average over multiple frames
  golfClubComponent.headGroup.getWorldPosition(vector1)
  vector0.subVectors(vector1, golfClubComponent.lastPositions[0])
  for (let i = 0; i < golfClubComponent.velocityPositionsToCalculate - 1; i++) {
    vector0.add(vector1.subVectors(golfClubComponent.lastPositions[i], golfClubComponent.lastPositions[i + 1]))
  }
  vector0.multiplyScalar(1 / (golfClubComponent.velocityPositionsToCalculate + 1))

  golfClubComponent.velocity.copy(vector0)

  collider.body.transform.linearVelocity.x = vector0.x
  collider.body.transform.linearVelocity.y = vector0.y
  collider.body.transform.linearVelocity.z = vector0.z
  // now shift all previous positions down the list
  for (let i = golfClubComponent.velocityPositionsToCalculate - 1; i > 0; i--) {
    golfClubComponent.lastPositions[i].copy(golfClubComponent.lastPositions[i - 1])
  }
  // add latest position to list
  golfClubComponent.headGroup.getWorldPosition(vector1)
  golfClubComponent.lastPositions[0].copy(vector1)

  // calculate relative rotation of club head
  vector0.copy(golfClubComponent.headGroup.position)
  vector1.copy(golfClubComponent.headGroup.children[0].position)
  vector1.applyQuaternion(golfClubComponent.headGroup.quaternion)
  vector0.add(vector1)

  collider.body.shapes[0].transform = {
    translation: {
      x: vector0.x,
      y: vector0.y,
      z: vector0.z
    },
    rotation: golfClubComponent.headGroup.quaternion
  }
}

/**
 * @author Josh Field <github.com/HexaField>
 */

const clubHalfWidth = 0.03
const clubPutterLength = 0.1
const clubColliderSize = new Vector3(clubHalfWidth * 0.5, clubHalfWidth * 0.5, clubPutterLength)
const clubLength = 1.5
const rayLength = clubLength * 1.1

type GolfClubSpawnParameters = {}

export const initializeGolfClub = (entityClub: Entity, playerNumber: number, ownerEntity: Entity) => {
  const ownerNetworkId = getComponent(ownerEntity, NetworkObjectComponent).networkId

  const transform = addComponent(entityClub, TransformComponent, {
    position: new Vector3(),
    rotation: new Quaternion(),
    scale: new Vector3(1, 1, 1)
  })

  addComponent(entityClub, VelocityComponent, { velocity: new Vector3() })
  addComponent(entityClub, GameObject, { role: `GolfClub-${playerNumber}` })
  addComponent(entityClub, NetworkObjectComponentOwner, { networkId: ownerNetworkId })

  const color = GolfColours[playerNumber].clone()

  const raycast = PhysXInstance.instance.addRaycastQuery(
    new RaycastQuery({
      type: SceneQueryType.Closest,
      origin: new Vector3(),
      direction: new Vector3(0, -1, 0),
      maxDistance: rayLength,
      collisionMask: CollisionGroups.Default | CollisionGroups.Ground | GolfCollisionGroups.Course
    })
  )
  const raycast1 = PhysXInstance.instance.addRaycastQuery(
    new RaycastQuery({
      type: SceneQueryType.Closest,
      origin: new Vector3(),
      direction: new Vector3(0, -1, 0),
      maxDistance: rayLength,
      collisionMask: CollisionGroups.Default | CollisionGroups.Ground | GolfCollisionGroups.Course
    })
  )

  const handleObject = new Mesh(
    new BoxBufferGeometry(clubHalfWidth, clubHalfWidth, 0.25),
    new MeshStandardMaterial({ color, transparent: true })
  )

  const headGroup = new Group()
  const headObject = new Mesh(
    new BoxBufferGeometry(clubHalfWidth, clubHalfWidth, clubPutterLength * 2),
    new MeshStandardMaterial({ color: 0x736e63, transparent: true })
  )
  // raise the club by half it's height and move it out by half it's length so it's flush to ground and attached at end
  headObject.position.set(0, clubHalfWidth, -(clubPutterLength * 0.5))
  headGroup.add(headObject)

  const neckObject = new Mesh(
    new BoxBufferGeometry(clubHalfWidth * 0.5, clubHalfWidth * 0.5, -1.75),
    new MeshStandardMaterial({ color: 0x736e63, transparent: true, side: DoubleSide })
  )

  const meshGroup = new Group()
  meshGroup.add(handleObject, headGroup, neckObject)

  meshGroup.traverse((obj) => {
    obj.castShadow = true
    obj.receiveShadow = true
  })
  addComponent(entityClub, Object3DComponent, { value: meshGroup })

  // since hitting balls are client authored, we only need the club collider on the local client
  if (isEntityLocalClient(ownerEntity)) {
    const shapeHead: ShapeType = {
      shape: SHAPES.Box,
      options: { boxExtents: clubColliderSize },
      config: {
        isTrigger: true,
        collisionLayer: GolfCollisionGroups.Club,
        collisionMask: GolfCollisionGroups.Ball
      }
    }
    const body = PhysXInstance.instance.addBody(
      new Body({
        shapes: [shapeHead],
        type: BodyType.STATIC,
        transform: {
          translation: { x: transform.position.x, y: transform.position.y, z: transform.position.z }
        }
      })
    )
    addComponent(entityClub, ColliderComponent, { body })
    addComponent(entityClub, ClientAuthoritativeComponent, { ownerNetworkId })
  }

  const velocity = new Vector3()
  addComponent(entityClub, DebugArrowComponent, {
    color: 0xff00ff,
    direction: new Vector3(),
    position: new Vector3()
  })

  const golfClubComponent = addComponent(entityClub, GolfClubComponent, {
    canDoChipShots: false,
    neckObject,
    handleObject,
    headGroup,
    meshGroup,
    raycast,
    raycast1,
    canHitBall: false,
    hasHitBall: false,
    velocityPositionsToCalculate: 4,
    lastPositions: [],
    velocity: new Vector3(),
    velocityServer: new Vector3(),
    swingVelocity: 0,
    hidden: false,
    disabledOpacity: 0.3
  })

  for (let i = 0; i < golfClubComponent.velocityPositionsToCalculate; i++) {
    golfClubComponent.lastPositions[i] = new Vector3()
  }

  enableClub(entityClub, false)
}
