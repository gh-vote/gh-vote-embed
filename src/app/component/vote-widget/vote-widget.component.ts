import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core'
import {AuthService} from '../../service/auth.service'
import {UserProvider} from '../../provider/user.provider'
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

  @Input()
  multiChoice: boolean = false

  loading: boolean = false
  poll?: Poll

  constructor(
    public configProvider: ConfigProvider,
    private authService: AuthService,
    private githubApiService: GithubApiService,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider,
    private loadingProvider: LoadingProvider,
    private pollProvider: PollProvider
  ) {
    this.loadingProvider.loading.observable.subscribe(loading => this.loading = loading)
    this.pollProvider.poll.observable.subscribe(poll => this.poll = poll)
  }

  ngOnInit(): void {
    const config = {
      owner: this.owner,
      repo: this.repo,
      discussionId: this.discussionId,
      showResultsImmediately: this.showResultsImmediately,
      multiChoice: this.multiChoice
    }
    this.configProvider.config.set(config)
  }

}
