import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations: Location[] = [
    {
      name: 'Elorith',
      description: 'Reino de los elfos, en el corazón de un frondoso, mágico y bello bosque.',
      image: 'assets/images/locations/elorith.png',
      inhabitants: 'Elfos'
    },
    {
      name: 'La Colina',
      description: 'Reino de los medianos, con sus casas construidas entre colinas y de los lugares más bellos del continente.',
      image: 'assets/images/locations/la-colina.png',
      inhabitants: 'Medianos'
    },
    {
      name: 'Monastery Land',
      description: 'La región donde habitan los religiosos.',
      image: 'assets/images/locations/monastery-land.png',
      inhabitants: 'Religiosos'
    },
    {
      name: 'Paranor',
      description: 'Reino de los hombres, de los más influyentes del continente. Un lugar atrapante y emocionante por sus intrigas.',
      image: 'assets/images/locations/paranor.png',
      inhabitants: 'Humanos'
    },
    {
      name: 'Tierras Libres del Sur',
      description: 'Región en la que habitan aquellos que prefieren vivir en la libertad, por fuera de monarquías. Aquí se juntan todas las razas y culturas del continente.',
      image: 'assets/images/locations/pueblos-libres.png',
      inhabitants: 'Todas las razas'
    },
    {
      name: 'Ground Kharaz',
      description: 'Reino de los enanos, de donde proviene la mayor cantidad de minerales y riquezas de la región.',
      image: 'assets/images/locations/ground-kharaz.png',
      inhabitants: 'Enanos'
    }
  ];

  constructor() { }

  getLocations(): Observable<Location[]> {
    return of(this.locations);
  }
} 