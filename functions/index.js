/* eslint-disable prefer-const */
const functions = require('firebase-functions');
const express = require('express');
// const cors = require('cors');
const admin = require('firebase-admin');

const app = express();

admin.initializeApp();

app.get('/', async (req, res) => {
  const snapshot = await admin.firestore().collection('users').get();

  const users = [];
  snapshot.forEach((doc) => {
    let id = doc;
    let data = doc.data();

    users.push({id, ...data});
  });

  res.status(200).send(JSON.stringify(users));
});

app.post('/', async (req, res) => {
  const user = req.body;

  await admin.firestore().collection('users').add(user);

  res.status(201).send();
});

exports.user = functions.https.onRequest(app);
