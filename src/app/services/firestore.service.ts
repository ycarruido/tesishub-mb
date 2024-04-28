import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, collection, collectionData, doc, docData, CollectionReference, getDocs, orderBy, query, setDoc, updateDoc, where  } from '@angular/fire/firestore';

import { Observable, map } from 'rxjs';
import { CountryModel } from '../models/country.model';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  countryRef: CollectionReference<CountryModel>;
  cityRef: CollectionReference<CityModel>;

  constructor() { 
    this.countryRef = collection(this.firestore, 'countries');
    this.cityRef = collection(this.firestore, 'citys');
  }

  getDataCollection(namedb:string){
    const userProfileCollection = collection(this.firestore, namedb);
    return collectionData(userProfileCollection) as Observable<any>;
  }

  //obtiene un documento de una caleccion por su Id, <T> se refiere al modelo de la db
  getData<T>(collectionName: string, docId: string): Observable<T> {
    const userDocRef: DocumentReference = doc(this.firestore, collectionName, docId);
    return docData(userDocRef).pipe(
      map(data => data as T) // Return the retrieved data
    );
  }

  getCountry(): Observable<CountryModel[]> {
    const activeCountries = query(this.countryRef, where('status', '==', true), orderBy('countryName', 'asc'));
    return collectionData(activeCountries, { idField: 'uid' }) as Observable<CountryModel[]>;
  }
  
  getCity(): Observable<CityModel[]> {
    const activeCities = query(this.cityRef, where('status', '==', true), orderBy('cityName', 'asc'));
    return collectionData(activeCities, { idField: 'uid' }) as Observable<CityModel[]>;
  }


  // getAll(): AngularFirestoreCollection<ProjectModel> {
  //   //return this.db.collection<ProjectModel>('projects', ref => ref.orderBy('project_id', 'asc'));
  //   return this.db.collection<ProjectModel>('projects', ref => ref.where('state', '==', 'Activo').where('status', '==', true).orderBy('project_id', 'asc'));
  // }

}
