import {Injectable} from '@angular/core'
import {TokenProvider} from '../provider/token.provider'
import {Octokit} from '@octokit/rest'
import {map, mergeMap, Observable} from 'rxjs'
import {parsePoll, Poll} from '../model/poll'
import {filter} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  octokit: Observable<Octokit>

  constructor(
    private tokenProvider: TokenProvider,
  ) {
    this.octokit = this.tokenProvider.token.observable
      .pipe(
        filter(t => !!t),
        map(token => new Octokit({auth: token}))
      )
  }

  graphql(query: string): Observable<any> {
    return this.octokit.pipe(mergeMap(api => api.graphql(query)))!
  }

  poll(owner: string, repository: string, discussionId: string): Observable<Poll> {
    return this.graphql(`
      query {
        repository(name: "${repository}", owner: "${owner}") {
          discussions(first: 100) {
            nodes {
              id
              title
              body
              category {
                id
                name
              }
              reactionGroups {
                content
                viewerHasReacted
                reactors {
                  totalCount
                }
              }
            }
          }
        }
      }
    `)
      .pipe(
        map(r => r.repository.discussions.nodes.filter((d: any) => d.id === discussionId)[0]),
        map(d => {
          if (!d) throw Error('no such discussion')

          return parsePoll(d)
        })
      )
  }

}
