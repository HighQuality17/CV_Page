import { useEffect, useRef } from "react";
import * as THREE from "three";

const labels = ["Cloud", "POS", "Redes", "Automatización", "AWS", "Sistemas"];

const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed * 97.271) * 10_000;
  return value - Math.floor(value);
};

export default function TechScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = mount.clientWidth < 560;
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const trackGeometry = <T extends THREE.BufferGeometry>(geometry: T) => {
      geometries.push(geometry);
      return geometry;
    };

    const trackMaterial = <T extends THREE.Material>(material: T) => {
      materials.push(material);
      return material;
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, compact ? 0.15 : 0.2, compact ? 5.8 : 5.1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true
    });

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.25 : 1.5));
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    const networkGroup = new THREE.Group();
    const cubeGroup = new THREE.Group();
    const haloGroup = new THREE.Group();
    root.add(networkGroup, cubeGroup, haloGroup);
    scene.add(root);

    // Digital Infrastructure Core: cloud, network, automation and systems as one calm structure.
    const ambient = new THREE.AmbientLight(0xf8fafc, 1.35);
    const cyanLight = new THREE.PointLight(0x38bdf8, 7.8, 9);
    cyanLight.position.set(2.8, 2.2, 3.4);
    const violetLight = new THREE.PointLight(0x8b5cf6, 6.2, 9);
    violetLight.position.set(-2.8, -1.8, 2.2);
    const blueLight = new THREE.PointLight(0x22d3ee, 4.4, 7);
    blueLight.position.set(0, 2.6, 1.6);
    scene.add(ambient, cyanLight, violetLight, blueLight);

    const particleCount = compact ? 72 : 150;
    const particlePositions: number[] = [];

    for (let index = 0; index < particleCount; index += 1) {
      particlePositions.push(
        (pseudoRandom(index + 1) - 0.5) * 6.4,
        (pseudoRandom(index + 21) - 0.5) * 4.3,
        (pseudoRandom(index + 41) - 0.5) * 3.2
      );
    }

    const particleGeometry = trackGeometry(new THREE.BufferGeometry());
    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = trackMaterial(
      new THREE.PointsMaterial({
        color: 0x22d3ee,
        size: compact ? 0.018 : 0.022,
        transparent: true,
        opacity: 0.42,
        depthWrite: false
      })
    );

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    root.add(particles);

    const nodeCount = compact ? 42 : 76;
    const nodePositions: THREE.Vector3[] = [];
    const nodeBuffer: number[] = [];

    for (let index = 0; index < nodeCount; index += 1) {
      const angle = index * 2.399;
      const layer = (index % 11) - 5;
      const radius = 0.8 + pseudoRandom(index + 71) * (compact ? 1.35 : 1.95);
      const point = new THREE.Vector3(
        Math.cos(angle) * radius,
        layer * (compact ? 0.12 : 0.15) + Math.sin(index) * 0.05,
        Math.sin(angle) * radius * 0.72
      );

      nodePositions.push(point);
      nodeBuffer.push(point.x, point.y, point.z);
    }

    const nodeGeometry = trackGeometry(new THREE.BufferGeometry());
    nodeGeometry.setAttribute("position", new THREE.Float32BufferAttribute(nodeBuffer, 3));

    const nodeMaterial = trackMaterial(
      new THREE.PointsMaterial({
        color: 0x10b981,
        size: compact ? 0.055 : 0.064,
        transparent: true,
        opacity: 0.96,
        depthWrite: false
      })
    );

    networkGroup.add(new THREE.Points(nodeGeometry, nodeMaterial));

    const lineBuffer: number[] = [];
    const maxDistance = compact ? 1.08 : 1.18;
    const lineLimit = compact ? 86 : 160;

    for (let fromIndex = 0; fromIndex < nodePositions.length; fromIndex += 1) {
      for (let toIndex = fromIndex + 1; toIndex < nodePositions.length; toIndex += 1) {
        if (lineBuffer.length / 6 >= lineLimit) {
          break;
        }

        const from = nodePositions[fromIndex];
        const to = nodePositions[toIndex];

        if (from.distanceTo(to) < maxDistance) {
          lineBuffer.push(from.x, from.y, from.z, to.x, to.y, to.z);
        }
      }
    }

    const lineGeometry = trackGeometry(new THREE.BufferGeometry());
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(lineBuffer, 3));

    const lineMaterial = trackMaterial(
      new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: compact ? 0.2 : 0.27
      })
    );

    networkGroup.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    const coreGeometry = trackGeometry(new THREE.IcosahedronGeometry(compact ? 0.46 : 0.56, 1));
    const coreMaterial = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0x111827,
        emissive: 0x0b3650,
        transparent: true,
        opacity: 0.82,
        metalness: 0.46,
        roughness: 0.28
      })
    );
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    const coreEdges = new THREE.LineSegments(
      trackGeometry(new THREE.EdgesGeometry(coreGeometry)),
      trackMaterial(
        new THREE.LineBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.58
        })
      )
    );
    root.add(core, coreEdges);

    const cubeGeometry = trackGeometry(new THREE.BoxGeometry(0.34, 0.34, 0.34));
    const cubeMaterial = trackMaterial(
      new THREE.MeshStandardMaterial({
        color: 0x111827,
        emissive: 0x1e1b4b,
        transparent: true,
        opacity: 0.78,
        metalness: 0.34,
        roughness: 0.34
      })
    );
    const cubeEdgeMaterial = trackMaterial(
      new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.62
      })
    );
    const cubeCount = compact ? 3 : 6;

    for (let index = 0; index < cubeCount; index += 1) {
      const cubeShell = new THREE.Group();
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      const edgeGeometry = trackGeometry(new THREE.EdgesGeometry(cubeGeometry));
      const edges = new THREE.LineSegments(edgeGeometry, cubeEdgeMaterial);
      cubeShell.add(cube, edges);

      const angle = index * 1.13;
      cubeShell.position.set(
        Math.cos(angle) * (1.25 + index * 0.13),
        (index % 3 - 1) * 0.48,
        Math.sin(angle) * 0.86
      );
      cubeShell.rotation.set(index * 0.28, index * 0.45, index * 0.16);
      cubeGroup.add(cubeShell);
    }

    const haloMaterial = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: compact ? 0.14 : 0.18,
        wireframe: true,
        depthWrite: false
      })
    );

    const haloSizes = compact ? [1.52, 2.08] : [1.72, 2.28, 2.7];
    haloSizes.forEach((size, index) => {
      const halo = new THREE.Mesh(
        trackGeometry(new THREE.TorusGeometry(size, 0.008, 8, 128)),
        haloMaterial
      );
      halo.rotation.x = Math.PI * (0.4 + index * 0.15);
      halo.rotation.y = Math.PI * (0.18 + index * 0.09);
      haloGroup.add(halo);
    });

    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion || compact) {
        return;
      }

      const bounds = mount.getBoundingClientRect();
      mouseTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      mouseTarget.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const resize = () => {
      const nextWidth = mount.clientWidth || 520;
      const nextHeight = mount.clientHeight || 420;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight, false);
    };

    let frameId = 0;
    const startTime = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      if (!reducedMotion) {
        mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.055;
        mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.055;

        root.rotation.y = elapsed * 0.12 + mouseCurrent.x * 0.12;
        root.rotation.x = Math.sin(elapsed * 0.34) * 0.075 - mouseCurrent.y * 0.08;
        networkGroup.rotation.z = Math.sin(elapsed * 0.2) * 0.04;
        cubeGroup.children.forEach((cube, index) => {
          cube.rotation.x += 0.0025 + index * 0.0004;
          cube.rotation.y += 0.003 + index * 0.0005;
        });
        haloGroup.children.forEach((halo, index) => {
          halo.rotation.z = elapsed * (0.08 + index * 0.025);
        });
        core.rotation.y = elapsed * 0.18;
        core.rotation.x = elapsed * 0.1;
        coreEdges.rotation.copy(core.rotation);
        particles.rotation.y = elapsed * 0.035;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    mount.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      mount.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      mount.removeChild(renderer.domElement);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="tech-scene relative min-h-[340px] w-full sm:min-h-[460px]" aria-hidden="true">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-2 bottom-2 grid grid-cols-3 gap-2 sm:inset-x-8 sm:grid-cols-6">
        {labels.map((label) => (
          <span className="scene-label" key={label}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

