import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pokemon } from './models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
  constructor(private http: HttpClient) {}

  get listAllPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.url).pipe(
      tap((res) => res),
      tap((res: any) => {
        res.results.map((resPokemons: any) => {
          this.getPokemonsAll(resPokemons.url).subscribe(
            (res) => (resPokemons.status = res)
          );
        });
      })
    );
  }
  public getPokemonsAll(url: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(url).pipe(map((res) => res));
  }
  public getPokemon(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url).pipe(map((res) => res));
  }
}
