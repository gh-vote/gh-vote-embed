import {Injectable} from '@angular/core'
import {ObservableData} from '../model/observable-data'
import {TokenProvider} from './token.provider'
import {filter, mergeMap} from 'rxjs/operators'
import {Octokit} from '@octokit/rest'
import {distinct, from, map, tap} from 'rxjs'
import {LoadingProvider} from './loading.provider'

@Injectable({
  providedIn: 'root'
})
export class UserProvider {

  user: ObservableData<any> = new ObservableData<any>()

  constructor(
    private tokenProvider: TokenProvider,
    private loadingProvider: LoadingProvider
  ) {
    this.tokenProvider.token.observable
      .pipe(
        distinct(),
        filter(t => !!t),
        map(t => new Octokit({auth: t}).rest.users.getAuthenticated()),
        mergeMap(r => from(r)),
        map(r => r.data),
        map(d => ({
          id: d.id,
          login: d.login,
          avatarUrl: d.avatar_url,
        })),
        tap(u => this.user.set(u))
      )
      .subscribe()

    this.user.observable
      .pipe(tap(u => console.debug({user: u})))
      .subscribe()
  }

}
