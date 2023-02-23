export function generateUUID(digits: number) {
  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ";
  let uuid = [];
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join("");
}

export function getStageNumberFromUrl() {
  const urlParams = new URLSearchParams(location.search);

  for (const [k, v] of urlParams.entries()) {
    if (k === "stage" && v) {
      return Number(v);
    }
  }
}
