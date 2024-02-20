import { Component, Input, SimpleChanges, inject, signal, OnInit } from '@angular/core';
import { Persona } from '../../domains/shared/models/persona.model';
import { PersonaService } from '../../domains/shared/services/persona.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-lista-personas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-personas.component.html',
  styleUrl: './lista-personas.component.css'
})
export class ListaPersonasComponent implements OnInit {
  personas: Persona[] = [];
  loading: boolean = false;


  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.loading = true;
    
    this.personaService.getPersonas().subscribe(
      (data) => {
        this.personas = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching personas', error);
        this.loading = false;
      }
    );
  }
}
