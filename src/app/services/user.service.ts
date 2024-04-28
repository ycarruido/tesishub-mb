import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentReference, Firestore, collection, collectionData, doc, docData, CollectionReference, getDocs, orderBy, query, setDoc, updateDoc, where  } from '@angular/fire/firestore';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  userRef: CollectionReference<UserModel>;
  
  constructor() { 
    this.userRef = collection(this.firestore, 'users');
  }

  getUserType(usrT: string): Observable<UserModel[]> {
    const activeUsers = query(this.userRef, where('state', '==', 'Activo'), where('status', '==', true), where('user_type', '==', usrT), orderBy('id', 'asc'));
    return collectionData(activeUsers, { idField: 'uid' }) as Observable<UserModel[]>;
  }

  
}
