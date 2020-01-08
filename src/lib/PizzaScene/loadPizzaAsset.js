let THREE = require('three')
let { OBJLoader } = require('three/examples/jsm/loaders/OBJLoader')

const CRUST_COLOR = "#f4c082"
const PEPPERONI_COLOR = "#ff5454"
const CHEESE_COLOR = "#ffff7c"

export function loadPizzaAsset() {
  return new Promise((resolve, reject) => {
    let loader = new OBJLoader();

    loader.load( 'pizza.obj', function (pizza) {
      let Material = THREE.MeshBasicMaterial

      let materialsMap = {
        crust: new Material( {  color: CRUST_COLOR } ),
        pepperoni: new Material( {  color: PEPPERONI_COLOR } ),
        cheese: new Material( {  color: CHEESE_COLOR } ),
      }

      let objectsMap = {
        crust: pizza.children.filter(({ name }) => name.match(/crust/i)),
        pepperoni: pizza.children.filter(({ name }) => name.match(/pepperoni/i)),
        cheese: pizza.children.filter(({ name }) => name.match(/cheese/i)),
      }

      Object.keys(objectsMap).forEach(type => {
        let objects = objectsMap[type]
        let material = materialsMap[type]

        objects.forEach(object => {
          object.material = material
        })
      })

      resolve(pizza);
    }, undefined, function ( error ) {
      reject(error)
    });
  })
}
