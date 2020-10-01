

function content() {
	// chrome.tabs.executeScript(null, { file: "content.js" });

  /*global chrome*/
    chrome.tabs.executeScript(null, {
      code: "document.body.innerText"
    }, receiveText);

  function receiveText(resultsArray) {
    let content = resultsArray[0];


    // send info to api, get a url back.
    const api_url = 'GOOGLE CLOUD API ENDPOINT';
    fetch(api_url, {
      method: 'POST',
      body: JSON.stringify({text:content}),
      headers:{
        'Content-Type': 'application/json'
      } })
      .then(data => {
        return data.json();
      })
      .then(res => {
          let urlcontent = res[0].split('//')[1];
          let arr = urlcontent.split('/');
          document.getElementById('title').innerText = arr[0].split('.')[1] +"."+ arr[0].split('.')[2];
          document.getElementById('organization').innerText = arr[arr.length-1];


          document.getElementById('clickAnalyze').addEventListener('click', function(){
            chrome.tabs.create({url: res[0] });
          });


      })
      .catch(error => console.error('Error:', error));



  }

}
document.getElementById('clickLoad').addEventListener('click', content);
