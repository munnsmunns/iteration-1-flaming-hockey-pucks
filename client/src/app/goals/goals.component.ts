import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Goal} from "./goals";
import {GoalsService} from "./goals.service";
import {MatDialog} from "@angular/material/dialog";
import {AddGoalComponent} from "./add-goals.component";

@Component({
    selector: 'app-goals-component',
    templateUrl: './goals.component.html',
    styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit{
    // These are public so that tests can reference them (.spec.ts)
    public goals: Goal[];
    public filteredGoals: Goal[];

    // These are the target values used in searching.
    // We should rename them to make that clearer.
    public goalOwner: string;
    //public email: string =


    // Inject the GoalListService into this component.
    constructor(public goalsService: GoalsService, public dialog: MatDialog) {

    }

    openDialog(): void {
        const newGoal: Goal =
            {
            _id: '',
            name: '',
            owner: '',
            body: '',
            category: '',
            startDate: '',
            endDate: '',
            frequency: '',
            status: false,
            email: localStorage.getItem('email'),
            };
        const dialogRef = this.dialog.open(AddGoalComponent, {
            width: '500px',
            data: { goal: newGoal }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.goalsService.addGoal(result).subscribe(
                addGoalResult => {
                    this.refreshGoals();
                },
                err => {
                    // This should probably be turned into some sort of meaningful response.
                    console.log('There was an error adding the goal.');
                    console.log('The error was ' + JSON.stringify(err));
                });
        });
    }


    public filterGoals(searchName): Goal[] {

        this.filteredGoals = this.goals;

        // Filter by name
        if (searchName != null) {
            searchName = searchName.toLocaleLowerCase();

            this.filteredGoals = this.filteredGoals.filter(goal => {
                return !searchName || goal.name.toLowerCase().indexOf(searchName) !== -1;
            });
        }

        // Sort by start date from newest to oldest
        this.filteredGoals = this.filteredGoals.sort((goal1, goal2) => {
            const date1 = new Date(goal1.startDate);
            const date2 = new Date(goal2.startDate);
            return date2.valueOf() - date1.valueOf();
        });


        return this.filteredGoals;
    }

    /**
     * Starts an asynchronous operation to update the goals list
     *
     */
    refreshGoals(): Observable<Goal[]> {
        // Get Goals returns an Observable, basically a "promise" that
        // we will get the data from the server.
        //
        // Subscribe waits until the data is fully downloaded, then
        // performs an action on it (the first lambda)

        const goalListObservable: Observable<Goal[]> = this.goalsService.getGoals();
        goalListObservable.subscribe(
            goals => {
                this.goals = goals;
                this.filterGoals(this.goalOwner);
            },
            err => {
                console.log(err);
            });
        return goalListObservable;
    }


    ngOnInit(): void {
        this.refreshGoals();
    }

    //New function to return the name of the active user
    //window.* is not defined, or 'gettable' straight from HTML *ngIf
    //So this function will return that
    getLoginName(){
        var name = window['name'];
        return name;
    }

    parseStatus(thing: Boolean){
        if(thing == true) return "Complete"
        else return "Incomplete"
    }

    isUserLoggedIN(): boolean {
        var email = localStorage.getItem('email');
        return ((email != '') && (typeof email != 'undefined'));
    }
}
