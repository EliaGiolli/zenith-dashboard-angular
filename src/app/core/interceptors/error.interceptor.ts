import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Si è verificato un errore sconosciuto';

      if (error.error instanceof ErrorEvent) {
        // Errore lato client (es. problema di rete locale)
        errorMessage = `Errore Client: ${error.error.message}`;
      } else {
        // Errore lato server (es. 404, 500)
        errorMessage = `Codice Errore: ${error.status}\nMessaggio: ${error.message}`;
      }

      console.error('%c [SERVER ERROR]', 'color: #ff4b4b; font-weight: bold;', errorMessage);
      
      // Qui potresti iniettare un servizio di notifiche (Toaster)
      // o fare un redirect se lo status è 401 (Unauthorized)

      return throwError(() => new Error(errorMessage));
    })
  );
};