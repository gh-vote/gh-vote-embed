import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core'
import {Option, Poll} from '../../model/poll'
import {Config} from '../../model/config'
import {ConfigProvider} from '../../provider/config.provider'
import {AuthService} from '../../service/auth.service'
import {GithubApiService} from '../../service/github-api.service'
import {TokenProvider} from '../../provider/token.provider'
import {UserProvider} from '../../provider/user.provider'
import {LoadingProvider} from '../../provider/loading.provider'
import {PollProvider} from '../../provider/poll.provider'
import {User} from '../../model/user'

// TODO: action menu
// TODO: skeleton on loading
@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent implements OnInit, OnChanges {

  poll!: Poll
  config!: Config
  user?: User
  options!: Option[]

  constructor(
    private configProvider: ConfigProvider,
    private authService: AuthService,
    private githubApiService: GithubApiService,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider,
    private loadingProvider: LoadingProvider,
    private pollProvider: PollProvider
  ) {
    this.pollProvider.poll.observable.subscribe(p => {
      this.poll = p
      this.options = Object.values(p.options)
    })
    this.configProvider.config.observable.subscribe(c => this.config = c)
    this.userProvider.user.observable.subscribe(u => this.user = u)
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  // TODO: remove session url param after login
  loginWithRedirect(): void {
    this.authService.authorize('Iv1.946ad5067422a7b2').subscribe(r => {
      window.open(r.url, '_self')
    })
  }

  logout(): void {
    this.tokenProvider.token.set(undefined as any)
    this.userProvider.user.set(undefined as any)
  }

  vote() {
    console.log(Object.values(this.poll.options).filter(o => o.viewerVoted))
  }

}
