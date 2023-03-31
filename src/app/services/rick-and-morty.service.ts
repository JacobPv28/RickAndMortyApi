import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  httpOptions: any;
  api_url = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getAllCharacters(page: number = 1) {
    // Page parameter to request character pages. Docs indicates 20 chars per page.
    return new Promise((resolve, reject) => {
      this.http
        .get(this.api_url + '/character?page=' + page, this.httpOptions)
        .subscribe(
          (res) => {
            console.log(res);
            resolve(res);
          },
          (err) => {
            console.log(err);
            reject(err);
          }
        );
    });
  }
}
