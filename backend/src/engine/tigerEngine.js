export function generateSpin(type, bet) {
  const patterns = {
    dead: [["A", "B", "C"]],
    mini: [["M", "M", "M"]],
    win: [["W", "W", "W"]],
    big: [["B", "B", "B"]],
    ultra: [["U", "U", "U"]],
  };

  const multipliers = {
    dead: [0],
    mini: [1.1, 1.3, 1.5],
    win: [2, 3, 5],
    big: [10, 20, 30],
    ultra: [30, 40, 50],
  };

  const pattern = patterns[type][0];
  const multiplier = multipliers[type][
    Math.floor(Math.random() * multipliers[type].length)
  ];

  return {
    type,
    pattern,
    multiplier,
    winAmount: Number(bet * multiplier),
  };
}
