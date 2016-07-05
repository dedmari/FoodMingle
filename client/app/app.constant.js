(function(angular, undefined) {
  angular.module("foodmingleApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"customer",
		"cook",
		"admin"
	]
})

;
})(angular);