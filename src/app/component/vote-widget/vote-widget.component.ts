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
  styleUrls: ['./vote-widget.component.sass', '../../style/global.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class VoteWidgetComponent implements OnInit {

  @Input()
  owner!: string

  @Input()
  repo!: string

  @Input()
  discussionId!: string

  @Input()
  showResultsImmediately: boolean = false

  octokit?: Octokit
  user?: Observable<any>
  loading?: Observable<boolean>
  poll?: Observable<Poll>

  constructor(
    public configProvider: ConfigProvider,
    private authService: AuthService,
    private githubApiService: GithubApiService,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider,
    private loadingProvider: LoadingProvider,
    private pollProvider: PollProvider
  ) {
    this.loading = this.loadingProvider.loading.observable
    this.poll = this.pollProvider.poll.observable
  }

  ngOnInit(): void {
    const config = {
      owner: this.owner,
      repo: this.repo,
      discussionId: this.discussionId,
      showResultsImmediately: this.showResultsImmediately
    }
    this.configProvider.config.set(config)
  }

}
