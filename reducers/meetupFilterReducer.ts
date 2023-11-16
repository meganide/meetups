type CHANGE_SEARCH_QUERY = {
  type: "CHANGE_SEARCH_QUERY"
  payload: string
}

export type MeetupFilterActions = CHANGE_SEARCH_QUERY

export const initalStateMeetupFilterReducer = {
  searchQuery: "",
}

export type MeetupFilterState = {
  searchQuery: string
}

export function meetupFilterReducer(
  state: MeetupFilterState,
  action: MeetupFilterActions
) {
  const { type } = action
  switch (type) {
    case "CHANGE_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      }

    default:
      throw Error("Action type not found")
  }
}
