angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('menu', {
    url: '/side-menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('nomenu', {
    url: '',
    templateUrl: 'templates/nomenu.html',
    abstract:true
  })

      .state('menu.yourGroups', {
    url: '/groups',
    views: {
      'tab-attendance': {
        templateUrl: 'templates/yourGroups.html',
        controller: 'yourGroupsCtrl'
      }
    }
  })

  .state('menu.markAttenadance', {
    url: '/groups/:groupId/:groupName',
    views: {
      'tab-attendance': {
        templateUrl: 'templates/markAttenadance.html',
        controller: 'markAttenadanceCtrl'
      }
    }
  })

  

  .state('menu.syncData', {
    url: '/sync',
    views: {
      'tab-sync': {
        templateUrl: 'templates/syncData.html',
        controller: 'syncDataCtrl'
      }
    }
  })

  .state('nomenu.login', {
    cache: false,
    url: '/login',
    views: {
      'login': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')

  

});