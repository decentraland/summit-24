import { openExternalUrl } from "~system/RestrictedActions"
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { TextAlignMode, TextureFilterMode, TextureWrapMode } from "@dcl/sdk/ecs"
import { NpcUtilsUi } from "dcl-npc-toolkit"


export function setupUi() {
	ReactEcsRenderer.setUiRenderer(NpcUtilsUi)
}

