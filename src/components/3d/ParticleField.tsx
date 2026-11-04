import * as THREE from 'three';

export class ParticleField3D {
  public points: THREE.Points;
  private count = 1200;

  constructor() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);

    const orangeColor = new THREE.Color(0xFF5E00);
    const slateColor = new THREE.Color(0x3E4451);
    const brightColor = new THREE.Color(0x94A3B8);

    for (let i = 0; i < this.count; i++) {
      // Spread across 3D space
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      // 10% electric orange particles, 90% slate/grayscale
      const isOrange = Math.random() < 0.10;
      const c = isOrange ? orangeColor : (Math.random() < 0.5 ? slateColor : brightColor);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });

    this.points = new THREE.Points(geometry, material);
  }

  public update(time: number, scrollProgress: number): void {
    this.points.rotation.y = time * 0.03 + scrollProgress * 0.5;
    this.points.rotation.x = time * 0.015;
    this.points.position.y = scrollProgress * -4;
  }
}
