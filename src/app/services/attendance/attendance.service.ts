import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }

  // get attendance details
  getAttendanceDetails(examNumber: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/attendance/${examNumber}`;
    return lastValueFrom(this.http.get(url));
  }
}
