let THREE = require('three')
let { rand } = require('../fn')

export class Pizza {
  constructor({ prefab }) {
    this.object = prefab.clone();
    //this.initializeHelper();
  }

  respawn({ at }) {
    this.deltaRotationX = rand(0.001, 0.01)
    this.deltaRotationY = rand(0.001, 0.01)
    this.deltaRotationZ = rand(0.001, 0.01)

    this.deltaPositionY = rand(0.001, 0.025)

    this.object.position.x = at.x
    this.object.position.y = at.y
    this.object.position.z = at.z

    this.object.rotation.x = rand()
    this.object.rotation.y = rand()
    this.object.rotation.z = rand()
  }

  update() {
    this.object.rotation.x += this.deltaRotationX;
    this.object.rotation.y += this.deltaRotationY;
    this.object.rotation.z += this.deltaRotationZ;

    this.object.position.y -= this.deltaPositionY;

    if (this.helper) {
      this.helper.update();
    }
  }

  initializeHelper() {
    this.helper = new THREE.BoundingBoxHelper(this.object, 0xff0000);
    this.helper.update();
  }
}

