import { Buffer } from 'buffer'

//bufferToInteger
const b2i = (value) => {
  const buffer = Buffer.from(value, 'base64')
  return buffer.readUIntLE(0, buffer.length)
}

//decimalFormat
const df = (amount, decimal = 0, fixed = false) => {
  const result = isNaN(amount) ? 0 : amount / 10 ** decimal
  return fixed === false ? result : result.toFixed(fixed)
}

// bigintToBase64
const bnToB64 = (bn) => {
  var hex = BigInt(bn).toString(16);
  if (hex.length % 2) { hex = '0' + hex; }

  var bin = [];
  var i = 0;
  var d;
  var b;
  while (i < hex.length) {
    d = parseInt(hex.slice(i, i + 2), 16);
    b = String.fromCharCode(d);
    bin.push(b);
    i += 2;
  }

  return btoa(bin.join(''));
}

// extractAddress
const extractAddress = (address) => {
  const frontPart = address.substring(0, 5);
  const rearPart = address.substring(address.length - 5);

  return frontPart + "..." + rearPart;
}

export { b2i, df, bnToB64, extractAddress }
