# Ragna0 MVP Tracker

## Requirements

This project will require a Firestore DB with two collections.
They should be setup like so, where each MVP NAME will create a row in the final table:

```
mvp {
  <MVP NAME> {
    element: string
    field: string
    lastKilled: string (exactly as it appears on the ragna0 MVP page)
    level: string
    name: string
    race: string
    respawnRate: string
    size: string
    whoKilled: string
  }
}
misc {
  lastUpdated {
    lastUpdated: timestamp
  }
}
```

## Setting up

If your DB is setup, and you've linked to it in a .env file, change the projectID in firebase.ts as well to match yours: for whatever reason, the projectId in the .env doesn't seem to work there.
Then, just run `yarn dev`
