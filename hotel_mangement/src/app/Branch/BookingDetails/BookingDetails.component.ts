import { Component, Output } from '@angular/core';
import { LoginRepository } from '../../Services/DataRepository';
import { Router } from '@angular/router';
import { RoomType } from '../../model/RoomType';
import { EventEmitter } from '@angular/core';
import { Booking } from 'src/app/model/Booking';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'login',
  templateUrl: 'BookingDetails.component.html',
  styleUrls: ['BookingDetails.component.css']
})
export class BookingDetailsComponent {
  public bookingsPerPage = 4;
  public selectedPage = 1;

  Available: number = 0;
  Booked: number = 0;
  currentDate = new Date();
  nextDate = new Date();
  fromDate?: string | null;
  toDate?: string | null;
  @Output("booking") booking: EventEmitter<any> = new EventEmitter<boolean>();
  constructor(private router: Router, private repo: LoginRepository, private http: HttpClient, private date: DatePipe) {
    this.fromDate = this.date.transform(this.currentDate, 'yyyy-MM-dd');
    this.nextDate.setDate(this.currentDate.getDate() + 1)
    this.toDate = this.date.transform(this.nextDate, 'yyyy-MM-dd')
    this.nextDate.setDate(this.currentDate.getDate() + 1)

    this.getRoomDetailsByDates()
  }

  get RoomType(): RoomType[] {
    return this.repo.getRoomType()
  }

  back() {
    this.router.navigateByUrl('/main')
    // this.booking.emit();
  }

  print(bookingId: number | undefined) {
    console.warn(bookingId);
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
    const options = { headers: headers, responseType: 'blob' as 'json' };

    this.http.get(`http://localhost:8080/booking/pdf/customer/${bookingId}`, options).subscribe(
      (data: any) => { // Use 'any' type for data
        const blob = new Blob([data], { type: 'application/pdf' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `booking_${bookingId}.pdf`;
        downloadLink.click();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getRoomDetailsByDates()
  {
   console.log("==================")
   this.repo.getBookingsByDate(1,JSON.stringify(this.fromDate),JSON.stringify(this.toDate))
  }

  get bookingByDate(): Booking[] {
    return this.repo.getBookingsList();
  }

  setPage(pageNumber: number) {
    this.selectedPage = pageNumber;
    this.getRoomDetailsByDates();
  }
  
  get totalPages(): number {
    const totalBookings = this.Available + this.Booked;
    return Math.ceil(totalBookings / this.bookingsPerPage);
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
