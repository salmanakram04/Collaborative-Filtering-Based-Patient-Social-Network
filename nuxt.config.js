
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Patient System',
    script: [
      { src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js" },
      { src: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.2.1/Chart.min.js"},
      { src: "https://code.highcharts.com/highcharts.js" },
      { src: "https://code.highcharts.com/modules/series-label.js" },
      { src: "https://code.highcharts.com/modules/exporting.js" },
      { src: "https://code.highcharts.com/modules/export-data.js" },
      { src: "https://code.highcharts.com/modules/accessibility.js" },

    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", rel: "stylesheet"},
      { href:"https://fonts.googleapis.com/icon?family=Material+Icons", rel: "stylesheet"},
      { href:"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css", rel: "stylesheet"},
      { href:"https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css", rel: "stylesheet"},
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/bootstrap-ext.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/website.js',
    '~/plugins/firebase.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
