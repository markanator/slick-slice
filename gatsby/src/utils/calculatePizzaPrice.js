const sizes = {
  S: 0.75,
  M: 1,
  L: 1.75,
};

export default function calculatePizzaPrice(cents, s) {
  return cents * sizes[s];
}
