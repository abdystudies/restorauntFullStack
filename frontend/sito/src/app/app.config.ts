import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './environment';

export const appConfig: ApplicationConfig = {
  providers: [
    //inizializza firebase con la config in environment PRIMA di tutto
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //ci rende disponibile l'auth di firebase con l'app appena inizializzato
    provideAuth(() => getAuth()),
    //ci rende disponibile firestore il db che vedremo
    provideFirestore(() => getFirestore()),
    
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};