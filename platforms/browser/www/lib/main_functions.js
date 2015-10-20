angular.module("facebookApp", ["ionic", "ngCordova"])
.controller("mainCtrl", ["$scope", "$cordovaOauth", "$http", function($scope, $cordovaOauth, $http)
{
    window.cordovaOauth = $cordovaOauth;
    window.http = $http;
}]);

function login()
{
    facebookLogin(window.cordovaOauth, window.http);
}

function facebookLogin($cordovaOauth, $http)
{
    $cordovaOauth.facebook("1524823437807777", ["email", "public_profile"], {redirect_uri: "http://127.0.0.1"}).
    then(function(result)
    {
        displayData($http, result.access_token);
    }, 
    function(error)
    {
        alert("Error: "+error);
    });
}

function displayData($http, access_token)
{
    $http.get("https://graph.facebook/v2.2/me", 
        {params: {access_token: access_token, fields: "name,email,location,picture", format: "json"}}).
    then(function(result)
    {
        var name = result.data.name;
        var email = result.data.email;
        var picture = result.data.picture;

        var html = '<table id="table" data-role="table" data-mode="column" class="ui-responsive">';
        html = html + '<thead>';
        html = html + '<tr><th>Field</th><th>Info</th></tr>';
        html = html + '</thead>';
        html = html + '<tbody>';

        html = html + '<tr><td>Name</td><td>'+name+'</td></tr>';
        html = html + '<tr><td>Email</td><td>'+email+'</td></tr>';
        html = html + '<tr><td>Picture</td><td><img src="'+picture.data.url+'"/></td></tr>';

        html = html + '</tbody>';
        html = html + '</table>';

        document.getElementById("listTable").innerHTML = html;
        $.mobile.changePage($("#profile"), "slide", true, true);
    },
    function(error)
    {
        alert("Error: " + error);
    });
}