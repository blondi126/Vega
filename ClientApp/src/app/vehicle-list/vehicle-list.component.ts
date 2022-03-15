import { Component, OnInit } from '@angular/core';
import { IdNamePair } from './../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: any[] = [];
 // allVehicles: any[] = [];
  makes: any[] = [];
  query:any = {
    pageSize: 3
  };
  asc = faSortUp;
  desc = faSortDown;
  columns = [
    {title: 'Id'},
    {title: 'Make', key: 'make', isSortable: true},
    {title: 'Model', key: 'model', isSortable: true},
    {title: 'Contact Name', key: 'contactName', isSortable: true},
    { }
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getMakes()
      .subscribe((makes:any)=> this.makes = makes)

    console.log(this.makes)
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe((data:any) => this.vehicles = data);
  }

  onFilterChange() {
    this.populateVehicles();
    console.log(this.makes)
      // Фильтрация на стороне клиента
    // var vehicles = this.allVehicles;
    // if(this.filter.makeId)
    //   vehicles = vehicles.filter(v => v.make.id == this.filter.makeId)
    // if(this.filter.modelId)
    //   vehicles = vehicles.filter(v => v.model.id == this.filter.modelId)
    //   this.vehicles = vehicles;
  }

  resetFilter() {
    this.query = {};
    this.onFilterChange();
  }

  sortBy(columnName:any) {
    if(this.query.sortBy == columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page:any) {
    this.query.page = page;
    this.populateVehicles();
  }
}
