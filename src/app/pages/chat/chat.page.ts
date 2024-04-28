import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { IonTextarea, IonItem , IonFooter, IonCol, IonRow, IonText, IonList, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { send, timeOutline, logOut, closeCircle, checkmarkDone, lockClosed} from 'ionicons/icons';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, collectionData, doc, CollectionReference, orderBy, query, setDoc, where } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserModel } from 'src/app/models/user.model';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonTextarea, ReactiveFormsModule, IonItem, IonFooter, IonCol, IonRow, IonText, IonList, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle]
})

export class ChatPage implements OnInit, AfterViewInit  {
  @ViewChild('contentElement', { static: false }) content?: IonContent;

  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore

  router = inject(Router)
  loginServices = inject(LoginService);
  FSservices = inject(FirestoreService);
  route = inject(ActivatedRoute);

  chatForm: FormGroup;
  
  id: string ="";
  tituloPrd: string = '';
  chatMessages: any[] = [];
  currentUserEmail: any = '';
  currentUserUid: string;
  receiveUserUid: string;
  newMessage: string = '';
  sendersName:string = 'Usuario';
  sendingMessage: boolean = false;
  uidProy: string ="";
  chatRef: CollectionReference<any>;

  constructor(private fb: FormBuilder) { 
    this.chatRef = collection(this.firestore, 'chats');

    this.chatForm = this.fb.group({
      'newMessage': ['', Validators.required],
    });

    // Obtener los UIDs de los usuarios desde la lista de proyectos o cualquier otra fuente
    this.currentUserUid = 'uid_del_usuario_actual';
    this.receiveUserUid = 'uid_del_otro_usuario';

    addIcons({
      logOut, timeOutline, closeCircle, checkmarkDone, lockClosed, send
    });
  }//constructor

  scrollToBottom() {
    if (this.content) {
      this.content.scrollToBottom(300); // 300 es la duración de la animación en milisegundos
    }
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
    this.currentUserUid = params['uidCurrentUser'];
    this.receiveUserUid = params['uidReceiveUser'];
    this.uidProy = params['uidProject'];
    this.id = params['id'];
    this.tituloPrd = params['title'];
    });

    const messagetxtQuery = query(this.chatRef, 
      where('senderUid', 'in', [this.currentUserUid, this.receiveUserUid]), 
      where('receiverUid', 'in', [this.currentUserUid, this.receiveUserUid]), 
      where('uidProject', '==', this.uidProy), orderBy('timestamp'));

    collectionData(messagetxtQuery, { idField: 'id' }).subscribe((messages: any[]) => { 
      this.chatMessages = messages.map(message => {
        const timestamp = message.timestamp?.toDate();
        const formattedTimestamp = timestamp?.toLocaleString('es-VE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        return { ...message, formattedTimestamp };
      });
      this.scrollToBottom();
    });
  }//ngOnInit

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  sendMessageOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage(); // Tu función para enviar el mensaje
    }
  }

  async sendMessage() {
    this.newMessage = this.chatForm.get('newMessage')?.value;
    this.sendingMessage = true;


    const user = await firstValueFrom(this.loginServices.checkAuthState);
    if (user) {
      this.currentUserEmail = user.email;
      this.getUserData(user.uid);
    }


    // this.loginServices.checkAuthState.subscribe(res=>{
    //   if (res){
    //     this.currentUserEmail = res.email;
    //     this.getUserData(res.uid);
    //   }else{
    //   }
    // })

  }

  getUserData (uid:string){
    const path ="users";
    const id = uid;

    this.FSservices.getData<UserModel>(path,id).subscribe(async (res)=>{
      if (res){
        if (res.name) {
          this.sendersName = res.name + ' ' + res.lastname;
        }

        if (this.newMessage!=='') {
          let chatUID: String = await doc(collection(this.firestore, 'chats')).id;

          const structMessge = {
            senderUid: this.currentUserUid,
            receiverUid: this.receiveUserUid,
            message: this.newMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uidProject: this.uidProy,
            sendersName: this.sendersName,
            status: 'E', // Enviado
            id: chatUID,
            app: 'Mobile app'
          };
  
          await setDoc(doc(this.firestore, 'chats', chatUID.toString()), structMessge).then(() =>{
            this.newMessage = '';
            this.sendingMessage = false;
            this.chatForm.reset();
            console.log('Mensaje enviado')
          }).catch((e) =>{
            console.error('Error al enviar el mensaje: ',e)
          })



          
        }else{
          //mensaje ne blanco
        }
      }
    })
  }

  cerrarSession = () => {
    this.loginServices.logout();
    this.router.navigate(['/login']);
  }

}



