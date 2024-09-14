import IntransitiveGame from "./intransitiveGame";
// @ts-expect-error   no types for this library
import AsciiTable from "ascii-table";

export default class TableGenerator {
  private table: AsciiTable;
  constructor(private game: IntransitiveGame) {
    this.createTable();
  }

  private createTable() {
    this.table = new AsciiTable()
      .setTitle("Rules")
      .setHeading("v PC/User >", ...this.game.moves);

    for (let i = 0; i < this.game.moves.length; i++) {
      const row = [];
      for (let j = 0; j < this.game.moves.length; j++) {
        const sign = this.game.getResult(j, i);
        row.push(sign);
      }
      this.table.addRow(this.game.moves[i], ...row);
    }

    return this.table;
  }

  showTable() {
    console.log(this.table.toString());
  }
}
