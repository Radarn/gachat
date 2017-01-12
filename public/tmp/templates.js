angular.module('gachat').run(['$templateCache', function($templateCache) {$templateCache.put('about.html','<h1>About</h1>');
$templateCache.put('chat.html','<h3>\n  <span>Chat with other gamers!</span>\n</h3>\n<div class="row">\n  <div class="col s8">\n    <strong>Message</strong>\n  </div>\n  <div class="col s1 offset-s3">\n    <strong>Date</strong>\n  </div>\n</div>\n<div class="row">\n  <div class="chat-box col s12">\n    <div class="row message-border" ng-repeat="message in $ctrl.messages">\n      <div class="col s8">\n        <strong><em>{{message.user}}</em> :</strong>\n        {{message.message}}\n      </div>\n      <div class="col s2 offset-s2 right-align">\n        {{$ctrl.stripDate(message.date)}}\n      </div>\n      <br>\n    </div>\n  </div>\n</div>\n<div class="row">\n  <div class="input-field col s12 ">\n    <textarea ng-model="$ctrl.chatMessage.newMessage" id="icon_prefix2" class="materialize-textarea"></textarea>\n    <label for="icon_prefix2">Message text</label>\n  </div>\n</div>\n<button ng-click="$ctrl.sendMessage()"class="btn waves-effect waves-light" type="submit" name="action">Send message\n    <i class="material-icons right">send</i>\n</button>\n');
$templateCache.put('edit-profile.html','\n  <div class="file-field input-field" ngf-select ng-model="$ctrl.user.file" name="file" ngf-pattern="\'image/*\'"\n    accept="image/*">\n      <div class="btn">\n        <span>File</span>\n        <input type="file">\n      </div>\n      <div class="file-path-wrapper">\n        <input class="file-path validate" type="text">\n      </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <input id="textarea-username" type="text" class="validate" ng-model="$ctrl.user.username">\n      <label for="textarea-username">User name</label>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="input-field col s12">\n      <textarea id="textarea-bio" class="materialize-textarea" length="120" ng-model="$ctrl.user.bio"></textarea>\n      <label for="textarea-bio">Your bio</label>\n    </div>\n  </div>\n\n  <button ng-click="$ctrl.upload(e, $ctrl.user.file)" class="btn waves-effect waves-light" type="submit" name="action">Update</button>\n');
$templateCache.put('home.html','<h1>Logged in as: <a href="#/edit-profile">{{$ctrl.currentUserName}}</a></h1>\n<div class="row home-menu">\n\t<div class="col s3">\n      \t<a ng-href="#/chat/counter-strike:global-offensive"><img class="responsive-img" src="public/img/csgo.jpg"></a>\n      \t<p>Counter-Strike: Global Offensive</p>\n\t</div>\n    <div class="col s3">\n  \t\t<a ng-href="#/chat/dota2"><img class="responsive-img" src="public/img/dota2.png"></a>\n        <p>Dota 2</p>\n    </div>\n\n    <div class="col s3">\n  \t\t<a ng-href="#/chat/leagueoflegends"><img class="responsive-img" src="public/img/lol.jpeg"></a>\n  \t\t<p>League of Legends</p>\n      </div>\n     <div class="col s3">\n  \t\t<a ng-href="#/chat/overwatch"><img class="responsive-img" src="public/img/overwatch.jpg"></a>\n  \t\t<p>Overwatch</p>\n\t</div>\n</div>\n');
$templateCache.put('login.html','<div class="row">\n      <form class="col s6 offset-s4">\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.logIn.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.logIn.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>\n            <button class="btn waves-effect waves-light" type="submit" name="action" ng-click="$ctrl.logUserIn()">Log in\n                  <i class="material-icons right">send</i>\n            </button>\n            <a class="btn waves-effect waves-light" type="submit" name="action" href="#/signup">Create new user\n                  <i class="material-icons right">send</i>\n            </a>\n      </form>\n</div>\n');
$templateCache.put('navbar.html','<nav>\n    <div class="nav-wrapper">\n      <div class="container">\n        <a href="#" class="brand-logo">Gachat</a>\n\n        <ul id="nav-mobile" class="right hide-on-med-and-down">\n              <li><a href="#/about">About</a></li>\n              <li><a href="#"> {{$ctrl.userName}}</a></li>\n        </ul>\n        </div>\n    </div>\n</nav>\n');
$templateCache.put('signup.html','<div class="row">\n      <form class="col s6 offset-s4">\n            <h3>Create new user</h3>\n            <div class="row">\n                  <div class="input-field col s8">\n                        <input placeholder="Email" id="email" type="text" class="validate" ng-model="$ctrl.newUser.email">\n                        <label for="email">Email Adress</label>\n                  </div>\n            </div>\n            <div class="row">\n                  <div class="input-field col s8">\n                      <input placeholder="Password" id="password" type="text" class="validate" ng-model="$ctrl.newUser.password">\n                      <label for="password">Password</label>\n                  </div>\n            </div>      \n            <button class="btn waves-effect waves-light" type="submit" name="action" ng-click="$ctrl.createUser()">Submit\n                  <i class="material-icons right">send</i>\n            </button>   \n      </form>\n</div>\n');}]);