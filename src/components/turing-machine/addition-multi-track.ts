import { TwoInput, Symbol, Direction, Transition } from "../type";
import { TwoTape } from "./tape";

export class AdditionMultiTrack {
  constructor(inputSymbols: TwoInput) {
    const resolvedInputSymbols = resolveInput(inputSymbols);
    this.twoTape = new TwoTape(resolvedInputSymbols);
  }

  private totalTape = 2;
  private twoTape: TwoTape;

  private transitions = new Array<Transition>();
  private lastTransition: Transition;

  public run() {
    do {
      const transition = this.getNextTransition(
        this.lastTransition ? this.lastTransition.to : 0
      );
      if (transition !== false) {
        this.twoTape.write([...transition.headReplace] as Symbol[]);
        this.twoTape.moveHead([...transition.tapeDirection] as Direction[]);

        this.transitions.push(transition);
        this.lastTransition = transition;
      } else {
        this.lastTransition = undefined;
      }
    } while (this.lastTransition !== undefined);
  }

  public getTransitions() {
    return this.transitions;
  }

  public getTotalTape() {
    return this.totalTape;
  }

  private getNextTransition = (currentHead: number) => {
    let transition: Transition = {
      from: currentHead,
      to: -1,
      head: this.twoTape.read().join(""),
      headReplace: "",
      tapeDirection: "",
    };

    switch (transition.from) {
      case 0:
        switch (transition.head) {
          case "0B":
            transition.to = 0;
            transition.headReplace = "00";
            transition.tapeDirection = "RR";
            break;
          case "1B":
            transition.to = 0;
            transition.headReplace = "11";
            transition.tapeDirection = "RR";
            break;
          case "CB":
            transition.to = 1;
            transition.headReplace = "CB";
            transition.tapeDirection = "RL";
            break;
        }
        break;
      case 1:
        switch (transition.head) {
          case "01":
            transition.to = 1;
            transition.headReplace = "0B";
            transition.tapeDirection = "RL";
            break;
          case "10":
            transition.to = 1;
            transition.headReplace = "1B";
            transition.tapeDirection = "RL";
            break;
          case "0B":
            transition.to = 1;
            transition.headReplace = "00";
            transition.tapeDirection = "RR";
            break;
          case "1B":
            transition.to = 1;
            transition.headReplace = "11";
            transition.tapeDirection = "RR";
            break;
          case "00":
            transition.to = 1;
            transition.headReplace = "00";
            transition.tapeDirection = "SR";
            break;
          case "11":
            transition.to = 1;
            transition.headReplace = "11";
            transition.tapeDirection = "SR";

            break;
          case "B1":
            transition.to = 2;
            transition.headReplace = "B1";
            transition.tapeDirection = "RR";
            break;
          case "B0":
            transition.to = 2;
            transition.headReplace = "B0";
            transition.tapeDirection = "RR";
            break;
          case "BB":
            transition.to = 2;
            transition.headReplace = "BB";
            transition.tapeDirection = "RR";
            break;
        }
        break;
      case 2:
        break;
    }

    return transition.to === -1 ? false : transition;
  };
}

const resolveInput = (input: TwoInput): Symbol[] => {
  let inputString = new Array<string>();
  for (let i = 0; i < Math.abs(input.input1); i++) {
    inputString.push(input.input1 > 0 ? "1" : "0");
  }
  inputString.push("C");
  for (let i = 0; i < Math.abs(input.input2); i++) {
    inputString.push(input.input2 ? "1" : "0");
  }
  return inputString as Symbol[];
};