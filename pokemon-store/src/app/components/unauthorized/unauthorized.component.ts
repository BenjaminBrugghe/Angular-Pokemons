import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent {
  constructor(private location: Location) {}

  public goBack() {
    this.location.back();
  }
}
