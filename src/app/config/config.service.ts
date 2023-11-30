import { Injectable } from '@angular/core';
import { Toolbar } from 'ngx-editor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  ApiBaseURL: string = environment.ApiBaseURL;
  ImgBaseURL: string = environment.ImgBaseURL;
  VideoBaseURL: string = environment.VideoBaseURL;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
}
