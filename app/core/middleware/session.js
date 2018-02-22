import { Actions as farce } from 'farce'

import { routes } from 'core/routes'
import { isDomainAction } from 'core/util'
import { actions as ClaimsActions } from 'domains/claims'
import { actionTypes as session, name } from 'domains/session'

const SessionMiddleware = ({ dispatch }) => next => action => {
  // action not in namespace? abort!
  if (!isDomainAction(name, action.type)) return next(action)

  if (session.LOGIN === action.type) {
    // fetch user's KORD Claims Graph
    dispatch(ClaimsActions.readClaimsByGraph(action.payload.graph))

    // redirect to Home page
    dispatch(farce.push(routes.home.path))
  }

  return next(action)
}

export default SessionMiddleware