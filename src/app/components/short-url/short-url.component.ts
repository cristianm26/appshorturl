import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from '../../services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;
  constructor(private shorturlService: ShortUrlService) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError= false;
    this.textError=''
  }

  ngOnInit(): void {
  }
  procesarURL() {
    //Validar si la url es vacia
    if (this.nombreUrl === '') {
      this.error('Por Favor ingrese una URL')
      return
    }

    this.urlProcesada = false;
    this.loading = true;
    setTimeout(() => {
      this.obtenerUrlShort()
    }, 2000);

  }
  obtenerUrlShort() {
    this.shorturlService.getUrlShort(this.nombreUrl).subscribe(data => {
      this.loading = false
      this.urlProcesada = true
      this.urlShort = data.link
    }, 
    error=> {
      this.loading=false;
      this.nombreUrl='';
      if (error.error.description === 'The value provider is invalid') {
          this.error('La URL ingresada es invalida')
      }
   
    }
    )
  }
  error(valor: string){
    this.mostrarError= true;
    this.textError= valor
    setTimeout(() => {
      this.mostrarError==false
    }, 40000);
   
  }
}
