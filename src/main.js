//import axios from "axios";

var urls = [
  "https://nr-gateway.dev.ukrgasaws.com/9118aabf34299ead9f57921edb7c8209/",
  "https://nr-gateway.ukrgasaws.com/9118aabf34299ead9f57921edb7c8209/",
  "https://nr-clients.dev.ukrgasaws.com/",
  "https://nr-clients.ukrgasaws.com/",

  "http://ip-api.com/json",
  "https://api.npms.io/v2/search?q=vue",
  "https://jsonplaceholder.typicode.com/todos/1",
];
/*
1- use nr-gateway.dev
2- use nr-gateway
3- use nr-clients.dev
4- use nr-clients
*/
var modeUrl = 1;

function getWorkUrl(mode, path) {
  var url = urls[mode-1]+(mode>2?path:'');
  return url;
}


Vue.use(Vuetify);

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

  created() {
    this.loadFetchBranchs();
    this.init();
  },

  methods: {

    checkSndAddressFind: function(event) {
      // `this` внутри методов указывает на экземпляр Vue
      var index = this.selectedBranch.address.split(',')[2];
      if (index.length == 5) this.sendIndex = index;
      var street = this.selectedBranch.address.split(',')[4].trim().split(' ')[1].toLowerCase();
      this.sendStreet = street;
      var building = this.selectedBranch.address.split(',')[5].toLowerCase();
      this.sendBuilding = building;
      if (this.sendIndex.length == 5 && this.sendStreet.length > 3) this.isSndAddressFindMeestDisabled = false;
      if (this.recvIndex.length == 5 && !this.isSndAddressFindMeestDisabled) this.isRecvAddressFindMeestDisabled = false;
    },

    loadAddressByCityStreet: async function(vsendCityId, vsendStreet) {

      var headers = {
        "accept": "application/json", "Content-Type": "application/json", "x-auth-token": "PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8",
        "x-post-geturl": "https://nr-clients.dev.ukrgasaws.com/",
        "x-post-pathto": "meestua/api/", "x-post-method": "address"
      };
      var realUrl = getWorkUrl(modeUrl, 'meestua/api/'+'address');
//alert(realUrl);
      /*
      {
        "filters": {
          "cityID": sendCityId,
          "addressDescr": "%"+sendAddress+"%"
        }
      };
      */
      var result = {};
      var filter = {};
      filter.filters = {};
      filter.meestToken = this.meestToken;
      filter.filters.cityID = vsendCityId; //this.sendCityId;
      filter.filters.addressDescr = "%" + vsendStreet + "%";
      //filter.filters.addressDescr = this.sendStreet;
//alert("loadAddressByCityStreet 1 filter "+JSON.stringify(filter, null, ' '));
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(filter)
      };

      await fetch(realUrl, requestOptions)
        .then(async response => {
          const data = await response.json();

          if (data.data instanceof Array) {
            //this.sendAddresses
            result.addresses = this.parseAddresses(data.data);
            //this.recvAddresses = this.parseAddresses(data.data);
          } else {
            //this.sendAddresses
            if(data.data !== undefined)
              result.addresses =  this.parseAddresses([data.data]);
          }
//alert("loadAddressByCityStreet 2 "+JSON.stringify(result.addresses, null, ' '));
          if (result.addresses === undefined || result.addresses.length === 0)
            alert("Поиск адреса - пуст, попробуйте уточнить запрос улицы.")
          else {
              if(result.addresses.length === 1){
                //this.sendAddressId
                result.addressId = result.addresses[0].index;
                //this.selectedSendAddres
                result.addressSelect = result.addresses[0].index;
              } else {
                  alert('По данному шаблону адреса ['+vsendStreet+'] более одного адреса, уточните адрес из списка');
              }
          }
//alert('loadAddressByCityStreet 2 sendAddresses ['+result.addresses.length+']['+result.addressSelect+']'+JSON.stringify(result.addresses));
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            this.error = error;
            alert('E1 loadAddressByCityStreet ' + JSON.stringify(response, null, ' ') + ' ');
            return Promise.reject(error);
          }
        })
        .catch(error => {
          //alert('E2 loadAddressByCityStreet [' + JSON.stringify(error) + '] ');
          this.error = error;
          alert("Поиск адреса - пуст, попробуйте уточнить запрос улицы." + error);
        });
        return result;
    },

    fillCityId: async function(zipCode){
//alert("1 fillCityId " + zipCode );
      var result = null;
      if(this.sendCityes.length == 0)
          result = await this.loadCitiesByZipCode(zipCode);
//alert("1 fillCityId " + zipCode + " " + JSON.stringify(result));
      if( result !== null ) {
        this.sendCityes       = result.cityes;
        this.selectedSendCity = result.selectedCity;
        this.sendCityId       = result.cityId;
      } else {
        alert('Не удалось выполнить поиск города по индексу '+zipCode);
      }
//alert("1 fillCityId " + zipCode + " " + JSON.stringify(this.sendCityes));
//alert("2 fillCityId "+this.sendCityId+' ' + JSON.stringify(this.sendCityes) );
      //await this.loadAddressByCityStreet(this.sendCityId, this.sendStreet);
//alert("3 fillCityId 11111 " + JSON.stringify(this.sendAddresses) );
    },

    loadCitiesByZipCode: async function( zipCode ) {

      headers = {
        "accept": "application/json", "Content-Type": "application/json", "x-auth-token": "PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8",
        "x-get-geturl": "https://nr-clients.dev.ukrgasaws.com/",
        "x-get-pathto": "meestua/api/", "x-get-method": "zipcode",
        "x-get-params": "zipCode=" + zipCode + '&' + "meestToken="+this.meestToken
      };
      var result = {};
      var realUrl = getWorkUrl(modeUrl, 'meestua/api/'+'zipcode'+"?"+"zipCode=" + zipCode + '&' + "meestToken="+this.meestToken);
//alert(realUrl);
      await fetch(realUrl, {
          headers
        })
        .then(async response => {
          const data = await response.json();
//alert("1 loadCitiesByZipCode" + JSON.stringify(data));
//this.sendCityes = this.parseCities(data.data); //[0].cityDescr.descrUA;

          result.cityes = this.parseCities(data.data);
//alert("1 loadCitiesByZipCode" + JSON.stringify(result));
          if(result.cityes.length>1){
            alert('По данному индексу ['+zipCode+'] более одного города, уточните город из списка');
            result.selectedCity = result.cityes[0].index;
//this.selectedSendCity = this.sendCityes[0].index;
          }
          else {
            result.selectedCity = result.cityes[0].index;
            result.cityId = data.data[0].cityID;
//this.selectedSendCity = this.sendCityes[0].index;
//this.sendCityId = data.data[0].cityID;
//this.loadAddressByCityStreet(this.sendCityId, this.sendStreet);
          }
//alert("2 loadCitiesByZipCode "+JSON.stringify(this.selectedSendCity));
//alert("2 loadCitiesByZipCode "+JSON.stringify(this.sendCityes[0].index));
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            this.error = error;
            return Promise.reject(error);
          }
        })
        .catch(error => {
          alert('E1 loadCitiesByZipCode, [' + JSON.stringify(error) + '] ');
          this.error = error;
        });
        return result;
    },

    createParcelMeestRequest: async function( parcel ) {
      parcel.meestToken =this.meestToken;
      var headers = {
        "accept": "application/json", "Content-Type": "application/json", "x-auth-token": "PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8",
        "x-post-geturl": "https://nr-clients.dev.ukrgasaws.com/",
        "x-post-pathto": "meestua/api/", "x-post-method": "parcel"
      };
      var realUrl = getWorkUrl(modeUrl, 'meestua/api/'+'parcel');
      var result = {};

//alert("createParcelMeestRequest 1 parcel "+JSON.stringify(parcel, null, ' '));

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(parcel)
      };

      this.isCreateParcelMeestDisabled = true;
//alert("createParcelMeestRequest 2 parcel "+JSON.stringify(requestOptions, null, ' '));

      await fetch(realUrl, requestOptions)
        .then(async response => {
          const data = await response.json();
//alert("createParcelMeestRequest 3 " + JSON.stringify(data));
          result = data;
          delete(result.data[0].sticker);
          delete(result.data[0].stickerbin);
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            this.error = error;
            return Promise.reject(error);
          }
        })
        .catch(error => {
          alert('E1 loadCitiesByZipCode, [' + JSON.stringify(error) + '] ');
          this.error = error;
        });
alert("createParcelMeestRequest 4 " + JSON.stringify(result, null, ' '));
        this.parcelData = result.data[0];
        this.parcelStickerUrl = result.data[0].stickerUrl;

        this.parcelDataId = result.data[0].parcelID;
        this.parcelDataBarcode = result.data[0].barCode;
        this.parcelDataPickup = result.data[0].pickup.registerNumber;

        //this.isCreateParcelMeestDisabled = false;
        this.isGetParcelStickerDisabled = false;
        return result;
    },

    meestApiInit: async function() {
      var headers = {
        "accept": "application/json",  "Content-Type": "application/json",
        "x-auth-token": "PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8",
        "x-get-geturl": "https://nr-clients.dev.ukrgasaws.com/",
        "x-get-pathto": "meestua/api/", "x-get-method": "init"
      };
      var realUrl = getWorkUrl(modeUrl, 'meestua/api/'+'init');
      await fetch(realUrl, {
          headers
        })
        .then(async response => {
          const data = await response.json();
          this.meestToken = data.data[0].token;
//alert("1 meestApiInit "+this.meestToken);
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            this.error = error;
            return Promise.reject(error);
          }
        })
        .catch(error => {
          alert('E Init [' + JSON.stringify(error) + '] ');
          this.error = error;
        });
    },

    btnSndAddressFindMeest: async function(event) {

//alert("1 Init token "+this.meestToken);
      await this.meestApiInit();
//alert("2 btnSndAddressFindMeest "+this.meestToken);
      await this.fillCityId(this.sendIndex);
      var result = await this.loadAddressByCityStreet(this.sendCityId, this.sendStreet);

      this.sendAddresses      = result.addresses;
      this.sendAddressId      = result.addressId;
      this.selectedSendAddres = result.addressSelect;

//alert("3 btnSndAddressFindMeest 11111 " + JSON.stringify(this.sendAddresses) );

    },

    btnRecvAddressFindMeest: async function(event) {
      // `this` внутри методов указывает на экземпляр Vue
      //this.sndIndex = this.selectedBranch.address;
//alert('1 btnRecvAddressFindMeest, ' + this.recvIndex);
      var zipCode = this.recvIndex;
      // wait to http request to finish
      var result = null;
      //if(this.recvCityes == null)

      result = await this.loadCitiesByZipCode( zipCode );

      if( result !== null ) {
        this.recvCityes       = result.cityes;
        this.selectedRecvCity = result.selectedCity;
        this.recvCityId       = result.cityId;

      } else {
        alert('Не удалось выполнить поиск города по индексу '+zipCode);
        return;
      }
//alert('4 btnRecvAddressFindMeest, ' + JSON.stringify(this.recvCityes, null, ' ' ));
		  // below code will be executed after http request is finished
	    // some code

      result = await this.loadAddressByCityStreet(this.recvCityId, this.recvStreet);
      if( result !== null ) {
        this.recvAddresses      = result.addresses;
        this.recvAddressId      = result.addressId;
        this.selectedrecvAddres = result.addressSelect;
      } else {
        alert('Не удалось выполнить поиск улицы по индексу '+zipCode);
        return;
      }
      if( this.verifyForm() ) this.isCreateParcelMeestDisabled = false;
    },

    btnCreateParcelMeest: function(event) {
//alert('1 btnCreateParcelMeest, ' + this.verifyForm());
      if( this.verifyForm() ) {
         this.createParcelMeest();
      }
    },

    btnGetParcelSticker: function(event) {
//alert('1 btnGetParcelSticker, ' + this.verifyForm());
      if( this.parcelStickerUrl !== null ) {
         window.open( this.parcelStickerUrl );
      }
    },

    btnCancelParcelMeest: function(event) {
//alert('1 btnCancelParcelMeest, ' + this.parcelDataId);

      this.dialogCreateParcel = true;


      if( this.parcelDataId !== null ) {
        //this.cancelParcelMeest();
      }
    },

    cancelParcelMeest: function() {
      headers = {
        "accept": "application/json", "Content-Type": "application/json", "x-auth-token": "PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8",
        "x-get-geturl": "https://nr-clients.dev.ukrgasaws.com/",
        "x-get-pathto": "meestua/api/", "x-get-method": "parcel/cancel",
        "x-get-params": "parcelId=" + this.parcelDataId + '&' + "meestToken="+this.meestToken
      };
      var result = {};
      var realUrl = getWorkUrl(modeUrl, 'meestua/api/'+'parcel/cancel'+"?"+"parcelId=" + this.parcelDataId + '&' + "meestToken="+this.meestToken);
alert("1 cancelParcelMeest" + realUrl);
      fetch(realUrl, {
          headers
        })
        .then(async response => {
          const data = await response.json();
alert("1 cancelParcelMeest" + JSON.stringify(data));
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            this.error = error;
            return Promise.reject(error);
          }
        })
        .catch(error => {
          alert('E1 cancelParcelMeest, [' + JSON.stringify(error) + '] ');
          this.error = error;
        });

    },

    verifyForm: function() {
      var result = true;

      return result;
    },

/*
{
	"parcel": {
		"parcelNumber": "{{{parcel.parcelNumber}}}",
		"notation": "{{{parcel.notation}}}",
		"sendingDate": "{{{parcel.sendingDate}}}",
		"expectedDeliveryDate": "{{{parcel.expectedDeliveryDate}}}",
		"send": {
			"name": "{{{parcel.send.name}}}",
			"phone": "{{{parcel.send.phone}}}",
			"zip": "{{{parcel.send.zipCode}}}",
			"addressID": "{{{parcel.send.addressID}}}",
			"building": "{{{parcel.send.building}}}",
			"flat": "{{{parcel.send.flat}}}",
			"floor": "{{{parcel.send.floor}}}"
		},
		"recv": {
			"name": "{{{parcel.recv.name}}}",
			"phone": "{{{parcel.recv.phone}}}",
			"zip": "{{{parcel.recv.zipCode}}}",
			"addressID": "{{{parcel.recv.addressID}}}",
			"building": "{{{parcel.recv.building}}}",
			"flat": "{{{parcel.recv.flat}}}",
			"floor": "{{{parcel.recv.floor}}}"
		}
	}
}

*/
    createParcelMeest: function() {
      var result = null;

      var msg = {};
      msg.url = 'https://nr-clients.dev.ukrgasaws.com/meestua/api/parcel';
      msg.parcel = {};
      msg.parcel.sendingDate = this.parcelSendingDate;//"18.09.2020";
      msg.parcel.expectedDeliveryDate = this.parcelDeliveryDate;//  "23.09.2020";
      msg.parcel.parcelNumber = this.parcelNumber;//"TST-7"+ Math.floor(100000 + Math.random() * 900000);
      msg.parcel.notation = this.parcelDescription;//"Отправка карты Клиенту";
//alert( "2 createParcelMeest " + JSON.stringify(msg, null, ' ') );

      msg.parcel.send = {};
    			msg.parcel.send.name = this.selectedBranch.code;
    			msg.parcel.send.phone = "044-222-33-44";
    			msg.parcel.send.zip = this.sendIndex;
    			msg.parcel.send.addressID = this.sendAddressId;
    			msg.parcel.send.building = this.sendBuilding;
    			msg.parcel.send.flat = 1;
    			msg.parcel.send.floor = 1;

//alert( "3 createParcelMeest " + JSON.stringify(msg, null, ' ') );

      msg.parcel.recv = {};
        msg.parcel.recv.name = this.recvFirstName+' '+this.recvLastName;
        msg.parcel.recv.phone = this.recvPhone;
        msg.parcel.recv.zip = this.recvIndex;
        msg.parcel.recv.addressID = this.recvAddressId;
        msg.parcel.recv.building = this.recvBuilding;
        msg.parcel.recv.flat = this.recvFlat;
        msg.parcel.recv.floor = 1;


//alert( "5 createParcelMeest " + JSON.stringify(msg, null, ' ') );
      result = this.createParcelMeestRequest( msg );


      return result;
    },

    btnRecvRegionFindMeest: function(event) {
      // `this` внутри методов указывает на экземпляр Vue
      //this.sndIndex = this.selectedBranch.address;
      //this.vuetify.theme.dark = !this.vuetify.theme.dark;

      alert('btnRecvRegionFindMeest, ' + this.recvRegion);

    },

    switchLigthDark: function(event) {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },


    btnRecvDistrictFindMeest: function(event) {
      // `this` внутри методов указывает на экземпляр Vue
      //this.sndIndex = this.selectedBranch.address;
      alert('btnRecvDistrictFindMeest, ' + this.recvDistrict);

    },

    init: function() {
      //loadAxios();
      //this.loadData();
      //this.loadFetch();

      this.parcelNumber = "TST-7"+ Math.floor(100000 + Math.random() * 900000);
      this.parcelDescription = "Отправка карты Клиенту";
      this.sendBuilding = 1;
      this.sendFlat = 1;

      this.recvIndex = '02166';
      this.recvStreet = 'волков';
      this.recvFirstName = 'Сидоренеко';
      this.recvLastName = 'Афламія';
      this.recvFatherName = 'Шаломоновеа';
      this.recvPhone = '+380736452388';
      this.recvEmail = 'afail@ukr.net';
      this.recvBuilding = 45;
      this.recvFlat = 211;

      var dates = this.nextDayDate(new Date(), 2);
      this.parcelSendingDate  = dates.todayDate;
      this.parcelDeliveryDate = dates.nextDate;

    },
    /*
            loadAxios: function(){
    alert('loadAxios url, [' + url + '] ' );
              axios({ method: "GET", "url": url }).then(result => {
    alert('url, [' + JSON.stringify(result) + '] ' );
              }, error => {
    alert('url, [' + error + '] ' );
              });
            },
    */
    loadFetchBranchs: function() {
      // GET request using fetch with error handling
      var headers = {
        "accept": "application/json", "Content-Type": "application/json",
        "x-auth-token": "PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8",
        "x-get-geturl": "https://nr-clients.dev.ukrgasaws.com/",
        "x-get-pathto": "scrooge/core/", "x-get-method": "branchs"
      };
      var realUrl = getWorkUrl(modeUrl, 'scrooge/core/'+'branchs');
      //alert('loadFetchBranchs '+urls[3]);
      fetch(realUrl, {
          headers
        })
        .then(async response => {
          const data = await response.json();
//alert(JSON.stringify(data));
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            this.error = error;
            return Promise.reject(error);
          }
          this.locat = data.path;
          this.branchs = data.data;
        })
        .catch(error => {
          alert('url, [' + JSON.stringify(error) + '] ');
          this.error = error;
        });
    },

    parseCities: function(data) {
      var ret = [];

      for (o of data) {
        var a = {
          index: o.cityID,
          text:  o.cityDescr.descrUA,
          delivery: o.deliveryDays
        };
        ret.push(a);
      }
//alert('parseCities, ' + JSON.stringify(ret,null,' ') + ' ' );
      return ret;
    },

    parseAddresses: function(data) {
      var ret = [];

      for (o of data) {
        var a = {
          index: o.addressID,
          text:  o.addressDescr.descrUA
        };
        ret.push(a);
      }
//alert('parseAddresses, ' + JSON.stringify(ret,null,' ') + ' ' );
      return ret;
    },

    nextDayDate: function(date, i) {

            var result = {};
            var nextDay = new Date(date);
            var dd   = nextDay.getDate();
            var mm   = nextDay.getMonth()+1;
            var yyyy = nextDay.getFullYear();

            var todayDate = (dd<10?'0'+dd:dd)+'.'+(mm<10?'0'+mm:mm)+'.'+yyyy;
            result.todayDate = todayDate;

            nextDay.setDate(date.getDate() + i);
            dd   = nextDay.getDate();
            mm   = nextDay.getMonth()+1;
            yyyy = nextDay.getFullYear();
            var nextDate = (dd<10?'0'+dd:dd)+'.'+(mm<10?'0'+mm:mm)+'.'+yyyy;
            result.nextDate = nextDate;
//alert(JSON.stringify(result));
            return result;

    },

    validEmail: function (email) {
      const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    convertDateFromISO: function (date) {
      var result = date;
      var dts = date.split('-');
      result = dts[2]+'.'+dts[1]+'.'+dts[0];
      return result;
    }
  },

  watch: {
    selectedBranch: function(newQuestion, oldQuestion) {
      this.sendCityes = [];
      this.isRecvAddressFindMeestDisabled = true;
      this.checkSndAddressFind();
    },
    selectedSendAddres: function(newQuestion, oldQuestion) {
      //alert(JSON.stringify(newQuestion));
      this.sendAddressId = newQuestion;
    },
    selectedSendCity: function(newQuestion, oldQuestion) {
      //alert(JSON.stringify(newQuestion));
      this.sendCityId = newQuestion;
    },
    recvIndex: function(newQuestion, oldQuestion) {
      if(newQuestion.length == 5 && !this.isSndAddressFindMeestDisabled ) this.isRecvAddressFindMeestDisabled = false;
      else this.isRecvAddressFindMeestDisabled = true;
    },
    recvEmail: function(newQuestion, oldQuestion) {
      //alert(newQuestion + ' ['+this.validEmail(this.recvEmail)+'] '+this.recvEmail);
      if(!this.validEmail(this.recvEmail)) this.error = 'Invalid E-Mail format';
      else this.error = null;
    },

    parcelSendingDateISO: function(newQuestion, oldQuestion) {
      this.parcelSendingDate = this.convertDateFromISO(newQuestion);
    },
    parcelDeliveryDateISO: function(newQuestion, oldQuestion) {
      this.parcelDeliveryDate = this.convertDateFromISO(newQuestion);
    },
    recvAddressId: function(newQuestion, oldQuestion) {
      //alert(JSON.stringify(this.recvAddresses));
      var t = this.recvAddresses.find(x => x.index === newQuestion).text;
      this.recvAddress = t;
    },
  },

  data: {
    meestToken: null,

    branchs: [{
        "code": "TOBO_0001",        "name": "Вiддiлення № 1 АБ \"УКРГАЗБАНК\" м.Київ",        "address": ",,03065, м. Київ, вул.Героїв Севастополя, 24/2,,,"      },      {
        "code": "TOBO_0005",        "name": "вiддiлення № 5 (1) магазин SEAT, пр.Перемоги, 67.",        "address": ",,03062, м. Київ, пр-т Перемоги, 67,,,"      },      {
        "code": "TOBO_0003",        "name": "Вiддiлення № 3  АБ \"УКРГАЗБАНК\" м.Київ",        "address": ",,03049, м. Київ,пр. Повітрофлотський, 10,,,"      },      {
        "code": "TOBO_0004",        "name": "Вiддiлення № 4 АБ \"УКРГАЗБАНК\"  м.Київ",        "address": ",,03058, м. Київ, вул. Гарматна, 39-В,,,"      },      {
        "code": "TOBO_0009",        "name": "Вiддiлення № 9 АБ \"УКРГАЗБАНК\"",        "address": ",,03186, м.Київ, , вул. Мартиросяна, 1/8,,,"      },      {
        "code": "TOBO_0006",        "name": "Вiддiлення № 6 АБ \"УКРГАЗБАНК\"  м.Київ, вул. Борщагiвська, 117.",        "address": ",,03056, м.Київ, вул. Борщагівська, 117,,,"      }
    ],

    recvMode: 'I',
    recvModes: [{
        text: 'Поиск по индексу',
        value: 'I'
      },
      {
        text: 'Поиск по адресу',
        value: 'A'
      }
    ],

    date: null,
    selectedBranch: null,
    selectedSendAddres: null,
    selectedSendCity: null,

    parcelData: null,
    parcelDataId: null,
    parcelDataBarcode: null,
    parcelDataPickup: null,
    parcelNumber: null,
    parcelDescription: null,
    parcelDeliveryDate: null,
    parcelSendingDate: null,
    parcelStickerUrl: null,

    parcelSendingDateISO: null,
    parcelDeliveryDateISO: null,

    sendCityes: [],

    sendIndex: null,
    sendIndexId: null,
    sendStreet: null,
    sendStreetId: null,

    sendCity: null,
    sendCityId: null,
    sendAddressId: null,
    sendBuilding: null,
    sendFlat: null,

    sendAddresses: [],
    recvAddresses: [],
    recvAddress: null,

    recvCityes: [],

    recvCity: null,
    recvCityId: null,
    recvIndex: null,
    recvIndexId: null,
    recvStreet: null,
    recvStreetId: null,
    recvAddressId: null,

    recvFirstName: null,
    recvLastName: null,
    recvFatherName: null,
    recvPhone: null,
    recvEmail: null,

    recvBuilding: null,
    recvFlat: null,

    isSndAddressFindMeestDisabled: true,
    isRecvAddressFindMeestDisabled: true,
    isCreateParcelMeestDisabled: true,
    isGetParcelStickerDisabled: true,

    totalVuePackages: null,
    locat: null,
    error: null,

    dialogCreateParcel: false,

    debugMode: false
  }
})

// async function to make http request
async function makeSynchronousRequest() {
  var url = urls[2];
  var result;

  try {
//alert('makeSynchronousRequest, ');

    await fetch(url)
      .then(async response => {

        const data = await response.json();

//alert('2 makeSynchronousRequest, ' + JSON.stringify(data, null, ' ' ));

        result = data;
//alert('3 makeSynchronousRequest, ' + JSON.stringify(result, null, ' ' ));

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          this.error = error;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        alert('url, [' + JSON.stringify(error) + '] ');
        this.error = error;
      });
//alert('4 makeSynchronousRequest, ' + JSON.stringify(result, null, ' ' ));

  }
  catch(e) {
    // if the Promise is rejected
    console.error(e);
  }

//alert('5 makeSynchronousRequest, ' + JSON.stringify(result, null, ' ' ));
  return result;

}


// `this` внутри методов указывает на экземпляр Vue
//this.sndIndex = this.selectedBranch.address;
/*
curl -XGET \
-H "Content-type:application/json" \
-H "x-auth-token:PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8" \
-H "x-get-geturl:https://nr-clients.dev.ukrgasaws.com/" \
-H "x-get-pathto:meestua/api/" \
-H "x-get-method:init" \
https://nr-gateway.dev.ukrgasaws.com/9118aabf34299ead9f57921edb7c8209/ 2>/dev/null | jq -C

curl -XGET \
-H "Content-type:application/json" \
-H "x-auth-token:PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8" \
-H "x-get-geturl:https://nr-clients.dev.ukrgasaws.com/" \
-H "x-get-pathto:meestua/api/" \
-H "x-get-method:zipcode" \
-H "x-get-params:zipCode=02166" \
https://nr-gateway.dev.ukrgasaws.com/9118aabf34299ead9f57921edb7c8209/ 2>/dev/null | jq -C
*/
