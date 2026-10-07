const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '../public/mac.glb');
const buffer = fs.readFileSync(glbPath);

const magic = buffer.readUInt32LE(0);
const version = buffer.readUInt32LE(4);
const length = buffer.readUInt32LE(8);

const chunkLength = buffer.readUInt32LE(12);
const chunkType = buffer.readUInt32LE(16);

const jsonString = buffer.toString('utf8', 20, 20 + chunkLength);
const gltf = JSON.parse(jsonString);

console.log('=== GLTF NODES ===');
gltf.nodes.forEach((node, index) => {
  console.log(`Node ${index}: "${node.name}"`, {
    translation: node.translation,
    rotation: node.rotation,
    scale: node.scale,
    children: node.children,
    mesh: node.mesh !== undefined ? (gltf.meshes[node.mesh] ? gltf.meshes[node.mesh].name : node.mesh) : undefined
  });
});
