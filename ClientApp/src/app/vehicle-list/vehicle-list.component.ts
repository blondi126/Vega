import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;

  queryResult: any = {};
 // allVehicles: any[] = [];
  makes: any[] = [];
  query:any = {
    pageSize: this.PAGE_SIZE
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

    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe((result:any) => this.queryResult = result);
  }

  onFilterChange() {
    this.query.page = 1;
    this.populateVehicles();

      // Фильтрация на стороне клиента
    // var vehicles = this.allVehicles;
    // if(this.filter.makeId)
    //   vehicles = vehicles.filter(v => v.make.id == this.filter.makeId)
    // if(this.filter.modelId)
    //   vehicles = vehicles.filter(v => v.model.id == this.filter.modelId)
    //   this.vehicles = vehicles;
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
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
