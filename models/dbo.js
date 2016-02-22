/**
 * dbo.js
 * własna implementacja menedżera bazy MongoDB
 * wykonuje zadania specyficzne dla aplikacji WebProcess
 */

var mongodb = require('mongodb');

var DBO = module.exports = {
    db: null,
    hostsCollection: 'hosts',
    usersCollection: 'users',
    
    init: function(url, connectionstring) {
        var t = this;
        mongodb.connect("mongodb://" + url, function (err, db) {
          if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
          } else {
            //HURRAY!! We are connected. :)
            t.db = db;
            console.log('Connection established to', url);
        
            // do some work here with the database.
        
            //Close connection
            //db.close();
          }
        });
    },
    
    
    //!pattern
    addHost: function(name, callback) {
        this.db.collection(this.hostsCollection).insert(
            {'name' : name},
            function(err, result) {
                if (err) 
                    callback(0);
                else 
                   callback(result['insertedIds'][0]);
            }
        );
    },
    
    removeHost: function(id) {
      this.db.collection(this.hostsCollection).deleteOne(
          {"_id" : new mongodb.ObjectID(id)}
      );  
    },
    
    getHosts: function(callback) {
        this.db.collection(this.hostsCollection).find({}).toArray(
            function (err, result) {
              if (err) {
                callback(0);
              } else {
                callback(result);
              }
            }
        );
    }
};
