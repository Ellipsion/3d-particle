import React, { Component } from "react";
import * as BABYLON from "babylonjs";
//import { TwirlBlock, Vector3 } from "babylonjs";

var scene;

var particleSystem;
var particleSystemr;
var particleSystemg;
var particleSystemb;
var particleSystemb2;

class Dust extends Component {
  constructor(props) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false };
  }

  componentDidMount = () => {
    // start ENGINE
    this.engine = new BABYLON.Engine(this.canvas, true);

    //Create Scene
    scene = new BABYLON.Scene(this.engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    this.addLight();
    this.addCamera();
    this.addParticleSystem();
    console.log("scene");
    scene.onPointerObservable.add((eventData) => {
      let evt = eventData.event;
      console.log(evt);
      let camera = scene.cameras[0];
      // Take delta of mouse movement from last event and create movement vector
      // You may want to factor in some kind of speed factor into this as well
      const speedFactor = 0.0008;
      var movementVector = new BABYLON.Vector3(
        0,
        speedFactor * evt.movementY,
        speedFactor * evt.movementX
      );

      // camera.position.addInPlace(movementVector);
      camera.target.addInPlace(movementVector);
    });

    // Add Events
    window.addEventListener("resize", this.onWindowResize, false);

    // Render Loop
    this.engine.runRenderLoop(() => {
      scene.render();
    });

    //Animation
    scene.registerBeforeRender(() => {
      // Add code here to effect the particle system or camera position etc...
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize, false);
  }

  onWindowResize = (event) => {
    this.engine.resize();
  };

  /**
   * Add Lights
   */
  addLight = () => {
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 10, 0),
      scene
    );
  };

  addParticleSystem = () => {
    particleSystem = new BABYLON.ParticleSystem("particles", 2400, scene);
    particleSystem.particleTexture = new BABYLON.Texture(
      "https://playground.babylonjs.com/textures/flare.png"
    );

    particleSystem.emitter = new BABYLON.Vector3(5, 0, 0);

    particleSystem.minLifeTime = 4;
    particleSystem.maxLifeTime = 9;
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.2;
    particleSystem.minEmitPower = 0.01;
    particleSystem.maxEmitPower = 0.3;

    particleSystem.direction1 = new BABYLON.Vector3(-5, -2, 1);

    particleSystem.start();

    // particleSystemr = new BABYLON.ParticleSystem("particles", 24, scene);
    // particleSystemr.particleTexture = new BABYLON.Texture(
    //   "https://nefilem.github.io/portfolio2/dust.red.png"
    // );

    // particleSystemr.emitter = new BABYLON.Vector3(5, 0, 0);

    // particleSystemr.minLifeTime = 4;
    // particleSystemr.maxLifeTime = 9;
    // particleSystemr.minSize = 0.1;
    // particleSystemr.maxSize = 0.5;
    // particleSystemr.minEmitPower = 0.01;
    // particleSystemr.maxEmitPower = 0.3;

    // particleSystemr.direction1 = new BABYLON.Vector3(-5, -2, 1);

    // particleSystemr.start();

    // particleSystemg = new BABYLON.ParticleSystem("particles", 24, scene);
    // particleSystemg.particleTexture = new BABYLON.Texture(
    //   "https://nefilem.github.io/portfolio2/dust.green.png"
    // );

    // particleSystemg.emitter = new BABYLON.Vector3(5, 0, 0);

    // particleSystemg.minLifeTime = 4;
    // particleSystemg.maxLifeTime = 9;
    // particleSystemg.minSize = 0.1;
    // particleSystemg.maxSize = 0.5;
    // particleSystemg.minEmitPower = 0.01;
    // particleSystemg.maxEmitPower = 0.3;

    // particleSystemg.direction1 = new BABYLON.Vector3(-5, -2, 1);

    // particleSystemg.start();

    particleSystemb = new BABYLON.ParticleSystem("particles", 240, scene);
    particleSystemb.particleTexture = new BABYLON.Texture(
      "https://nefilem.github.io/portfolio2/dust.blue.png"
    );

    particleSystemb.emitter = new BABYLON.Vector3(5, 0, 0);

    particleSystemb.minLifeTime = 4;
    particleSystemb.maxLifeTime = 9;
    particleSystemb.minSize = 0.1;
    particleSystemb.maxSize = 0.3;
    particleSystemb.minEmitPower = 0.01;
    particleSystemb.maxEmitPower = 0.3;

    particleSystemb.direction1 = new BABYLON.Vector3(-5, -2, 1);

    particleSystemb.start();

    particleSystemb2 = new BABYLON.ParticleSystem("particles", 240, scene);
    particleSystemb2.particleTexture = new BABYLON.Texture(
      "https://nefilem.github.io/portfolio2/dust.blue.png"
    );

    particleSystemb2.emitter = new BABYLON.Vector3(5, 0, 0);

    particleSystemb2.minLifeTime = 4;
    particleSystemb2.maxLifeTime = 9;
    particleSystemb2.minSize = 0.01;
    particleSystemb2.maxSize = 0.5;
    particleSystemb2.minEmitPower = 0.05;
    particleSystemb2.maxEmitPower = 0.3;

    particleSystemb2.direction1 = new BABYLON.Vector3(5, -2, -1);

    particleSystemb2.start();
  };

  addCamera = () => {
    var camera = new BABYLON.ArcRotateCamera(
      "Camera",
      // Math.PI / 2,
      // Math.PI / 4,
      0,
      55,
      4,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.inertia = 0;
    camera.angularSensibilityX = 250;
    camera.angularSensibilityY = 250;

    // This attaches the camera to the canvas
    // camera.attachControl(this.canvas, true);
    // camera.setPosition(new BABYLON.Vector3(5, 5, 5));
    camera.setPosition(new BABYLON.Vector3(-1, 0, 0));
  };

  //document.body.style.background = "url(" + canvas.toDataURL() + ")";
  render() {
    return (
      <canvas
        style={{
          width: window.innerWidth,
          height: window.innerHeight,
          zIndex: 0,
        }}
        ref={(canvas) => {
          this.canvas = canvas;
        }}
      />
    );
  }
}
export default Dust;
