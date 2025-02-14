import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDTO } from '@workspace/ts-dto';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor() {
    const p = new UserDTO();
    console.log(p);
  }
}
