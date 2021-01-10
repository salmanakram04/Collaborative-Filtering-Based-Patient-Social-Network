<template>
<div class="container mt-5">
    <h2>Contact Us</h2>
    <br>
    <form class="was-validated">
    <div class="form-group">
        <label for="uname">Name</label>
        <input type="text" class="form-control" id="uname" placeholder="Your name i.e. John Doe" name="uname" required>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="form-group">
        <label for="pwd">Email Address:</label>
        <input type="email" class="form-control" id="pwd" placeholder="Email Address i.e. johndoe@gmail.com" name="pswd" required>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="form-group">
        <label for="pwd">Email Address:</label>
        <textarea class="form-control" rows="10" required></textarea>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="w-100 text-right">
        <button type="button" class="btn btn-primary pl-4 pr-4 box-shadow">Submit</button>
    </div>
    </form>    
</div>
</template>

<script>
export default {
  data() {
    return {
      head: {
          title:"Contact Us - Dish Satellite Information",
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
              { rel: "canonical", href: "https://www.dishsatinfo.com/contact-us"}
          ]
      }
  },   
}
</script>

<style>

</style>