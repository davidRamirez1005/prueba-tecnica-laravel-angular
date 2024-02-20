import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiUrl = 'http://localhost:8000/api/personas';

  constructor(private http: HttpClient) { }

  getPersonas(): Observable<Persona[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    });

    return this.http.get<Persona[]>(this.apiUrl, { headers });
  }
}
