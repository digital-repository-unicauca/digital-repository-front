import { Component } from '@angular/core';
import { cilEnvelopeOpen, flagSet } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'digital-repository-front';

  constructor(public iconSet: IconSetService) {
    // iconSet singleton
    iconSet.icons = { cilEnvelopeOpen, ...flagSet };
  }
}
