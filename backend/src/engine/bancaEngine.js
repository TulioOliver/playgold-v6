export function getRoundType() {
  const list = ["dead", "mini", "win", "big", "ultra"];
  return { type: list[Math.floor(Math.random() * list.length)] };
}

export function updatePlayerWinCooldown() {
  return;
}
