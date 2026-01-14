import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerGlobalErrorHandlers } from './app/utils/global-error-handler';

// Register global handlers early to catch uncaught errors and unhandled rejections
registerGlobalErrorHandlers();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));