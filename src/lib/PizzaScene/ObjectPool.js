let THREE = require('three')
let Poisson = require('poisson-disk-sampling')

const PIZZA_SPAWN_Y = 5
const PIZZA_RESPAWN_BOUNDARY_Y = -5
const POISSON_DISTANCE_FACTOR = 1.2

let spawnBox = [
  15,
  2,
  2
]

export class ObjectPool {
  constructor({ objects }) {
    this.objects = objects

    let distance = this.getDistanceFromBoundingBox() * POISSON_DISTANCE_FACTOR

    this.spawnPoints = []
    this.poisson = new Poisson(spawnBox, distance, distance * 2);

    this.objects.forEach(obj => {
      this.respawnObject(obj)
    })
  }

  getDistanceFromBoundingBox() {
    let bbox = new THREE.Box3().setFromObject(this.objects[0].object);

    return Math.max(
      bbox.max.x - bbox.min.x,
      bbox.max.y - bbox.min.y,
      bbox.max.z - bbox.min.z,
    )
  }

  nextSpawnPoint() {
    let result = this.spawnPoints.pop()

    while (!result) {
      this.poisson.reset()
      this.spawnPoints = this.poisson.fill()
      result = this.spawnPoints.pop()
    }

    return result
  }

  respawnObject(object) {
    const next = new THREE.Vector3(...this.nextSpawnPoint())

    next.add(new THREE.Vector3(
      - spawnBox[0] / 2,
      PIZZA_SPAWN_Y,
      - spawnBox[2] / 2,
    ))

    object.respawn({ at: next })
  }

  update() {
    this.objects.forEach(object => {
      object.update()

      // TODO 👃 object.object
      if (object.object.position.y < PIZZA_RESPAWN_BOUNDARY_Y) {
        this.respawnObject(object)
      }
    })
  }
}
