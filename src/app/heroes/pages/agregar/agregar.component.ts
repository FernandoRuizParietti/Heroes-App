import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `img{
      width: 100%;
      border-radius: 5px
    }`
  ]
})
export class AgregarComponent implements OnInit {

  publishers =[
    {
      id: 'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics'
    }
  ]

  heroe: Heroe ={
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){ //pregunto si no estoy en la parte de editar
      return
    }

    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.heroesService.getHeroeById(id))
    )
    .subscribe(heroe => this.heroe = heroe)
  }

  guardar(){

    //minima validacion
    if(this.heroe.superhero.trim().length === 0){
      return
    }

    if(this.heroe.id){
      //actualizar
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe=> this.mostrarSnackbar('Heroe Actualizado'))
    }else{
      //crear
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe=>{
        this.router.navigate(['heroes/editar', heroe.id])
        this.mostrarSnackbar('Heroe Creado')
      })
    }
  }

  borrarHeroe(){

    const dialog = this.dialog.open(ConfirmarComponent,{
      width: '250px',
      data: {...this.heroe}
    })

    dialog.afterClosed().subscribe(
      (res )=> {
        if(res){
              this.heroesService.borrarHeroe(this.heroe.id!)
                .subscribe(resp=>{
                  this.router.navigate(['/heroes'])
                })
                console.log(this.heroe.superhero, 'Ha sido borrado correctamente');
        }
      }
    )
    


  }

  mostrarSnackbar(mensaje: string){
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500 
    });
  }
}
