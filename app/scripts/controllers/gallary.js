/**
 * Created by intellicar-rinas on 3/5/17.
 */
'use strict';

angular.module('BczUiApp')
  .controller('GalleryCtrl', function ($scope, loginService, paraService, $state, $stateParams) {
    $(window).scrollTop(1);
    var vm = this;

    console.log("Im loading")

    vm.items = [
      {src:'__-3nWjv2c0'}
    ]


  })
