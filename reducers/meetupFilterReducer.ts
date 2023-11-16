type CHANGE_SEARCH_QUERY = {
  type: "CHANGE_SEARCH_QUERY"
  payload: string
}

type CHANGE_DATE = {
  type: "CHANGE_DATE"
  payload: string
}

export type MeetupFilterActions = CHANGE_SEARCH_QUERY | CHANGE_DATE

export const initalStateMeetupFilterReducer = {
  searchQuery: "",
  date: "",
}

export type MeetupFilterState = {
  searchQuery: string
  date: string
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
    case "CHANGE_DATE": {
      return {
        ...state,
        date: action.payload,
      }
    }

    default:
      throw Error("Action type not found")
  }
}
