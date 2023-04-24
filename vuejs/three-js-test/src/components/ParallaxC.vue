<template>
    <div id="fixedDiv"></div>
    <ParallaxRowC ref="bladesRef" :filled-background="false">
        <h1>BIG ROTOR BLADES</h1>
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda consequuntur dolor dolore doloremque eligendi magnam nemo nihil optio. Consectetur enim facere harum itaque omnis pariatur quidem totam voluptatem voluptates?</h2>
    </ParallaxRowC>
    <ParallaxRowC :filled-background="true">
        <h1>SPACEHOLDER</h1>
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda consequuntur dolor dolore doloremque eligendi magnam nemo nihil optio. Consectetur enim facere harum itaque omnis pariatur quidem totam voluptatem voluptates?</h2>
    </ParallaxRowC>
    <ParallaxRowC ref="cameraRef" :filled-background="false">
        <h1>WOW CAMERA GO CLICK</h1>
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda consequuntur dolor dolore doloremque eligendi magnam nemo nihil optio. Consectetur enim facere harum itaque omnis pariatur quidem totam voluptatem voluptates?</h2>
    </ParallaxRowC>
    <ParallaxRowC :filled-background="true">
        <h1>SPACEHOLDER</h1>
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda consequuntur dolor dolore doloremque eligendi magnam nemo nihil optio. Consectetur enim facere harum itaque omnis pariatur quidem totam voluptatem voluptates?</h2>
    </ParallaxRowC>
    <ParallaxRowC ref="batteryRef" :filled-background="false">
        <h1>LOOOONG BATTERY LIFE</h1>
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda consequuntur dolor dolore doloremque eligendi magnam nemo nihil optio. Consectetur enim facere harum itaque omnis pariatur quidem totam voluptatem voluptates?</h2>
    </ParallaxRowC>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {useElementVisibility} from "@vueuse/core";
import {ref} from "vue";
import ParallaxRowC from "@/components/ParallaxRowC.vue";

let cameraVector = null
let rotation = 0

export default {
    name: "ParallaxC",
    components: {ParallaxRowC},
    setup() {
        const bladesRef = ref(null);
        const bladesIsVisible = useElementVisibility(bladesRef);
        const cameraRef = ref(null);
        const cameraIsVisible = useElementVisibility(cameraRef);
        const batteryRef = ref(null);
        const batteryIsVisible = useElementVisibility(batteryRef);
        const camera = ref(null);
        const renderer = ref(null);

        return {
            bladesRef,
            bladesIsVisible,
            cameraRef,
            cameraIsVisible,
            batteryRef,
            batteryIsVisible,
            camera,
            renderer
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
        }
    },

    mounted: function () {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer( { antialias: true } );

        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById("fixedDiv").appendChild( renderer.domElement );
        renderer.setClearColor(0x131313);

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

                renderer.render( scene, camera );
                camera.position.lerp(cameraVector, 0.02);
                if (camera.rotation.x - 0.02 > rotation) {
                    camera.rotation.x -= 0.02;
                } else if (camera.rotation.x + 0.02 < rotation) {
                    camera.rotation.x += 0.02;
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
    z-index: 0;
}

h1 {
    font-family: SFPro, sans-serif!important;
    font-weight: bold;
    font-size: 10rem;
}

h2 {
    font-family: SFPro, sans-serif!important;
    font-weight: 100;
    font-size: 2rem;
}
</style>