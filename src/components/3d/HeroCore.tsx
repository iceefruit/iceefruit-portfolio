import * as THREE from 'three';
import { getAudioEngine } from '@/lib/audioEngine';

export class HeroCore3D {
  public group: THREE.Group;
  private outerWireframe: THREE.LineSegments;
  private innerMesh: THREE.Mesh;
  private pointCloud: THREE.Points;
  private baseScale = 1.0;

  constructor() {
    this.group = new THREE.Group();

    // 1. Outer Wireframe Icosahedron (Silver Grayscale)
    const icosaGeometry = new THREE.IcosahedronGeometry(2.4, 2);
    const wireframeGeometry = new THREE.WireframeGeometry(icosaGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x3E4451,
      transparent: true,
      opacity: 0.7,
      linewidth: 1,
    });
    this.outerWireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    this.group.add(this.outerWireframe);

    // 2. Inner Glowing Core (Electric Orange)
    const innerGeometry = new THREE.IcosahedronGeometry(1.4, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF5E00,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    this.innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    this.group.add(this.innerMesh);

    // 3. Orange Vertex Halo Points
    const pointsGeometry = new THREE.BufferGeometry();
    const pos = icosaGeometry.attributes.position.array;
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xFF7700,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    this.pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    this.group.add(this.pointCloud);
  }

  public update(time: number, scrollProgress: number, mouseX: number, mouseY: number): void {
    // Check audio reactivity
    let audioPulse = 0;
    try {
      const engine = getAudioEngine();
      if (engine.stateA.isPlaying || engine.stateB.isPlaying) {
        const freqData = engine.getFrequencyData();
        // Read low-frequency bass energy (bins 0-4)
        const bassSum = (freqData[0] + freqData[1] + freqData[2] + freqData[3]) / 4;
        audioPulse = (bassSum / 255) * 0.45;
      }
    } catch {}

    const dynamicScale = this.baseScale + audioPulse + Math.sin(time * 1.5) * 0.04;
    this.group.scale.set(dynamicScale, dynamicScale, dynamicScale);

    // Continuous rotation + scroll progression
    this.outerWireframe.rotation.x = time * 0.2 + scrollProgress * Math.PI * 2;
    this.outerWireframe.rotation.y = time * 0.25 + scrollProgress * Math.PI * 3;

    this.innerMesh.rotation.x = -time * 0.3 - scrollProgress * Math.PI * 1.5;
    this.innerMesh.rotation.y = -time * 0.35 - scrollProgress * Math.PI * 2;

    this.pointCloud.rotation.copy(this.outerWireframe.rotation);

    // Mouse parallax tilt
    const targetTiltX = mouseY * 0.4;
    const targetTiltY = mouseX * 0.4;
    this.group.rotation.x += (targetTiltX - this.group.rotation.x) * 0.05;
    this.group.rotation.y += (targetTiltY - this.group.rotation.y) * 0.05;

    // Shift position slightly as user scrolls down
    this.group.position.y = (scrollProgress - 0.2) * -1.8;
  }
}
