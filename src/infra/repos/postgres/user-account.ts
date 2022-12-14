import { AddUserAccount, CheckUserAccountByEmail, LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { PgRepository } from '@/infra/repos/postgres'
import { PgUser } from '@/infra/repos/postgres/entities'

export class PgUserAccountRepository extends PgRepository implements LoadUserAccount, SaveFacebookAccount, CheckUserAccountByEmail, AddUserAccount {
  async load ({ email }: LoadUserAccount.Input): Promise<LoadUserAccount.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveFacebookAccount.Input): Promise<SaveFacebookAccount.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    let resultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ name, email, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: resultId }
  }

  async checkByEmail ({ email }: CheckUserAccountByEmail.Input): Promise<CheckUserAccountByEmail.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    return pgUser !== undefined
  }

  async add ({ name, email, password }: AddUserAccount.Input): Promise<AddUserAccount.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.save({ name, email, password })
    return {
      id: pgUser.id.toString(),
      name,
      email,
      isAdmin: false
    }
  }
}
