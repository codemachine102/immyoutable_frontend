import { Location, matchPath } from 'react-router-dom';

function matchInArray(pathname: string, pages: string[]) {
  var len = pages.length,
    i = 0;

  for (; i < len; i++) {
    const match = matchPath({ path: `/${pages[i]}` }, pathname);

    if (match) {
      return true;
    }
  }

  return false;
}

export const isOnPage = (location: Location, pages: string[]) => {
  return matchInArray(location.pathname, pages);
};
