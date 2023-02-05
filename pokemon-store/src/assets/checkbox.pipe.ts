import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checked',
})
export class CheckboxPipe implements PipeTransform {
  transform(pokemonList: any[], checkboxValue: string): any[] {
    if (!pokemonList) return [];
    if (!checkboxValue) return pokemonList;
    checkboxValue = checkboxValue.toLowerCase();
    return pokemonList.filter((item) => {
      return (
        item.type1.toLowerCase().includes(checkboxValue) ||
        item.type2.toLowerCase().includes(checkboxValue)
      );
    });
  }
}
