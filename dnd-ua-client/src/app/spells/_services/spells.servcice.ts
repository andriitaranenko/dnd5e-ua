import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ISpellFilter } from "dnd-ua-client/src/app/spells/_models/spell-filter.model";
import { Spell } from "dnd-ua-client/src/app/spells/_models/spell.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SpellsService {

  private readonly localhostIP = '127.0.0.1'

  private readonly _apiUrl = `http://${this.localhostIP}:3000/api/spells`;
  
  constructor(private httpClient: HttpClient) {}

  getAllSpells(): Observable<Spell[]> {
    return this.httpClient.get<Spell[]>(this._apiUrl);
  }

  getSpells(spellsFilters: ISpellFilter): Observable<Spell[]> {

    let options = new HttpParams();

    for (let spellFilter in spellsFilters) {
      options = options.append(spellFilter, String(spellsFilters[spellFilter as keyof ISpellFilter]));
    }

    return this.httpClient.get<Spell[]>(
      this._apiUrl,
      { params: options }
    );
  }
}