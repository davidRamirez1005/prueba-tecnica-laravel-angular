import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaDetalleService {
  private apiUrl = 'http://localhost:8000/api/personas';

  constructor(private http: HttpClient) { }

  getPersonas(cedula: string): Observable<Persona[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const url = `${this.apiUrl}/${cedula}`;

    return this.http.get<Persona[]>(url, { headers });
  }

}
