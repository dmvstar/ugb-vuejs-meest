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

    mail: {
      from: null,
      dest: null,
      subj: null,
      text: null
    }

  }
});


