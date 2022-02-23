import {Injectable} from '@angular/core'
import {ObservableData} from '../model/observable-data'
import {mergeMap, tap} from 'rxjs'
import {Poll} from '../model/poll'
import {ConfigProvider} from './config.provider'
import {GithubApiService} from '../service/github-api.service'
import {LoadingProvider} from './loading.provider'

@Injectable({
  providedIn: 'root'
})
export class PollProvider {

  poll: ObservableData<Poll> = new ObservableData<Poll>()

  constructor(
    private configProvider: ConfigProvider,
    private githubApiService: GithubApiService,
    private loadingProvider: LoadingProvider
  ) {
    configProvider.config.observable
      .pipe(
        mergeMap(({owner, repo, discussionId}) => githubApiService.poll(owner, repo, discussionId)),
        tap(p => this.poll.set(p)),
        tap(() => this.loadingProvider.loading.set(false)),
      )
      .subscribe()

    this.poll.observable
      .pipe(tap(poll => console.debug({poll})))
      .subscribe()
  }

}
