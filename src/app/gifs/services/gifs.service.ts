import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerahGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '8H4PNnu3sOO76ctL2aMpQyZJnCqMEjiN';
  private _historial: string [] = [];

  public resultados: Gif[] = [];

  get historial() {
    // this._historial = this._historial.splice(0,10);
    return [...this._historial];
  }

  constructor( private http:HttpClient ) {}

  buscarGifs( query: string = '' ) {
    
    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query ) ){
      
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

    }

    this.http.get<SerahGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=8H4PNnu3sOO76ctL2aMpQyZJnCqMEjiN&q=${ query }&limit=10`)
    .subscribe( ( resp ) => {
      console.log( resp.data );
      this.resultados = resp.data;
    });
  }
}
