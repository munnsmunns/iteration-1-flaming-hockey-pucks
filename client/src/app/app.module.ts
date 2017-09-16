import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }         from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent} from './home/home.component';
import { KittensComponent }   from './kittens/kittens.component';
import { UserListComponent } from './users/user-list.component';
import { UserListService } from './users/user-list.service';
import { Routing } from './app.routes';
import { FormsModule } from '@angular/forms';

// import { PipeModule } from './pipe.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        Routing,
        FormsModule,
        // PipeModule
    ],
    declarations: [
        AppComponent,
        KittensComponent,
        HomeComponent,
        NavbarComponent,
        UserListComponent
    ],
    providers: [ UserListService ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}