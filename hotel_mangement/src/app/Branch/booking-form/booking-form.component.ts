import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/model/Booking';
import { Customer } from 'src/app/model/Customer';
import { LoginRepository } from 'src/app/Services/DataRepository';
import { Rent } from 'src/app/model/Rent';
import { RoomType } from 'src/app/model/RoomType';
import { NgForm } from '@angular/forms';
import { RoomDetails } from 'src/app/model/RoomDetails';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  myForm!: FormGroup;
  book:boolean=false;
  roomTypeData:any
  private hideElement: boolean = true;
  booking: Booking = {

    roomDetails:{
      roomNo:0,
      rent:{
        roomRent:0,
        roomType:{
          roomType:''
        }
      }
    },
    customer: {
      customerName: 'raj',
      customerGender: '',
      customerCountry:'India',

      customerPhoneNo:12345,
      customerLocality:'jpt',
      customerState:'TS',
      customerAadharNo:23984729364,
      totalMembers:4,
      purpose:""

    }
  };


roomDetails:RoomDetails= new RoomDetails();
  customer:Customer=new Customer();
  //booking:Booking=new Booking();
  roomType:RoomType=new RoomType();
  rents:Rent=new Rent();
  selectedRoomType:RoomType[]=[]
  @Output("showRoomType") showRoomType: EventEmitter<any> = new EventEmitter();

  phoneNoError:boolean=false
  aadharNoError:boolean=false
  constructor(private repo:LoginRepository,private activeRoute:ActivatedRoute,private route:Router,private http:HttpClient) {

   this. getRoomTypeData()
   }

  ngOnInit(){
    this.myForm = new FormGroup({
      customerName: new FormControl('', Validators.required),
      customerEmail: new FormControl('', [Validators.required, Validators.email]),
      customerPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      // other form fields
    });
  }
  validatePhoneNo() {
    const phoneNumber = this.booking?.customer?.customerPhoneNo;
    if (!phoneNumber || (phoneNumber && phoneNumber.toString().length !== 10)) {
      this.phoneNoError = true;
    } else {

      this.phoneNoError = false;

    }
  }
  validateAadhar()
{
  const aadharNumber = this.booking?.customer?.customerAadharNo;
  if (!aadharNumber || (aadharNumber && aadharNumber.toString().length !== 12)) {
      this.aadharNoError = true;
    } else {

      this.aadharNoError = false;

    }
}
  getMinDate() {

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // January is 0
    const year = today.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
  get RoomType():RoomType[]
  {
   return this.repo.getRoomType()
  }

  get Rents():Rent[]{
    return this.repo.getRents()
  }
  goBack(){
    // this.showRoomType.emit();
    this.route.navigateByUrl("/main/branch/home")
  }

  submitDetails(form: NgForm)
  {
    this.book=true
    this.repo.sendDetailsForm(this.booking)
    Swal.fire({
      title: 'Thank You🙏',
      text: 'Room Booked Successfully',
      icon: 'success',
      confirmButtonText: 'OK',
      backdrop: 'static',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
          this.closepop()
      }
    })
  }
  closepop()
  {

    this.route.navigateByUrl("/main/branch/home")
  }
  cancel()
  {
    this.route.navigateByUrl("/main/branch/home")
  }
  resetValues(event:Event)
   {
    event.preventDefault()
      this.booking!.customer!.customerAadharNo=0
      
      this.booking.customer!.customerGender=''
      this.booking.customer!.customerName=''
      this.booking.customer!.customerLocality=''
      this.booking.customer!.customerPhoneNo=0
      this.booking.customer!.customerState=''
      this.booking.customer!.purpose=''
      this.booking.customer!.totalMembers=0
   }
  getRoomTypeData()
   {
    this.roomTypeData=this.repo.getRoomTypeData()
    console.log(this.roomTypeData)
    console.log(this.roomTypeData)
    this.booking.checkInTime=this.roomTypeData.fromDate
    this.booking.checkOutTime=this.roomTypeData.toDate
    this.booking!.roomDetails!.rent!.roomType!.roomType=this.roomTypeData.room
    this.booking!.roomDetails!.roomId=this.roomTypeData.roomdata.roomId
    this.booking!.roomDetails!.roomNo=this.roomTypeData.roomdata.roomNo
    this.booking!.roomDetails!.rent!.roomRent=this.roomTypeData.roomdata.Rent
   }

}
