import {reactionMap} from './reaction-map'

export interface Poll {
  discussionId: string
  title: string
  options: { [emojiKey: string]: string }
  votes: { [emojiKey: string]: number }
  category: Category
}

export interface Category {
  id: string
  name: string
}

function parseOptions(body: string): { [emojiKey: string]: string } {
  return Object.fromEntries(body
    .split(/\n/)
    .map(o => {
      const ws = o.split(' ')
      const emoji = reactionMap.get(ws[0])
      const text = ws.slice(1).join(' ').trim()
      return [emoji, text]
    }))
}

export function parsePoll(response: any): Poll {
  return {
    discussionId: response.id,
    title: response.title,
    options: parseOptions(response.body),
    votes: Object.fromEntries(response.reactionGroups.map((e: any) => [e.content, e.reactors.totalCount])),
    category: response.category
  }
}
