import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core'
import {AuthService} from '../../service/auth.service'
import {Octokit} from '@octokit/rest'
import {UserProvider} from '../../provider/user.provider'
import {Observable} from 'rxjs'
import {TokenProvider} from '../../provider/token.provider'
import {LoadingProvider} from '../../provider/loading.provider'
import {GithubApiService} from '../../service/github-api.service'
import {ConfigProvider} from '../../provider/config.provider'
import {PollProvider} from '../../provider/poll.provider'
import {Poll} from '../../model/poll'

@Component({
  selector: 'gh-vote',
  templateUrl: './vote-widget.component.html',
  styleUrls: ['./vote-widget.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class VoteWidgetComponent implements OnInit {

  @Input()
  owner!: string

  @Input()
  repo!: string

  @Input()
  discussionId!: string

  octokit?: Octokit
  user?: Observable<any>
  loading?: Observable<boolean>
  poll?: Observable<Poll>

  constructor(
    private authService: AuthService,
    private githubApiService: GithubApiService,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider,
    private loadingProvider: LoadingProvider,
    private configProvider: ConfigProvider,
    private pollProvider: PollProvider
  ) {
    this.user = this.userProvider.user.observable
    this.loading = this.loadingProvider.loading.observable
    this.poll = this.pollProvider.poll.observable
  }

  ngOnInit(): void {
    const config = {
      owner: this.owner,
      repo: this.repo,
      discussionId: this.discussionId
    }
    this.configProvider.config.set(config)
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

}
