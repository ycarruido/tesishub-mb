import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, doc, Firestore, getDocs, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ProjectModel } from '../models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private dbPath = 'projects';
  private afs: Firestore = inject(Firestore); // inject Cloud Firestore
  projectsRef: CollectionReference<ProjectModel>; //Variable que hace referencia a una colección de documentos del tipo  ProjectModel

  constructor() {
    this.projectsRef = collection(this.afs, this.dbPath); //referencia a la data base en firetore
  }

  getAllActive(): Observable<ProjectModel[]> {
    const activeProjects = query(this.projectsRef, where('state', '==', 'Activo'), where('status', '==', true), orderBy('project_id', 'desc'));
    return collectionData(activeProjects, { idField: 'uid' }) as Observable<ProjectModel[]>;
  }

  getAllClient(uid?: any): Observable<ProjectModel[]> {
    const clientProjects = query(this.projectsRef, where('state', '==', 'Activo'), where('client_id', '==', uid), where('status', '==', true), orderBy('project_id', 'asc'));
    return collectionData(clientProjects, { idField: 'uid' }) as Observable<ProjectModel[]>;
  }

  getAllTutor(uid?: any): Observable<ProjectModel[]> {
    const tutorProjects = query(this.projectsRef, where('state', '==', 'Activo'), where('tutor_id', '==', uid), where('status', '==', true), orderBy('project_id', 'asc'));
    return collectionData(tutorProjects, { idField: 'uid' }) as Observable<ProjectModel[]>;
  }

  getAllProjectsbyUser(userType: string, uid?: any): Observable<ProjectModel[]> {
    let projectQuery: any;
  
    if (userType === 'Admin' || userType === 'Asistente') {
      // Retrieve all active projects for Admin and Asistente users
      projectQuery = query(this.projectsRef, where('state', '==', 'Activo'), where('status', '==', true), orderBy('project_id', 'desc'));
    } else if (userType === 'Cliente') {
      // Retrieve active projects for the specified client
      if (!uid) {
        throw new Error('Client ID (uid) is required for Cliente user type');
      }
      projectQuery = query(this.projectsRef, where('state', '==', 'Activo'), where('client_id', '==', uid), where('status', '==', true), orderBy('project_id', 'asc'));
    } else if (userType === 'Profesor') {
      // Retrieve active projects for the specified professor
      if (!uid) {
        throw new Error('Professor ID (uid) is required for Profesor user type');
      }
      projectQuery = query(this.projectsRef, where('state', '==', 'Activo'), where('tutor_id', '==', uid), where('status', '==', true), orderBy('project_id', 'asc'));
    } else {
      // Handle invalid user types (optional)
      throw new Error('Invalid user type provided. Must be Admin, Asistente, Cliente, or Profesor');
    }
  
    return collectionData(projectQuery, { idField: 'uid' }) as Observable<ProjectModel[]>;
  }

  async getNextId(): Promise<number> {
    const snapshot = await getDocs(collection(this.afs, 'projects'));
    return snapshot.size;
  }

  async create(project: ProjectModel, leadUID?: any): Promise<void> {
    const newId = await this.getNextId();
    project.project_id = "THUBVE" + newId;

    let projectUID: string;
    if (leadUID) {
      projectUID = leadUID;
    } else {
      projectUID = doc(collection(this.afs, 'projects')).id;
    }

    project.uid = projectUID;

    const projectData = {
      ...project, // Include all properties from project
    };

    await setDoc(doc(this.afs, 'projects', projectUID), projectData);
  }

  update(project: ProjectModel): Promise<void> {
    const projectData = { ...project };
    const projectRef = doc(this.projectsRef, project.uid);

    return updateDoc(projectRef, projectData);
  }

  updateProject(project: ProjectModel) {
    const projectData = { ...project };
    const projectRef = doc(this.projectsRef, project.uid); // Get document reference
    updateDoc(projectRef, projectData) // Update the document with project data
      .then(() => {
        console.log('Project updated successfully!');
        // Handle successful update (e.g., show a success message)
      })
      .catch(error => {
        console.error('Error updating project:', error);
        // Handle update error (e.g., show an error message)
      });
  }

  // async function update(project: ProjectModel): Promise<void> {
  //   const projectRef = doc(this.projectsRef, project.uid);
  
  //   try {
  //     await updateDoc(projectRef, project);
  //     console.log('Proyecto actualizado correctamente');
  //   } catch (error) {
  //     console.error('Error al actualizar el proyecto:', error);
  //   }
  // }

  delete(id: string, usr: string, fecha: Date): Promise<void> {
    const projectRef = doc(this.afs, this.dbPath, id);
    return updateDoc(projectRef, { state: 'Eliminado', status: false, lastUpdate: fecha, lastUpdateUser: usr });
  }
}
