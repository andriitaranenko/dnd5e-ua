export class TableDefinition<T> {
  constructor(
    public columnDefinitions: ColumnDefinition<T>[]
  ) { }
}

export class ColumnDefinition<T> {
  constructor(
    public definition: string,
    public header: string,
    public data: (model: T) => string,
    public showColumn: boolean
  ) { }
}

export interface ExpandableSectionConfig {
  component: Promise<unknown>;
  inputName: string;
}
