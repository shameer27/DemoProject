var app=angular.module("myApp",['ngRoute'])
app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'myCtrl'
        })
        .when('/admin', {
            templateUrl: 'admlog.html',
            controller: 'myCtrl1'
        })
        .when('/login', {
            templateUrl: 'log.html',
            controller: 'myCtrl2'
        })
        .when('/register', {
            templateUrl: 'reg.html',
            controller: 'myCtrl3'
        })
        .otherwise({
            redirectTo: '/home'
        });    
});
app.controller("myCtrl3",function($scope,$http){
    $scope.ClickMe=function(){
            
            var values = {
                      mail:$scope.mail,
                      phno:$scope.phno,
                      pwd:$scope.pwd,
            }
            $http.post('http://localhost:2500/reg', values).then(function (response) {                
                    if(response.data.code == '0'){ 
                        swal("Good job!", "Register Successfully!", "success");
                    } else {
                        swal("Sorry", "Failed", "failed");
                    }
                });
        }
});

