import * as functions from 'firebase-functions'
import { Request } from 'firebase-functions/lib/providers/https'
import * as admin from 'firebase-admin'
import MessagingPayload = admin.messaging.MessagingPayload

interface IPayload {
  priority: string
  message_payload: MessagingPayload
  target: string
}

export const sendNotification = functions.region('asia-east2').https.onRequest(async (request: Request, response) => {
  const payload: IPayload = request.body

  await functions.app.admin.messaging().sendToDevice(payload.target, payload.message_payload).catch(e => {
    response.send({
      status: 'Error',
      message: e
    })
  })

  response.send({
    status: 'Ok'
  })
})
