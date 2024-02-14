import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

import { Spell } from "dnd-ua-client/src/app/spells/_models/spell.model";

@Component({
  selector: 'dnd-ua-spell-detail',
  template: `
    <div *ngIf="spell">
      <h2>{{ spell.originalName }}</h2>
      <p>{{ spell.description }}</p>
    </div>
  `
})
export class SpellDetailComponent {
  @Input() spell: Spell | undefined = undefined;
}