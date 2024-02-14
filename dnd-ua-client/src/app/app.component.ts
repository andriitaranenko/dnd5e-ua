import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";

import { SpellsModule } from "dnd-ua-client/src/app/spells/spells.module";

@Component({
  standalone: true,
  imports: [
    SpellsModule,

    HttpClientModule
  ],
  selector: 'dnd-ua-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent { }
