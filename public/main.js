var angularTodo = angular.module('angularTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/projects')
    .success(function(data) {
    	$scope.projects = data;
    	console.log(data)
    })
    .error(function(data) {
    	console.log('Error: ' + data);
    });

    // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createProject = function(){
    	$http.post('/api/projects', $scope.formData)
    	.success(function(data) {
    		$scope.formData = {};
    		$scope.projects = data;
    		console.log(data);
    	})
    	.error(function(data) {
    		console.log('Error:' + data);
    	});
    };

    // Borra un TODO despues de checkearlo como acabado
    $scope.deleteProject = function(id) {
    	$http.delete('/api/projects/' + id)
    	.success(function(data) {
    		$scope.projects = data;
    		console.log(data);
    	})
    	.error(function(data) {
    		console.log('Error:' + data);
    	});
    };
}