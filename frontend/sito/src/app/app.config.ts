import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environment';
import { provideStorage, getStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {

  providers: [
<<<<<<< HEAD
    provideRouter([]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
=======
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    //inizializza firebase con la config in environment
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //ci rende disponibile l'auth di firebase
    provideAuth(() => getAuth()),
    //ci rende disponibile firestore il db che vedremo
    provideFirestore(() => getFirestore())
>>>>>>> parent of 6abc72d (miglioramento grafica, aggiunta environment.example.ts)
  ]
};