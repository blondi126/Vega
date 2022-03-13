import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }


  getMakes() {
    return this.http.get('/api/makes')
  }

  getFeatures() {
    return this.http.get('/api/features')
  }

  create(vehicle:any) {
    return this.http.post('/api/vehicles',vehicle)
  }

  getVehicle(id:any){
    return this.http.get('https://localhost:7052/api/vehicles/'+id);
  }
}



