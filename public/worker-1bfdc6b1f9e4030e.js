!function(){"use strict";let e=!1,t=!1,n=!1;function i(e){self.registration.showNotification("Anthill v2",{body:e,icon:"/icon512_rounded.png"})}async function l(){setInterval(()=>{let l=function(){let e=new Date,t=new Date(e);return t.setHours(14,38,0,0),t.getTime()-e.getTime()}(),a=function(){let e=new Date,t=new Date;return t.setDate(e.getDate()+(5-e.getDay()+7)%7),t.setHours(16,0,0,0),t<e&&t.setDate(t.getDate()+7),t.getTime()-e.getTime()}(),o=function(){let e=new Date;return new Date(e.getFullYear(),e.getMonth()+1,0,16,0,0,0).getTime()-e.getTime()}();l<=36e5&&!e?(i("Fill your hours"),e=!0):l>36e5&&(e=!1),a<=36e5&&!t?(i("Fill your hours"),t=!0):a>36e5&&(t=!1),o<=36e5&&!n?(i("Fill your hours"),n=!0):o>36e5&&(n=!1)},3e5)}self.addEventListener("install",function(e){e&&e.waitUntil(self.skipWaiting())}),self.addEventListener("activate",function(e){e&&(e.waitUntil(self.clients.claim()),l())})}();