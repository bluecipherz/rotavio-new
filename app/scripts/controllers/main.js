'use strict';

/**
 * @ngdoc function
 * @name alFjrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the alFjrApp
 */

angular.module('BczUiApp')
    .controller('HeaderController', function ($state, paraService, $scope) {
      var vm = this;

      vm.state = $state;
      vm.solidHeader = false;



      paraService.addPara('home', 'pageBlock1', {
        id: '#pageBlock1',
        callback: function (el) {
          if(el.top < 30){
            vm.solidHeader = true;
          }else{
            vm.solidHeader = false;
          }
          if(!$scope.$$phase) $scope.$apply();
        },
      });

    })
    .controller('MainCtrl', function ($state, paraService, $scope) {
      var vm = this;


      vm.go = function (id) {
        $state.go('explore', {id : id})
      }


      paraService.addPara('home', 'pageBlock2', {
        id: '#pageBlock2',
        callback: function (el) {
          if(el.top < -30){
            vm.hideBg1 = true;
          }else{
            vm.hideBg1 = false;
          }
          if(!$scope.$$phase) $scope.$apply();
        },
      });

      paraService.addPara('home', 'pageBlock4', {
        id: '#pageBlock4',
        callback: function (el) {
          // var scale = Math.min((el.top + window.innerHeight)/ window.innerHeight / 5, 1.5) + 1;
          // var marginLeft = (window.innerHeight - $('#hm-building2').width()) / 2;
          // $('#hm-building2').css({'transform' : 'scale('+scale+')', 'margin-left':marginLeft});
        },
      });


      paraService.addPara('home', 'bg1', {
        id: '#bg1',
        callback: function (el) {
          // el.el.css({top : el.scrollTop / 5 * -1})
        },
      });

      paraService.addPara('home', 'hm1-drone', {
        id: '#hm1-drone',
        callback: function (el) {
          var speed = el.scrollTop / 3 * -1;
          el.el.css({top : speed * 0.8, right:speed * .9})
        },
      });

      paraService.addPara('home', 'hm-dleaf', { id:'#hm-dleaf', translate : 0, rotate:5.1})
      paraService.addPara('home', 'cloud-1', { id:'#cloud-1', translate : 0.15})
      paraService.addPara('home', 'hm-tab', { id:'#hm-tab', translate : 0.15})





















      var renderer, camera, loader, viewportHeight, viewportWidth, scene, viewportId = 'hmt2-servo', geoMesh;

      function initThree(){
        var threeInter = setInterval(function () {
          if($('#'+viewportId).length > 0){
            viewportHeight = $('#'+viewportId).height();
            viewportWidth = $('#'+viewportId).width();
            init();
            clearInterval(threeInter);
          }
        },20)
      }

      function init() {
        if(paraService.renderer){
          renderer = paraService.renderer;
        } else{
          renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
          paraService.renderer = renderer;
        }
        renderer.setSize(viewportWidth, viewportHeight);
        renderer.setClearColor( 0x000000, 0 ); // the default
        document.getElementById(viewportId).appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(45, viewportWidth / viewportHeight, 1, 500);
        camera.position.set(2.5, 2.5, 2.5);

        loader = new THREE.JSONLoader();

        scene = new THREE.Scene();

        var material = new THREE.MeshPhongMaterial({
          // map : texture,
          color : 0x333333,
          vertexColors : THREE.VertexColors,
          specular: 0x555555,
          shininess: 100,
        });

        if(!paraService.servoBody){
          loader.load('models/servo/servo.js', function (geo, mat) {
            geoMesh = new THREE.Mesh(geo, material);
            paraService.servoBody = geoMesh;
            camera.lookAt(geoMesh.position);
            animate();
            scene.add(geoMesh);
            loadText();
          })
        }else{
          geoMesh = paraService.servoBody;
          cancelAnimationFrame(paraService.servoAnimId);
          animate();
          camera.lookAt(geoMesh.position);
          scene.add(geoMesh);
        }

        var floader = new THREE.FontLoader();

        function loadText() {

          floader.load( 'fonts/Gotham/Gotham_Book.json', function ( font ) {

            // your code here

            var material = new THREE.MeshPhongMaterial({
              // map : texture,
              color : 0x991111,
              vertexColors : THREE.VertexColors,
              specular: 0x550000,
              shininess: 100,
            });

            var height = 0.5, size = 1, hover = 30, curveSegments = 4,
                bevelThickness = 0.05, bevelSize = 0.05, bevelSegments = 3, bevelEnabled = true,
                weight = "bold", // normal bold
                style = "normal"; // normal italic

            var textGeo = new THREE.TextGeometry( 'ROTAVIO', {

              size: size,
              height: height,
              curveSegments: curveSegments,

              font: font,
              weight: weight,
              style: style,

              bevelThickness: bevelThickness,
              bevelSize: bevelSize,
              bevelEnabled: bevelEnabled,

            });
            var rotavioText = new THREE.Mesh(textGeo, material);
            var rotavioText2 = new THREE.Mesh(textGeo, material);


            rotavioText.position.y =0.2;
            rotavioText.position.x =-0.40;
            rotavioText.position.z =0.38;
            rotavioText.scale.x =0.13;
            rotavioText.scale.y =0.13;
            rotavioText.scale.z =0.13;


            rotavioText2.position.y =0.2;
            rotavioText2.position.x =0.43;
            rotavioText2.position.z =-0.325;
            rotavioText2.rotation.y =3.14159;
            rotavioText2.scale.x =0.13;
            rotavioText2.scale.y =0.13;
            rotavioText2.scale.z =0.13;
            // camera.lookAt(rotavioText.position);

            geoMesh.add(rotavioText);
            geoMesh.add(rotavioText2);

          } );
        }



        var light = new THREE.AmbientLight('#d1c4a7'); // soft white light
        scene.add(light);

        // Create directional light and add to scene.
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(-3, 20, 100).normalize();
        scene.add(directionalLight);

        renderer.render(scene, camera)
      }

      function animate() {
        paraService.servoAnimId = requestAnimationFrame( animate );
        render();
      }

      function render() {
        geoMesh.rotation.y += 0.015;
        renderer.render(scene, camera);
      }

      initThree();

    })
