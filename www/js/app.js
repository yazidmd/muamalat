angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($rootScope, $ionicPlatform, $ionicHistory) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $rootScope.goBack = function(){ $ionicHistory.goBack() }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu/index.html',
    controller: 'AppCtrl'
  })

  .state('app.sign', {
    url: '/sign',
    views: {
      'menuContent': {
        templateUrl: 'templates/sign/index.html'
      }
    }
  })

  .state('app.createAccount', {
    url: '/sign/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/sign/create.html',
		controller: 'SignCtrl'
      }
    }
  })

  .state('app.signin', {
    url: '/sign/signin',
    views: {
      'menuContent': {
        templateUrl: 'templates/sign/signin.html',
		controller: 'SignCtrl'
      }
    }
  })

  .state('app.forgot', {
    url: '/sign/forgot',
    views: {
      'menuContent': {
        templateUrl: 'templates/sign/forgot.html',
		controller: 'SignCtrl'
      }
    }
  })

  .state('app.personalize', {
    url: '/sign/personalize',
    views: {
      'menuContent': {
        templateUrl: 'templates/sign/personalize.html',
		controller: 'SignCtrl'
      }
    }
  })

  .state('app.suggestion', {
    url: '/sign/suggestion',
    views: {
      'menuContent': {
        templateUrl: 'templates/sign/suggestion.html',
		controller: 'SignCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home/index.html',
		controller: 'HomeCtrl'
      }
    }
  })

  .state('app.refine', {
    url: '/refine',
    views: {
      'menuContent': {
        templateUrl: 'templates/home/refine.html',
		controller: 'HomeCtrl'
      }
    }
  })

  .state('app.refineGadgets', {
    url: '/refine/gadgets',
    views: {
      'menuContent': {
        templateUrl: 'templates/home/refine-gadgets.html',
		controller: 'HomeCtrl'
      }
    }
  })

  .state('app.refineSize', {
    url: '/refine/size',
    views: {
      'menuContent': {
        templateUrl: 'templates/home/refine-size.html',
		controller: 'HomeCtrl'
      }
    }
  })


  .state('app.refineCategory', {
    url: '/refine/category',
    views: {
      'menuContent': {
        templateUrl: 'templates/home/refine-category.html',
		controller: 'HomeCtrl'
      }
    }
  })

  .state('app.refineColor', {
    url: '/refine/color',
    views: {
      'menuContent': {
        templateUrl: 'templates/home/refine-color.html',
		controller: 'HomeCtrl'
      }
    }
  })

  .state('app.refineRating', {
    url: '/refine/rating',
    views: {
      'menuContent': {
        templateUrl: 'templates/home/refine-rating.html',
		controller: 'HomeCtrl'
      }
    }
  })

  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'templates/account/index.html',
		controller: 'AccountCtrl'
      }
    }
  })

  .state('app.notifications', {
    url: '/notifications',
    views: {
      'menuContent': {
        templateUrl: 'templates/notifications/index.html',
		controller: 'NotificationsCtrl'
      }
    }
  })

  .state('app.orderHistory', {
    url: '/order/history',
    views: {
      'menuContent': {
        templateUrl: 'templates/order/history.html',
		controller: 'OrderCtrl'
      }
    }
  })

  .state('app.orderDetail', {
    url: '/order/detail/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/order/detail.html',
		controller: 'OrderCtrl'
      }
    },
	params: {id: null}
  })

  .state('app.shopping', {
    url: '/shopping',
    views: {
      'menuContent': {
        templateUrl: 'templates/shopping/index.html',
		controller: 'ShoppingCtrl'
      }
    }
  })

  .state('app.payment', {
    url: '/payment',
    views: {
      'menuContent': {
        templateUrl: 'templates/shopping/payment.html',
		controller: 'ShoppingCtrl'
      }
    }
  })

  .state('app.search', {
	cache: false,
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
		controller: 'SearchCtrl'
      }
    }
  })

  .state('app.detail', {
    url: '/detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/detail/index.html',
		controller: 'DetailCtrl'
      }
    }
  })

  .state('app.detailPolicy', {
    url: '/detail/policy',
    views: {
      'menuContent': {
        templateUrl: 'templates/detail/policy.html'
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings/index.html',
		controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.settingsProfile', {
    url: '/settings/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings/profile.html',
		controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.settingsPassword', {
    url: '/settings/password',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings/password.html'
      }
    }
  })

  .state('app.settingsEmail', {
    url: '/settings/email',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings/email.html'
      }
    }
  })

  .state('app.settingsPayment', {
    url: '/settings/payment',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings/payment.html',
		controller: 'SettingsCtrl'
      }
    }
  })

;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/sign');
})

.filter('monthName', [function() {
    return function (monthNumber) {
		if(monthNumber > 12) monthNumber = 1;
		if(monthNumber < 1) monthNumber = 12;
        var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        return monthNames[monthNumber-1];
    }
}])

.filter('day', [function() {
    return function (dayNumber) {
        if(dayNumber <= 0) dayNumber = 31;
        if(dayNumber >= 32) dayNumber = 1;
		if(dayNumber < 10) dayNumber = "0"+dayNumber;
        return dayNumber;
    }
}])

.filter('rangeYear', [function() {
    return function (yearNumber, rangeYear) {
		if(yearNumber < rangeYear.from) yearNumber = rangeYear.to;
		if(yearNumber > rangeYear.to) yearNumber = rangeYear.from;
        return yearNumber;
    }
}])

.directive('menuCloseKeep', ['$ionicHistory', function($ionicHistory) {
    return {
        restrict: 'AC',
        link: function($scope, $element) {
            $element.bind('click', function() {
                var sideMenuCtrl = $element.inheritedData('$ionSideMenusController');
                if (sideMenuCtrl) {
                    $ionicHistory.nextViewOptions({
                        historyRoot: false,
                        disableAnimate: true,
                        expire: 300
                    });
                    sideMenuCtrl.close();
                }
            });
        }
    };
}])

.config(function($ionicConfigProvider){
	$ionicConfigProvider.backButton.text('').previousTitleText(false); //disable backButton text
	$ionicConfigProvider.backButton.icon('ion-android-arrow-back'); //disable backButton text
	$ionicConfigProvider.tabs.position('top');
	$ionicConfigProvider.navBar.alignTitle('left');
})

;
