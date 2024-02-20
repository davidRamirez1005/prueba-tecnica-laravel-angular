import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonaDetalleService } from '../../domains/shared/services/persona-detalle.service';
import { Persona } from '../../domains/shared/models/persona.model';

@Component({
  selector: 'app-detalle-persona',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detalle-persona.component.html',
  styleUrl: './detalle-persona.component.css'
})
export class DetallePersonaComponent {

  searchPerson = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[0-9]+$')
    ]
  });

  personas: Persona[] = [];
  loading: boolean = false;

  constructor(private personaDetalleService: PersonaDetalleService) {}

  changeHandler() {
    this.loading = true;
    
    if (this.searchPerson.valid) {
      const cedula = this.searchPerson.value;

      this.personaDetalleService.getPersonas(cedula).subscribe(
        (data) => {
          this.personas = Array.isArray(data) ? data : [data];
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching personas', error);
          this.loading = false;
        }
      );


    } else {
      console.log('El formulario no es válido.');
      console.log('Errores:', this.searchPerson.errors);
    }
  }
}
