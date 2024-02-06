import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { MaterialModule } from 'libs/client/material';
import { CdkTableDataSourceInput } from '@angular/cdk/table';


@Component({
  selector: 'dnd-ua-expandable-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './expandable-table.component.html',
  styleUrls: ['./expandable-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpandableTableComponent<T> {
  @Input() dataSource: T[] | undefined;
  @Input() columnsToDisplay: string[] | undefined;
  @Input() expandedElement: T | undefined;
}
