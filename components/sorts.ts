import { differenceInMinutes } from "date-fns";
import { SortsEnum } from "./types/enums";
import { MVPProps } from "./types/interfaces";
const sortByANumber = (list, propertyName) =>
  list.sort((a, b) => parseInt(a[propertyName]) - parseInt(b[propertyName]));
const sortByFirstLetter = (list, propertyName) =>
  list.sort((a, b) => {
    const x = a[propertyName].toLowerCase();
    const y = b[propertyName].toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
const sortByRespawn = list =>
  list.sort((a, b) => {
    let respawn = x => {
      if (!x.lastKilled) {
        return 1000;
      } else {
        return (
          differenceInMinutes(x.lastKilled, new Date()) +
          parseInt(x.respawnRate)
        );
      }
    };
    return respawn(a) - respawn(b);
  });
const sortBy = (list: MVPProps[], sort: SortsEnum): MVPProps[] => {
  switch (sort) {
    case SortsEnum.FIELD:
      return sortByFirstLetter(list, SortsEnum.FIELD);
    case SortsEnum.LEVEL:
      return sortByANumber(list, SortsEnum.LEVEL);
    case SortsEnum.NAME:
      return sortByFirstLetter(list, SortsEnum.NAME);
    case SortsEnum.RACE:
      return sortByFirstLetter(list, SortsEnum.RACE);
    case SortsEnum.RESPAWN:
      return sortByRespawn(list);
    case SortsEnum.SIZE:
      return sortByFirstLetter(list, SortsEnum.SIZE);
    case SortsEnum.REVERSE:
      // Reverse mutates arrays, so we make a shallow copy first
      return [...list].reverse();
    default:
      return sortByRespawn(list);
  }
};
export { sortBy };
