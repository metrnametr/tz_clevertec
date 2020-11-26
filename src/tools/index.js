import {
  split, reverse, filter,
} from 'lodash';

export const numberWithDot = (x) => {
  const parts = reverse(split(x, ''));

  if (filter(parts, (ch) => ch === '.').length > 1) {
    return x.replace(/\./, '');
  }
  return x.replace(/[^\d^\\.]/g, '');
};
