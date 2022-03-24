import { SaveVehicle, Vehicle, IdNamePair } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';




@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly vehiclesEndpoint = '/api/vehicles';
  private readonly serverUrl = 'https://localhost:7052';

  constructor(private http: HttpClient, private authHttp: AuthService) { }


  getMakes() {
    return this.http.get('/api/makes')
  }

  getFeatures() {
    return this.http.get('/api/features')
  }
  
  create(vehicle: any) {
    return this.http.post(this.serverUrl + this.vehiclesEndpoint, vehicle)
  }

  getVehicle(id: any) {
    return this.http.get(this.serverUrl + this.vehiclesEndpoint + '/' + id);
  }

  getVehicles(filter:any) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  toQueryString(obj:any) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }

  updateVehicle(vehicle: SaveVehicle) {
    return this.http.put(this.serverUrl + this.vehiclesEndpoint +'/' + vehicle.id, vehicle)
  }

  deleteVehicle(id: any) {
    return this.http.delete(this.serverUrl + this.vehiclesEndpoint + '/' + id);
  }
}



