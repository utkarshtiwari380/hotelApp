import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationList : Reservation[] = [];

  constructor(){
    let savedReservations = localStorage.getItem("reservations");
    this.reservationList = savedReservations? JSON.parse(savedReservations) : [];
  }

  getReservation() : Reservation[] {
    return this.reservationList;
  }

  getReservationById(id: string) : Reservation | undefined {
    return this.reservationList.find(res => res.id === id);
  }
  addReservation(res: Reservation): void {
    res.id = Date.now().toString();
    this.reservationList.push(res);
    localStorage.setItem("reservations", JSON.stringify(this.reservationList));
  }

  delReservation(id: string): void {
    const index = this.reservationList.findIndex(res => res.id === id);
    this.reservationList.splice(index,1);
    localStorage.setItem("reservations", JSON.stringify(this.reservationList));
  }

  updateReservation(id:string,updateres: Reservation):void {
    updateres.id=id;

    let index = this.reservationList.findIndex(res=> res.id === id);
    this.reservationList[index] = updateres;
    localStorage.setItem("reservations", JSON.stringify(this.reservationList));
  }
}
