let THREE = require('three')

let { loadPizzaAsset } = require('./loadPizzaAsset')
let { Pizza } = require('./Pizza')
let { ObjectPool } = require('./ObjectPool')

const NUMBER_OF_PIZZAS = 10;
const BG_COLOR = "#4e4a59"

function initializeScene({element, objects, helpers, onRender}) {
  let scene = new THREE.Scene();

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // perspective cam
  let camera = new THREE.PerspectiveCamera(
    75,
    viewportWidth / viewportHeight,
    0.1,
    1000
  );

  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 4

  camera.updateProjectionMatrix()

  let renderer = new THREE.WebGLRenderer({ antialias:true });

  renderer.setClearColor(BG_COLOR);

  renderer.setSize(window.innerWidth, window.innerHeight);

  element.appendChild( renderer.domElement );

  objects.forEach(obj => {
    scene.add(obj)
  });

  helpers.forEach(helpers => {
    scene.add(helpers)
  });

  // Render Loop
  let render = function () {
    onRender()
    renderer.render(scene, camera);

    requestAnimationFrame( render );
  };

  render()
}

export async function renderPizzaScene(element) {
  let prefab = await loadPizzaAsset()

  let pizzas = Array.from({ length: NUMBER_OF_PIZZAS }).map(_ => new Pizza({ prefab }))

  let objectPool = new ObjectPool({ objects: pizzas })

  function onRender() {
    objectPool.update()
  }

  initializeScene({
    element,
    onRender,
    objects: pizzas.map(({ object }) => object),
    helpers: pizzas.map(({ helper }) => helper)
  })
}
