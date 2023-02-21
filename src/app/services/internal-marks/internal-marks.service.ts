import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class InternalMarksService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }


  getMarks(examNumber: any, semester?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/internal-marks/student/${examNumber}`;
    return lastValueFrom(this.http.get(url, {
      params: semester,
    }));
  };

  getSemesterMarks(examNumber: any, semester?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/semester-marks/student/${examNumber}`;
    return lastValueFrom(this.http.get(url, {
      params: semester,
    }));
  }
}