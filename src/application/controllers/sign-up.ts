import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { AddAccount } from '@/domain/usecases'

type HttpRequest = { name: string, email: string, password: string }

export class SignUpController extends Controller {
  constructor (private readonly addAccount: AddAccount) {
    super()
  }

  async perform ({ name, email, password }: HttpRequest): Promise<HttpResponse<any>> {
    await this.addAccount({ name, email, password })
    return {
      statusCode: 400,
      data: 'any_data'
    }
  }
}
