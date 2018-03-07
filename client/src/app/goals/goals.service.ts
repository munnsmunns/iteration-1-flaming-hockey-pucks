import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Emoji} from '../emoji';
import {environment} from '../../environments/environment';

@Injectable()
export class GoalsService {
    readonly baseUrl: string = environment.API_URL + 'goals';
    private goalsUrl: string = this.baseUrl;

    constructor(private http: HttpClient) {
    }

    addEmoji(newEmoji: Emoji): Observable<{'$oid': string}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        // Send post request to add a new user with the user data as the body with specified headers.
        return this.http.post<{'$oid': string}>(this.goalsUrl + '/new', newEmoji, httpOptions);
    }

    getEmojiById(id: string): Observable<Emoji> {
        return this.http.get<Emoji>(this.goalsUrl + '/' + id);
    }
    getEmojis(emojiOwner?: string): Observable<Emoji[]> {
        return this.http.get<Emoji[]>(this.goalsUrl);
    }


}
