angular.module('todoController' , [])

	.controller('mainController' , [ '$scope' , '$http' , 'Todos', 
		
		function($scope ,$http , Todos) {
			
			$scope.formData = {};
			$scope.loading = true;

			Todos.get()
				.success(function(data){
					$scope.todos = data;
					$scope.loading = false;
				})
			;

			$scope.createTodo = function() {

				// Validate the formData to make sure that something is there
				if ($scope.formData.text != undefined) {

					$scope.loading = true;

					// Call the create function from our service
					// { returns a promise object }
					Todos.create($scope.formData)
						.success(function(data){
							$scope.loading = false;
							$scope.formData = {};
							$scope.todos = data;
						});

				}

			};

			$scope.deleteTodo = function(id) {

				$scope.loading = true;

				Todos.delete(id)
					.success(function(data){
						$scope.loading = false;
						$scope.todos = data;
					})
				;

			}

		}

	])

;