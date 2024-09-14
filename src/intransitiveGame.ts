export default class IntransitiveGame {
  constructor(public readonly moves: string[]) {}

  getResult(userMove: number, computerMove: number) {
    const movesSum = this.moves.length;
    const calculateRes = Math.sign(
      ((userMove - computerMove + movesSum / 2 + movesSum) % movesSum) -
        movesSum / 2
    );

    switch (calculateRes) {
      case -1:
        return "Lose";
      case 0:
        return "Draw";
      case 1:
        return "Win";
    }
  }

  randomMove() {
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(this.moves.length);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
}
