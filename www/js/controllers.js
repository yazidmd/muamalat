angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $stateParams) {
	
})

.controller('SignCtrl', function($scope, $ionicPopup, $state, $http) {
	$scope.data = {};
	$scope.login = function(){
	if(!$scope.data.email || !$scope.data.password){
		$scope.showPopupErrorCreate();
	} else { $state.go('app.home') }
	};
	$scope.createAccount = function(){
	if(!$scope.data.firstname || !$scope.data.lastname || !$scope.data.email || !$scope.data.confirmemail || !$scope.data.password){
		$scope.showPopupErrorCreate();
	} else { $state.go('app.personalize') }
	};
	$scope.showPopupErrorCreate = function(){
		var popup = $ionicPopup.alert({
		template: '<b>Oops!</b><br/>Please fill in all the fields',
		cssClass: 'popup-alert text-center light',
		buttons:[{type:'button-icon ion-close-circled light'}]
		});
	};
	$scope.resetPassword = function(){
		var popup = $ionicPopup.alert({
		template: 'Email has been sent to youremail.com with a link to reset your password.',
		cssClass: 'popup-alert text-center light',
		buttons:[{type:'button-icon ion-checkmark-circled light'}]
		});
	};
	$scope.rangeYear = {'from':1900,'to':2016};
	$scope.birthday = {'year':1997,'month':9,'day':11};
	$scope.plusBirthday = function(value){
		if(value == 'day'){ $scope.birthday.day++ }
		if(value == 'month'){ $scope.birthday.month++ }
		if(value == 'year'){ $scope.birthday.year++ }
		$scope.checkDate();
	};
	$scope.minusBirthday = function(value){
		if(value == 'day'){ $scope.birthday.day-- }
		if(value == 'month'){ $scope.birthday.month-- }
		if(value == 'year'){ $scope.birthday.year-- }
		$scope.checkDate();
	};
	$scope.checkDate = function(){
		if($scope.birthday.day < 1) $scope.birthday.day = 31;
		if($scope.birthday.day > 31) $scope.birthday.day = 1;
		if($scope.birthday.month < 1) $scope.birthday.month = 12;
		if($scope.birthday.month > 12) $scope.birthday.month = 1;
		if($scope.birthday.year < $scope.rangeYear.from) $scope.birthday.year = $scope.rangeYear.to;
		if($scope.birthday.year > $scope.rangeYear.to) $scope.birthday.year = $scope.rangeYear.from;
	};
	$scope.gender = "Male";
	$http.get('js/data/suggestion.json').then(function(response){
		$scope.suggestion = response.data
	});
	$scope.checkSuggestion = function(){
		$scope.buttonSuggestion = false;
        angular.forEach($scope.suggestion, function (item) {
			if(item.selected) { $scope.buttonSuggestion = true }
        });
    };
})

.controller('HomeCtrl', function($scope, $http){
	$http.get('js/data/latest.json').then(function(response){
		$scope.latest = response.data;
	});
	$http.get('js/data/refine-size.json').then(function(response){
		$scope.refineSize = response.data;
	});
	$http.get('js/data/refine-color.json').then(function(response){
		$scope.refineColor = response.data;
	});
	$http.get('js/data/recently.json').then(function(response){
		$scope.recently = response.data;
	});
	$http.get('js/data/refine-category.json').then(function(response){
		$scope.refineCategory = response.data;
	});
	$scope.showMenuRight = function(){
		$scope.menuRight = true;
	};
	$scope.closeMenuRight = function(){
		$scope.menuRight = false;
	};
})

.controller('AccountCtrl', function($scope, $http, $ionicPopup){
	$http.get('js/data/account-items.json').then(function(response){
		$scope.accountItems = response.data;
	});
	$http.get('js/data/account-following.json').then(function(response){
		$scope.accountFollowing = response.data;
	});
	$http.get('js/data/account-follower.json').then(function(response){
		$scope.accountFollower = response.data;
	});
	$scope.showChoseAPhoto = function(){
		var alertPopup = $ionicPopup.alert({
		scope: $scope,
		title: 'Chose A Photo',
		templateUrl: 'templates/account/chose-photo.html',
		okText: 'Cancel',
		cssClass: 'popup-chose-photo'
		});
		$scope.closeChoseAPhoto = function(){ alertPopup.close() };
	};
})

.controller('NotificationsCtrl', function($scope, $http){
	$http.get('js/data/notifications.json').then(function(response){
		$scope.notifications = response.data;
	});
})

.controller('OrderCtrl', function($scope, $http, $stateParams, $filter, $ionicPopup, $state){
	$http.get('js/data/order-history.json').then(function(response){
		$scope.orderHistory = response.data;
	});
	$http.get('js/data/order-detail.json').then(function(response){
		$scope.orderDetail = $filter('filter')(response.data,$stateParams)[0];
	});
	$scope.cancelOrder = function(value){
		var popup = $ionicPopup.alert({
		template: 'Order #'+value+' is canceled',
		cssClass: 'popup-alert text-center light',
		buttons:[{type:'button-icon ion-checkmark-circled light'}]
		});
		$state.go('app.orderHistory');
	};
})

.controller('ShoppingCtrl', function($scope, $http, $ionicPopup, $state){
	$http.get('js/data/shopping.json').then(function(response){
		$scope.shopping = response.data;
	});
	$scope.openShipTo = function(){
		$scope.ShipTo = true;
	};
	$scope.closeShipTo = function(){
		$scope.ShipTo = false;
		$scope.orderCOD = false;
	};
	$scope.openPayment = function(){
		$scope.payment = true
	};
	$scope.closePayment = function(){
		$scope.payment = false
	};
	$scope.data = {};
	$scope.checkShipTo = function(){
	if(!$scope.data.fullname || !$scope.data.address || !$scope.data.postalcode || !$scope.data.city || !$scope.data.phone){
		var popup = $ionicPopup.alert({
		template: '<b>Oops!</b><br/>Please provide infomation in all require fields',
		cssClass: 'popup-alert text-center light',
		buttons:[{type:'button-icon ion-close-circled light'}]
		});
	} else {
		$scope.closeShipTo();
		$scope.placeOrder();
	}
	};
	$scope.showRemove = function(){
	var confirmPopup = $ionicPopup.show({
		title: 'Are you sure?',
		template: 'Do you want to remove?',
		cssClass: 'popup-confirm',
		buttons:[
			{
				text: 'Yes',
				type: 'border-right',
			},
			{ text: 'No' }
		]
	});
	};
	$scope.data.quantily = 2;
	$scope.showPopupQuantily = function(){
		var popup = $ionicPopup.alert({
		templateUrl: 'templates/shopping/quantily.html',
		scope: $scope,
		cssClass: 'popup-quantily',
		buttons:[
			{
				text:'DONE',
				type:'button-energized'
			}
		]
		});
		$scope.closePopupQuantily = function(){ popup.close() }
	};
	$scope.checkPayment = function(){
	if(!$scope.data.cardnumber || !$scope.data.security || !$scope.data.expiry || !$scope.data.zipcode){
		var popup = $ionicPopup.alert({
		template: '<b>Oops!</b><br/>Please enter valid credit card information',
		cssClass: 'popup-alert text-center light',
		buttons:[{type:'button-icon ion-close-circled light'}]
		});
	} else if(!$scope.data.fullname || !$scope.data.address || !$scope.data.postalcode || !$scope.data.city || !$scope.data.phone){
		$scope.closePayment();
		$scope.openShipTo();
	} else { $scope.placeOrder(); }
	};
	$scope.placeOrder = function(){
		if((!$scope.data.cardnumber || !$scope.data.security || !$scope.data.expiry || !$scope.data.zipcode) && !$scope.orderCOD) $scope.openPayment();
		else if(!$scope.data.fullname || !$scope.data.address || !$scope.data.postalcode || !$scope.data.city || !$scope.data.phone) $scope.openShipTo();
		else {
			var popup = $ionicPopup.alert({
			template: 'Go to Order History to check your orders',
			cssClass: 'popup-alert text-center light',
			buttons:[{type:'button-icon ion-checkmark-circled light'}]
			});
		}
	};
	$scope.placeOrderCOD = function(){
		$scope.closePayment();
		$scope.orderCOD = true;
		$scope.placeOrder();
	};
})

.controller('SearchCtrl', function($scope, $http){
	$http.get('js/data/search.json').then(function(response){
		$scope.search = response.data;
	})
})

.controller('DetailCtrl', function($scope, $http, $ionicPopup, $ionicModal, $timeout){
	$scope.tabsHidden = {"1":false,"2":false,"3":false,"4":true,"5":true,"6":true}
	$scope.selectedTab = function(value){
		if(value==1){
			$scope.tabsHidden = {"1":false,"2":false,"3":false,"4":true,"5":true,"6":true}
		} else if(value==6){
			$scope.tabsHidden = {"1":true,"2":true,"3":true,"4":false,"5":false,"6":false}
		} else {
			var i;
			for(i=0;i<=6;i++){
				if(i==value-1 || i==value || i==value+1){ $scope.tabsHidden[i] = false }
				else { $scope.tabsHidden[i] = true }
			}
		}
	};
	$http.get('js/data/detail.json').then(function(response){
		$scope.detail = response.data;
	});
	$http.get('js/data/relate.json').then(function(response){
		$scope.relate = response.data;
	});

	$ionicModal.fromTemplateUrl('templates/detail/images.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalImages = modal;
	});
	$scope.openModalImages = function() {
		$scope.modalImages.show();
	};
	$scope.closeModalImages = function() {
		$scope.modalImages.hide();
	};
	$scope.imagesViewing = 1;
	$scope.imagesHasChanged = function(viewing){ $scope.imagesViewing = viewing+1 };

	$scope.rangeNum = function(number){
		return new Array(number);
	};
	$scope.showDetailShare = function() {
		var alertPopup = $ionicPopup.alert({
		title: 'Share on...',
		scope: $scope,
		templateUrl: 'templates/detail/share.html',
		cssClass: 'popup-detail-share',
		okText: 'Cancel'
		});
		$scope.closePopupDetailShare = function(){ alertPopup.close() };
	};

	$ionicModal.fromTemplateUrl('templates/detail/move.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalMove = modal;
	});
	$scope.openModalMove = function() {
		$scope.modalMove.show();
	};
	$scope.closeModalMove = function() {
		$scope.modalMove.hide();
	};

	$scope.moveTo = function(title){
		$scope.closeModalMove();
		var popup = $ionicPopup.alert({
		template: 'Moved to: '+title,
		cssClass: 'popup-alert text-center light',
		buttons:[{type:'button-icon ion-checkmark-circled light'}]
		});
	};
	$scope.removeSave = function(){
	var confirmPopup = $ionicPopup.show({
		title: 'Are you sure?',
		template: 'Are you sure you want to remove this product from your profile?',
		cssClass: 'popup-confirm',
		buttons:[
			{
				text: 'Yes',
				type: 'border-right',
				onTap: function(e){
					var popup = $ionicPopup.alert({
					template: 'Product removed from profile',
					cssClass: 'popup-alert text-center light',
					buttons:[{type:'button-icon ion-checkmark-circled light'}]
					});
				}
			},
			{ text: 'No' }
		]
	});
	};

	$ionicModal.fromTemplateUrl('templates/detail/size.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalSize = modal;
	});
	$scope.openModalSize = function() {
		$scope.modalSize.show();
	};
	$scope.closeModalSize = function() {
		$scope.modalSize.hide();
	};
	
	$ionicModal.fromTemplateUrl('templates/detail/color.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalColor = modal;
	});
	$scope.openModalColor = function() {
		$scope.modalColor.show();
	};
	$scope.closeModalColor = function() {
		$scope.modalColor.hide();
	};

	$scope.selectSize = function(){
		$scope.closeModalSize();
		$scope.openModalColor();
	};
	$scope.backSelectSize = function(){
		$scope.closeModalColor();
		$scope.openModalSize();
	};
	
	$ionicModal.fromTemplateUrl('templates/detail/payment.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalPayment = modal;
	});
	$scope.openModalPayment = function() {
		$scope.modalPayment.show();
	};
	$scope.closeModalPayment = function() {
		$scope.modalPayment.hide();
	};
	
	$scope.selectColor = function(){
		$scope.closeModalColor();
		$scope.openModalPayment();
	};

	$scope.shopping = {"billto":"Credit Card","total":96,"size":8.5,"color":"Blue","quantily":2};

	$scope.openShipTo = function(){
		$scope.ShipTo = true
	};
	$scope.closeShipTo = function(){
		$scope.ShipTo = false
	};
	$scope.openPayment = function(){
		$scope.payment = true
	};
	$scope.closePayment = function(){
		$scope.payment = false
	};
	$scope.data = {};
	$scope.checkShipTo = function(){
	if(!$scope.data.fullname || !$scope.data.address || !$scope.data.postalcode || !$scope.data.city || !$scope.data.phone){
		var popup = $ionicPopup.alert({
		template: '<b>Oops!</b><br/>Please provide infomation in all require fields',
		cssClass: 'popup-alert text-center light',
		buttons:[{type:'button-icon ion-close-circled light'}]
		});
	} else{
		$scope.closeShipTo();
		$scope.closeModalPayment();
		$scope.checkout();
	}
	};
	$scope.showRemove = function(){
	var confirmPopup = $ionicPopup.show({
		title: 'Are you sure?',
		template: 'Do you want to remove?',
		cssClass: 'popup-confirm',
		buttons:[
			{
				text: 'Yes',
				type: 'border-right',
			},
			{ text: 'No' }
		]
	});
	};
	$scope.data.quantily = 2;
	$scope.showPopupQuantily = function(){
		var popup = $ionicPopup.alert({
		templateUrl: 'templates/shopping/quantily.html',
		scope: $scope,
		cssClass: 'popup-quantily',
		buttons:[
			{
				text:'DONE',
				type:'button-energized'
			}
		]
		});
		$scope.closePopupQuantily = function(){ popup.close() }
	};
	$scope.checkPayment = function(){
	if(!$scope.data.cardnumber || !$scope.data.security || !$scope.data.expiry || !$scope.data.zipcode){
		var popup = $ionicPopup.alert({
		template: '<b>Oops!</b><br/>Please enter valid credit card information',
		cssClass: 'popup-alert text-center light',
		buttons:[{type:'button-icon ion-close-circled light'}]
		});
	} else{
		$scope.closePayment();
		$scope.openShipTo();
	}
	};
	$scope.checkout = function(){
		var popup = $ionicPopup.alert({
		template: 'Go to Order History to check your orders',
		cssClass: 'popup-alert text-center light',
		buttons:[{type:'button-icon ion-checkmark-circled light'}]
		});
	};
	$scope.placeOrderCOD = function(){
		$scope.closePayment();
		$scope.orderCOD = true;
		$scope.openShipTo();
	};
})

.controller('SettingsCtrl', function($scope, $ionicPopup, $state){
	$scope.rangeYear = {'from':1900,'to':2016};
	$scope.birthday = {'year':1997,'month':9,'day':11};
	$scope.plusBirthday = function(value){
		if(value == 'day'){ $scope.birthday.day++ }
		if(value == 'month'){ $scope.birthday.month++ }
		if(value == 'year'){ $scope.birthday.year++ }
		$scope.checkDate();
	};
	$scope.minusBirthday = function(value){
		if(value == 'day'){ $scope.birthday.day-- }
		if(value == 'month'){ $scope.birthday.month-- }
		if(value == 'year'){ $scope.birthday.year-- }
		$scope.checkDate();
	};
	$scope.checkDate = function(){
		if($scope.birthday.day < 1) $scope.birthday.day = 31;
		if($scope.birthday.day > 31) $scope.birthday.day = 1;
		if($scope.birthday.month < 1) $scope.birthday.month = 12;
		if($scope.birthday.month > 12) $scope.birthday.month = 1;
		if($scope.birthday.year < $scope.rangeYear.from) $scope.birthday.year = $scope.rangeYear.to;
		if($scope.birthday.year > $scope.rangeYear.to) $scope.birthday.year = $scope.rangeYear.from;
	};
	$scope.gender = "Male";

	$scope.showChoseAPhoto = function(){
		var alertPopup = $ionicPopup.alert({
		scope: $scope,
		title: 'Chose A Photo',
		templateUrl: 'templates/account/chose-photo.html',
		okText: 'Cancel',
		cssClass: 'popup-chose-photo'
		});
		$scope.closeChoseAPhoto = function(){ alertPopup.close() };
	};
	$scope.deletePayment = function(){
	var confirmPopup = $ionicPopup.show({
		template: 'Are you sure you want to delete your shipping information?',
		cssClass: 'popup-delete-payment',
		buttons:[
			{ text: 'No' },
			{
				text: 'Yes',
				type: 'button-positive',
				onTap: function(e){
					$state.go('app.settings');
				}
			}
		]
	});
	};
	$scope.logOut = function(){
	var confirmPopup = $ionicPopup.show({
		title: 'Are you sure?',
		template: 'Do you want to logout?',
		cssClass: 'popup-confirm',
		buttons:[
			{
				text: 'Yes',
				type: 'border-right',
			},
			{ text: 'No' }
		]
	});
	};
	$scope.deleteAccount = function(){
	var confirmPopup = $ionicPopup.show({
		title: 'Are you sure?',
		template: 'Do you really want to delete your account? This can’t be undone!',
		cssClass: 'popup-confirm',
		buttons:[
			{
				text: 'Yes',
				type: 'border-right',
			},
			{ text: 'No' }
		]
	});
	};
})

;
