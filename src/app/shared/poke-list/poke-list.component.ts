import { Component } from '@angular/core';
import { Pokemon } from 'src/app/service/models/pokemon.model';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent {
  private setPokemons: Pokemon[] = [];
  public pokemons: Pokemon[] = [];
  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.listAllPokemons.subscribe((res: any) => {
      this.setPokemons = res.results;
      this.pokemons = this.setPokemons;
    });
  }
  public getSearch(value: string) {
    const filter = this.setPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });
    this.pokemons = filter;
  }
}
