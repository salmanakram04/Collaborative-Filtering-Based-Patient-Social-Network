<template>
<div>
    <div class="container-fluid bg-primary" style="height:500px">
        <div class="container h-100">
            <div class="d-flex align-items-center h-100">
                <div class="w-50">
                    <h1 class="text-white display-4 font-weight-bold">Heal Together. <br> Get Answers. <br> Take Charge.</h1>
                    <p class="text-md text-white mt-4">Here, no one goes it alone.</p>
                    <button class="bg-white text-dark bd-radius-0 p-3 text-md btn">Meet Jackie</button>
                </div>
                <div class="w-50">
                    <img :src="img1" alt="" width="500px">
                </div>
            </div>
        </div>
    </div>
    
    <div class="container mt-5">
        <div class="d-flex align-items-center">
            <div class="w-50">
                <img :src="img2" width="500px" alt="">
            </div>
            <div class="w-50">
                <h3>Heal Together</h3>
                <p>Make helpful connections, learn, and be part of a safe community who has your back when you need it most</p>
                <ul>
                    <li class="text-primary">PatientsLikeMe members connect through art</li>
                    <li class="text-primary">Sleep can be challenging. Here are sleep tips from the community</li>
                    <li class="text-primary">See what members are doing during social distancing</li>
                </ul>
            </div>
        </div>
    </div>

    <br>
    <hr>
    <br>

    <div class="container mt-5">
        <div class="d-flex align-items-center">
            <div class="w-50">
                <h3>Get Answers</h3>
                <p>Ask questions that matter to you – and get crowd-sourced answers that help you move forward.</p>
                <ul>
                    <li class="text-primary">How you can build resiliency</li>
                    <li class="text-primary">Dr. Kate Burke answers common coronavirus questions</li>
                    <li class="text-primary">How art can improve your health</li>
                </ul>
            </div>
            <div class="w-50">
                <img :src="img3" width="500px" alt="">
            </div>
        </div>
    </div>

    <br>
    <hr>
    <br>

    <div class="container mt-5">
        <div class="d-flex align-items-center">
            <div class="w-50">
                <img :src="img4" width="500px" alt="">
            </div>
            <div class="w-50">
                <h3>Take Charge</h3>
                <p>Get personalized education, helpful tools, and motivational nudges that will help you take charge of your health in new and relevant ways</p>
                <ul>
                    <li class="text-primary">Taking care of your mental health during COVID-19</li>
                    <li class="text-primary">How treatment evaluations help you and the community</li>
                    <li class="text-primary">What does good care mean to you?</li>
                </ul>
            </div>
        </div>
    </div>

    
    <br>
    <br>

</div>
</template>

<script>
import img1 from "@/assets/images/hero_img.png"
import img2 from "@/assets/images/2.png"
import img3 from "@/assets/images/3.jpg"
import img4 from "@/assets/images/4.jpg"
export default {
    data() {
        return {
            img1: img1, 
            img2, img3, img4
        }
    }
};
</script>

<style></style>