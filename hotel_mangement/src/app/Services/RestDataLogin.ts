import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Login } from "../model/login";
import { Rent } from "../model/Rent";
import { RoomType } from "../model/RoomType";
import { RoomDetails } from "../model/RoomDetails";
import { Booking } from "../model/Booking";
import { error } from "console";
@Injectable()
export class RestDataSource {
 dayReport:any

  constructor(private http: HttpClient) {

  }

  getDetails(): Observable<Login[]> {
    return this.http.get<Login[]>("http://localhost:8080/branchlogin/getall");
  }

 verify(username:any, password:any): Observable<String>{
    console.log("hi")
    return this.http.get<String>(`http://localhost:8080/branchlogin/verify/${username}/${password}`);
  }

  getRoomType():Observable<RoomType[]>
  {
    return this.http.get<RoomType[]>(`http://localhost:8080/roomtype/getall`);
  }

  getRent():Observable<Rent[]>
  {
    return this.http.get<Rent[]>(`http://localhost:8080/rent/getall`);
  }

  getRoomsStatus(branchId:number,checkIn:string,checkOut:string):Observable<Map<string,Map<string,number>>>{
    return this.http.get<Map<string,Map<string,number>>>(`http://localhost:8080/roomdetails/${branchId}/${checkIn}/${checkOut}`)
  }

  getAvailableRooms(branchId:number,checkIn:string,checkOut:string):Observable<Map<String, RoomDetails[]>>{
    console.log()
    return this.http.get<Map<String, RoomDetails[]>>(`http://localhost:8080/roomdetails/findavailablerooms/${branchId}/${checkIn}/${checkOut}`)
  }

    sendDetails(booking:Booking):Observable<Booking>
  {
    return this.http.post<Booking>(`http://localhost:8080/booking/save`,booking)
  }

  getBookingDetails():Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`http://localhost:8080/booking/getall`)
  }
  pdfView(bookingId:number |undefined):Observable<any>
  {
    console.warn(bookingId,"method calling")
   return this.http.get<any[]>(`http://localhost:8080/booking/pdf/customer/${bookingId}`)
  }

//Reporting Api's

getReportsDaily():Observable<Map<Date,number>>
{
  return this.http.get<Map<Date,number>>(`http://localhost:8080/reporting/daily`)
}
getReportsMonthly():Observable<any>
{
  return this.http.get<any>(`http://localhost:8080/reporting/monthly`)
}
getReportsYearly():Observable<any>
{
  return this.http.get<any>(`http://localhost:8080/reporting/yearly`)
}

getBookingByDate(branchId:number,checkIn:string,checkOut:string):Observable<Booking[]>
{
  return this.http.get<Booking[]>(`http://localhost:8080/booking/${branchId}/${checkIn}/${checkOut}`)
}

}
