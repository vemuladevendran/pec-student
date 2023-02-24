import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }
 // get student by id
 getStudentById(id: string): Promise<any> {
  const url = `${this.settings.API_BASE_URL}/student/${id}`;
  return lastValueFrom(this.http.get(url));
}
}