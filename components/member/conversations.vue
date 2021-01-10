<template>
<div class="container">
    <div class="d-flex justify-content-between align-items-center w-75 mx-auto p-4">
        <h2 class="font-weight-normal">Messages</h2>
        <button @click="newMsg=true" class="btn pl-4 pr-4 btn-primary box-shadow">New Message</button>
    </div>
    <div class="position-relative" v-if="newMsg">
        <div  class="position-absolute bg-white box-shadow" style="right:0px;z-index:10000;width:350px;">
            <button @click="newMsg=false" class="btn material-icons btn-block text-right text-md bd-radius-5 p-3">clear</button>
            <div class="pl-4 pr-4 pb-4">
                <p class="text-sm">To:</p>
                <div class="form-group mb-0">
                    <input type="text" class="form-control" @keyup="search()" v-model="keywords">
                </div>                    
                <div class="position-relative" v-if="users.length > 0">
                    <div class="w-100 position-absolute overflow-auto bg-white box-shadow pt-2 pb-2" style="max-height:300px;z-index:10000">
                        <button @click="to = item, keywords = item.username + ' ('+item.email+')', users = []" class="btn btn-block text-left hov bd-radius-0 bd-bottom mb-0 mt-0 text-sm" v-for="(item, i) in users" :key="i" v-html="highlight(item.username) + ' <i class=\'text-info\'>('+item.email+')</i>'"></button>
                    </div>    

                </div>

                <p class="text-sm mt-4">Message Body:</p>
                <textarea rows="5" class="w-100 border" v-model="body" @keyup="body = body.trim()"></textarea>
                <div class="mt-4 w-100 text-right">
                    <button @click="startConversation()" class="btn btn-info box-shadow bd-round pl-4 pr-4" :disabled="!body || !to">Send</button>
                </div>
            </div>

        </div>
    </div>

    <div v-if="!chatOpen">
        <div class="box-shadow bg-white bd-radius-5 p-4 mt-4 w-75 mx-auto" v-if="messages.length > 0">
            <div @click="chat={...msg, to: msg.to }, chatOpen=true, newMsg = false, init()" class="w-100 d-flex align-items-center p-4 bg-light-grey bd-round mb-4 hov" v-for="(msg, i) in messages" :key="i">
                <div>
                    <button style="width:75px;height:75px;border-radius:50%" :class="bg[i] || 'bg-warning'" class="btn text-white mr-4 flex-shrink-0 text-lg text-center font-dancing-script capitailize">{{msg.to.username == user.username ? msg.from.username[0] : msg.to.username[0] }}
                    </button>
                </div>
                <div>
                    <div class="d-flex justify-content-between w-100">
                        <h6 class="capitailize">{{ msg.to.username == user.username ? msg.from.username : msg.to.username }}
                            <br><span class="text-sm text-light">{{ msg.to.email == user.email ? msg.from.email : msg.to.email }}</span>
                        </h6>
                        <p class="text-sm ml-2 text-right">{{msg.msgs[0].date}}</p>
                    </div>
                </div>
            </div>
        </div>
        <p v-else-if="loading && messages.length == 0" class="p-5 text-sm text-center">
            <span class="spinner-border spinner-border-sm mr-2 text-info"></span> Loading...
        </p>
        <p v-else class="p-5 text-sm text-center">No Conversation Found!</p>
    </div>
    <div v-else class="box-shadow bg-white bd-radius-5 p-4 mt-4 w-75 mx-auto">
        <div class="d-flex bd-bottom justify-content-between">
            <div class="d-flex align-items-center pb-4 mb-2">
                <button @click="chatOpen=false" class="btn material-icons mr-4">chevron_left</button>
                <button 
                    style="width:75px;height:75px;border-radius:50%" 
                    class="btn text-white bg-warning flex-shrink-0 text-lg text-center font-dancing-script capitailize">{{ chat.to.username == user.username ? chat.from.username[0] : chat.to.username[0] }}
                </button>
                <button class="btn p-2 ml-2 bd-round text-lg capitailize font-dancing-script">{{ chat.to.username == user.username ? chat.from.username : chat.to.username }}</button>
            </div>
            <div>
                <button @click="details=true" class="btn material-icons btn-hov bd-round">error_outline</button>
                <div class="position-relative animate__animated  animate__fadeInUp animate__faster" v-if="details" style="z-index:100000">
                    <div class="position-absolute bd-radius-5 bg-dark text-light-grey box-shadow mb-4" style="width:420px;z-index:10000000;right:0px;">
                        <div class="w-100 text-right pt-3 pr-3">
                            <button @click="details = false" class="btn text-white material-icons bd-round bg-light-grey text-md bd-radius-5 p-2">clear</button>
                        </div>
                        <div class="pl-4 pr-4 pb-4">
                            <h5 class="font-weight-normal text-white">Allergies</h5>
                            <p class="text-sm bd-bottom pb-3 mb-4">{{ appointmentDetails.allergies }}</p>
                            <h5 class="font-weight-normal text-white">Disease History</h5>
                            <p class="text-sm bd-bottom pb-3 mb-4">{{ appointmentDetails.disease_history }}</p>
                            <h5 class="font-weight-normal text-white">Family History About Disease</h5>
                            <p class="text-sm pb-3">{{ appointmentDetails.family_history }}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div style="max-height:500px" class="overflow-auto w-100 mb-5">
            <div class="w-100 p-4" v-for="(mychat, i) in chat.msgs" :key="i">
                <div v-if="mychat.sender.email == user.email" class="text-right mt-2">
                    <p class="bd-round text-sm" :class="!mychat.voice ? 'p-4 bg-light-grey box-shadow d-inline w-75' : ''">
                        <span v-html="mychat.body"></span>

                    </p>
                </div>
                <div v-else>
                    <button 
                        style="width:45px;height:45px;border-radius:50%" 
                        class="btn bg-light-grey box-shadow mr-2 d-none flex-shrink-0 text-md text-center font-dancing-script capitailize">{{chat.to.username[0] }}
                    </button>
                    <p class="bd-round text-sm text-white" :class="!mychat.voice ? 'p-4 box-shadow d-inline w-75 bg-primary' : ''">
                        <span v-html="mychat.body"></span>
                    </p>
                    <span class="small">{{mychat.date }}</span>
                </div>
            </div>
        </div>
        <div class="w-100">
            <div class="input-group bg-light box-shadow bd-round pl-2 pr-1 pt-1 pb-1">
                <input type="text" class="bg-none bd-none form-control" :placeholder="'Write a message to ' + chat.to.username"  v-model="typeMsg" @keyup="typeMsg = typeMsg.trim()">
                <div class="input-group-append">
                    <button @click="uploadImage()" class="btn mdi mdi-attachment p-0"></button>
                    <button @click="startRecording(), recording = !recording" class="btn" :class="recording ? 'beating' : ''">
                        <span v-if="recording" class="mdi mdi-microphone-off text-danger"></span>
                        <span v-else class="mdi mdi-microphone"></span>
                    </button>
                    <button @click="sendMsg()" class="input-group-text text-sm btn bg-primary text-white bd-none bd-round box-shadow material-icons" :disabled="!typeMsg">send</button>
                </div>
            </div>            
        </div>
    </div>
</div>
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
const MicRecorder = require('mic-recorder-to-mp3');
const recorder = new MicRecorder({
    bitRate: 128
});
export default {
    props: {
        appointment: {
            required: false,
            default: "NO_APPOINTMENT"
        }
    },
    data() {
        return {
            attach: null,
            recording: false,
            appointmentDetails: {
                allergies: "No Allergies Found",
                disease_history: "No Disease History Found",
                family_history: "No Family History Found"
            },
            details: false,
            typeMsg: null,
            chat: {},
            chatOpen: false,
            bg: ['bg-primary', 'bg-info', 'bg-danger', 'bg-secondary', 'bg-success', 'bg-dark'],
            to: null,
            body: null,
            newMsg: false,
            loading: true,
            user: {
                username: "Q"
            },
            users: [],
            users_duplicate: [],
            keywords: null,
            messages: []
        }
    },
    methods: {
        uploadImage() {
            this.uploadImgFile((src) => {
                let obj = {
                    sender: this.user,
                    body: `<img src="${src}" style="width:225px">`,
                    date: this.getDate(),
                    voice: true,
                }
                let { key } = this.chat
                this.chat.msgs.push(obj)
                this.firebase_put_db({ ref: 'conversations/' + key, child: 'msgs', obj: this.chat.msgs }, (res) => {
                    this.alertmsg("Message is Sent...", "success")
                })
                                
            })
        },        
        startRecording() {
            

            if (this.recording) {
                this.stopRecording(recorder)

            } else {
                recorder.start().then(() => {
                    // button.textContent = 'Stop recording';
                    // button.classList.toggle('btn-danger');
                    // button.removeEventListener('click', startRecording);
                    // button.addEventListener('click', stopRecording);
                }).catch((e) => {
                    console.error(e);
                });            

            }


        },

        stopRecording(recorder) {
            recorder.stop().getMp3().then(([buffer, blob]) => {
                const file = new File(buffer, 'music.mp3', {
                type: blob.type,
                lastModified: Date.now()
                });

                const div = document.createElement('div');
                const player = new Audio(URL.createObjectURL(file));
                player.controls = true;
                div.appendChild(player);
                // document.querySelector('#playlist').appendChild(li);
                

                let obj = {
                    sender: this.user,
                    body: player.outerHTML,
                    date: this.getDate(),
                    voice: true,
                }

                let { key } = this.chat
                this.chat.msgs.push(obj)
                this.firebase_put_db({ ref: 'conversations/' + key, child: 'msgs', obj: this.chat.msgs }, (res) => {
                    this.alertmsg("Message is Sent...", "success")
                })

                console.log(player, 'player')

            }).catch((e) => {
                console.error(e);
            });
        },
        sendMsg() {
            let obj = {
                sender: this.user,
                body: this.typeMsg,
                date: this.getDate(),
                voice: false,
            }
            let { key } = this.chat
            this.chat.msgs.push(obj)
            this.firebase_put_db({ ref: 'conversations/' + key, child: 'msgs', obj: this.chat.msgs }, (res) => {
                this.alertmsg("Chat is Sent...", "success")
            })

            this.makeConversationAsReadOrUnread(false)

        },
        makeConversationAsReadOrUnread(status) {
            let { key } = this.chat
            this.firebase_update({ ref: 'conversations/' + key + "/read", object: status }, (res) => {
                // this.alertmsg("Message is unread", "success")
            })

        },
        startConversation() {
            let obj = {
                read: false,
                to: this.to,
                from: this.user,
                msgs: [
                    { body: this.body, date: this.getDate(), sender: this.user }
                ],

            }
            for(let i=0; i<this.messages.length; i++) {
                if(obj.to.email == this.messages[i].to.email) {
                    this.alertmsg("You have Already A Conversation Exists With this user", "info")
                    return
                }
            }
            this.firebase_push_db({ ref: 'conversations', obj }, (res) => {
                this.alertmsg("Chat Created Successfully")
                this.messages.push(obj)
            })
        },
        highlight(str) {
            return str.split(this.keywords).join("<mark>"+this.keywords+"</mark>")
        },
        openConversation() {
            this.to = this.appointment.user
            this.keywords = this.appointment.user.username + ' ('+this.appointment.user.email+')'
            this.appointmentDetails = this.appointment

            for(let i=0; i<this.messages.length; i++) {
                let msg = this.messages[i]
                if(this.appointment.user.email == msg.to.email) {
                    this.alertmsg("Opening Conversation", "info")
                    this.chat = msg
                    this.chatOpen = true
                    return
                }
            }
            this.newMsg = true
        },
        search() {
            if(!this.keywords) {
                this.users = []
                return
            }
            let $this = this
            this.users = this.users_duplicate.filter(function(el) {
                return el.username.includes($this.keywords)
            })
        },
        init() {

            if(this.getCookie("mywebsite.registration")) {
                this.user = this.getCookie("mywebsite.registration")
                this.firebase_get("conversations", (res) => {
                    if(res) {
                        
    
                        this.messages = []
                        this.messages = res.filter(el => {

                            if (el.from && el.to) {

                                return el.from.email == this.user.email || el.to.email == this.user.email
                            }
                        })

                        let unread = this.messages.filter(el => !el.read)

                        console.log(unread, 'un-read messages')
                        if (unread.length > 0) {
                            EventBus.$emit("notifications-of-messages", unread)
                        }
                    
                        if(this.appointment) {
                            this.openConversation()
                        }
                    }
                    this.loading = false
                })

            }


        }         
    },
    mounted() {


        this.firebase_get("users", (res) => {
            this.users_duplicate = res
        })


        EventBus.$on('open_conversation', (conversation) => {

            this.loading = false
            this.newMsg = false
            this.chatOpen = true
            this.chat = conversation

            this.makeConversationAsReadOrUnread(true)


            console.log('opening-conversation', conversation)

        })

        this.init()
    
    }    
}
</script>

<style>
@keyframes heartbeat
{
  0%
  {
    transform: scale( .75 );
  }
  20%
  {
    transform: scale( 1 );
  }
  40%
  {
    transform: scale( .75 );
  }
  60%
  {
    transform: scale( 1 );
  }
  80%
  {
    transform: scale( .75 );
  }
  100%
  {
    transform: scale( .75 );
  }
}

.beating
{
  /* background-color: red;
  width: 50px;
  height: 50px; */
  animation: heartbeat 1s infinite;
}
</style>
