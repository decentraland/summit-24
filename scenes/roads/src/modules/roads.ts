import { ColliderLayer, GltfContainer, Transform, engine } from "@dcl/sdk/ecs";

export function addRoads(){

    let roads = engine.addEntity()
    Transform.create(roads)
    GltfContainer.create(roads, {
        src: "models/scene_roads.glb",
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS    })
}