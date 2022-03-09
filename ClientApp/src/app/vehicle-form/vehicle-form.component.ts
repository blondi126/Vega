import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes!: any[];
  models!: any[];
  vehicle: any = {};
  features!: any[];

  constructor(
    private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getMakes().subscribe((makes:any) => 
      this.makes = makes);

    this.vehicleService.getFeatures().subscribe((features:any) =>
      this.features = features);
  }
  onMakeChange() {
    var selectedMake = this.makes.find(m=>m.id == this.vehicle.make)
    this.models = selectedMake ? selectedMake.models : [];
  } 
}
