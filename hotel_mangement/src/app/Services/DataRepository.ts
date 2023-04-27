import { Injectable } from "@angular/core";
import { RestDataSource } from "./RestDataLogin";
import { Login } from "../model/login";
import { Router } from "@angular/router";
import { Branch } from "../model/Branch";
import { Rent } from "../model/Rent";
import { RoomType } from "../model/RoomType";
import { RoomDetails } from "../model/RoomDetails";
import { Customer } from "../model/Customer";
import { Booking } from "../model/Booking";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoginRepository{
login:Login[]=[]
roomType:RoomType[]=[]
rents:Rent[]=[]
rentId:any=0
RoomTypeId:any=0
rentByRoomType:Rent[]=[]
booking:Booking[]=[]
availableRooms!:Map<String, RoomDetails[]>
roomTypeData:any
bookingDetails:Booking[]=[]
bookingByDate:Booking[]=[]
private myObservableVariable = new BehaviorSubject<Map<string,Map<string,number>>>(new Map());
public roomStatus!:Map<string,Map<string,number>>
    constructor(private dataSource: RestDataSource, private router:Router){
      this.dataSource.getRoomType().subscribe(p => this.roomType = p)
      this.dataSource.getDetails().subscribe(e=> this.login=e)
      this.dataSource.getRent().subscribe(rent=>this.rents=rent)
      this.dataSource.getBookingDetails().subscribe(details=>this.bookingDetails=details)
    }
    getRoomsStatus(branchId:number,checkIn:string,checkOut:string){
      this.dataSource.getRoomsStatus(branchId,checkIn,checkOut).subscribe(data=>{
        this.roomStatus=data
        // this.myObservableVariable.next(data)
        console.log("subscribing")
        console.log(this.roomStatus)
      })
  }

  //Get bookings by Date
getBookingsByDate(branchId:number,checkIn:string,checkOut:string):Booking[]
{
  this.dataSource.getBookingByDate(branchId,checkIn,checkOut).subscribe(

    value=>{this.bookingByDate=value})
  return this.bookingByDate;
}

getBookingsList():Booking[]
{
  return this.bookingByDate;
}
//Get bookings by Date ended
  getBookingDetails():Booking[]
      {

        return this.bookingDetails
      }
      getBookingDetailsOne(bookingId:any):Booking|undefined
      {

        return this.bookingDetails.find(p => p.bookingId == bookingId);
      }
  getRoomStatusCount():Map<string,Map<string,number>>{
    console.log("sending to front page")
    return this.roomStatus
  }
  getRoomStatusCounts(){
    console.log(this.myObservableVariable)
    return this.myObservableVariable.asObservable()
  }

  getAvailableRooms(branchId:number,checkIn:string,checkOut:string):Map<String, RoomDetails[]>
{
  this.dataSource.getAvailableRooms(branchId,checkIn,checkOut).subscribe(

    value=>{this.availableRooms=value})
  return this.availableRooms;
}

getRooms():Map<String, RoomDetails[]>
{
  return this.availableRooms
}
    sendDetails(rentId:number |undefined,roomtypeId:number | undefined){
      console.log("send")
      this.RoomTypeId=roomtypeId;
      this.rentId=rentId

}
bookRoom(data:any)
    {
      this.roomTypeData=data
    }
    getRoomTypeData()
    {
      return this.roomTypeData
    }


sendDetailsForm(booking:Booking)
{
  this.dataSource.sendDetails(booking).subscribe(
    e=>{
      this.booking.push(e)
      // this.getRoomsStatus(30,JSON.stringify(booking.checkInTime),JSON.stringify(booking.checkOutTime))
    }
    );
   console.log(booking);

}
updateDetailsForm(booking:Booking)
{
  this.dataSource.sendDetails(booking).subscribe(
    e=>{
      this.router.navigateByUrl("/main/branch/bookingdetails")
    }
    );
   console.log(booking);
}
    getRoomTypeOne(roomTypeId:number)
    {
      console.log(roomTypeId)
        return this.roomType.find(e=>e.roomTypeId==roomTypeId)

    }
    getRoomRentOne(rentId:number)
    {
      console.log(rentId)
        return this.rents.find(e=>e.rentId==rentId)

    }

   getRoomType():RoomType[]
   {
      return this.roomType
   }

   getRents():Rent[]
   {
      return this.rents
   }






verify(username: any, password: any) {
      // Make sure email and password are not undefined
      if (username && password) {
        this.dataSource.verify(username, password).subscribe(response => {
          // Handle the response as string
          if (response== "Data Matched") {
            this.router.navigateByUrl("/main");
          } else {
            // Handle the error case
            this.showError("Invalid email or password");
          }
        }, error => {
          // Handle any error that occurs during the API call
          this.showError("API Error: " + error);
        });
      } else {
        // Handle the case where email or password is undefined
        this.showError("Email or password is undefined");
      }
    }

    showError(errorMsg: string) {
      // Display the error message on the page (you can customize this part based on your application's UI)
      alert(errorMsg);
    }



          }




