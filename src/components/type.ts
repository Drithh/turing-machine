export type Transition =
  | {
      from: number;
      to: number;
      head: string;
      headReplace: string;
      tapeDirection: string;
    }
  | undefined;

export type TwoInput = {
  input1: number;
  input2: number;
};

export type Temperature = {
  temperature: number;
  from: string;
  to: string;
};

export type FormData = {
  operation: string;
  data: any;
};

export type Symbol =
  | '0'
  | '1'
  | 'B'
  | 'C'
  | 'E'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'O'
  | 'P';

export type Direction = 'L' | 'R' | 'S';
