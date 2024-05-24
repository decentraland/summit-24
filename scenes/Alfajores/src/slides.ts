import {
  Entity,
  InputAction,
  Material,
  MaterialTransparencyMode,
  MeshCollider,
  MeshRenderer,
  PointerEventType,
  PointerEvents,
  TextureFilterMode,
  TextureWrapMode,
  Transform,
  engine,
  inputSystem
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

export let currentSlide = 0

export function createSlide() {
  const parentEntity = engine.addEntity()
  const slideEntity = engine.addEntity()

  Transform.create(parentEntity, {
    position: Vector3.create(27, 8, 22),
    scale: Vector3.create(1, 1, 1),
    rotation: Quaternion.fromEulerDegrees(0, 270, 0)
  })

  Transform.create(slideEntity, {
    position: Vector3.create(0, 2.5, 0),
    scale: Vector3.create(16 / 4, 9 / 4, 1.25),
    rotation: Quaternion.fromEulerDegrees(24, 0, 0),
    parent: parentEntity
  })

  MeshRenderer.setPlane(slideEntity)
  MeshCollider.setPlane(slideEntity)
  Material.setPbrMaterial(slideEntity, {
    texture: Material.Texture.Common({
      src: `materials/slides/The_Alfajor_${currentSlide}.png`,
      filterMode: TextureFilterMode.TFM_BILINEAR,
      wrapMode: TextureWrapMode.TWM_CLAMP
    })
  })
  const prevButton = engine.addEntity()
  const nextButton = engine.addEntity()

  // Transform.create(prevButton, {
  //   position: Vector3.create(-1, 0.75, 0),
  //   scale: Vector3.create(0.25, 0.25, 1),
  //   rotation: Quaternion.fromEulerDegrees(24, 0, 180),
  //   parent: parentEntity
  // })

  // MeshRenderer.setPlane(prevButton)
  // MeshCollider.setPlane(prevButton)

  // Transform.create(nextButton, {
  //   position: Vector3.create(1, 0.75, 0),
  //   scale: Vector3.create(0.25, 0.25, 1),
  //   rotation: Quaternion.fromEulerDegrees(24, 0, 0),
  //   parent: parentEntity
  // })

  // MeshRenderer.setPlane(nextButton)
  // MeshCollider.setPlane(nextButton)

  // //Create material and configure its fields
  // Material.setPbrMaterial(prevButton, {
  //   texture: Material.Texture.Common({
  //     src: 'materials/chevron.png',
  //     filterMode: TextureFilterMode.TFM_BILINEAR,
  //     wrapMode: TextureWrapMode.TWM_CLAMP
  //   }),
  //   transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND
  // })

  // //Create material and configure its fields
  // Material.setPbrMaterial(nextButton, {
  //   texture: Material.Texture.Common({
  //     src: 'materials/chevron.png',
  //     filterMode: TextureFilterMode.TFM_BILINEAR,
  //     wrapMode: TextureWrapMode.TWM_CLAMP
  //   }),
  //   transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND
  // })

  // Add a PointerEvents component to handle the click event
  PointerEvents.create(prevButton, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_POINTER,
          showFeedback: true,
          hoverText: 'Previous Country'
        }
      }
    ]
  })

  PointerEvents.create(nextButton, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_POINTER,
          showFeedback: true,
          hoverText: 'Next Country'
        }
      }
    ]
  })

  // create system
  engine.addSystem(() => {
    if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, nextButton)) {
      console.log('Next')
      currentSlide++
    } else if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, prevButton)) {
      console.log('Previous')
      currentSlide--
    }
  })

  return slideEntity
}
