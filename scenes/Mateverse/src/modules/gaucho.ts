import { Animator, AvatarAttach, engine, GltfContainer, Transform, VisibilityComponent } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import *  as  npcLib from 'dcl-npc-toolkit'
import { PickedUp } from '../definitions'
import { mate } from './factory'

let gauchoNpc = engine.addEntity()


export function setGaucho() {


  gauchoNpc = npcLib.create(
    { position: Vector3.create(10, 0, 8), rotation: Quaternion.create(0, 0, 0), scale: Vector3.create(1, 1, 1) },
    {
      type: npcLib.NPCType.CUSTOM,
      model: 'models/Gaucho7.glb',
      //   portrait: { path: 'images/portraits/WearableConnoisseur.png', offsetY: -20, offsetX: -70 },
      onlyETrigger: true,
      //   reactDistance: 0.5,
      //   continueOnWalkAway: true,
      onActivate: () => {

        console.log('gaucho activated:')
        const avatarAttach = AvatarAttach.getOrNull(mate)

        if (avatarAttach) {

          npcLib.talk(gauchoNpc, dialog, "mate")
          
        } else {
          npcLib.talk(gauchoNpc, dialog, 'start')
        }

      }
    }
  )

}


const dialog = [
  {
    name: 'start',
    text: `Hello, my friend! To become a real gaucho, you must first find your Mate. Or let the Mate find you… `,
    skipable: true,
    isEndOfDialog: true,
  },
  {
    name: "mate",
    text: "<b>Now you are a real Gaucho!</b> My name is Zoilo, and I love to drink mate.",
    skipable: true,
  },
  {
    text: "Mate is great to share, and make new friends, just like Decentraland!",
    skipable: true,
  },
  {
    text: "I will pour water for you.",
    skipable: true,
    triggeredByNext: () => {
          npcLib.playAnimation(gauchoNpc, 'Serve', true)
          const agua = engine.getEntityOrNullByName('waterDrop.glb')
          if (agua) {
            Animator.playSingleAnimation(agua, 'WaterAnim')
          }
    }
  },
  {
    text: "Enjoy!\nARO ARO ARO",
    skipable: true,
    isEndOfDialog: true,
  },
]