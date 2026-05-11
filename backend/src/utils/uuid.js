const { v4: uuidv4 } = require("uuid");

function generateUUID() {
  const dashed = uuidv4().toUpperCase();
  const uuid = dashed.replace(/-/g, "");
  return {
    uuid_text: dashed,
    uuid_bin: Buffer.from(uuid, "hex"),
  };
}
function uuidTextToBin(id) {
  const clean = id.replace(/-/g, "");
  return Buffer.from(clean, "hex");
}

module.exports = { generateUUID, uuidTextToBin };
