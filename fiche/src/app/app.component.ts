import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QRCodeComponent } from './qrcode/qrcode.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QRCodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fiche';
myAngularxQrCode: any;
}
