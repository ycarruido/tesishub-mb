import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { IonSelect, IonSelectOption, IonLabel, IonInput, IonItem, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOut} from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.page.html',
  styleUrls: ['./document-upload.page.scss'],
  standalone: true,
  imports: [IonSelect, IonSelectOption, IonLabel, IonInput, IonItem, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, ReactiveFormsModule]
})
export class DocumentUploadPage implements OnInit {
  router = inject(Router)
  fb = inject(FormBuilder)
  loginServices = inject(LoginService);
  docForm: FormGroup;

  selectedFile: File | undefined;
  selectedFileName: string | null = "";
  
  constructor() { 
    addIcons({
      logOut
    });

    this.docForm = this.fb.group({
      'title': ['', [Validators.required, Validators.min(4)]],
      'numeroPaginas': ['', []],
      'porcentajeAvance': ['', []],
      'tipoDocumento': ['', [Validators.required, Validators.min(2)]],
      'file': new FormControl(null)
    })
  }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile ? this.selectedFile.name : null;
  }

  cerrarSession(){
    this.loginServices.logout();
    this.router.navigate(['/login']);
  }

}
