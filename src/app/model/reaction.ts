export enum Reaction {

  THUMBS_UP,
  THUMBS_DOWN,
  LAUGH,
  HOORAY,
  CONFUSED,
  HEART,
  ROCKET,
  EYES

}

export function fromEmoji(emoji: string): Reaction | undefined {
  const map = new Map<string, Reaction>([
    ['👍', Reaction.THUMBS_UP],
    ['👎', Reaction.THUMBS_DOWN],
    ['😄', Reaction.LAUGH],
    ['🎉', Reaction.HOORAY],
    ['😕', Reaction.CONFUSED],
    ['❤', Reaction.HEART],
    ['🚀', Reaction.ROCKET],
    ['👀', Reaction.EYES],
  ])

  return map.get(emoji)
}
