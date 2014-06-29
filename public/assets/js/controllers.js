'use strict';

var phonecatApp = angular.module('phonecatApp', []); 


phonecatApp.controller("PhoneListCtrl", function($scope, $http){
		
	$http.get('/api/homeless/all').success(function(data){
        $scope.phones = data;
    });
	
	$scope.orderProp = 'age';
});

	