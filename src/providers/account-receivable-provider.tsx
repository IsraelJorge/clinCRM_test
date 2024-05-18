import { createContext, useContext, useMemo, useReducer } from 'react'

import { ActionMapType } from '@/@types'
import {
  AccountReceivable,
  AccountReceivableForm,
} from '@/data/schemas/AccountReceivable'
import { AccountReceivableStorage } from '@/data/storage/account-receivable-storage'

export type AccountReceivableProviderProps = {
  children: React.ReactNode
}

export enum Types {
  ADD = 'ADD_ACCOUNT_RECEIVABLE',
  REMOVE = 'REMOVE_ACCOUNT_RECEIVABLE',
  UPDATE = 'UPDATE_ACCOUNT_RECEIVABLE',
  GET = 'GET_ACCOUNT_RECEIVABLE',
}

type AccountReceivableContext = InitialState & {
  dispatch: React.Dispatch<ActionsType>
}

type Payload = {
  [Types.ADD]: AccountReceivableForm
  [Types.REMOVE]: { id: string }
  [Types.UPDATE]: AccountReceivableForm
  [Types.GET]: { id: string }
}

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>]

export type TotaisAccountReceivable = {
  totalReceivable: number
  totalPatients: number
  totalOperations: number
}
export const initialTotaisValues: TotaisAccountReceivable = {
  totalOperations: 0,
  totalPatients: 0,
  totalReceivable: 0,
}

type InitialState = {
  accountReceivables: AccountReceivable[]
  accountReceivable: AccountReceivable | undefined
  totaisAccountReceivable: TotaisAccountReceivable
}

const initialState: InitialState = {
  accountReceivables: [],
  accountReceivable: undefined,
  totaisAccountReceivable: initialTotaisValues,
}

const AccountReceivableContext = createContext({} as AccountReceivableContext)

const reducer = (state: InitialState, action: ActionsType) => {
  switch (action.type) {
    case Types.ADD:
      return {
        ...state,
        accountReceivables: [
          AccountReceivableStorage.create(action.payload),
          ...state.accountReceivables,
        ],
      }
    case Types.REMOVE:
      return {
        ...state,
        accountReceivables: AccountReceivableStorage.remove(action.payload.id),
      }
    case Types.UPDATE:
      return {
        ...state,
        accountReceivables: AccountReceivableStorage.update(action.payload),
      }
    case Types.GET:
      return {
        ...state,
        accountReceivable: AccountReceivableStorage.get(action.payload.id),
      }
    default:
      return state
  }
}

export function AccountReceivableProvider({
  children,
}: AccountReceivableProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => ({
    ...initial,
    accountReceivables: AccountReceivableStorage.findAll(),
  }))

  const totaisAccountReceivable = useMemo(() => {
    return AccountReceivableStorage.calculateTotaisAccountReceivable()
  }, [state.accountReceivables])

  return (
    <AccountReceivableContext.Provider
      value={{
        accountReceivable: state.accountReceivable,
        accountReceivables: state.accountReceivables,
        totaisAccountReceivable,
        dispatch,
      }}
    >
      {children}
    </AccountReceivableContext.Provider>
  )
}

export const useAccountReceivable = () => {
  const context = useContext(AccountReceivableContext)

  if (!context) {
    throw new Error(
      'useAccountReceivable must be used within an AccountReceivableProvider',
    )
  }

  return context
}
