var app = angular.module("myApp", ['ngRoute'])
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
        .when('/admindashboard', {
            templateUrl: 'admin.html',
            controller: 'myCtrl4'
        })
        .when('/userdashboard', {
            templateUrl: 'userdashboard.html',
            controller: 'myCtrl5'
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
app.controller("myCtrl3", function ($scope, $http, $location) {
    $scope.ClickMe = function () {

        var values = {
            mail: $scope.mail,
            phno: $scope.phno,
            pwd: $scope.pwd,
        }
        $http.post('http://localhost:2500/reg', values).then(function (response) {
            if (response.data.code == '0') {
                swal("Good job!", "Register Successfully!", "success");
            } else {
                swal("Sorry", "Failed", "failed");
            }
        });
    }
});

app.controller("myCtrl1", function ($scope, $http, $location) {
    $scope.adminloginfun = function () {
        console.log("admin login")
        var values = {
            mail: $scope.mail,
            pwd: $scope.pwd,
            adminflag: true
        }
        console.log(values, "login function");
        $http.post('http://localhost:2500/login', values).then(function (response) {
            console.log(response.data)
            if (response.data.status == '0') {
                if (response.data.data.adminflag == true) {
                    swal("Good job!", "login  Successfully!", "success");
                    $location.path("/admindashboard");
                } else {
                    swal("Sorry!", "you dont have admin previlage login ", "failed");
                }
            } else {
                swal("Sorry", "Failed", "failed");
            }
        });
    }
});
app.controller("myCtrl2", function ($scope, $http, $location) {
    $scope.loginfun = function () {
        var values = {
            mail: $scope.mail,
            pwd: $scope.pwd,
        }
        console.log(values, "login function");
        $http.post('http://localhost:2500/login', values).then(function (response) {
            console.log(response.data.data.mail)
            if (response.data.status == '0') {
                if (response.data.message == "please verify your account") {
                    swal("Sorry!", response.data.message, "failed");
                } else {
                    swal("Good job!", "login  Successfully!", "success");
                    localStorage.setItem("usermail", response.data.data.mail)
                    $location.path("/userdashboard");
                }
            } else {
                swal("Sorry", "Failed", "failed");
            }
        });
    }
});
app.controller('myCtrl4', function ($scope, $http) {
    $scope.getdataasjson = function () {
        $http.get('http://localhost:2500/getdata').success(function (response) {
            if (response.status == '1') {
                console.log(response, "response")
                $scope.demo = response.data;
            }
        });
    }
    $scope.save = function (x, y) {
        var demo = {
            name: x.name,
            mail: x.mail,
            phno: x.phno,
            pwd: x.pwd,
            dob: x.dob,
            status: x.status,
            id: y
        }
        console.log(demo);
        $http.put('http://localhost:2500/upddata/', demo).success(function (response) {
            if (response.status == '1') {
                swal("Good job!", "Updated Successfully!", "success");
                $scope.getdataasjson();
            }
        });
    }
    $scope.deletedata = function (id) {
        $http.delete('http://localhost:2500/deldata/' + id).success(function (response) {
            if (response.status == '1') {
                swal("Good job!", "Deleted Successfully!", "success");
                $scope.getdataasjson();
            }
        });
    }
});
app.controller('myCtrl5', function ($scope, $http, $location) {
    $scope.getdata = function () {
        var mail = localStorage.getItem("usermail")
        console.log(mail)
        $http.get('http://localhost:2500/getdatauser/'+mail).success(function (response) {
            console.log(response.data)
            if (response.status == '0') {
                console.log(response.data, "response")
                $scope.data = response.data;
            }
        });
    }
    $scope.save = function (data, y) {
        var demo = {
            name: data.name,
            mail: data.mail,
            phno: data.phno,
            pwd: data.pwd,
            dob: data.dob,
            status: data.status,
            id: y
        }
        console.log(demo);
        $http.put('http://localhost:2500/userupddata/', demo).success(function (response) {
            if (response.status == '1') {
                swal("Good job!", "Updated Successfully!", "success");
                $scope.getdataasjson();
            }
        });
    }
    $scope.deletedata = function (id) {
        $http.delete('http://localhost:2500/deldata/' + id).success(function (response) {
            if (response.status == '1') {
                swal("Good job!", "Deleted Successfully!", "success");
                $scope.getdataasjson();
            }
        });
    }
});