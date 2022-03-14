import { SaveVehicle, Vehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly vehiclesEndpoint = '/api/vehicles';
  private readonly serverUrl = 'https://localhost:7052';

  constructor(private http: HttpClient) { }


  getMakes() {
    return this.http.get('/api/makes')
  }

  getFeatures() {
    return this.http.get('/api/features')
  }
  
  create(vehicle: any) {
    return this.http.post(this.vehiclesEndpoint, vehicle)
  }

  getVehicle(id: any) {
    return this.http.get(this.serverUrl + this.vehiclesEndpoint + '/' + id);
  }

  getVehicles() {
    return this.http.get(this.vehiclesEndpoint);
  }

  updateVehicle(vehicle: SaveVehicle) {
    return this.http.put(this.serverUrl + this.vehiclesEndpoint +'/' + vehicle.id, vehicle)
  }

  deleteVehicle(id: any) {
    return this.http.delete(this.serverUrl + this.vehiclesEndpoint + '/' + id);
  }
}



