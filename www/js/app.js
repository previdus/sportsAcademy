// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
var loggedInUser = {id:"", name:"", apiKey:""};

angular.module('app', ['ionic', 'ngCordova', 'app.controllers', 'app.facades', 'app.api-services', 'app.database-services','app.routes', 'app.directives'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS m_users (id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, user_name TEXT NOT NULL, pwd TEXT NOT NULL, api_key TEXT NOT NULL)");
$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS m_loggedin_user (id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, api_key TEXT NOT NULL)");
$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS m_groups (group_id INTEGER NOT NULL , name TEXT NOT NULL, user_id INTEGER NOT NULL)");
$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS m_students (student_id INTEGER NOT NULL , name TEXT NOT NULL, group_id INTEGER NOT NULL)");
$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS m_attendance (group_id INTEGER NOT NULL,date DATE NOT NULL,user_id INTEGER NOT NULL, present_list TEXT NOT NULL, absent_list TEXT NOT NULL)");
    
  });
})

