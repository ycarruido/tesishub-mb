import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonPopover, IonModal, IonDatetimeButton, IonDatetime, IonSelectOption, IonSelect, IonInput, IonAlert, IonFabList, IonFab, IonFabButton, IonText, IonTextarea, IonNote, IonLabel, IonList, IonItem, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentAttachOutline, chatboxEllipsesOutline, addOutline, add, addCircle, chevronDownCircle, trashOutline, createOutline, chevronBackCircle, colorPalette, globe, document, chevronForwardCircle, logOut, chevronForward, chevronBackOutline} from 'ionicons/icons';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ProjectService } from 'src/app/services/project.service';
import { map } from 'rxjs/operators';
import { ProjectModel } from 'src/app/models/project.model';
import { CityModel } from 'src/app/models/city.model';
import { CountryModel } from 'src/app/models/country.model';
import { Timestamp } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
  standalone: true,
  imports: [ IonPopover, IonModal, IonDatetimeButton, IonDatetime, IonSelectOption, IonSelect, IonInput, IonAlert, IonFabList, IonFab, IonFabButton,IonText, IonTextarea, IonNote, IonLabel, IonList, IonItem, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle]
})

export class ProjectPage implements OnInit {
  projectForm: FormGroup;

  router = inject(Router);
  loginService = inject(LoginService);
  FSservices = inject(FirestoreService);
  projectService = inject(ProjectService);
  UserService = inject(UserService);

  project: ProjectModel = new ProjectModel();
  pdet: ProjectModel= new ProjectModel();
  displayList: boolean = false;
  displayView: boolean = false;
  displayform: boolean = false;
  displayFab: boolean = false;
  currentDate: Date = new Date();
  currentUemail: string = ''; 
  currentUuid: string = '';

  CityDet: CityModel[]=[];
  CountryDet: CountryModel[]=[];
  clientDet: UserModel[]=[];
  tutorDet: UserModel[]=[];
  
  //listar
  projects?: ProjectModel[];

  constructor(private fb: FormBuilder) { 
    addIcons({
      documentAttachOutline, chatboxEllipsesOutline, addOutline, add, addCircle, chevronDownCircle, trashOutline, createOutline, chevronBackCircle, colorPalette, globe, document, chevronForwardCircle, logOut, chevronForward, chevronBackOutline
    });

    this.projectForm = this.fb.group({
      'client_name': ['', [Validators.required, Validators.minLength(5)]],
      'client_email': ['', [Validators.required, Validators.email]],
      'client_whatsapp': ['', [Validators.required, Validators.minLength(10)]],
      'pais': ['', [Validators.required, Validators.minLength(2)]],
      'ciudad': ['', [Validators.required, Validators.minLength(2)]],
      'tutor_name': ['', [Validators.required, Validators.minLength(3)]],
      'titulo': ['', [Validators.required, Validators.minLength(5)]],
      'descripcion': ['', [Validators.required, Validators.min(10)]],
      'bibliografia': ['', [Validators.required, Validators.minLength(2)]],
      'carrera': ['', [Validators.required, Validators.minLength(2)]],
      'especialidad': ['', [Validators.required, Validators.minLength(2)]],
      'tema': ['', [Validators.required, Validators.minLength(5)]],
      'universidad': ['', [Validators.required, Validators.minLength(2)]],
      'tipofuente': ['', [Validators.required, Validators.minLength(1)]],
      'tamanofuente': ['', [Validators.required, Validators.min(1)]],
      'interlineado': ['', [Validators.required, Validators.min(1)]],
      'numero_paginas': ['', [Validators.required, Validators.min(1)]],
      'entregas': ['', [Validators.required, Validators.min(1)]],
      'fecha_inicio': ['', [Validators.required]],
      'fecha_entrega1': ['', []],
      'fecha_entrega2': ['', []],
      'fecha_entrega3': ['', []],
      'fecha_entrega4': ['', []]
    });


    this.loginService.checkAuthState.subscribe(res=>{
      if (res){
        this.getUserData(res.uid)
        this.currentUuid = res.uid;
        if (res.email){
          this.currentUemail = res.email;
        }
      }
    })

    this.FSservices.getCountry().subscribe(res =>{
      if (res){
        this.CountryDet = res;
      }
    })

    this.FSservices.getCity().subscribe(res =>{
      if (res){
        this.CityDet = res;
      }
    })

    //llenamos usersList Clientes
    this.UserService.getUserType("Cliente").subscribe((data: UserModel[]) => {
          this.clientDet = data;
    });
       
    //llenamos usersList Profesor
    this.UserService.getUserType("Profesor").subscribe((data: UserModel[]) => {
      this.tutorDet = data;
});

  }

  ngOnInit() {

  }

  getUserData(uid:string){
    const path ="users";
    const id = uid;
  
    this.FSservices.getData<UserModel>(path,id).subscribe(res=>{
      if (res){
        if (res.user_type){
          const userType = res.user_type;
          const userUid = res.uid;
  
          this.retrieveProjects(userType, userUid);
        }
      }
    })
  }

  retrieveProjects(tipoUsuario?: any, uid?: any): void {
    this.projectService.getAllProjectsbyUser(tipoUsuario, uid).subscribe(projects => {
      this.projects = projects; // Asignar los proyectos a la variable
      this.displayList = true;
    });
  }

  viewProject(projectDet: ProjectModel, projectUid?:string){
    this.pdet = projectDet;
    this.displayList = false;
    this.displayform = false
    this.displayView = true;
    this.displayFab = true;
  }

  showEditform(){
    this.displayList = false;
    this.displayform = true
    this.displayView = false;
    this.displayFab = true;
    this.setForm();
  }

  editform(){
      this.pdet = { ...this.pdet, ...this.projectForm.value }; // Fusiona valores del formulario en pdet
      
      if (this.pdet.fecha_inicio){
        this.pdet.fecha_inicio = new Date(this.pdet.fecha_inicio);
      }
      if (this.pdet.fecha_entrega1){
        this.pdet.fecha_entrega1 = new Date(this.pdet.fecha_entrega1);
      }
      if (this.pdet.fecha_entrega2){
        this.pdet.fecha_entrega2 = new Date(this.pdet.fecha_entrega2);
      }
      if (this.pdet.fecha_entrega3){
        this.pdet.fecha_entrega3 = new Date(this.pdet.fecha_entrega3);
      }
      if (this.pdet.fecha_entrega4){
        this.pdet.fecha_entrega4 = new Date(this.pdet.fecha_entrega4);
      }
      
      this.projectService.updateProject(this.pdet);
      this.displayList = true;
      this.displayform = false
      this.displayView = false;
      this.displayFab = false;
  }

  setForm(){
    this.projectForm.setValue({
      client_name: this.pdet.client_name || '',
      client_email: this.pdet.client_email || '',
      client_whatsapp: this.pdet.client_whatsapp || '',
      pais: this.pdet.pais,
      ciudad: this.pdet.ciudad || '',
      tutor_name: this.pdet.tutor_name || '',
      titulo: this.pdet.titulo,
      descripcion: this.pdet.descripcion || '',
      bibliografia: this.pdet.bibliografia || '',
      carrera: this.pdet.carrera || '',
      especialidad: this.pdet.especialidad || '',
      tema: this.pdet.tema || '',
      universidad: this.pdet.universidad || '',
      tipofuente: this.pdet.tipofuente || '',
      tamanofuente: this.pdet.tamanofuente || '',
      interlineado: this.pdet.interlineado || '',
      numero_paginas: this.pdet.numero_paginas || '',
      entregas: this.pdet.entregas || '',
      fecha_inicio:   this.timestamptoDateISOString(this.pdet.fecha_inicio) || '',
      fecha_entrega1: this.pdet.fecha_entrega1 !== undefined && this.pdet.fecha_entrega1 !== null ? this.timestamptoDateISOString(this.pdet.fecha_entrega1) : null,
      fecha_entrega2: this.pdet.fecha_entrega2 !== undefined && this.pdet.fecha_entrega2 !== null ? this.timestamptoDateISOString(this.pdet.fecha_entrega2) : null,
      fecha_entrega3: this.pdet.fecha_entrega3 !== undefined && this.pdet.fecha_entrega3 !== null ? this.timestamptoDateISOString(this.pdet.fecha_entrega3) : null,
      fecha_entrega4: this.pdet.fecha_entrega4 !== undefined && this.pdet.fecha_entrega4 !== null ? this.timestamptoDateISOString(this.pdet.fecha_entrega4) : null
    });
  }

  // timestamptoDateISOString(ts:any):string{
  //   if (ts) {
  //     const date = ts.toDate(); // Convierte el Timestamp a un objeto Date
  //     return date.toISOString(); // Asigna la fecha al campo fechaInicio en formato ISO
  //   }
  //   return "";
  // }

  timestamptoDateISOString(ts: any): string {
    try {
      if (ts) {
        const date = ts.toDate();
        return date.toISOString();
      } else {
        return ''; // Return empty string if ts is null
      }
    } catch (error) {
      console.error('Error converting Timestamp to ISO string:', error);
      return ''; // Return empty string on error
    }
  }

  formatFecha(dateObj: any, opc?:string): string {
    //si es  un objeto de fecha de Firebase Firestore
    if (dateObj && typeof dateObj.toDate === "function") {
      const date = dateObj.toDate();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } else if (dateObj instanceof Date) {
      let day = dateObj.getDate();
      let month = dateObj.getMonth() + 1;
      let year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return ""; 
  }

  isoDateToTimestamp(isotetring:any){
    const dateString = isotetring;

    if (!dateString) {
      throw new Error('Invalid date string: ' + dateString);
    }

    try {
      const FechaDate = new Date(dateString);
      return Timestamp.fromDate(FechaDate);
    } catch (e) {
      throw new Error('No se puede convertir el valor FechaDate string a Timestamp: ' + e);
    }
  }
  
  goBack(){
    if (this.displayform){
      this.displayform = false;
      this.displayView = true;
      this.displayFab = true;
      this.displayList = false;
    }else if(this.displayView){
      this.displayList = true;
      this.displayform = false
      this.displayView = false;
      this.displayFab = false;
      this.projectForm.reset();
      this.pdet = new ProjectModel();
    }
  }

  cerrarSession(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  // Alert
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'alert-button-cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Eliminar',
      role: 'confirm',
      cssClass: 'alert-button-confirm',
      handler: () => {
        console.log('Alert confirmed');
        if (this.pdet.uid){
          this.projectService.delete(this.pdet.uid, this.currentUemail,this.currentDate);
          this.displayView = false;
          this.displayList = true;
        }
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  sendSms(){
    if (this.pdet.client_id && this.pdet.tutor_id) {
      let auxcurrentUser;
      let auxreceiveUser;

      if (this.currentUuid == this.pdet.client_id) {
        auxcurrentUser = this.pdet.client_id;
        auxreceiveUser = this.pdet.tutor_id;
      }

      if (this.currentUuid == this.pdet.tutor_id) {
        auxcurrentUser = this.pdet.tutor_id;
        auxreceiveUser = this.pdet.client_id;
      }

// console.log(auxcurrentUser);
// console.log(auxreceiveUser);

      const params = {
        uidCurrentUser: auxcurrentUser,
        uidReceiveUser: auxreceiveUser,
        id: this.pdet.project_id,
        uidProject: this.pdet.uid,
        title: this.pdet.titulo,
      };

      this.router.navigate(["/chat"], { queryParams: params });
    } else {
      console.log("El proyecto no se ha asignado a ningun tutor");
    }
  }

  callStorage(){
    const params = {
      createBy: this.currentUuid,
      createByEmail: this.currentUemail,
      clientId: this.pdet.client_id,
      clientName: this.pdet.client_name,
      tutorId: this.pdet.tutor_id,
      tutorName: this.pdet.tutor_name,
      id: this.pdet.project_id,
      uidProject: this.pdet.uid,
      title: this.pdet.titulo,
    };

    this.router.navigate(["/document-upload"], { queryParams: params });
  }


}
