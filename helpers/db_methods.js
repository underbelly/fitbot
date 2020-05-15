const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const moment = require("moment");

// Connection URL
const url = process.env.MONGO_URI;

// Database Name
const dbName = "slackbot";

// Create a new MongoClient
const client = new MongoClient(url);

client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
});

const addWorkoutRecordToUser = async (userID, workoutID) => {
  const currentTime = moment.now();
  const db = client.db(dbName);

  const collection = db.collection("completed_workouts");

  let response = await collection.findOne({
    workout_id: workoutID,
    user_id: userID,
  }).then(res => {
    if (res) {
      console.log('already inserted');
      return false;
    } else {
      collection.insertOne({
        user_id: userID,
        workout_id: workoutID,
        completed_at: currentTime,
      })
      return true;
    }
  }).catch(err => {
    console.log('error here\n\n', err);
  }).finally(() => {
    console.log('at the end');
  })

  return response;
};

const insertDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("documents");
  // Insert some documents
  collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function (err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

// Use connect method to connect to the Server
// client.connect(function (err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   insertDocuments(db, function () {
//     client.close();
//   });

//   client.close();
// });

module.exports = {
  addWorkoutRecordToUser,
};
