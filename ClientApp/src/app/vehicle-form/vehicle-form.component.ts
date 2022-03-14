import { ToastrService } from 'ngx-toastr';
import { SaveVehicle, Vehicle } from './../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import * as _ from 'underscore';
import { any } from 'underscore';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes!: any;
  models!: any[];
  vehicle: SaveVehicle = {
    id: 0,
    modelId: 0,
    makeId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  };
  features!: any;

  constructor(
    private vehicleService: VehicleService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    })
  }

  ngOnInit(): void {

    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {

        this.setVehicle(data[2]);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/']);
    });
  }

  private setVehicle(v: any) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id')
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find((m: any) => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId: any, $event: any) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id)
      this.vehicleService.updateVehicle(this.vehicle)
        .subscribe(x => {
          this.toastrService.success('The vehicle was sucessfully update.', 'Success', {
            closeButton: true,
            timeOut: 5000
          });
        });
    else
      this.vehicleService.create(this.vehicle)
        .subscribe(
          x => console.log(x));
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.deleteVehicle(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/']);
        });
    }
  }
  
}
