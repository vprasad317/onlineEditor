import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Upload } from 'upload-js';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  baseApiUrl = "https://api.upload.io/v1/files/basic"
  constructor(private http:HttpClient) {}

   upload(file: any): Observable<any> {
    const options = {
      headers: new HttpHeaders()
      .set("Authorization", "Bearer " + "public_FW25atH7CGVPtMfuxAjNjFDGUvSX")
    }
    return this.http.post(this.baseApiUrl, file, options)
  }
}
