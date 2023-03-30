import { User } from "@firebase/auth"

type TrelloReqBody = {
  boardData: ProjectBoard
  trelloToken: string
}

interface CurrentUser extends Record<any, any> {
  id: string
  username: string
  email: string
  name: string
  avatar: string
  created: string
  updated: string
}

interface ProjectBoard {
  projectName: string
  ticketList: Ticket[]
}

interface Ticket {
  title: string
  scope: string
  acceptanceCriteria: string[]
  helpfulResources: string[]
}

interface CreateBoardResponse {
  id: string
  name: string
  shortUrl: string
}

interface AuthState {
  user: User | null
  loading: boolean
  isUserSignedIn: boolean
}

interface CurrentUser {
  uid: string
  displayName: string | null
  email: string
  photoURL: string | null
  trelloToken: string | null
  itemId: string | null
  sessionId: string | null
  customer: string | null
}
