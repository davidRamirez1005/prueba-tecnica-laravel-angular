import { Persona } from './../../domains/shared/models/persona.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPersonasComponent } from './lista-personas.component';
import { PersonaService } from '../../domains/shared/services/persona.service';
import { of } from 'rxjs';

describe('ListaPersonasComponent', () => {
  let component: ListaPersonasComponent;
  let fixture: ComponentFixture<ListaPersonasComponent>;
  let mockPersonaService: jasmine.SpyObj<PersonaService>;

  beforeEach(() => {
    mockPersonaService = jasmine.createSpyObj('PersonaService', ['getPersonas']);

    TestBed.configureTestingModule({
      declarations: [ListaPersonasComponent],
      providers: [
        { provide: PersonaService, useValue: mockPersonaService }
      ]
    });

    fixture = TestBed.createComponent(ListaPersonasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize personas and loading', () => {
    const personasMock: Persona[] = [
      { id: 1, nombre: 'name', apellido: 'lastname', email: 'namee@example.com', telefono: '123456789', cedula: 1234567890 },
      { id: 2, nombre: 'namedos', apellido: 'lastname2', email: 'namedos@example.com', telefono: '987654321', cedula: 987654321 }
    ];

    mockPersonaService.getPersonas.and.returnValue(of(personasMock));

    component.ngOnInit();

    expect(component.loading).toBe(false);
    expect(component.personas).toEqual(personasMock);
  });



  it('should handle error during initialization', () => {
    const errorMock = 'Error fetching personas';
    mockPersonaService.getPersonas.and.throwError(errorMock);

    spyOn(console, 'error');

    component.ngOnInit();

    expect(component.loading).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Error fetching personas', errorMock);
  });
});
