import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = []
  populares: Pelicula[] = []

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.moviesService.getFeature()
      .subscribe(resp => {
        this.peliculasRecientes = resp.results
      })
    this.getPopulares()

  }

  cargarMas() {
    this.getPopulares()
  }

  getPopulares() {
    this.moviesService.getPopulares()
      .subscribe(resp => {
        const arrTemp = [...this.populares, ...resp.results]
        this.populares = arrTemp
      })
  }

}
