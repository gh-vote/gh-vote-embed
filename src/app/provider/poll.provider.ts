import {Injectable} from '@angular/core'
import {ObservableData} from '../model/observable-data'
import {mergeMap, tap, zipWith} from 'rxjs'
import {Poll} from '../model/poll'
import {ConfigProvider} from './config.provider'
import {GithubApiService} from '../service/github-api.service'
import {DiscussionService} from '../service/discussion.service'
import {TokenProvider} from './token.provider'
import {filter} from 'rxjs/operators'
import {LoadingProvider} from './loading.provider'

@Injectable({
  providedIn: 'root'
})
export class PollProvider {

  poll: ObservableData<Poll> = new ObservableData<Poll>()
  loading: ObservableData<boolean> = new ObservableData<boolean>({initialValue: true})

  constructor(
    private configProvider: ConfigProvider,
    private loadingProvider: LoadingProvider,
    private tokenProvider: TokenProvider,
    private githubApiService: GithubApiService,
    private discussionService: DiscussionService
  ) {
    this.configProvider.config.observable
      .pipe(
        mergeMap(({owner, repo, discussionId}) => this.discussionService.discussion(owner, repo, discussionId)),
        tap(p => this.poll.update(ex => !!ex ? ex : p)),
      )
      .subscribe()

    this.tokenProvider.token.observable
      .pipe(
        tap(() => 'new token'),
        filter(t => !!t),
        zipWith(this.configProvider.config.observable),
        mergeMap(([, config]) => this.githubApiService.poll(config.owner, config.repo, config.discussionId)),
        tap(p => this.poll.set(p)),
        tap(() => this.loadingProvider.loading.set(false)),
        tap(() => this.loading.set(false))
      )
      .subscribe()

    this.poll.observable
      .pipe(
        tap(poll => console.debug({poll})),
        tap(() => this.loadingProvider.loading.set(false)),
        tap(() => this.loading.set(false))
      )
      .subscribe()
  }

}
