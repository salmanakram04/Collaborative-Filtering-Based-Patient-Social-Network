<template>
  <div class="shadow px-3 bd-radius-5 animate__animated animate__zoomIn" style="position:fixed; z-index:10000; bottom: 50px;right:50px; background:white; ">
       <a @click="chat_open = !chat_open" href="javascript:void(0)" class="btn mdi " :class="chat_open ? 'mdi-close text-light mb-2 animate__animated animate__zoomIn pt-3' : 'mdi-chat text-primary mdi-36px'"></a>
    <div v-if="chat_open" class="container px-0 animate__animated animate__zoomIn">
        <div id="chat-container" style="min-height:400px; max-height:400px; height:400px;" class="overflow-auto">
            <div
                class="row mx-0 px-2 my-0"
                :class="msg.type == 'SENDER' ? 'justify-content-end' : ''"
                v-for="(msg, i) in chat"
                :key="i"
            >
                <div class="col-lg-7 px-0 animate__animated animate__fadeInUp">
                <div
                    class="d-flex"
                    :class="
                    msg.type == 'RECEIVER'
                        ? 'justify-content-start'
                        : 'justify-content-end'
                    "
                >
                    <div v-if="msg.type == 'RECEIVER'" class="py-2 px-2">
                    <button
                        class="btn rounded btn-secondary mdi mdi-account mdi-24px shadow"
                    ></button>
                    </div>
                    <div class="px-0">
                    <p
                        :class="
                        msg.type == 'SENDER'
                            ? 'font-weight-bold background-light-blue'
                            : 'text-white bg-primary text-sm'
                        "
                        class="p-4 my-1 border-radius-5 shadow"
                    >
                        <span v-html="msg.msg"></span>
                    </p>
                    <p
                        class="py-0 text-super-light text-sm"
                        :class="msg.type == 'SENDER' ? 'text-right' : ''"
                    >
                        {{ msg.time }}
                    </p>
                    </div>
                    <div v-if="msg.type == 'SENDER'" class="py-2 px-2">
                    <button class="btn rounded btn-secondary shadow text-capitalize">{{ user.username[0]}}</button>
                    </div>
                </div>
                </div>
            </div>
        </div>

      <div class="row mx-0 mb-4">
        <div class="col-md-12 px-0">
          <textarea
            v-model="text"
            class="w-100 border p-4"
            placeholder="Write your Comment Here..."
            name=""
            id=""
            cols="30"
            rows="1"
          ></textarea>
        </div>
        <div class="col-md-12 px-0 mt-2 mb-0 text-right">
          <button
            @click="sendMsg()"
            :disabled="!text"
            class="btn btn-primary border-radius px-5 py-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
       chat_open: false,
        width: 0,
        text: null,
        chatbot: [],
        chat: [],
        expressions: [],
        user: {}
    };
  },
    methods: {
        sendMsg() {
            this.chat.push({
                type: "SENDER",
                time: "8:00 AM",
                username: "Noman",
                msg: this.text,
            });

            $("#chat-container").animate({ scrollTop: $('#chat-container').prop("scrollHeight")}, 1000);
            let reply = this.chatbotResponds(this.text)

            if (reply.p == 0) {
                reply.chatbot = [
                    "Sorry I didn't Get that",
                    "Can you Try something else"
                ]
            }

            for (let i=0; i< reply.chatbot.length; i++) {

                let timer = (i+1) * ( i > 0 ? 1000 : 1500)
                setTimeout(() => {
                    this.chat.push({
                        type: "RECEIVER",
                        time: "8:00 AM",
                        username: "",
                        msg: reply.chatbot[i],
                    });

                    $("#chat-container").animate({ scrollTop: $('#chat-container').prop("scrollHeight")}, 1500);
                    
                }, timer);

            }




        },
        chatbotResponds(query) {

            query = query.toLowerCase().replace(/[^a-zA-Z ]/g, "")
            

            for (let i=0; i < this.expressions.length; i++) {

                let defineQueries = this.expressions[i].queries
                this.expressions[i]["p"] = 0

                for (let j=0; j < defineQueries.length; j++) {

                    let defineQuery = defineQueries[j].toLowerCase().replace(/[^a-zA-Z ]/g, ""),
                        propability = this.getMeRepeatedWordsDetails(query, defineQuery)

                    if (this.expressions[i]["p"] < propability) {
                        this.expressions[i]["p"] = propability
                    }
                }   

                console.log(this.expressions[i])

            }
            
            this.expressions.sort(this.dynamicSort('p'))

            console.log(this.expressions)
            return this.expressions[0]

        },

        getMeRepeatedWordsDetails ( sentence, tester ) {
            // var tester = "a string with a lot of words";
            sentence = sentence + " ";
            var regex = /[^\s]+/g;
            var regex2 = new RegExp ( "(" + tester.match ( regex ).join ( "|" ) + ")\\W", "g" );
            var matches = sentence.match ( regex2 );

            if (!matches) return
            var words = {}, propability = 0;
            for ( var i = 0; i < matches.length; i++ ) {
                var match = matches [ i ].replace ( /\W/g, "" );
                var w = words [ match ];

                propability += 0.05
                // console.log(match, 'is-matched')
                if ( ! w )
                    // words = 0.1
                words [ match ] = 1;
                else
                    // words += 0.05
                    words [ match ]++;
            }   
            return propability;
        } 


    },

    mounted() {

       this.user = this.getCookie("mywebsite.registration")
       
       console.log(this.user, 'user')

        // console.log ( this.getMeRepeatedWordsDetails ( "another string with some words with another some other words" ) );
        this.expressions = [
            {
                queries: [
                    "I need some help",
                    "hello there"
                    // "What is Collaborative Filtering based Patient Social Network (CFBPSN)?",
                    // "How can I CONNECT with other patients like me?",
                    // "How can I track MY HEALTH?",
                    // "What's different if I'm using a mobile browser?",
                    // "How can I book appointment with Doctor?"
                ],
                chatbot: [
                    "Congratulations on taking charge of your health and seeking support.",
                    "Sharing information about your health is a great way to learn more about how you're doing over 	time.",
                    "It's also a great way to let others know what you've been through and where you are on your 	journey as a patient."
                ]
            },

            {
                queries: [
                    "What is Collaborative Filtering based Patient Social Network (CFBPSN)?"
                ],
                chatbot: [
                    "CFBPSN is a health information sharing website for patients. Only here do patients like you have 	the opportunity to share both personal stories and health data about your conditions  to help 	uncover great ideas and new knowledge.",
                    `By sharing information on our site, you can put your disease experiences in context and find 	answers to the questions you have.  You can:
                    <ul>
                        <li>know detailed information about every medication, supplement, or device used to treat patients  like you and learn about what works;</li>
                        <li>connect easily with patients that have the same conditions, experiencing the same symptoms or  using similar treatments; and</i>
                        <li>learn from patients like you.</li>                        
                    </ul>`,
                    "Imagine partnering in real time with doctors, researchers and companies to improve the 	understanding of your disease and accelerate the development of new treatments? This is what 	is at the heart of the CFBPSN vision– the kind of information sharing that will impact the 	lives of 	patients like you and transform healthcare by putting patients back at the center of the 	system."                    
                ]
            },

            {
                queries: [
                    "How can I CONNECT with other patients like me?"
                ],
                chatbot: [
                    "As you continue your health journey, you’ll find it helpful to seek support from the community, 	as well as offer support and guidance for others.",
                    "We are committed to providing a safe space for members to share their stories.",
                    "In addition to the HOME page, you can use the CONNECT menu to get involved in community 	discussions or reach out to other members directly via private message.",
                ]
            },

            {
                queries: [
                    "Can I modify or delete my forum posts?"
                ],
                chatbot: [
                    "You can modify or erase any of your forum posts at any time by going to the forum post you'd like to amend and then clicking \"Edit your post\" underneath your post."
                ]
            },
            
            {
                queries: [
                    "How can I track MY HEALTH?"
                ],
                chatbot: [
                    "You can track your conditions, treatments, symptoms and more by using the MY HEALTH menu at the top of any page.",
                    "We suggest adding a condition to get started, if you haven’t already. This will allow us to show you other members like you on the HOME page along with other relevant content you may need.",
                    "You can add and edit your conditions by clicking <a href='/member/home'>My Conditions</a>.  Similarly, you can click <a href='/member/home'>My Treatments</a> to track how you are treating your conditions"
                ]
            },

            {
                queries: [
                    "What's different if I'm using a mobile browser?"
                ],
                chatbot: [
                    "You have the same access to your account on a mobile web browser 	as you do the desktop version of our website.",
                    "If you are using our mobile app the you can see forums, posts on the home page, you can send 		message to any other user.",
                    "Main feature of our mobile is the trigger alarm, you can add medication time and set alarm. 	Alarm will be Turn On, on the given time and show message of medication time."
                ]
            },

            {
                queries: [
                    "How can I book appointment with Doctor?"
                ],
                chatbot: [
                    "You can book the appointment with any doctor by clicking on the appointment button.",
                    "Appointment can be booked only from website, For booking the appointment you search the 	doctor and send request to doctor. Doctor can either accept it or decline it.",
                    "If doctor accept the request, then patient add the details of the appointment  and date time for 	the appointment and click on the “Book Appointment” button."
                ]
            }
        ]

        setTimeout(() => {
            this.chat.push({
                type: "RECEIVER",
                time: "08:00 AM",
                username: "",
                msg: "Hi, I am here to help you. How can i help you?",
            })

            // this.sendMsg()
         
        }, 100);

    }

};
</script>

<style>
</style>