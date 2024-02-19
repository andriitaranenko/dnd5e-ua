import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable, Subject, debounceTime, startWith, switchMap, takeUntil } from "rxjs";

import { ISpellFilter } from "dnd-ua-client/src/app/spells/_models/spell-filter.model";
import { Spell } from "dnd-ua-client/src/app/spells/_models/spell.model";
import { SpellsService } from "dnd-ua-client/src/app/spells/_services/spells.servcice";
import { TableDefinition, ColumnDefinition, ExpandableSectionConfig } from "dnd-ua-client/src/app/shared/_models/table.model";
import { Utils } from "dnd-ua-client/src/app/shared/_utils/utils.class";

@Component({
  selector: 'dnd-ua-spell-list',
  template: `
    <div class="filters">
      <form [formGroup]="formGroup">

        <dnd-ua-input label="original name" formControlName="originalName"></dnd-ua-input>

        <dnd-ua-input label="translated name" formControlName="translatedName"></dnd-ua-input>

        <dnd-ua-select label="levels" [options]="levels" formControlName="level"></dnd-ua-select>

        <dnd-ua-select label="classes" [options]="classes" formControlName="spellUser"></dnd-ua-select>

      </form>
    </div>

    <dnd-ua-expandable-table
      [tableDefinition]="tableDefinition"
      [dataSource]="(dataSource$ | async)!"
      [expandableSectionConfig]="expandableSectionConfig"
    ></dnd-ua-expandable-table>
  `
})
export class SpellListComponent implements OnInit, OnDestroy {
  
  private unsubscriber$ = new Subject<void>();

  readonly levels: { label: string, value: number }[] = [
    { label: 'Cantrip', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 }
  ];

  readonly classes: { label: string, value: string }[] = [
    { label: 'Бард', value: 'Бард' },
    { label: 'Боєць', value: 'Боєць' },
    { label: 'Варвар', value: 'Варвар' },
    { label: 'Друїд', value: 'Друїд' },
    { label: 'Клірик', value: 'Клірик' },
    { label: 'Заклинач', value: 'Заклинач' },
    { label: 'Монах', value: 'Монах' },
    { label: 'Паладин', value: 'Паладин' },
    { label: 'Пройдисвіт', value: 'Пройдисвіт' },
    { label: 'Рейнджер', value: 'Рейнджер' },
    { label: 'Чаклун', value: 'Чаклун' },
    { label: 'Чарівник', value: 'Чарівник' }
  ];
  
  readonly tableDefinition = new TableDefinition([
    new ColumnDefinition('originalName', 'Original Name', (model: Spell) => model.originalName),
    new ColumnDefinition('sourceUrl', 'Resource Url', (model: Spell) => model.sourceUrl),
    new ColumnDefinition('translatedName', 'Translated Name', (model: Spell) => model.translatedName),
    new ColumnDefinition('level', 'Level', (model: Spell) => String(model.level)),
    new ColumnDefinition('castingTime', 'Casting Time', (model: Spell) => model.castingTime),
    new ColumnDefinition('range', 'Range', (model: Spell) => String(model.range)),
    new ColumnDefinition('components', 'Components', (model: Spell) => model.components.join(', ')),
    new ColumnDefinition('duration', 'Duration', (model: Spell) => String(model.duration) + ' minutes'),
    // new ColumnDefinition('description', 'Description', (model: Spell) => model.description),
    new ColumnDefinition('spellUsers', 'Spell Users', (model: Spell) => model.spellUsers.join(', ')),
  ]);

  readonly expandableSectionConfig: ExpandableSectionConfig = {
    component: import('dnd-ua-client/src/app/spells/_components/spell-detail/spell-detail.component').then(it => it.SpellDetailComponent),
    inputName: 'spell'
  };

  formGroup: FormGroup;

  constructor(private spellsService: SpellsService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      originalName: [],
      translatedName: [],
      level: [],
      spellUser: []
    })
  }

  dataSource$!: Observable<Spell[]>;

  ngOnInit(): void {
    this.dataSource$ = this.formGroup.valueChanges
      .pipe(
        takeUntil(this.unsubscriber$),
        startWith({}),
        debounceTime(300),
        switchMap((updatedValue) => {
          console.log(updatedValue);
          
          const filterdProperties = Utils.removeEmpty(updatedValue);          
          return this.getSpells(filterdProperties);
        })
      );
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  getSpells(spellsFilters?: ISpellFilter): Observable<Spell[]> {
    if (spellsFilters) {
      return this.spellsService.getSpells(spellsFilters);
    } else {
      return this.spellsService.getAllSpells();
    }
  }

  resetControl(formControlName: string): void {
    this.formGroup.get(formControlName)?.patchValue(null);
  }

}
