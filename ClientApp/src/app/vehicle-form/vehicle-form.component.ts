import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes!: any;
  models!: any[];
  vehicle: any = {
    features: [],
    contact: {}
  };
  features!: any;

  constructor(
    private vehicleService: VehicleService,
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

      if (this.vehicle.id)
        this.vehicle = data[2];
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/']);
    });
  }
  onMakeChange() {
    var selectedMake = this.makes.find((m: any) => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
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
    this.vehicleService.create(this.vehicle)
      .subscribe(
        x => console.log(x));
  }

}
