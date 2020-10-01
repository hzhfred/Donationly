/*global chrome*/
alert("content.js running");
  chrome.tabs.executeScript(null, {
    code: "document.body.innerText"
  }, receiveText);

function receiveText(resultsArray) {
  alert(resultsArray[0]);
  let content = resultsArray[0];
  //"wildfire, black, women"

  // send info to api, get a url back.
  const api_url = 'https://us-central1-smooth-brains-mask-evaluation.cloudfunctions.net/donationLink';
  fetch(api_url, {
    method: 'POST',
    body: JSON.stringify({text:content}),
    headers:{
      'Content-Type': 'application/json'
    } })
    .then(data => {
      alert(data[0]);
      return data.json();
    })
    .then(res => {
        alert(res[0]);

        document.getElementById('clickAnalyze').href=res[0];

    })
    .catch(error => console.error('Error:', error));



}
