export interface LoadUserAccount {
  load: (input: LoadUserAccount.Input) => Promise<LoadUserAccount.Output>
}

export namespace LoadUserAccount {
  export type Input = { email: string }
  export type Output = undefined | {
    id: string
    name?: string
  }
}

export interface SaveFacebookAccount {
  saveWithFacebook: (input: SaveFacebookAccount.Input) => Promise<SaveFacebookAccount.Output>
}

export namespace SaveFacebookAccount {
  export type Input = {
    id?: string
    email: string
    name: string
    facebookId: string
  }
  export type Output = { id: string }
}

export interface CheckUserAccountByEmail {
  checkByEmail: (input: CheckUserAccountByEmail.Input) => Promise<CheckUserAccountByEmail.Output>
}

export namespace CheckUserAccountByEmail {
  export type Input = { email: string }
  export type Output = boolean
}

export interface AddUserAccount {
  add: (input: AddUserAccount.Input) => Promise<AddUserAccount.Output>
}

export namespace AddUserAccount {
  export type Input = {
    name: string
    email: string
    password: string
  }
  export type Output = {
    id: string
    name: string
    email: string
    isAdmin: boolean
  }
}
