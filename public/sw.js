if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>n(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts("/fallback-ce627215c0e4a9af.js","/worker-2c622d548ba78bf4.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/183-0ccfe2ec4f2c959b.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/190-25759d3ffd64712e.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/231-d61d49788c6053fe.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/546-82d9ddbbc8a72942.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/590-5497e9b4d94ba5da.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/67-1e729b92dc3b9e2d.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/688-0d29633ce97c8571.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/798-07e577097499cbe6.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/80-f5dfdbb4464e4f07.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/(dashboard)/loading-1022fb67d11c2587.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/(dashboard)/page-8dcb45747277b910.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/(routes)/playground/page-9744a2dd3947051e.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/(routes)/settings/%5BactivityId%5D/page-886a6c254d353b94.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/(routes)/settings/error-f6dde5a53b2581ff.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/(routes)/settings/layout-858c9dd3d91168e7.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/(routes)/settings/page-4e653fc5bd6f2d1a.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/_not-found/page-37e39f10ae3adc03.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/global-error-f2185ff41c91ae4a.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/layout-7148100d12557dbd.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/not-found-4fb324695f95aea5.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/sign-in/%5B%5B...sign-in%5D%5D/page-73758564c47cc7a2.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/sign-up/%5B%5B...sign-up%5D%5D/page-c7bc49eea365e5af.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/app/~offline/page-22923c27b0bddba0.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/fd9d1056-08f41182e27e82c2.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/main-app-e9616c66a51935fc.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/main-fe70a8614c61323b.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-cf0a3d0edcfcbb3f.js",revision:"mjbuqcV3nR822785LW1O-"},{url:"/_next/static/css/2ae7c4a595866bdc.css",revision:"2ae7c4a595866bdc"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/mjbuqcV3nR822785LW1O-/_buildManifest.js",revision:"b80a314cb6a2d309a59fc9f3124ce4fa"},{url:"/_next/static/mjbuqcV3nR822785LW1O-/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/fallback-ce627215c0e4a9af.js",revision:"9ce9e8fe1a0baf80515b990b51ddc4df"},{url:"/icon512_maskable.png",revision:"90ba7d77a348626c69ffb952b7186c34"},{url:"/icon512_rounded.png",revision:"916f37606047b95332687d081a49f19a"},{url:"/manifest.json",revision:"ce3a4419102dc2dbe7906e920fd702b8"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/worker-2c622d548ba78bf4.js",revision:"416567c2eb96d923641018c2769c33b9"},{url:"/~offline",revision:"mjbuqcV3nR822785LW1O-"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e},{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET")}));
