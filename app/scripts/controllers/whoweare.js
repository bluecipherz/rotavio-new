'use strict';

angular.module('BczUiApp')
    .controller('WhoweareCtrl', function (loginService, paraService) {

      var vm = this;

      function tickerMe(params) {
        var tm = this;
        tm.element = $(params.element);
        tm.text = tm.element.text();
        tm.element.empty();

        tm.textArray = tm.text.split('');
        tm.tempText = "";
        tm.counter = 0;
        tm.speed = params.speed;

        function setText() {
          if(tm.textArray[tm.counter] != null){
            tm.tempText += tm.textArray[tm.counter];
            putText(tm.tempText);
            if(tm.counter <= tm.textArray.length){
              tm.counter++;
              setTimeout(function () {
                setText();
              },tm.speed)
            }else{
              if(params.callback) params.callback();
            }
          }
        }

        setText();

        function putText(text) {
          tm.element.text(text);
        }
      }

      // new tickerMe({element :'#wwaHead', speed : 50,  callback : initItems});
      // new tickerMe({element :'#wwaMotto', speed : 20});

      function initItems() {

      }

      paraService.addPara('whoweare', 'wwa-cont', { id:'#wwa-cont', translate : -0.2 })
      // paraService.addPara('whoweare', 'wwa-img', { id:'#wwa-img', translate : 0.2 })
      paraService.addPara('whoweare', 'wwa-head-set', { id:'#wwa-head-set', translate : -0.6 })

      vm.items = [
        {
          id: 0, name: 'Bhamidimarri Bharati Swaroop', img: 'images/wwa/team/swaroop.jpg',
          domain: 'Founder, CEO & Head Helicopter Development',
          details: [
            'M.Tech, Aerospace Engineering, IIT Kanpur (2012)',
            'Expertise in Helicopter Controls and Avionics'
          ]
        },
        {
          id: 1, name: 'Vishnu Prasad', img: 'images/wwa/team/vishnu.jpg',
          domain: 'Co-founder, CFO & Head Servo Design & Development',
          details: [
            'M.Tech, Aerospace Engineering, IIT Kanpur (2011)',
            'Expertise in Servo Design & Avionics'
          ]
        },
        {
          id: 2, name: 'Rohin Kumar Majeti', img: 'images/wwa/team/rohin.jpg',
          domain: 'Co-founder, Advisor, Simulation & Analysis',
          details: [
            'M.Tech, Aerospace Engineering, IIT Kanpur (2001)',
            'Ph.D Aerospace Engineering, IIT Kanpur (2014)',
            'Expertise in Helicopter Dynamics, Simulation & Analysis'
          ]
        },
        {
          id: 3, name: 'Prof C. Venkatesan', img: 'images/wwa/team/venkatesan.jpg',
          domain: 'Advisor, Helicoper Technology & Design',
          details: [
            'Former Head, Dept of Aerospace Engineering, IIT Kanpur',
            'Fellow, Indian National Academy of Engineering',
            'Expertise in Helicoper Technology & Design'
          ]
        },
        {
          id: 4, name: 'Divyajyoti Guchait', img: 'images/wwa/team/divyajyoti.jpg',
          domain: 'Senior Engineer, Mechanical Design & Manufacturing',
          details: [
            'M.Tech, Aerospace Engineering, IIT Kanpur (2012)',
            'Expertise in Manufacturing Design & Modeling'
          ]
        },
        {
          id: 5, name: 'Sai Kiran', img: 'images/wwa/team/saikiran.jpg',
          domain: 'Associate Engineer, Mechanical Design & Manufacturing',
          details: [
            'B.Tech, Mechanical Engineering, JNTU Hyderabad (2016)'
          ]
        },
        {
          id: 6, name: 'Rishi Bajpai', img: 'images/wwa/team/rishi.jpg',
          domain: 'Engineer, Helicopter Pilot & Flight Testing',
          details: [
            'B.Tech, Electronics Engineering, UPTU, Kanpur (2013)',
            'Expertise in Helicopter Piloting, Assembly, Flight Testing & Hardware Integration'
          ]
        },
        {
          id: 7, name: 'Sriram', img: 'images/wwa/team/sriram.jpg',
          domain: 'Senior Engineer, Simulation & Analysis',
          details: [
            'B.Tech, Civil Engineering, JNTU Kakinada (2010)',
            'M.Tech, Aerospace Engineering, IIT Kanpur (2012)'
          ]
        },
        {
          id: 8, name: 'Spandana Bopparaju', img: 'images/wwa/team/spandana.jpg',
          domain: 'Associate Engineer, Control Systems Simulation',
          details: [
            'B.Tech, Electronics Engineering, JNTU Hyderabad (2016)'
          ]
        },
        {
          id: 9, name: 'Pubali', img: 'images/wwa/team/pubali.jpg',
          domain: 'Business Assistant',
          details: null
        }
      ];



      vm.selectItem = function (item) {
        if(vm.selectedItem == null && item.details){
          vm.selectedItem = item;
        }else{
          vm.selectedItem = null;
        }
      }


      $(window).scrollTop(1);
    })
