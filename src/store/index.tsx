'use client'
import React, { createContext, useContext } from 'react'
import type { ReactElement } from 'react'
import { useLocalObservable, enableStaticRendering } from 'mobx-react-lite'
import { IStore } from './rootStore'
import createStore from './rootStore'

interface IProps {
  initialValue: Record<any, any>
  children: ReactElement
}

enableStaticRendering(true)

const StoreContext = createContext({})

export const StoreProvider = ({ initialValue, children }: IProps) => {
  const store: IStore = useLocalObservable(createStore(initialValue))

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const store: IStore = useContext(StoreContext) as IStore
  if (!store) {
    throw new Error('数据不存在')
  }
  return store
}
