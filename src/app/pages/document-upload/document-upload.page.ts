import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOut} from 'ionicons/icons';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.page.html',
  styleUrls: ['./document-upload.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle]
})
export class DocumentUploadPage implements OnInit {
  router = inject(Router)
  loginServices = inject(LoginService);
  
  constructor() { 
    addIcons({
      logOut
    });
  }

  ngOnInit() {
  }

  cerrarSession(){
    this.loginServices.logout();
    this.router.navigate(['/login']);
  }

}
