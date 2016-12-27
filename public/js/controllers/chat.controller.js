'use strict';
(function() {

	angular.module('gachat')

	.controller('ChatCtrl', ['HttpFactory', '$state', '$location', function(HttpFactory, $state, $location) {
    const $ctrl = this;

		console.log("this is ChatCtrl");

		$ctrl.sendMessage = sendMessage;
		$ctrl.getAllMessages = getAllMessages;
		$ctrl.stripDate = stripDate;
		$ctrl.checkForUser = checkForUser;

		activate();

		function activate() {
			checkForUser();
			$ctrl.messages = "";
			$ctrl.currentUrl = $state.params.gameName;
			$ctrl.userName = JSON.parse(localStorage.getItem('User-Data')).data.email;
			getAllMessages();
		}

		function checkForUser() {
			if (localStorage['User-Data']) {
				$ctrl.loggedIn = true;
				let userJsonObj = JSON.parse(localStorage.getItem('User-Data'))
				$ctrl.currentUserName = userJsonObj.data.email;
			} else {
				$ctrl.loggedIn = false;
				$location.url(['/']);
			}
		}

		function sendMessage() {
			$ctrl.chatMessage.type = $ctrl.currentUrl;
			$ctrl.chatMessage.user = $ctrl.userName;
			console.log($ctrl.chatMessage);
			let newMessage = {
				data: $ctrl.chatMessage,
				url: `/api/messages/${$ctrl.currentUrl}`
			}
			HttpFactory.post(newMessage).then((res) => {
				$ctrl.getAllMessages();
			})
		}

		function getAllMessages() {
			let getMessages = {
				url: `/api/messages/${$ctrl.currentUrl}`
			}
			HttpFactory.get(getMessages).then((res) => {
				$ctrl.messages = res.data;
				console.log($ctrl.messages);
			})
		}

		function stripDate(date) {
			return date.substring(0,10);
		}

	}]);
}());
