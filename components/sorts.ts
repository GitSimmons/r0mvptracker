import { differenceInMinutes } from 'date-fns';
import { SortsEnum } from './types/enums';
import { MVPProps } from './types/interfaces';
const sortByANumber = (list: MVPProps[], propertyName): MVPProps[] =>
  list.sort((a, b) => parseInt(a[propertyName]) - parseInt(b[propertyName]));
const sortByFirstLetter = (list: MVPProps[], propertyName): MVPProps[] =>
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
const sortByRespawn = (list: MVPProps[]): MVPProps[] =>
  list.sort((a, b) => {
    const respawn: (mvp: MVPProps) => number = (mvp) => {
      if (!mvp.lastKilled) {
        return 1000;
      } else {
        return (
          differenceInMinutes(mvp.lastKilled, new Date()) + mvp.respawnRate + mvp.variableRespawn
        );
      }
    };
    return respawn(a) - respawn(b);
  });
const sortBy = (list: MVPProps[], sort: SortsEnum): MVPProps[] => {
  switch (sort) {
    case SortsEnum.FIELD:
      return sortByFirstLetter(list, SortsEnum.FIELD);
    case SortsEnum.LAST:
      return sortByFirstLetter(list, SortsEnum.LAST);
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
    case SortsEnum.POINTS:
      return sortByANumber(list, SortsEnum.POINTS);
    default:
      return sortByRespawn(list);
  }
};
export { sortBy };
