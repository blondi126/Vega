import { PhotoService } from './../services/photo.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';

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
        console.log(photos);
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
      .subscribe(photo => {
        console.log(photo);
        this.photos.push(photo);
      });
  }
}
