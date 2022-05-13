import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth | undefined

  get auth(): Auth{
    return {...this._auth!}
  }

  constructor(private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false)  //of convierte el argumento en un Observable
    }
    return this.http.get<Auth>('http://localhost:3000/usuarios/1')
                    .pipe(
                      map(auth=> {
                        this._auth = auth //recargo la info del usuario
                        return true
                        
                      })
                    )
  }

  login(){
    return this.http.get<Auth>('http://localhost:3000/usuarios/1')
                    .pipe(
                      tap(auth => this._auth = auth ),
                      tap(auth => localStorage.setItem('token', auth.id) )
                    )
  }

  logout(){
    this._auth = undefined
  }
}
