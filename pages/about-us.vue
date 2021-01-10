<template>
<div class="container mt-5">
    <h2>About Us</h2>
    <br>
    <p>
        Hello Everyone! <br><br>
        Welcome to DishSatInfo Inc, your number one source for all receiver softwares. We're dedicated to giving you the very best of receiver softwares, with a focus on update satellite keys, updated receiver softwares and much more.
        <br>
        <br>
        Founded in 2020 by Edwardes Fray, DishSatInfo Inc has come a long way from its beginnings in Karachi, Pakistan. When Edwardes Fray first started out, their passion for Dish Satellite drove them to  quit day job, do tons of research so that DishSatInfo Inc can offer you the world's most advanced uptodate softwares and keys. We now serve customers all over country, and are thrilled that we're able to turn our passion into our own website.

        <br>
        <br>
        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.

        <br>
        <br>
        Sincerely,
        <br>
        Edwardes Fray        
    </p>
</div>
</template>

<script>
export default {
  data() {
    return {
      head: {
          title:"About Us - Dish Satellite Information",
          content: 'Dish Satellite Information'
      },      
    }
  },
  head () {
      return {
          title: this.head.title,
          meta: [
              { hid: 'description', name: 'description', content: this.head.content }
          ],
          link: [
              { rel: "canonical", href: "https://www.dishsatinfo.com/about-us"}
          ]
      }
  },   
}
</script>

<style>

</style>