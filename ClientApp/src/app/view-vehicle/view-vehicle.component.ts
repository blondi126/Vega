import { PhotoService } from './../services/photo.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef ;
  vehicle: any;
  vehicleId: number = 0;
  photos!: any[];
  progress: number = 0;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastrService,
    private photoService: PhotoService,
    private vehicleService: VehicleService)
    {
      route.params.subscribe(p => {
        this.vehicleId = +p['id'];
        if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
          router.navigate(['/vehicles']);
          return; 
        }
      });
    }

  ngOnInit(): void {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe((photos:any) => {
        this.photos = photos});

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.deleteVehicle(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;

    this.photoService.upload(this.vehicleId, nativeElement.files![0])
    .subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total! * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.photos.push(event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
          break;
          default:
            console.log(event);
      }
    }
      );
  }
}
