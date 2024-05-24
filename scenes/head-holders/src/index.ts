// We define the empty imports so the auto-complete feature works as expected.
import {engine, InputAction, inputSystem, PointerEventType, Transform, Billboard} from '@dcl/sdk/ecs'
import { setupUi } from './ui'
import {createCube} from "./factory";
import {sleep} from "./utils";
import {globalState} from "./state";
import { GltfContainer } from "@dcl/sdk/ecs"
import { Vector3, Quaternion } from "@dcl/sdk/math"

const INTRO_TIME = 10000;
const TRANSITION_TIME = 6000;

export async function main(){
    console.log("main");
    setupUi();
    await sleep(INTRO_TIME);
    console.log("main 2");
    globalState.stage = 1;
    globalState.level = 1;
    const cubeEntity = engine.addEntity();
    GltfContainer.create(cubeEntity, {
        src: 'images/Cubemap.glb',
    });
    Transform.create(cubeEntity, {
        position: Vector3.create(24, -1, 24),
        scale: Vector3.create(1,1,1),
        rotation: Quaternion.Zero(),
    });

    const monsterEntity = engine.addEntity();
    GltfContainer.create(monsterEntity, {
        src: 'images/Monster.glb',
    });
    Transform.create(monsterEntity, {
        position: Vector3.create(24, -1, 24),
        scale: Vector3.create(3,3,3),
        rotation: Quaternion.Zero(),
    });
    Billboard.create(monsterEntity, {})

    const monsterEntity2 = engine.addEntity();
    GltfContainer.create(monsterEntity2, {
        src: 'images/Monster2.glb',
    });
    Transform.create(monsterEntity2, {
        position: Vector3.create(24, -100, 24),
        scale: Vector3.create(3,3,3),
        rotation: Quaternion.Zero(),
    });

    Billboard.create(monsterEntity2, {})
    const monsterEntity3 = engine.addEntity();
    GltfContainer.create(monsterEntity3, {
        src: 'images/Monster3.glb',
    });
    Transform.create(monsterEntity3, {
        position: Vector3.create(24, -100, 24),
        scale: Vector3.create(3,3,3),
        rotation: Quaternion.Zero(),
    });
    Billboard.create(monsterEntity3, {})

    //engine.addSystem(circularSystem)
    engine.addSystem(changeColorSystem)

    function changeColorSystem() {
        (async()=>{
            if(globalState.stage % 2 === 1){
                globalState.playerLife--;
                globalState.playerLife = Math.max(1, globalState.playerLife);
            }
            if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN)) {
                if(globalState.monsterLife){
                    globalState.monsterLife -= 5;
                    globalState.monsterLife = Math.max(0, globalState.monsterLife)
                }else if(!globalState.finished){
                    globalState.finished = true;
                    globalState.stage++;
                    globalState.introImage = `images/monster${globalState.level}.png`;
                    await sleep(TRANSITION_TIME);


                    if(globalState.level !== 3){
                        globalState.finished = false;
                        globalState.stage++;
                        globalState.level++;
                        globalState.monsterLife = 100 * globalState.level;

                        if(globalState.level === 2){
                            const transform = Transform.getMutable(monsterEntity);
                            transform.position.y = -200;
                            const transform2 = Transform.getMutable(monsterEntity2);
                            transform2.position.y = -1;
                        }else if(globalState.level === 3){
                            const transform2 = Transform.getMutable(monsterEntity2);
                            transform2.position.y = -200;
                            const transform3 = Transform.getMutable(monsterEntity3);
                            transform3.position.y = -1;
                        }

                    }


                }
            }
        })();

    }
}



