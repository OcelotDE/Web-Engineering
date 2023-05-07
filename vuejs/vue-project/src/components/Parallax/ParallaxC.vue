<template>
    <div id="fixedDiv"></div>
    <ParallaxRowC ref="bladesRef" :filled-background="false">
        <h1>BIG ROTOR BLADES</h1>
        <h2>Our newest drone has even bigger rotor blades for the best updraft possible</h2>
    </ParallaxRowC>
    <ParallaxRowC :filled-background="true">
      <RowItemC :image-left="true" headline="LIGHTWEIGHT" description="In order to make transport as easy as possible, we made our next generation of drones as light as it never has been!" image-src="src/assets/drone-hand.jpg"/>
    </ParallaxRowC>
    <ParallaxRowC ref="cameraRef" :filled-background="false">
        <h1>4K CAMERA FOOTAGE</h1>
        <h2>Equipped with the newest technology, our drone is capable of 4K 120fps footage thanks to Hasselblad</h2>
    </ParallaxRowC>
    <ParallaxRowC :filled-background="true">
      <RowItemC :image-left="false" headline="ALL-TERRAIN" description="Suited for all kinds of terrain thanks to our intelligent rotor control." image-src="src/assets/drone-rock.jpg"/>
    </ParallaxRowC>
    <ParallaxRowC ref="batteryRef" :filled-background="false">
        <h1>LOOOONG BATTERY LIFE</h1>
        <h2>To make video shootings even better, our drone is able to deliver up to 10 hours of flight time*</h2>
    </ParallaxRowC>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {useElementVisibility} from "@vueuse/core";
import {ref} from "vue";
import ParallaxRowC from "@/components/Parallax/ParallaxRowC.vue";
import RowItemC from "@/components/Parallax/RowItemC.vue";
import {func} from "three/nodes";

let cameraVector = null
let rotation = 0

export default {
    name: "ParallaxC",
    components: {ParallaxRowC, RowItemC},
    setup() {
        const bladesRef = ref(null);
        const bladesIsVisible = useElementVisibility(bladesRef);
        const cameraRef = ref(null);
        const cameraIsVisible = useElementVisibility(cameraRef);
        const batteryRef = ref(null);
        const batteryIsVisible = useElementVisibility(batteryRef);
        const camera = ref(null);
        const renderer = ref(null);
        const performanceMode = ref(false);

        return {
            bladesRef,
            bladesIsVisible,
            cameraRef,
            cameraIsVisible,
            batteryRef,
            batteryIsVisible,
            camera,
            renderer,
            performanceMode
        }
    },

    methods: {
        setCameraToDroneBlades: function () {
            cameraVector = new THREE.Vector3(0, 4, 1.4);
            rotation = -1.5
        },
        setCameraToDroneCamera: function () {
            cameraVector = new THREE.Vector3(0, 0, 2);
            rotation = 0
        },
        setCameraToDroneBattery: function () {
            cameraVector = new THREE.Vector3(0, -1.8, .35);
            rotation = 1.5
        },
        onWindowResize: function (){
          if (this.camera == null || this.renderer == null) return
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();

          this.renderer.setSize( window.innerWidth, window.innerHeight );
        }
    },

    watch: {
        bladesIsVisible: function (isVisible) {
            if (isVisible) {
                this.setCameraToDroneBlades()
            }
        },
        cameraIsVisible: function (isVisible) {
            if (isVisible) {
                this.setCameraToDroneCamera()
            }
        },
        batteryIsVisible: function (isVisible) {
            if (isVisible) {
                this.setCameraToDroneBattery()
            }
        },
      isDarkThemeActive: function (isActive) {
        console.log(isActive)
      }
    },

    mounted: function () {
        this.performanceMode = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

        if (this.performanceMode) return

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer( { antialias: true } );

        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById("fixedDiv").appendChild( renderer.domElement );
        renderer.setClearColor(window.matchMedia("(prefers-color-scheme: dark)").matches ? 0x131313 : 0xffffff);
        renderer.setClearColor()

        /*const texArr = [
            'src/assets/skybox/posx.jpg',
          'src/assets/skybox/negx.jpg',
          'src/assets/skybox/posy.jpg',
          'src/assets/skybox/negy.jpg',
          'src/assets/skybox/negz.jpg',
          'src/assets/skybox/posz.jpg'
        ]*/

      const texArr = [
        'src/assets/skybox/negx.jpg',
        'src/assets/skybox/posx.jpg',
        'src/assets/skybox/posy.jpg',
        'src/assets/skybox/negy.jpg',
        'src/assets/skybox/negz.jpg',
        'src/assets/skybox/posz.jpg'
      ]

        const materialArray = [];

        texArr.forEach(element => {
          const texture = new THREE.TextureLoader().load(element)
          const mat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
          materialArray.push(mat)
        });

        const skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
        const skybox = new THREE.Mesh(skyboxGeo, materialArray);

        scene.add(skybox);

        window.addEventListener( 'resize', this.onWindowResize, false );


        var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 10 );
        hemiLight.position.set( 0, 5, 0 );
        scene.add( hemiLight );

        const loader = new GLTFLoader();

        let clock = new THREE.Clock();

        loader.load( 'src/assets/drone.glb', function ( gltf ) {

            gltf.scene.scale.set(.1, .1, .1);
            gltf.scene.rotation.y = THREE.MathUtils.degToRad(180);



            scene.add( gltf.scene );
            renderer.render( scene, camera );


            const mixer = new THREE.AnimationMixer( gltf.scene );
            const clips = gltf.animations;

            // Play all animations
            clips.forEach( function ( clip ) {
              mixer.clipAction( clip ).play();
            } );


            function animate() {
                requestAnimationFrame( animate );

                let mixerUpdateDelta = clock.getDelta();
                mixer.update( mixerUpdateDelta )

                try {
                  renderer.render( scene, camera );
                  camera.position.lerp(cameraVector, 0.02);
                  if (camera.rotation.x - 0.02 > rotation) {
                    camera.rotation.x -= 0.02;
                  } else if (camera.rotation.x + 0.02 < rotation) {
                    camera.rotation.x += 0.02;
                  }
                } catch (e) {
                }
            }

            animate();


        }, undefined, function ( error ) {

            console.error( error );

        } );

        this.camera = camera
        this.renderer = renderer

        window.addEventListener( 'resize', this.onWindowResize, false );
    }
}

</script>

<style scoped>
#fixedDiv {
    position: fixed;
    top: 0;
    z-index: -1;
}

h1 {
    font-size: 13vw;
}

h2 {
    font-size: 3vw;
}
</style>