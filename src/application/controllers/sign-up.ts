import { Controller } from '@/application/controllers'
import { HttpResponse } from '../helpers'

export class SignUpController extends Controller {
  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}
