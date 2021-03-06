import {Page,NavController,Loading} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';
import {SignUp} from '../signup/signup';
import {Login} from '../login/login';
import {Chat} from '../chat/chat';
import {Profile} from '../profile/profile';
import {MyService} from '../../services/service';

@Page({
    templateUrl: 'build/pages/menu/menu.html'
})
export class Menu {
    ref:any;
    tab:any;
    friends:any;
    friendIDs:any;
    userData:any;
    allUsers:any;
    requests:any;
    requestIDs:any;
    notifications:any;
    conversations:any;

    constructor(public nav:NavController, public myService:MyService) {
        this.tab = '0';
        this.ref = myService.getFirebaseRef();
        this.friends = myService.getMeFriends();
        this.friendIDs = myService.getMyFriendIDs();
        this.allUsers = myService.getAllUser();
        this.requests = myService.getRequestForMe();
        this.requestIDs = myService.getRequestIDs();
        this.userData = myService.getCurrentUserData();
        this.notifications = myService.getNotifications();
        this.conversations = myService.getConversations();
        /*let a = myService.presentLoading();
        nav.present(a);
        setTimeout(() => {
            a.dismiss();
        }, 5000);

        console.log(nav);*/
    }

    /*presentLoading() {
        let loading = Loading.create({
            content: "Please wait...",
            //duration: 3000
        });
        this.nav.present(loading);
    }*/

    sendRequest(reqUser) {
        this.myService.sendRequest(reqUser);
    }

    resToReq(res, request) {
        this.myService.resToReq(res, request)
    }

    goToChat(friend, index) {
        if (friend.conversationID) {
            this.conversations[index].lastMsg.read = true;
            this.nav.push(Chat, friend);
        }
        else {
            /*this.myService.getFirebaseRef().child('my_conversations').child(friend.profile.userID).on('value', (conversation)=> {
             for (var key in conversation.val()) {
             console.log(key);
             console.log(this.conversations);
             this.conversations.forEach((val)=> {
             if (val.conversationID == key) {
             console.log(key, 'Matched');
             break;
             }
             })
             }
             });*/
            console.log(friend.profile)
        }

    }

    goToProfile(friend, index) {
        this.nav.push(Profile, friend);
    }

    doLogout() {
        localStorage.removeItem('firebase:session::ionic2chat');
        localStorage.removeItem('userProfile');
        this.nav.push(Login)
    }


}