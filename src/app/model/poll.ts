import {reactionMap} from './reaction-map'

export interface Poll {
  discussionId: string
  title: string
  options: { [emojiKey: string]: Option }
  category: Category
  viewerVoted: boolean
  totalVotes: number
}

export interface Option {
  key: string
  body: string
  voteCount: number
  viewerVoted: boolean
}

export interface Category {
  id: string
  name: string
}

function parseOptions(response: any): { [emojiKey: string]: Option } {
  const voteMap = Object.fromEntries(response.reactionGroups.map((e: any) => [e.content, {
    count: e.reactors.totalCount,
    voted: e.viewerHasReacted
  }]))
  return Object.fromEntries(
    (response.body as string)
      .split(/\n/)
      .map(o => {
        const ws = o.split(' ')
        const emojiKey = reactionMap.get(ws[0])!
        const oBody = ws.slice(1).join(' ').trim()
        return [emojiKey, {
          key: emojiKey,
          body: oBody,
          voteCount: voteMap[emojiKey].count,
          viewerVoted: voteMap[emojiKey].voted
        }]
      })
  )
}

export function parsePoll(response: any): Poll {
  const options = parseOptions(response)
  return {
    discussionId: response.id,
    title: response.title,
    options: options,
    category: response.category,
    viewerVoted: Object.values(options).some(o => o.viewerVoted),
    totalVotes: Object.values(options).map(o => o.voteCount).reduce((a, b) => a + b, 0)
  }
}
