import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent {
  constructor(private location: Location) {}

  public goBack() {
    this.location.back();
  }
}
