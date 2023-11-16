import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { BooksResult, Item } from '../Models/Interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  //https://www.googleapis.com/books/v1/volumes?q=search+terms

  private readonly apiURL = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  Buscar(valor: string): Observable<BooksResult> {
    const params = new HttpParams().append('q', valor);
    return this.http.get<BooksResult>(this.apiURL, { params });
  }
}
