

btnRecvAddressFindMeest();


async function btnRecvAddressFindMeest() {
  console.log('1 btnRecvAddressFindMeest, ');
  // wait to http request to finish
  var data;
  await makeSynchronousRequest( );
  console.log('2 btnRecvAddressFindMeest, ' + data);
  // below code will be executed after http request is finished
  // some code
}

// async function to make http request
async function makeSynchronousRequest() {
  var url = urls[2];
  try {
console.log('makeSynchronousRequest, ');
    var result;
    await fetch(url)
      .then(async response => {

        const data = await response.json();
        result = data;

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          this.error = error;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log('url, [' + JSON.stringify(error) + '] ');
        this.error = error;
      });
  }
  catch(e) {
    // if the Promise is rejected
    console.error(e);
  }
}
