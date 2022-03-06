import { Component } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  peliculas: PeliculaDetalle[] = []
  generos: Genre[] = []
  favoritoGenero: any[] = []
  constructor(private storageService: StorageService, private moviesService: MoviesService) { }

  async ionViewWillEnter() {
    this.peliculas = await this.storageService.cargarFavoritos()
    this.generos = await this.moviesService.cargarGeneros()

    this.pelisPorGenero(this.generos, this.peliculas)
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = []
    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres.find(genre => genre.id === genero.id)
        })
      })
    })
  }

}
