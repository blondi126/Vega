import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PhotoService {
    private readonly serverUrl = 'https://localhost:7052';
    constructor(private http: HttpClient) { }
    

    upload(vehicleId:any, photo:any) {
        var formData = new FormData();
        formData.append('file', photo)
        return this.http.post(`${this.serverUrl}/api/vehicles/${vehicleId}/photos`, formData)
    }

    getPhotos(vehicleId:any) {
        return this.http.get(`${this.serverUrl}/api/vehicles/${vehicleId}/photos`);
    }
}