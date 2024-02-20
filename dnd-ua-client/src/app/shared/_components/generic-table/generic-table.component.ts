import { Component, Input } from "@angular/core";
import { TableDefinition } from "dnd-ua-client/src/app/shared/_models/table.model";


@Component({
  selector: 'dnd-ua-generic-table',
  template: '',
  standalone: true
})
export class GenericTableComponent<T> {
  @Input() tableDefinition!: TableDefinition<T>;

  @Input() dataSource: T[] = [];

  get columnDefinitions(): string[] {
    return this.tableDefinition.columnDefinitions.filter(columnDefinition => columnDefinition.showColumn !== false).map(columnDefinition => columnDefinition.definition);
  }

  get columnHeadings(): string[] {
    return this.tableDefinition.columnDefinitions.filter(columnDefinition => columnDefinition.showColumn).map(columnDefinition => columnDefinition.header);
  }
}