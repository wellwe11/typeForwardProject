import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./BLOG.scss";

import Image from "../../resourceFolder_typeFoward/assets/blog/services/oddval/images/01-OddvalBlog-4-Square-Thumb.png";

const ImageContainer = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    const imageContainer = containerRef.current;

    let easeFactor = 0.02;
    let scene, camera, renderer, planeMesh;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let aberrationIntensity = 0.0;
    let prevPosition = { x: 0.5, y: 0.5 };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D u_texture;    
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;
      uniform float u_aberrationIntensity;

      void main() {
          vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
          vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
          
          vec2 mouseDirection = u_mouse - u_prevMouse;
          
          vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
          float pixelDistanceToMouse = length(pixelToMouseDirection);
          float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
    
          vec2 uvOffset = strength * - mouseDirection * 0.2;
          vec2 uv = vUv - uvOffset;

          vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
          vec4 colorG = texture2D(u_texture, uv);
          vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

          gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
      }
    `;

    const initializeScene = (texture) => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        80,
        imageElement.offsetWidth / imageElement.offsetHeight,
        0.01,
        10
      );
      camera.position.z = 1;

      let shaderUniforms = {
        u_mouse: { value: new THREE.Vector2() },
        u_prevMouse: { value: new THREE.Vector2() },
        u_aberrationIntensity: { value: 0.0 },
        u_texture: { value: texture },
      };

      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader,
        })
      );

      scene.add(planeMesh);

      renderer = new THREE.WebGLRenderer({ antialias: true });

      renderer.setSize(
        imageContainer.offsetWidth * 1,
        imageContainer.offsetHeight * 1
      );

      renderer.setPixelRatio(window.devicePixelRatio);
      imageContainer.appendChild(renderer.domElement);
    };

    const animateScene = () => {
      requestAnimationFrame(animateScene);

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

      planeMesh.material.uniforms.u_mouse.value.set(
        mousePosition.x,
        1.0 - mousePosition.y
      );

      planeMesh.material.uniforms.u_prevMouse.value.set(
        prevPosition.x,
        1.0 - prevPosition.y
      );

      aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
      planeMesh.material.uniforms.u_aberrationIntensity.value =
        aberrationIntensity;

      renderer.render(scene, camera);
    };

    const handleMouseMove = (event) => {
      easeFactor = 0.02;
      const rect = imageContainer.getBoundingClientRect();
      prevPosition = { ...targetMousePosition };

      targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.y = (event.clientY - rect.top) / rect.height;

      aberrationIntensity = 1;
    };

    const handleMouseEnter = (event) => {
      easeFactor = 0.02;
      const rect = imageContainer.getBoundingClientRect();

      mousePosition.x = targetMousePosition.x =
        (event.clientX - rect.left) / rect.width;
      mousePosition.y = targetMousePosition.y =
        (event.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
      easeFactor = 0.05;
      targetMousePosition = { ...prevPosition };
    };

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageElement.src, (texture) => {
      initializeScene(texture);
      animateScene();
    });

    imageContainer.addEventListener("mousemove", handleMouseMove);
    imageContainer.addEventListener("mouseenter", handleMouseEnter);
    imageContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      imageContainer.removeEventListener("mousemove", handleMouseMove);
      imageContainer.removeEventListener("mouseenter", handleMouseEnter);
      imageContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div id="imageContainer" ref={containerRef}>
      <img id="myImage" ref={imageRef} src={Image} alt="Interactive" />
    </div>
  );
};

export default ImageContainer;
