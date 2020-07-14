import {
  SET_SCREAM,
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };

    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };

    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };

    case DELETE_SCREAM:
      // delete local instance of scream
      let idx = state.screams.findIndex(
        // (scream) => scream.screamId === action.payload.screamId
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(idx, 1);
      return {
        ...state,
      };

    case POST_SCREAM:
      // Aadd it to our screams array
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case SUBMIT_COMMENT:
      return {
        ...state,
        // add comment to comment array in scream, at the top of
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };

    default:
      return state;
  }
}
