import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Film } from '../list-films/film.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  public baseUrl:string = "http://localhost:3001";
  public listFilms: Film[] = [];
  public totalPrice: number = 0;
  private _priceHandler: number = 0
  public listSelectdFilms: Film[] = [];

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) { }

  showMessage(msg:string, isError: boolean = false){
    this.snackbar.open(msg, "close",{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition:"top",
      panelClass: isError ? ['sucess'] : ['error']
    })
  }

  getListFilms(): Observable<Film[]>{
    return this.httpClient.get<Film[]>(this.baseUrl+'/films')
  }
  getPrice(): number{
    return this._priceHandler;
  }

  setPrice(value: number){
    this._priceHandler = value;
  }

  private _filmHandler!: Film;

  getFilm(): Film{
    return this._filmHandler;
  }

  setFilm(value: Film){
    this._filmHandler = value;
  }

  selectFilm(){
    setTimeout(() => {
      this.totalPrice += this.getPrice();
      this.listSelectdFilms.push(this.getFilm())
    }, 1);
  }

  unselectFilm(){
    this.totalPrice -= this.getPrice();
    if(this.totalPrice < 0){
      this.totalPrice = 0;
    }
    let index = this.listSelectdFilms.indexOf(this.getFilm());
    if(index > -1 || index === this.listSelectdFilms.indexOf(this.getFilm())){
      this.listSelectdFilms.splice(index, 1);
    }
  }
}
