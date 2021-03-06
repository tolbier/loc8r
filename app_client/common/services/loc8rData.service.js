(function() {
    angular
        .module('loc8rApp')
        .service('loc8rData', loc8rData);

    loc8rData.$inject = ['$http', 'authentication'];

    function loc8rData($http, authentication) {
        var locationByCoords = function(lat, lng) {
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat +
                '&maxDistance=1200');
        };
        var locationById = function(locationid) {
            return $http.get('/api/locations/' + locationid);
        };
        var addReviewById = function(locationid, data) {
            return $http.post('/api/locations/' + locationid + '/reviews', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };
        var deleteReviewById = function(locationid, reviewid) {
            return $http.delete('/api/locations/' + locationid + '/reviews/'+reviewid, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        return {
            locationByCoords: locationByCoords,
            locationById: locationById,
            addReviewById: addReviewById,
            deleteReviewById: deleteReviewById,
        };
    }
})();
