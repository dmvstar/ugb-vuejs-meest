        fetch(realUrl, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        fetch(realUrl, requestOptions)
            .then(response => {response.text();})
            .then(result => { console.log(result);} )
            .catch(error => { console.log('error', error);});
