import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms'
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{

  constructor(private   formBuilder : FormBuilder,
    private reservationService: ReservationService,
    private rout: Router,
    private activatedRoute : ActivatedRoute ){

  }

  reservationForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      NameInput : ['', Validators.required],
      EmailInput : ['', [Validators.required,Validators.email]],
      CheckInDate : ['', Validators.required],
      CheckOutDate : ['', Validators.required]
    })

    let id=this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      let reservation = this.reservationService.getReservationById(id);

      if(reservation){
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  OnReservationFormSubmit(){
    if(this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value;

      let id=this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.reservationService.updateReservation(id,reservation);
      }else {
        this.reservationService.addReservation(reservation)
      }


      this.rout.navigate(['/list'])
    }
  }

}
