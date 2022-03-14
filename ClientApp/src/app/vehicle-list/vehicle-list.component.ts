import { Component, OnInit } from '@angular/core';
import { Vehicle, IdNamePair } from './../models/vehicle';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: any[] = [];
  allVehicles: any[] = [];
  makes!: IdNamePair[];
  filter:any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getMakes()
      .subscribe((makes:any)=> this.makes = makes)

    this.vehicleService.getVehicles()
      .subscribe((data:any) => this.vehicles = this.allVehicles = data);
  }

  onFilterChange() {
    var vehicles = this.allVehicles;

    if(this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId)

    if(this.filter.modelId)
      vehicles = vehicles.filter(v => v.model.id == this.filter.modelId)

      this.vehicles = vehicles;
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}
