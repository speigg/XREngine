import { ThemeProvider } from '@material-ui/core';
import { CameraComponent } from '@xr3ngine/engine/src/camera/components/CameraComponent';
import { addObject3DComponent } from '@xr3ngine/engine/src/common/behaviors/Object3DBehaviors';
import { createPrefab } from '@xr3ngine/engine/src/common/functions/createPrefab';
import { isMobileOrTablet } from "@xr3ngine/engine/src/common/functions/isMobile";
import { Engine } from '@xr3ngine/engine/src/ecs/classes/Engine';
import { createEntity, getMutableComponent } from '@xr3ngine/engine/src/ecs/functions/EntityFunctions';
import { DefaultInitializationOptions, initializeEngine } from '@xr3ngine/engine/src/initialize';
import { initVR } from '@xr3ngine/engine/src/input/functions/WebXRFunctions';
import { NetworkSchema } from '@xr3ngine/engine/src/networking/interfaces/NetworkSchema';
import { rigidBodyBox3 } from '@xr3ngine/engine/src/templates/car/prefabs/rigidBodyBox3';
import { rigidBodyBox4 } from '@xr3ngine/engine/src/templates/car/prefabs/rigidBodyBox4';
import { rigidBodyBox5 } from '@xr3ngine/engine/src/templates/car/prefabs/rigidBodyBox5';
import { staticWorldColliders } from "@xr3ngine/engine/src/templates/car/prefabs/staticWorldColliders";
import { CharacterAvatars } from '@xr3ngine/engine/src/templates/character/CharacterAvatars';
import { PlayerCharacter } from '@xr3ngine/engine/src/templates/character/prefabs/PlayerCharacterWithEmptyInputSchema';
import { DefaultNetworkSchema } from '@xr3ngine/engine/src/templates/networking/DefaultNetworkSchema';
import { WorldPrefab } from '@xr3ngine/engine/src/templates/world/prefabs/WorldPrefab';
import { TransformComponent } from '@xr3ngine/engine/src/transform/components/TransformComponent';
import dynamic from 'next/dynamic';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AmbientLight, EquirectangularReflectionMapping, sRGBEncoding, TextureLoader } from 'three';
import { SocketWebRTCClientTransport } from '@xr3ngine/engine/src/networking/classes/SocketWebRTCClientTransport';
import { generalStateList, setAppOnBoardingStep } from '../../redux/app/actions';
import { selectAppOnBoardingStep } from '../../redux/app/selector';
import { selectAuthState } from '../../redux/auth/selector';
import { selectInstanceConnectionState } from '../../redux/instanceConnection/selector';
import { connectToInstanceServer, provisionInstanceServer } from '../../redux/instanceConnection/service';
import { selectPartyState } from '../../redux/party/selector';
import store from '../../redux/store';
import theme from '../../theme';
import { InfoBox } from "../ui/InfoBox";
import LinearProgressComponent from '../ui/LinearProgress';
import MediaIconsBox from "../ui/MediaIconsBox";
import OnBoardingBox from "../ui/OnBoardingBox";
import OnBoardingDialog from '../ui/OnBoardingDialog';
import TooltipContainer from '../ui/TooltipContainer';

const MobileGamepad = dynamic(() => import("../ui/MobileGampad").then((mod) => mod.MobileGamepad),  { ssr: false });

const mapStateToProps = (state: any): any => {
  return {
    instanceConnectionState: selectInstanceConnectionState(state),
    authState: selectAuthState(state),
    partyState: selectPartyState(state),
    onBoardingStep: selectAppOnBoardingStep(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  provisionInstanceServer: bindActionCreators(
    provisionInstanceServer,
    dispatch
  ),
  connectToInstanceServer: bindActionCreators(
    connectToInstanceServer,
    dispatch
  ),
});

export const EnginePage: FunctionComponent = (props: any) => {
  const {
    authState,
    instanceConnectionState,
    partyState,
    connectToInstanceServer,
    provisionInstanceServer,
    onBoardingStep
  } = props;
  const [hoveredLabel, setHoveredLabel] = useState('');
  const [actorEntity, setActorEntity] = useState(null);
  const [actorAvatarId, setActorAvatarId] = useState('Rose');
  const [infoBoxData, setInfoBoxData] = useState(null);
  const [progressEntity, setProgressEntity] = useState('');

  const sceneLoadedEntity = (event: CustomEvent): void =>
    setProgressEntity(event.detail.left);

  const sceneLoaded = (event: CustomEvent): void => {
    if (event.detail.loaded)
      store.dispatch(setAppOnBoardingStep(generalStateList.SCENE_LOADED));
  };

  useEffect(() => {
    document.addEventListener('scene-loaded-entity', sceneLoadedEntity);
    document.addEventListener('scene-loaded', sceneLoaded);

    const networkSchema: NetworkSchema = {
      ...DefaultNetworkSchema,
      transport: SocketWebRTCClientTransport,
    };

    const InitializationOptions = {
      ...DefaultInitializationOptions,
      networking: {
        ...DefaultInitializationOptions.networking,
        schema: networkSchema,
      }
    };

    initializeEngine(InitializationOptions);

    addObject3DComponent(createEntity(), {
      obj3d: AmbientLight,
      ob3dArgs: {
        intensity: 2,
      },
    });

    const cameraTransform = getMutableComponent<TransformComponent>(
      CameraComponent.instance.entity,
      TransformComponent
    );
    cameraTransform.position.set(0, 1.2, 3);

    const envMapURL = '../hdr/mvp-cloud-skybox.png';

   const loader = new TextureLoader();
   (loader as any).load(
       envMapURL,
       (data) => {
         const map = loader.load(envMapURL) as any;
         map.mapping = EquirectangularReflectionMapping;
         map.encoding = sRGBEncoding;
         Engine.scene.environment = map;
         Engine.scene.background = map;
       },
       null
     );


    createPrefab(WorldPrefab);
    createPrefab(staticWorldColliders);
    createPrefab(rigidBodyBox3);
    createPrefab(rigidBodyBox4);
    createPrefab(rigidBodyBox5);

    const actorEntity = createPrefab(PlayerCharacter);
    setActorEntity(actorEntity);
    if((navigator as any)?.xr) initVR(actorEntity);

    return (): void => {
      document.removeEventListener('scene-loaded-entity', sceneLoadedEntity);
      document.removeEventListener('scene-loaded', sceneLoaded);
      document.location.reload();
      //resetEngine();
    };
  }, []);

  //mobile gamepad
  const mobileGamepadProps = {hovered:hoveredLabel.length > 0, layout: 'default' };
  const mobileGamepad = isMobileOrTablet() && onBoardingStep >= generalStateList.TUTOR_MOVE ? <MobileGamepad {...mobileGamepadProps} /> : null;

  return (
    <ThemeProvider theme={theme}>
      <LinearProgressComponent label={progressEntity} />
      <OnBoardingDialog avatarsList={CharacterAvatars} actorAvatarId={actorAvatarId} onAvatarChange={(avatarId) => {setActorAvatarId(avatarId); }} />
      <OnBoardingBox actorEntity={actorEntity} />
      <MediaIconsBox />
      <TooltipContainer message={hoveredLabel.length > 0 ? hoveredLabel : ''} />
      <InfoBox onClose={() => { setInfoBoxData(null); }} data={infoBoxData} />
      {mobileGamepad}
    </ThemeProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EnginePage);