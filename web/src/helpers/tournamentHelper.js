export const calcNumRounds = (numPlayers, power = 1) => {
  if (2 ** power >= numPlayers) {
    return power
  } else {
    return calcNumRounds(numPlayers, power + 1)
  }
}
