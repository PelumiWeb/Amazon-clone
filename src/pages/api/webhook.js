import {buffer} from 'micro'
import * as admin from 'firebase-admin'

const serviceAccount = require('../../../permission.json')

const app = !admin.apps.length ? admin.initializeApp({
credentials: admin.credential.cert(serviceAccount)
}) : admin.app();


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fufillOrder = async (session) => {
console.log('fufiliing order', session)

    return app.firestore().collection('users').doc(session.metadata.email).collection('orders').doc(session.id)
    .set({
        amount: session.amount_total / 100,
        amount_sipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log(`SUCCES: Order ${session.id} has been added to the db` )
    })
}

export default async (req, res) => {
    if (req.method === 'POST'){
        const requestBuffer = await buffer(req)
        const payload = requestBuffer.toString()
        const sig = req.headers["stripe-signature"]

        let event;
        //verify it came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
            console.log(event, event.type)

        } catch(err) {
            console.log('error', err.message)
            return res.status(400).send('webhook error', err.message)
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            return fufillOrder(session).then(() => res.status(200).catch(err => res.status(400).send('Web-hook error', err.message)))
        }

    } 
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}