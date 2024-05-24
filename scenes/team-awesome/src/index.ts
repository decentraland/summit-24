// We define the empty imports so the auto-complete feature works as expected.
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { Animator, AvatarModifierArea, AvatarModifierType, Entity, InputAction, Material, Transform, engine, inputSystem } from '@dcl/sdk/ecs'


export function main() {

    const entity = engine.addEntity()

    AvatarModifierArea.create(entity, {
        area: Vector3.create(4, 3, 4),
        modifiers: [AvatarModifierType.AMT_HIDE_AVATARS],
        excludeIds: []
    })

    Transform.create(entity, {
        position: Vector3.create(24, 30, 24),
        scale: Vector3.create(2, 2, 2)
    })

    Material.setPbrMaterial(entity, {
        albedoColor: Color4.create(0, 1, 0, 0.5)
    })

    buttonPressCheck()


    Animator.createOrReplace(526 as Entity, {
        states: [
          {
            clip: 'Run',
            playing: false,
            loop: true
          },
          {
            clip: 'Idle',
            playing: false,
            loop: true
          },
        ],
      })
}

let angleX = 0
let angleZ = 0


function buttonPressCheck(){
    engine.addSystem((dt:number) => {
        // let camRotation = Transform.get(engine.CameraEntity).rotation
         let movementVector = Vector3.Zero()
         movementVector.y =0
         movementVector = Vector3.normalize(movementVector)

        // let positionVector = Vector3.Up()

        let isMoving = false

        if(inputSystem.isPressed(InputAction.IA_FORWARD)){
            isMoving = true
            // const transform = Transform.getMutable(528 as Entity)
            // transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromEulerDegrees(10*dt, 0,0))
           movementVector.z = 1
           angleZ += 10 *dt
            console.log('W')
        }
       
        if(inputSystem.isPressed(InputAction.IA_BACKWARD)){
            isMoving = true
            // const transform = Transform.getMutable(528 as Entity)
            // transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromEulerDegrees(-10*dt, 0,0))
            movementVector.z = -1
           angleZ += -10 *dt
            console.log('S')
        }
        if(inputSystem.isPressed(InputAction.IA_LEFT)){
            isMoving = true
            // const transform = Transform.getMutable(523 as Entity)
            // transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromEulerDegrees(0, 0,10*dt))
            movementVector.x = -1
          angleX += -10 *dt
            console.log('A')
        }
        if(inputSystem.isPressed(InputAction.IA_RIGHT)){
            isMoving = true
            // const transform = Transform.getMutable(523 as Entity)
            // transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromEulerDegrees(0, 0,-10*dt))
            movementVector.x = 1
           angleX += 10 *dt
            console.log('D')
        }

        // positionVector = Vector3.rotate(Vector3.Right(), Quaternion.fromEulerDegrees(axisX,0, axisZ))
         movementVector = Vector3.normalize(movementVector)
        //let rotationAxis = Vector3.cross(movementVector, Vector3.Up())
       

        // let rot_ = Quaternion.lookRotation(movementVector)
        let combinedRot = Quaternion.multiply(Quaternion.fromEulerDegrees(0,0,angleX), Quaternion.fromEulerDegrees(-angleZ,0,0))
        const transform = Transform.getMutable(528 as Entity)
        transform.rotation= combinedRot

        if(isMoving){
            let playerTransform = Transform.getMutable(526 as Entity)
            playerTransform.rotation = Quaternion.slerp(playerTransform.rotation, Quaternion.fromToRotation(Vector3.Forward(), movementVector), 0.5)
            Animator.getMutable(526 as Entity).states[1].playing = false
            Animator.getMutable(526 as Entity).states[0].playing = true
        }
        else{
            Animator.getMutable(526 as Entity).states[0].playing = false
            Animator.getMutable(526 as Entity).states[1].playing = true
        }
        //  transform.rotation = Quaternion.fromToRotation(Vector3.Up(),positionVector )
        // transform.rotation = Quaternion.multiply(transform.rotation,Quaternion.fromAngleAxis(10*dt, rotationAxis))
        // transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromEulerDegrees(10*dt, 0,0))
    })
}