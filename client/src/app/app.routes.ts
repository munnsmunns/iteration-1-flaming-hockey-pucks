// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './users/user-list.component';
import {ResourcesComponent} from "./resources/resources.component";
import {ReportsComponent} from "./reports/reports.component";

import {JournalListComponent} from './journaling/journal-list.component';

import {GoalsComponent} from "./goals/goals.component";

// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'journaling', component: JournalListComponent},
    {path: 'resources', component: ResourcesComponent },
    {path: 'reports', component: ReportsComponent },
    {path: 'goals', component: GoalsComponent },

];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
