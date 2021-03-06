export enum SortsEnum {
  FIELD = 'field',
  LEVEL = 'level',
  NAME = 'name',
  RACE = 'race',
  RESPAWN = 'respawn',
  REVERSE = 'reverse',
  SIZE = 'size',
  LAST = 'whoKilled',
  HIDE = 'hide',
  POINTS = 'points',
}

// Is there a better way of doing this? Yes
// Does this work well and make it easy to read? Also yes.
// Numbers refer to their flex weight
// Name and Respawn are important, so make them 3, otherwise strings 2, numbers 1
export enum ColumnsEnum {
  FIELD = 2,
  LEVEL = 1,
  NAME = 3,
  RACE = 2,
  RESPAWN = 3,
  SIZE = 1, // okay it's a 1 char string.
  LAST = 2,
  HIDE = 1,
  POINTS = 1,
}

export enum StatusEnum {
  ALIVE = 'alive',
  SPAWNING = 'spawning',
  DEAD = 'dead',
  UNKNOWN = 'unknown',
}
