import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checked',
})
export class CheckboxPipe implements PipeTransform {
  transform(
    pokemonList: any[],
    checkboxValue: string,
    checkboxValue_2: string
  ): any[] {
    if (!pokemonList) return [];
    if (!checkboxValue) return pokemonList;
    checkboxValue = checkboxValue.toLowerCase();
    return pokemonList.filter((pokemon) => {
      return (
        (pokemon.type1.toLowerCase().includes(checkboxValue) ||
          pokemon.type2.toLowerCase().includes(checkboxValue)) &&
        (pokemon.type1.toLowerCase().includes(checkboxValue_2) ||
          pokemon.type2.toLowerCase().includes(checkboxValue_2))
      );
    });
  }
}
