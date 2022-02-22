import {Injectable} from '@angular/core'
import {ObservableData} from '../model/observable-data'
import {map, mergeMap, tap} from 'rxjs'
import {AuthService} from '../service/auth.service'
import {TokenProvider} from './token.provider'

@Injectable({
  providedIn: 'root'
})
export class SessionProvider {

  session: ObservableData<string> = new ObservableData<string>()

  constructor(
    private authService: AuthService,
    private tokenProvider: TokenProvider
  ) {
    this.session.observable.pipe(
      mergeMap(s => this.authService.token(s)),
      tap(s => console.log(s)),
      map(t => this.tokenProvider.token.set(t.value))
    ).subscribe()
  }

}
