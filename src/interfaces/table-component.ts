export interface IAddUpdate {
  component: string;
  label: string;
  stateKey: string;
}

export interface ITableAddUpdate {
  componentData: IAddUpdate[][];
  changeState: (key: string, value: string) => void;
}
