import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {AuthService} from '../../service/auth.service'
import {Octokit} from '@octokit/rest'
import {UserProvider} from '../../provider/user.provider'
import {Observable} from 'rxjs'
import {TokenProvider} from '../../provider/token.provider'
import {LoadingProvider} from '../../provider/loading.provider'

@Component({
  selector: 'gh-vote',
  templateUrl: './vote-widget.component.html',
  styleUrls: ['./vote-widget.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class VoteWidgetComponent implements OnInit {

  octokit?: Octokit
  user?: Observable<any>
  loading?: Observable<boolean>

  constructor(
    private authService: AuthService,
    private tokenProvider: TokenProvider,
    public userProvider: UserProvider,
    public loadingProvider: LoadingProvider
) {
    this.user = this.userProvider.user.observable
    this.loading = this.loadingProvider.loading.observable
  }

  ngOnInit(): void {
  }

  // TODO: remove session url param after login
  loginWithRedirect(): void {
    this.authService.authorize('Iv1.946ad5067422a7b2').subscribe(r => {
      console.log(r)
      window.open(r.url, '_self')
    })
  }

  logout(): void {
    this.tokenProvider.token.set(undefined as any)
    this.userProvider.user.set(undefined as any)
  }

}
