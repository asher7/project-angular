import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRepository } from 'src/app/Services/DataRepository';
import { Booking } from 'src/app/model/Booking';

@Component({
    selector: 'Customer-Details',
    templateUrl: 'CustomerDetails.component.html',
    styleUrls:['CustomerDetails.component.css']
})

export class CustomerDetailsComponent implements OnInit {
  searchName:string=""
  Available:number=0
  Booked:number=0
  currentDate = new Date();
  nextDate=new Date()
  fromDate?: string | null;
  toDate?:string|null;
    constructor(private router:Router,private repo:LoginRepository,private date:DatePipe) {
      this.fromDate = this.date.transform(this.currentDate, 'yyyy-MM-dd');
      this.nextDate.setDate(this.currentDate.getDate()+1)
      this.toDate=this.date.transform(this.nextDate,'yyyy-MM-dd')
      this.nextDate.setDate(this.currentDate.getDate()+1)

      this.getRoomDetailsByDates()
    }

    ngOnInit() { }

    back()
{
    this.router.navigateByUrl('/main')
   // this.booking.emit();
}
get bookingDetails():Booking[]
{
    console.warn(this.repo.getBookingDetails)
  return this.repo.getBookingDetails();
}
getRoomDetailsByDates()
   {
    console.log("==================")
    this.repo.getBookingsByDate(1,JSON.stringify(this.fromDate),JSON.stringify(this.toDate))
   }


 
  get bookingByDate():Booking[]
   {
     let bookings = this.repo.getBookingsList();
     if (this.searchName.trim()) { // check if searchName variable is not empty
       bookings = bookings.filter(booking => booking.customer?.customerName?.toLowerCase().includes(this.searchName.trim().toLowerCase()));
       // filter the bookings list based on customer name search
     }
     return bookings;
   }
}


