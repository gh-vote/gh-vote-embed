import {Injectable} from '@angular/core'
import {TokenProvider} from '../provider/token.provider'
import {Octokit} from '@octokit/rest'
import {catchError, map, mergeMap, Observable, of} from 'rxjs'
import {parsePoll, Poll} from '../model/poll'
import {filter} from 'rxjs/operators'
import {User} from '../model/user'
import {Reaction} from '../model/reaction'

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

  graphql(query: string, vars?: any): Observable<any> {
    return this.octokit.pipe(
      mergeMap(api => api.graphql(query, vars)),
      catchError((err: any) => {
        // some error happening even if response is 2xx and response data is lost...
        if (err.name === 'GraphqlResponseError') {
          console.warn(err)
          return of(undefined)
        }
        throw err
      })
    )
  }

  poll(owner: string, repository: string, discussionId: string): Observable<Poll> {
    return this.graphql(`
      query($repository: String!, $owner: String!) {
        repository(name: $repository, owner: $owner) {
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
    `, {repository: repository, owner: owner})
      .pipe(
        map(r => r.repository.discussions.nodes.filter((d: any) => d.id === discussionId)[0]),
        map(d => {
          if (!d) throw Error('no such discussion')

          return parsePoll(d)
        })
      )
  }


  // TODO: use variables instead of templates
  setReactions(user: User, poll: Poll, addReactions: Reaction[], removeReactions: Reaction[]): Observable<string[]> {
    const addMutations = addReactions.map(r => `
      add${r}: addReaction(
        input: {clientMutationId: "${user.id}"
        content: ${Reaction[r]}
        subjectId: "${poll.discussionId}"}) {
          subject {
            id
          }
        }
    `)
    const removeMutations = removeReactions.map(r => `
      remove${r}: removeReaction(
        input: {clientMutationId: "${user.id}"
        content: ${Reaction[r]}
        subjectId: "${poll.discussionId}"}) {
          subject {
            id
          }
        }
    `)
    const mutations = [...addMutations, ...removeMutations]
    const q = `
      mutation {
        ${mutations.join('')}
      }
    `
    return this.graphql(q)
  }

}
