import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonImg, IonContent, IonItem, IonInput, IonIcon, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, atOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-passwd-reset',
  templateUrl: './passwd-reset.page.html',
  styleUrls: ['./passwd-reset.page.scss'],
  standalone: true,
  imports: [IonImg, IonContent, IonItem, IonInput, IonIcon, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle]
})
export class PasswdResetPage implements OnInit {

  constructor() {
    addIcons({
      personOutline, lockClosedOutline, atOutline
    });
   }

  ngOnInit() {
  }

}
