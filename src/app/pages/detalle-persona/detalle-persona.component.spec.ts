import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePersonaComponent } from './detalle-persona.component';
import { PersonaDetalleService } from '../../domains/shared/services/persona-detalle.service';
import { of } from 'rxjs';

describe('DetallePersonaComponent', () => {
  let component: DetallePersonaComponent;
  let fixture: ComponentFixture<DetallePersonaComponent>;
  let mockPersonaDetalleService: jasmine.SpyObj<PersonaDetalleService>;

  beforeEach(() => {
    mockPersonaDetalleService = jasmine.createSpyObj('PersonaDetalleService', ['getPersonas']);

    TestBed.configureTestingModule({
      declarations: [DetallePersonaComponent],
      providers: [
        { provide: PersonaDetalleService, useValue: mockPersonaDetalleService }
      ]
    });

    fixture = TestBed.createComponent(DetallePersonaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load personas on valid search', () => {
    const personasMock = [
      { id: 1, nombre: 'name', apellido: 'lastname', email: 'namee@example.com', telefono: '123456789', cedula: 1234567890 },
      { id: 2, nombre: 'namedos', apellido: 'lastname2', email: 'namedos@example.com', telefono: '987654321', cedula: 987654321 }
    ];
    const cedulaMock = '1234567890';

    component.searchPerson.setValue(cedulaMock);
    mockPersonaDetalleService.getPersonas.and.returnValue(of(personasMock));

    component.changeHandler();

    expect(component.loading).toBe(false);
    expect(component.personas).toEqual(personasMock);
  });

  it('should handle error on invalid search', () => {
    spyOn(console, 'log');

    component.changeHandler();

    expect(component.loading).toBe(false);
    expect(console.log).toHaveBeenCalledWith('El formulario no es válido.');
    expect(console.log).toHaveBeenCalledWith('Errores:', component.searchPerson.errors);
  });
});
