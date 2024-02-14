import { trigger, state, style, transition, animate } from "@angular/animations";
import { CommonModule, JsonPipe, NgForOf } from "@angular/common";
import { Component, ComponentRef, Input, QueryList, Type, ViewChildren, ViewContainerRef } from "@angular/core";
import { MatTableModule } from '@angular/material/table';

import { GenericTableComponent } from "dnd-ua-client/src/app/shared/_components/generic-table/generic-table.component";
import { ExpandableSectionConfig } from "dnd-ua-client/src/app/shared/_models/table.model";


@Component({
  selector: 'dnd-ua-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrls: ['./expandable-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, NgForOf, JsonPipe, CommonModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpandableTable<T> extends GenericTableComponent<T> {

  @ViewChildren('expandedContainer', { read: ViewContainerRef })
  expandedContainersList!: QueryList<ViewContainerRef>;

  @Input() expandableSectionConfig!: ExpandableSectionConfig;

  private componentRef: ComponentRef<unknown> | null = null;

  private _expandedElement: T | null = null;

  set expandedElement(expandedElement: T | null) {
    this._expandedElement = expandedElement;
  }

  get expandedElement(): T | null {
    return this._expandedElement;
  }

  async triggerExpandedPanel(model: T, index: number) {
    this.expandedContainersList.forEach(container => {
      container.clear();
    });

    if (this.expandedElement === model) {
      this.expandedElement = null;
      this.componentRef?.destroy();
      this.componentRef = null;

      return;
    }

    if (!this.expandableSectionConfig || !this.expandableSectionConfig.component || !this.expandableSectionConfig.inputName) {
      return;
    }
    
    const currentContainer = this.expandedContainersList.get(index);

    this.expandedElement = model;

    const componentInstance = await this.expandableSectionConfig.component;
    this.componentRef = currentContainer!.createComponent(componentInstance as Type<unknown>);
    this.componentRef.setInput(this.expandableSectionConfig.inputName, model);
  }
}
