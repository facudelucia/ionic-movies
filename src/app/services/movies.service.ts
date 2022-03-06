import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Genre, PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';

const apiKey = environment.apiKey
const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = []

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = url + query
    query += `&api_key=${apiKey}`
    return this.http.get<T>(query)
  }

  getFeature() {
    return this.ejecutarQuery<RespuestaMDB>('/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22')
  }

  getPopulares() {
    this.popularesPage++
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`
    return this.ejecutarQuery<RespuestaMDB>(query)
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`)
  }

  getActoresPelicula(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`)
  }

  buscarPeliculas(texto: string) {
    return this.ejecutarQuery(`/search/movie?query=${texto}`)
  }

  cargarGeneros(): Promise<Genre[]> {
    return new Promise(resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`)
        .subscribe(resp => {
          this.generos = resp['genres']
          resolve(this.generos)
        })
    })
  }

}
