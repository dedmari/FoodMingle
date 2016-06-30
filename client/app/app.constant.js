(function(angular, undefined) {
  angular.module("foodmingleApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin",
		"customer",
		"cook"
	]
})

;
})(angular);