import { Routes } from '@angular/router';
import { DetallePersonaComponent } from './pages/detalle-persona/detalle-persona.component';
import { ListaPersonasComponent } from './pages/lista-personas/lista-personas.component';

export const routes: Routes = [
  {
    path: 'personas',
    component : ListaPersonasComponent
  },
  {
    path: 'detalles',
    component : DetallePersonaComponent
  }
];
