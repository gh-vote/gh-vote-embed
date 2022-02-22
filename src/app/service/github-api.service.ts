import {Injectable} from '@angular/core'
import {TokenProvider} from '../provider/token.provider'
import {Octokit} from '@octokit/rest'
import {from, map, Observable} from 'rxjs'
import {parsePoll, Poll} from '../model/poll'

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  octokit?: Octokit

  constructor(
    private tokenProvider: TokenProvider,
  ) {
    this.tokenProvider.token.observable
      .subscribe(token => {
        this.octokit = new Octokit({auth: token})
      })
  }

  graphql(query: string): Promise<any> {
    return this.octokit?.graphql(query)!
  }

  discussion(owner: string, repository: string, discussionId: string): Observable<Poll> {
    return from(this.graphql(`
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
          reactors {
            totalCount
          }
        }
      }
    }
  }
}
    `))
      .pipe(
        map(r => r.repository.discussions.nodes.filter((d: any) => d.id === discussionId)[0]),
        map(d => {
          if (!d) throw Error('no such discussion')

          return parsePoll(d)
        })
      )
  }

}
