// We define the empty imports so the auto-complete feature works as expected.
import { Vector3 } from '@dcl/sdk/math'
import {
  AudioSource,
  EasingFunction,
  engine,
  Entity,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  TextureWrapMode,
  Transform,
  Tween,
  TweenLoop,
  TweenSequence
} from '@dcl/sdk/ecs'

export function main() {
  const houseEntity = engine.addEntity()

  GltfContainer.create(houseEntity, {
    src: 'models/tower.glb'
  })

  Transform.create(houseEntity, {
    position: Vector3.create(24, 0, 24)
  })

  // Create a new entity for the 3D object
  const bellBucketEntity = engine.addEntity()

  // Attach the GLTF model to the entity
  GltfContainer.create(bellBucketEntity, {
    src: 'models/Bell_Combined.glb'
  })

  // Set the initial position and scale for the bell bucket
  Transform.create(bellBucketEntity, {
    position: Vector3.create(24, 50, 24), // Position it differently from the house
    scale: Vector3.create(1, 1, 1) // Default scale
  })

  const notes = [{}]

  createSoundBoxes([
    'c#1 cc.wav',
    'd#1 cc.wav',
    'e1 cc.wav',
    'f1 cc.wav',
    'f#1 cc.wav',
    'g1 cc.wav',
    'g#1 cc.wav',
    'a1 cc.wav',
    'a#1 cc.wav',
    'b1 cc.wav',
    'c2 cc.wav',
    'c#2 cc.wav',
    'd2 cc.wav',
    'd#2 cc.wav',
    'e2 cc.wav',
    'f2 cc.wav',
    'f#2 cc.wav',
    'g2 cc.wav',
    'g#2 cc.wav',
    'a2 cc.wav',
    'a#2 cc.wav'
  ])

  function stopSound(entity: Entity) {
    // fetch mutable version of audio source component
    const audioSource = AudioSource.getMutable(entity)

    // modify its playing value
    audioSource.playing = false
  }

  function startSound(entity: Entity) {
    // fetch mutable version of audio source component
    const audioSource = AudioSource.getMutable(entity)

    // modify its playing value
    audioSource.playing = true
  }

  /**
   * Function to create sound boxes for each sound name provided.
   * @param soundNames Array of sound file names located in the sounds folder.
   */
  function createSoundBoxes(soundNames: string[]): void {
    soundNames.forEach((soundName, index) => {
      // Create a new entity for each sound
      const soundBox = engine.addEntity()

      // Set position slightly apart for each box
      Transform.create(soundBox, {
        scale: Vector3.create(0.1, 4, 0.1),
        position: Vector3.create(22 + index * 0.25, 33, 24) // Adjust position to prevent overlap
      })

      // Add box mesh and collider
      MeshRenderer.setCylinder(soundBox)
      MeshCollider.setCylinder(soundBox)

      Material.setPbrMaterial(soundBox, {
        texture: Material.Texture.Common({
          src: 'materials/rope.png',
          wrapMode: TextureWrapMode.TWM_REPEAT
        })
      })

      // Create AudioSource component with the sound
      AudioSource.create(soundBox, {
        audioClipUrl: `sounds/${soundName}`,
        loop: false,
        playing: false
      })

      // Setup interaction for playing sound on click
      pointerEventsSystem.onPointerDown(
        {
          entity: soundBox,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: `${soundName}`
          }
        },
        () => {
          console.log(`Playing sound: ${soundName}`)
          // stopSound(soundBox)
          // startSound(soundBox)
          // Tween.deleteFrom(soundBox)
          // AudioSource.stopSound(soundBox, true)
          AudioSource.playSound(soundBox, `sounds/${soundName}`, true)
          // applyTweenMotion(soundBox)
        }
      )
    })
  }

  /**
   * Function to apply a tween motion up and down to an entity.
   * @param entity The entity to which the tween will be applied.
   */
  function applyTweenMotion(entity: Entity): void {
    const startPosition = Transform.get(entity).position
    const endPosition = Vector3.subtract(startPosition, Vector3.create(0, 0.25, 0))

    Tween.create(entity, {
      mode: Tween.Mode.Move({
        start: startPosition,
        end: endPosition
      }),
      duration: 500,
      easingFunction: EasingFunction.EF_EASEELASTIC
    })

    TweenSequence.create(entity, {
      sequence: [
        {
          mode: Tween.Mode.Move({
            start: endPosition,
            end: startPosition
          }),
          duration: 500,
          easingFunction: EasingFunction.EF_EASEBACK
        }
      ]
    })
  }

  let timer: number = 0

  AudioSource.create(houseEntity, {
    audioClipUrl: `sounds/chimes/15m.mp3`,
    loop: false,
    playing: false
  })

  function LoopSystem(dt: number) {
    timer -= dt
    if (timer <= 0) {
      timer = 60
      console.log('60 seconds have passed')

      const now = new Date()
      const hour = now.getHours() % 12 || 12
      const minute = now.getMinutes()

      if (minute === 15) {
        AudioSource.playSound(houseEntity, `sounds/chimes/15m.mp3`, true)
      } else if (minute === 30) {
        AudioSource.playSound(houseEntity, `sounds/chimes/30m.mp3`, true)
      } else if (minute === 45) {
        AudioSource.playSound(houseEntity, `sounds/chimes/45m.mp3`, true)
      } else if (minute === 0) {
        let soundfile = 'sounds/chimes/' + hour.toString() + 'oclock.mp3'
        AudioSource.playSound(houseEntity, soundfile, true)
      }
    }
  }

  engine.addSystem(LoopSystem)

  // Function to create and position grass GLB models on each parcel
  function createGrassModels() {
    // Define positions for placing grass models on the parcels
    const parcelPositions = [
      { x: 8, y: 0, z: 8 },
      { x: 8, y: 0, z: 24 },
      { x: 24, y: 0, z: 8 },
      { x: 24, y: 0, z: 24 },
      { x: 24, y: 0, z: 40 },
      { x: 40, y: 0, z: 24 },
      { x: 40, y: 0, z: 40 },
      { x: 40, y: 0, z: 8 },
      { x: 8, y: 0, z: 40 }
    ]

    // Loop through each position and create a grass entity
    parcelPositions.forEach((position) => {
      const grassEntity = engine.addEntity() // Create a new entity for each grass model
      GltfContainer.create(grassEntity, {
        src: 'assets/builder/bermuda_grass/FloorBaseGrass_01/FloorBaseGrass_01.glb'
      })
      Transform.create(grassEntity, {
        position: position
      })
    })
  }

  // Call the function to create grass models
  createGrassModels()
}
