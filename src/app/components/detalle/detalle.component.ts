import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {}
  actores: Cast[] = []
  oculto = 150;
  estrella = 'star-outline';

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }


  constructor(private moviesService: MoviesService, private modalCtrl: ModalController, private storageService: StorageService) { }

  ngOnInit() {

    this.storageService.existePelicula( this.id )
      .then( existe => this.estrella = ( existe ) ? 'star' : 'star-outline' );

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe(resp => {
        this.pelicula = resp
      })

    this.moviesService.getActoresPelicula(this.id)
      .subscribe(resp => {
        this.actores = resp.cast
      })
  }

  regresar() {
    this.modalCtrl.dismiss()
  }

  favorito() {
    const existe = this.storageService.guardarPelicula( this.pelicula );
    this.estrella = ( existe ) ? 'star' : 'star-outline';
  }

}
