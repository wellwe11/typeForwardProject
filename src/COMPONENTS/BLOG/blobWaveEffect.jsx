import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./blobWave.scss";

export const WaveImageEffect = ({ image }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const animationFrameRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const planeMeshRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !image) return;

    const imageContainer = containerRef.current;
    const imageElement = imageRef.current;

    let currentState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.005 };
    let targetState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.005 };

    const ANIMATION_CONFIG = {
      transitionSpeed: 0.03,
      baseIntensity: 0.005,
      hoverIntensity: 0.009,
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_intensity;
      uniform sampler2D u_texture;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float wave1 = sin(uv.x * 10.0 + u_time * 0.5 + u_mouse.x * 5.0) * u_intensity;
        float wave2 = sin(uv.y * 12.0 + u_time * 0.8 + u_mouse.y * 4.0) * u_intensity;
        float wave3 = cos(uv.x * 8.0 + u_time * 0.5 + u_mouse.x * 3.0) * u_intensity;
        float wave4 = cos(uv.y * 9.0 + u_time * 0.7 + u_mouse.y * 3.5) * u_intensity;
        uv.y += wave1 + wave2;
        uv.x += wave3 + wave4;
        gl_FragColor = texture2D(u_texture, uv);
      }
    `;

    function updateValue(target, current, speed) {
      return current + (target - current) * speed;
    }

    function animateScene() {
      animationFrameRef.current = requestAnimationFrame(animateScene);

      if (
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current ||
        !planeMeshRef.current
      )
        return;

      currentState.mousePosition.x = updateValue(
        targetState.mousePosition.x,
        currentState.mousePosition.x,
        ANIMATION_CONFIG.transitionSpeed
      );
      currentState.mousePosition.y = updateValue(
        targetState.mousePosition.y,
        currentState.mousePosition.y,
        ANIMATION_CONFIG.transitionSpeed
      );
      currentState.waveIntensity = updateValue(
        targetState.waveIntensity,
        currentState.waveIntensity,
        ANIMATION_CONFIG.transitionSpeed
      );

      const uniforms = planeMeshRef.current.material.uniforms;
      uniforms.u_time.value += 0.005;
      uniforms.u_mouse.value.set(
        currentState.mousePosition.x,
        currentState.mousePosition.y
      );
      uniforms.u_intensity.value = currentState.waveIntensity;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    function handleMouseMove(event) {
      const rect = imageContainer.getBoundingClientRect();
      targetState.mousePosition.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetState.mousePosition.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function handleMouseOver() {
      targetState.waveIntensity = ANIMATION_CONFIG.hoverIntensity;
    }

    function handleMouseOut() {
      targetState.waveIntensity = ANIMATION_CONFIG.baseIntensity;
      targetState.mousePosition = { x: 0, y: 0 };
    }

    const loader = new THREE.TextureLoader();

    loader.load(imageElement.src, (texture) => {
      const width = 300;
      const height = 300;

      texture.magFilter = THREE.LinearFilter;

      console.log(width, height);

      const camera = new THREE.PerspectiveCamera(80, width / height, 0.01, 10);
      camera.position.z = 1;
      cameraRef.current = camera;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const uniforms = {
        u_time: { value: 1.0 },
        u_mouse: { value: new THREE.Vector2() },
        u_intensity: { value: currentState.waveIntensity },
        u_texture: { value: texture },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      planeMeshRef.current = mesh;

      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(width, height);

      renderer.setPixelRatio(window.devicePixelRatio);
      imageContainer.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      imageContainer.addEventListener("mousemove", handleMouseMove);
      imageContainer.addEventListener("mouseover", handleMouseOver);
      imageContainer.addEventListener("mouseout", handleMouseOut);

      animateScene();
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      imageContainer.removeEventListener("mousemove", handleMouseMove);
      imageContainer.removeEventListener("mouseover", handleMouseOver);
      imageContainer.removeEventListener("mouseout", handleMouseOut);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (
          rendererRef.current.domElement &&
          rendererRef.current.domElement.parentNode
        ) {
          rendererRef.current.domElement.parentNode.removeChild(
            rendererRef.current.domElement
          );
        }
        rendererRef.current = null;
      }

      sceneRef.current = null;
      cameraRef.current = null;
      planeMeshRef.current = null;
    };
  }, [image]);

  return (
    <div id="imageContainerBlob" ref={containerRef}>
      <img ref={imageRef} id="imageBlob" src={image} alt="Wave effect" />
    </div>
  );
};

export default WaveImageEffect;
