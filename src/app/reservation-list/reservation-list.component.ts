import { Component,OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservationList1 : Reservation[] = [];

  constructor(private reservationservice : ReservationService){}
  ngOnInit(): void {
this.reservationList1 = this.reservationservice.getReservation();
  }

  deleteReservation(id:string){
    this.reservationservice.delReservation(id);
  }
}
