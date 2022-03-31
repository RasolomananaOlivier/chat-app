
const arr = [-1, -Math.sqrt(3) / 2, -Math.sqrt(2) / 2, -1 / 2, 0, 1 / 2, Math.sqrt(2) / 2, Math.sqrt(3) / 2, 1]

const result = arr.map(x => [x * 100, Math.cos(x) * 1000])
console.log(result);