import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {parsePoll, Poll} from '../model/poll'
import {API_URL} from '../../global'

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(
    private http: HttpClient
  ) {
  }

  discussion(owner: string, repository: string, discussionId: string): Observable<Poll> {
    return this.http.get<any>(API_URL + '/discussion', {
      params: {owner, repository, discussionId}
    })
      .pipe(
        map(d => parsePoll(d))
      )
  }

}
