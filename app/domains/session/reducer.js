import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as actions from './actionTypes'
import * as model from './model'

const createAccount = account => model.accountFactory(account)

export const initialState = {
  account: null,
  isNewUser: false,
  oAuthClaimMessage: null,
}

export default createReducer(fromJS(initialState), {
  [actions.LOGIN]: (state, action) =>
    state.merge({
      account: createAccount(action.payload.account),
      graph: action.payload.graph,
      isNewUser: action.payload.isNewUser,
    }),

  [actions.LOGOUT]: state => state.merge(initialState),

  [actions.SET_IS_NEW_USER]: (state, action) => state.merge(action.payload),

  [actions.SET_OAUTH_CLAIM_MESSAGE]: (state, action) =>
    state.merge(action.payload),
})
