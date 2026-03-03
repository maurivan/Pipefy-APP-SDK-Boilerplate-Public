let pipefySDK;

document.addEventListener('DOMContentLoaded', function () {
  pipefySDK = PipefyApp.init();
});

PipefyApp.initCall({
  'pipe-view': function (p, pipe) {
    return {
      icon: './icons/MyLogo.png',
      text: 'My Pipefy App',
      url: './pipe-view.html',
      
    };
  },
  'card-tab': function (p, pipe) {
    return {
      title: 'My Pipefy App',
      icon: './icons/MyLogo.png',
      url: './card-tab.html',
      buttons: []
    };
  },
});

console.log('start.js loaded');