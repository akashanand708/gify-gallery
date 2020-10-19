const asyncActionType = (type) => ({
    PENDING: `${type}_PENDING`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`,
  });

  export const FETCH_TRENDING_GIFS = asyncActionType('FETCH_TRENDING_GIFS');
  