angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicHistory, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
$scope.salir = function(){
   $state.go('login');
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
}
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})



.controller('loginCtrl', function($scope, $state, userService,$stateParams,$ionicHistory, $ionicModal,$http) {
  console.log('estamos en el login');
  $scope.loginData = {};
  $scope.adminData = {};
  $scope.estudiante = true;

  $scope.doLogin = function(){
    console.log('aqui el login de admin'+$scope.adminData);
    if($scope.estudiante){
      //se loguea a direccion de estudiante

    $http({
      method:'POST',
      url:'http://localhost:3000/personas/save',
      data:$scope.loginData
    }).then(function(response){
      //alert(JSON.stringify(response));
      //the response from the server is now contained in 'response'

        userService.userData = $scope.loginData;
        $state.go('app.landing');
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });

    }, function(error){
      //there was an error fetching from the server
    });
  }
  else{
    //se loguea a direccion de admin
    $http.get('http://example.com').then(function(response){
      //the response from the server is now contained in 'response'
      if(response.ok){
        userService.userData = response;
        $state.go('app.landing');
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
      }
    }, function(error){
      //there was an error fetching from the server
    });
  }

  }

})

.controller('landingCtrl', function($scope, userService,$stateParams,$ionicHistory, $ionicModal,$http) {
  $scope.userData = userService.giveUserData();
  $scope.preguntaData={};
  $scope.menuTitle = $scope.userData.type;
  $scope.asignaturas = [{}];
  $scope.allAsignaturas = [{}];
  $scope.message = '';
  $ionicModal.fromTemplateUrl('templates/askAnsModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.openModal = function() {
    $scope.modal.show();

  };

$scope.ask = function(asignatura){

    $scope.type = 'pregunta';
    $scope.modalTitle = 'Realizar una pregunta';
    $scope.preguntaData.asignatura = asignatura;
    $scope.openModal();
}

  $scope.addPregunta = function(){
     $scope.type = 'message';

     $scope.message = 'Su pregunta ha sido enviada';
      $http({
      method:'POST',
      url:'http://localhost:3000/preguntas/save',
      data:{id_inscripcion:$scope.preguntaData.asignatura._id,pregunta:$scope.preguntaData.pregunta}

    }).then(function(response){
      ////alert(JSON.stringify(response));
      //the response from the server is now contained in 'response'

      //$scope.asignaturas = response.data;
        $scope.type ='message';
        $scope.message = 'Su pregunta ha sido enviada';
        //$scope.closeModal();
    }, function(error){
      //there was an error fetching from the server
    });


  }

  $scope.getAsignaturas = function(){
   $http({
      method:'POST',
      url:'http://localhost:3000/inscripciones/all',
      data:{dni:$scope.userData.dni}

    }).then(function(response){
      //alert(JSON.stringify(response));
      //the response from the server is now contained in 'response'

      $scope.asignaturas = response.data;

    }, function(error){
      //there was an error fetching from the server
    });

  }

  $scope.getAsignaturas();
$scope.getAllAsignaturas = function(){
  $scope.type='list';
  $scope.openModal();
  $scope.modalTitle = "agregar una asignatura"
  $scope.title='lista de asignaturas';
    $http.get('http://localhost:3000/asignaturas/all').then(function(response){
      //the response from the server is now contained in 'response'

        $scope.allAsignaturas = response.data;

    }, function(error){
      //there was an error fetching from the server
    });

  }

  $scope.setAsignatura = function(asignatura){
    //alert(JSON.stringify($scope.userData))
    console.log('setear asignatura');
    $http({
      method:'POST',
      url:'http://localhost:3000/inscripciones/save',
      data:{id_asignatura:asignatura,dni:$scope.userData.dni}

    }).then(function(response){
      //alert(JSON.stringify(response));
      $scope.getAsignaturas();

    }, function(error){
      //there was an error fetching from the server
    });



$scope.closeModal();
  }



})

.controller('questionsCtrl', function($scope, userService,$stateParams,$ionicHistory, $ionicModal,$http) {
$scope.allPreguntas = [{pregunta:'asdsd',usuario:'uer',fecha:'date',asignatura:'asignatura'}];
  $scope.userData = userService.giveUserData();
  $scope.modalTitle = '';
  $scope.canRespond='false';
  $scope.selectePregunta = {};
  $scope.type = 'read';
  $scope.type = 'write'
  $scope.respuestas = [];
  $scope.respuesta;
  $scope.calificacion = 0;
 $scope.icalificacion = 0;
//$scope.userData.type = 'monitor'
  if($scope.userData.type=='monitor')
    $scope.canRespond = true;
  $ionicModal.fromTemplateUrl('templates/preguntaModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.openModal = function() {

    $scope.modal.show();

  };
  $scope.getAllPreguntas = function(){
    $http.get('http://example.com').then(function(response){
      //the response from the server is now contained in 'response'

        $scope.allPreguntas = response;

    }, function(error){
      //there was an error fetching from the server
    });
  }
  $scope.getAllPreguntas();
$scope.readPregunta = function(data){
  console.log(data);
  $scope.selectedPregunta = data;
  $scope.openModal();
}

$scope.responder = function(){

}
$scope.aceptarRespuesta = function(){

}
})
.controller('adminCtrl', function($scope, userService,$stateParams,$ionicHistory, $ionicModal,$http) {
  $scope.students = [{}];
  $scope.getStudents = function(){
     $http.get('http://example.com').then(function(response){
      //the response from the server is now contained in 'response'

        $scope.students = response;

    }, function(error){
      //there was an error fetching from the server
    });
  }

  $scope.setAsMonitor = function(data){
    $http.get('http://example.com').then(function(response){
      //the response from the server is now contained in 'response'

        $scope.students = response;

    }, function(error){
      //there was an error fetching from the server
    });
  }
})

;
