import {Injectable} from '@angular/core'
import {ObservableData} from '../model/observable-data'
import {TOKEN_KEY} from '../../global'
import {distinct, mergeMap, tap} from 'rxjs'
import {AuthService} from '../service/auth.service'
import {SessionProvider} from './session.provider'
import {LoadingProvider} from './loading.provider'

@Injectable({
  providedIn: 'root'
})
export class TokenProvider {

  token: ObservableData<string> = new ObservableData<string>({
    initialValue: localStorage.getItem(TOKEN_KEY) || undefined,
    nullable: true
  })

  constructor(
    private authService: AuthService,
    private sessionProvider: SessionProvider,
    private loadingProvider: LoadingProvider
  ) {
    this.sessionProvider.session.observable.pipe(
      distinct(),
      mergeMap(s => this.authService.token(s)),
      tap(t => this.token.set(t.value)),
    ).subscribe()

    this.token.observable
      .pipe(
        tap(t => TokenProvider.updateLocalStorage(t)),
        tap(t => console.debug({token: t})),
        tap(t => this.loadingProvider.loading.set(false))
      )
      .subscribe()
  }

  private static updateLocalStorage(token: string) {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  }

}
