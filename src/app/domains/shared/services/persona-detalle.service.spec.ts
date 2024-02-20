import { TestBed } from '@angular/core/testing';

import { PersonaDetalleService } from './persona-detalle.service';

describe('PersonaDetalleService', () => {
  let service: PersonaDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
