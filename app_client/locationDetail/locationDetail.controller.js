(function () {

  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$filter','$routeParams', '$location', '$uibModal', 'loc8rData', 'authentication'];
  function locationDetailCtrl ($filter,$routeParams, $location, $uibModal, loc8rData, authentication) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentPath = $location.path();

    loc8rData.locationById(vm.locationid)
      .success(function(data) {
        vm.data = { location: data };
        vm.pageHeader = {
          title: vm.data.location.name
        };
      })
      .error(function (e) {
        console.log(e);
      });

    vm.popupReviewForm = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl',
        controllerAs: 'vm',
        
        resolve : {
          locationData : function () {
            return {
              locationid : vm.locationid,
              locationName : vm.data.location.name
            };
          }
        }
      });

      modalInstance.result.then(function (data) {
        vm.data.location.reviews.push(data);
      });
    };
    vm.popupReviewDelete = function (review) {
      var modalInstance = $uibModal.open({
        templateUrl: '/reviewDeleteModal/reviewDeleteModal.view.html',
        controller: 'reviewDeleteModalCtrl',
        controllerAs: 'vm',
        resolve : {
          reviewData : 
          function () {
            return {
              locationid : vm.locationid,
              locationName : vm.data.location.name,
              review: review
            };
          }
          
          
        }
      });

     modalInstance.result.then(function (reviewId) {
        vm.data.location.reviews = $filter('filter')(vm.data.location.reviews, {_id: "!"+reviewId})
      });
    };
    
    

  }

})();