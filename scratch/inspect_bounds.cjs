const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '../public/mac.glb');
const buffer = fs.readFileSync(glbPath);
const chunkLength = buffer.readUInt32LE(12);
const jsonString = buffer.toString('utf8', 20, 20 + chunkLength);
const gltf = JSON.parse(jsonString);

gltf.meshes.forEach(mesh => {
  console.log(`Mesh "${mesh.name}":`);
  mesh.primitives.forEach(prim => {
    const posAccessorIdx = prim.attributes.POSITION;
    const accessor = gltf.accessors[posAccessorIdx];
    console.log('  Min:', accessor.min, 'Max:', accessor.max);
  });
});
