import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map, reduce } from 'rxjs';
import { TraficDataContent } from '../interfaces/traficData';

@Injectable({
  providedIn: 'root'
})
export class TraficDataService {

  apiUrl = 'http://localhost:50000'

  constructor(private http: HttpClient) { }

  // TIPOS DE REQUISIÇÕES HTTP

  // GET - Serve para pegar dados
  // POST - Serve para cadastrar dados
  // PUT - Atualizar dados
  // DELETE - Deletar dados

  getAll(): Observable<TraficDataContent[]> {
    // http.get('nome_da_url_do_server')

    return this.http.get<TraficDataContent[]>(this.apiUrl)
  }

}
