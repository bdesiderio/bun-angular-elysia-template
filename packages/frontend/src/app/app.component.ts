import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDto } from 'app-shared-dtos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor() {
    const p = new UserDto();
    console.log(p);
  }
}
