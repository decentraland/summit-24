import {
  engine,
  Transform,
} from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Cube } from './components'
import { createCube } from './factory'
import {globalState} from "./state";

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
        width: '100%',
        height: "100%",
      margin: '0 0 0 0',
      padding: 4,
    }}
    uiBackground={{ color: Color4.create(0, 0, 0, 0 )}}
  >
      <UiEntity uiTransform={{ width: 'auto', height: 'auto', position:200 }} uiBackground={{ color: Color4.create(0, 0, 0, 1 )}}>
          <Label value={"CLICK TO HIT BOSS LIFE: "+globalState.monsterLife.toString()} color={Color4.Red()}
                 fontSize={29}
                 font="serif"
                 textAlign="top-left" />

      </UiEntity>
      <UiEntity uiTransform={{ width: 'auto', height: 'auto', position:280 }} uiBackground={{ color: Color4.create(0, 0, 0, 1 )}}>
          <Label value={"PLAYER LIFE: "+globalState.playerLife.toString()} color={Color4.Green()}
                 fontSize={29}
                 font="serif"
                 textAlign="top-left" />
      </UiEntity>
      <UiEntity uiTransform={{ width: 'auto', height: 'auto', position:260 }} uiBackground={{ color: Color4.create(0, 0, 0, 1 )}}>
          <Label value={"LEVEL: "+globalState.level.toString()} color={Color4.Blue()}
                 fontSize={29}
                 font="serif"
                 textAlign="top-left" />
      </UiEntity>

      <UiEntity
          uiTransform={{
              width:  globalState.stage % 2 === 1 ? "0":"100%",
              height: globalState.stage % 2 === 1 ? "0":"100%",
              margin: '8px 0'
          }}
          uiBackground={{
              textureMode: 'stretch',
              texture: {
                  src: globalState.introImage,
              }
          }}
      />

    </UiEntity>
)

function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}

