(function() {
    'use strict';

    var app = angular.module('lazyApp', []);

    
    
    app.controller('LazyCtrl', LazyController);

    LazyController.$inject = ['$scope', '$http'];
    function LazyController($scope, $http) {
        var vm = this;
        vm.data = [];
        vm.loadAmount = 25
        vm.continue = true;
        vm.title = 'Lazy Loader!';

        vm.getData = function(limit, offset){
            var limit = limit || vm.loadAmount;
            var offset = offset | 0;;
            var url = 'http://www.stellarbiotechnologies.com/media/press-releases/json?limit=' 
                        + (limit+1) + '&offset=' + offset;
           
            $http.get(url).success(function(res) {
                var data = angular.fromJson(res.news);
                var i = 0;
                
                if (Object.keys(data).length < (limit+1)) {
                    vm.continue = false;
                }
                //console.log(Object.keys(data).length);
                //console.log((limit+1));
                angular.forEach(data, function(value, key){
                    if(i === limit) {
                        return false;
                    }
                    vm.data.push(value);
                    i++;
                });
                
            })
            .error(function(err) {
                console.log(err);
            });
        };

        vm.getData(vm.loadAmount, vm.offsetCount);

        activate();

        ////////////////

        function activate() { }
    }
})();