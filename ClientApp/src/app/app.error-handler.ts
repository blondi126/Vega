import { ToastrService } from 'ngx-toastr';
import { ErrorHandler, Injectable, Inject, Injector, NgZone, isDevMode } from "@angular/core";
import * as Sentry from "@sentry/angular";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor( 
        private ngZone: NgZone,
        @Inject(Injector) private readonly injector: Injector) {}
    
    private get toastrService() {
        return this.injector.get(ToastrService);
    }

    handleError(error: any): void {
        if (!isDevMode())
            Sentry.captureException(error.originalError || error)
        else 
            throw error;
            
        this.ngZone.run(() =>{
            this.toastrService.error('An unexpected error happened.', 'Error', {
                closeButton: true,
                timeOut: 5000
            });
        });
    }

}