import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppInitService } from './config/app-init.service';

//Services
import { CustomAuthInterceptor } from './interceptor/custom-auth-interceptor';

export function initializeApp(appInitService: AppInitService) {
    return () => {
        appInitService
            .InitApp()
    };
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
    ],
    providers: [
        AppInitService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppInitService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomAuthInterceptor,
            multi: true
        },
    ]
})
export class CoreModule { }
