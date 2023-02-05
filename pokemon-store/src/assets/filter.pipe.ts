import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(pokemonList: any[], searchbarInput: string): any[] {
    if (!pokemonList) return [];
    if (!searchbarInput) return pokemonList;
    searchbarInput = searchbarInput.toLowerCase();
    return pokemonList.filter((item) => {
      return item.name.toLowerCase().includes(searchbarInput);
    });
  }
}
