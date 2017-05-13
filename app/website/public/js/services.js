angular.module('starter.services', [])

.service('userService', function() {
  this.userData = {};

  this.giveUserData = function(){
    return this.userData;
  }

})
