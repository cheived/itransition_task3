import HMACGenerator from "./hmacGenerator";
import readline from "readline-sync";
import TableGenerator from "./tableGenerator";
import IntransitiveGame from "./intransitiveGame";
import KeyGenerator from "./keyGenerator";

(function () {
  const args = process.argv.slice(2);

  if (
    !(args.length % 2) ||
    args.length < 2 ||
    new Set(args.map((item) => item.toLowerCase())).size !== args.length
  ) {
    console.log(
      "Moves should not be repeated and their number should be odd and more than one"
    );
    return;
  }

  const game = new IntransitiveGame(args);

  const table = new TableGenerator(game);

  const hmacGenerator = new HMACGenerator();

  const secretKey = new KeyGenerator().generateKey();

  const computerDecide = game.randomMove();

  const hmac = hmacGenerator.getHmac(secretKey, game.moves[computerDecide]);

  const availableMoves = game.moves
    .map((item, i) => `${i + 1} - ${item}`)
    .join("\n");

  console.log(`HMAK: ${hmac}`);

  function ask() {
    const question = readline.question(
      "Available moves:\n" +
        availableMoves +
        "\n" +
        "0 - exit" +
        "\n" +
        "? - help" +
        "\n"
    );

    if (question === "?") {
      table.showTable();
      return;
    } else if (question === "0") {
      return;
    } else if (game.moves.find((item) => item[+question])) {
      console.log(`Your move: ${game.moves[+question - 1]}`);
      console.log(`Computer move: ${game.moves[computerDecide]}`);
      console.log(`Result: ${game.getResult(+question - 1, computerDecide)}`);
      console.log("HMAK key: " + secretKey);
    } else {
      console.log(`There is no variant: ${question}`);
      ask();
    }
  }

  ask();
})();
