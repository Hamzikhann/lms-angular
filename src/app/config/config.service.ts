import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  ApiBaseURL: string = environment.ApiBaseURL;
  ImgBaseURL: string = environment.ImgBaseURL;
}
