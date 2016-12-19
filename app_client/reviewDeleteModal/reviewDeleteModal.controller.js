(function() {
    angular
        .module('loc8rApp')
        .controller('reviewDeleteModalCtrl', reviewDeleteModalCtrl);
    reviewDeleteModalCtrl.$inject = ['$uibModalInstance', 'loc8rData', 'reviewData'];

    function reviewDeleteModalCtrl($uibModalInstance, loc8rData, reviewData) {
        var vm = this;
        vm.reviewData = reviewData;
        
        vm.onSubmit = function() {
            vm.doDelReview(vm.reviewData.locationid, vm.reviewData.review._id);
        };
        vm.doDelReview = function(locationid, reviewid) {
            loc8rData.deleteReviewById(locationid, reviewid)
                .success(function(data) {
                    vm.modal.close(vm.reviewData.review._id);
                })
                .error(function(data) {
                    if (data && data.message){
                        vm.formError= data.message;
                    }else{
                        vm.formError = "Your review has not been deleted";
                    }
                });
            return false;
        };
        
        vm.modal = {
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            },
            close : function (result) {
                $uibModalInstance.close(result);
            },
        };

    }
})();
