import { Component } from '@angular/core';
import { HitdicserviceService} from './hitdicservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'queue-panel';

  constructor(private hitdicService: HitdicserviceService) {

  }
}
