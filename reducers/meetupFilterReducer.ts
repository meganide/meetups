type CHANGE_SEARCH_QUERY = {
  type: "CHANGE_SEARCH_QUERY"
  payload: string
}

type CHANGE_DATE = {
  type: "CHANGE_DATE"
  payload: string
}

type CHANGE_CITY = {
  type: "CHANGE_CITY"
  payload: string
}

type CHANGE_CATEGORY = {
  type: "CHANGE_CATEGORY"
  payload: string
}

export type MeetupFilterActions =
  | CHANGE_SEARCH_QUERY
  | CHANGE_DATE
  | CHANGE_CITY
  | CHANGE_CATEGORY

export const initalStateMeetupFilterReducer = {
  searchQuery: "",
  date: "",
  city: "",
  category: "",
}

export type MeetupFilterState = {
  searchQuery: string
  date: string
  city: string
  category: string
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
    case "CHANGE_CITY": {
      return {
        ...state,
        city: action.payload,
      }
    }
    case "CHANGE_CATEGORY": {
      return {
        ...state,
        category: action.payload,
      }
    }

    default:
      throw Error("Action type not found")
  }
}
