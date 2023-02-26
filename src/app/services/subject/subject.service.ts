import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient,
    private settings: SettingsService,

  ) { }

  // get subject
  getSubjects(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/subject`;
    return lastValueFrom(this.http.get(url));
  }
  // get department subjects
  getDepartmentSubjects(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/departmentSubject`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }
}