import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';



const stripe = new Stripe('API_KEY', {
  apiVersion: '2022-11-15',
});

admin.initializeApp();

export const onUserCreate = functions
  .region('europe-central2')
  .auth.user()
  .onCreate(async (user, context) => {
    await admin.firestore().collection('users').doc(user.uid).set({
      id: user.uid,
      emailAddress: user.email,
      verified: user.emailVerified,
    });
  });

export const onBurritoCreate = functions
  .region('europe-central2')
  .https.onCall(async (data: BurritoData, context) => {
    const { name, price } = data.burrito;
    const product = await stripe.products.create({
      name,
      default_price_data: {
        currency: 'usd',
        unit_amount: Math.floor(Number(price) * 100),
      },
    });
    if (context.auth) {
      const burrito = await admin
        .firestore()
        .collection('users')
        .doc(context.auth.uid)
        .collection('submitedBurrito')
        .doc('submited')
        .get();
      const burritoData = burrito.data();
      await admin.firestore().collection('orders').doc(context.auth.uid).set({
        userId: context.auth.uid,
        burrito: burritoData,
        status: 'Pending',
      });
    }

    return product;
  });

export const onOrderStatusChange = functions
  .region('europe-central2')
  .firestore.document('orders/{userId}')
  .onUpdate(async (change, contex) => {
    try {
      const userId: string = contex.params.userId;
      const userTokenSnapshot = await admin
        .firestore()
        .collection('messagingTokens')
        .doc(userId)
        .get();
      const tokenData = userTokenSnapshot.data();
      const newOrderDoc = change.after.data();
      const updatedStatus: string = newOrderDoc.status;
      if (tokenData) {
        admin.messaging().sendToDevice(tokenData.messagingToken, {
          notification: {
            title: updatedStatus,
            body: 'Your delivery status updated!',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

export const changeDeliveryStatus = functions
  .region('europe-central2')
  .https.onCall(async (data: string, context) => {
    const userId = context.auth?.uid;
    if (userId) {
      await admin.firestore().collection('orders').doc(userId).set(
        {
          status: data,
        },
        {
          merge: true,
        }
      );
    }
  });
