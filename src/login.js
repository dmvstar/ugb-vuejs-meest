//Vue.use(Vuetify);

new Vue({

  el: '#app',

    vuetify: new Vuetify({
      theme: {
        disable: false,
        dark: true,
        //themes: { dark },
      },
    }
   ),

   data: {

    user: {
      username: null,
      password: null
    }

  }
});


