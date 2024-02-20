import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { ExpandableTable } from "dnd-ua-client/src/app/shared/_components/expandable-table/expandable-table.component";
import { InputComponent } from "dnd-ua-client/src/app/shared/_components/input/input.component";
import { SelectComponent } from "dnd-ua-client/src/app/shared/_components/select/select.component";
import { SpellDetailComponent } from "dnd-ua-client/src/app/spells/_components/spell-detail/spell-detail.component";
import { SpellListComponent } from "dnd-ua-client/src/app/spells/_components/spell-list/spell-list.component";
import { SpellComponent } from "dnd-ua-client/src/app/spells/_components/spell/spell.component";
import { SpellsService } from "dnd-ua-client/src/app/spells/_services/spells.servcice";

const materialImports = [
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule
];

const components = [
  SpellListComponent,
  SpellDetailComponent,
  SpellComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ExpandableTable,
    InputComponent,
    SelectComponent,

    ...materialImports
  ],
  providers: [SpellsService],
  exports: [SpellListComponent]
})
export class SpellsModule { }