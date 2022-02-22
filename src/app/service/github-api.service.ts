import {Injectable} from '@angular/core'
import {TokenProvider} from '../provider/token.provider'
import {Octokit} from '@octokit/rest'
import {from, map, mergeMap, Observable, throwError} from 'rxjs'

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

  discussion(owner: string, repository: string, categoryName: string): Observable<any> {
    return this.repositoryPollCategory(owner, repository, categoryName)
      .pipe(
        mergeMap(category => {
          const id = category?.id
          if (!id) return throwError('no such category')
          console.log(id)

          return from(this.graphql(`
query {
  repository(name: "${repository}", owner: "${owner}") {
    discussions(categoryId: "${id}", first: 1) {
      nodes {
        id
        title
        body
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
        }),
        map(r => r.repository.discussions.nodes[0])
      )
  }

  repositoryPollCategory(owner: string, repository: string, categoryName: string): Observable<any> {
    return from(this.graphql(`
query {
  repository(name: "${repository}", owner: "${owner}") {
    discussions(first: 100) {
      nodes {
        category {
          id
          name
          emoji
        }
      }
    }
  }
}
    `))
      .pipe(
        map(r => r
          .repository
          .discussions
          .nodes
          .filter((n: any) => n.category.name === categoryName)[0]?.category)
      )
  }

}
