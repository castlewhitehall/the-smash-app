angular.module('SmashApp.Map.controllers', [])

  .controller('MapCtrl', ['$scope', '$rootScope', '$ionicLoading', '$cordovaGeolocation', '$ionicPopup', '$localstorage', 'UserServ', function($scope, $rootScope, $ionicLoading, $cordovaGeolocation, $ionicPopup, $localstorage, UserServ) {
    $scope.greeting = 'hey';
    $scope.startPos = new google.maps.LatLng(33.791484, -84.407535);
    $scope.ctrlMarker = undefined;

	$scope.clearMyLoc = function(){

	    var userUpdate = {
	    		location: null,
	    		loginToken: $rootScope.user.loginToken
	    	};

		console.log('Updating Location', userUpdate);

	    UserServ.update(userUpdate).success(function(res) {
	      	console.log('Successful Update', res);

	      	// set user object in local storage
	      	$localstorage.setObject('user', res);
	      	$rootScope.user = res;

	      	// clear error message
	      	$scope.errorMessage = undefined;

	      	// TODO DISPLAY UPDATE SUCCESSFUL MESSAGE

	      	// error handler
	    }).error(function(res) {
	    	//


	      	// set scope error message
	      	$scope.errorMessage = res;
	      	console.log('Error Login', res);
	    });
	};

	$scope.toggleActive = function(){

	    var userUpdate = {
	    		active: $rootScope.user.active ? false : true,
	    		loginToken: $rootScope.user.loginToken
	    	};


	    console.log('Updating Active', userUpdate);

	    UserServ.update(userUpdate).success(function(res) {
	      	console.log('Successful Update', res);

	      	// set user object in local storage
	      	$localstorage.setObject('user', res);
	      	$rootScope.user = res;

	      	// clear error message
	      	$scope.errorMessage = undefined;

	      	// TODO DISPLAY UPDATE SUCCESSFUL MESSAGE

	      	// error handler
	    }).error(function(res) {
	      	// set scope error message
	      	$scope.errorMessage = res;
	      	console.log('Error Login', res);
	    });


	};

    $scope.init = function() {

	    var mapOptions = {
	      streetViewControl:true,
	      zoom: 14,
	      center: $scope.startPos,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    var map = new google.maps.Map(document.getElementById('map'),
	        mapOptions);

		// listener for dropping a marker	   
        google.maps.event.addListener(map, 'click', function(event) {

            // remove previous marker
            if($scope.ctrlMarker){
            	$scope.ctrlMarker.setMap(null);
            }

            // create new marker
			$scope.ctrlMarker = new google.maps.Marker({
	                position: event.latLng, 
	                map: map
	        });

			google.maps.event.addListener($scope.ctrlMarker, 'click', function() {
    			map.panTo($scope.ctrlMarker.getPosition());

    			var alertPopup = $ionicPopup.show({
     				title: 'Map Options',
     				scope: $scope,
     				buttons: [{text: 'Set My Location', onTap: function(event){

	 				    var userUpdate = {
	 				    		location: [
	 				    			$scope.ctrlMarker.getPosition().lng(), 
	 				    			$scope.ctrlMarker.getPosition().lat()
	 				    		],
	 				    		loginToken: $rootScope.user.loginToken
	 				    	};

	 				    console.log('Updating Location', userUpdate);

				        UserServ.update(userUpdate).success(function(res) {
				          	console.log('Successful Update', res);

				          	// set user object in local storage
				          	$localstorage.setObject('user', res);
				          	$rootScope.user = res;

				          	// clear error message
				          	$scope.errorMessage = undefined;

				          	// TODO DISPLAY UPDATE SUCCESSFUL MESSAGE

				          	// error handler
				        }).error(function(res) {
				        	//


				          	// set scope error message
				          	$scope.errorMessage = res;
				          	console.log('Error Login', res);
				        });
     				}}, {text: 'Host Event'}]
   				});

  			});

        });
		$scope.map = map;





	    /*
	    var posOptions = {timeout: 10000, enableHighAccuracy: false};
	    $cordovaGeolocation
	    	.getCurrentPosition(posOptions)
	    	.then(function (pos) {

			  var myPos = new google.maps.Marker({
		        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
		        map: map,
		        title: 'MyPos'
		      });

			  google.maps.event.addListener(myPos, 'click', function() {
		        var infowindow = new google.maps.InfoWindow({
		      	  content: 'Me'
		        });

		        infowindow.open(map, myPos);
		      });


		      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

		    }, function(err) {
		      alert('Unable to get location: ' + err.message);
		    });

		*/

	    /*
	    navigator.geolocation.getCurrentPosition(function(pos) {

		  var myPos = new google.maps.Marker({
	        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
	        map: map,
	        title: 'MyPos'
	      });


		  google.maps.event.addListener(myPos, 'click', function() {
	        var infowindow = new google.maps.InfoWindow({
	      	  content: 'Me'
	        });

	        infowindow.open(map, myPos);
	      });

	      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
	      $ionicLoading.hide();
	    }, function(error) {
	      alert('Unable to get location: ' + error.message);
	    });

		*/

	};

  }]);