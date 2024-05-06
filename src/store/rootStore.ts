'use client'
import userStore, { IUserStore } from './userStore'

export interface IStore {
  user: IUserStore
}

export default function createStore(initialValue: any): () => IStore {
  return () => ({
    user: { ...userStore(), ...initialValue },
  })
}
