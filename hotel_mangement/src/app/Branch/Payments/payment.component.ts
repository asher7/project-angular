import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRepository } from 'src/app/Services/DataRepository';
import { Booking } from 'src/app/model/Booking';

@Component({
    selector: 'payment',
    templateUrl: 'payment.component.html',
    styleUrls:['payment.component.css']
})

export class PaymentComponent implements OnInit {
    currentDate = new Date();
    nextDate=new Date()
    fromDate?: string | null;
    toDate?:string|null;
    constructor(private repo:LoginRepository,private router:Router) { }

    ngOnInit() { }

    back()
    {
        this.router.navigateByUrl('/main')
      
    }
    getRoomDetailsByDates()
    {
     console.log("==================")
     this.repo.getBookingsByDate(1,JSON.stringify(this.fromDate),JSON.stringify(this.toDate))
    }
    get bookingByDate():Booking[]
 {
   return this.repo.getBookingsList()
 }
}