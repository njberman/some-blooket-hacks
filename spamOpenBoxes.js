const box = prompt("Which box would you like to open (EXAMPLE: Space)? ");
const numberOfBoxes = prompt("How many boxes would you like to open? ");

let data = undefined;

function time() {
  let currentDate = new Date();
  let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  return time;
}

(async () => {
  const response = await fetch('https://api.blooket.com/api/users/verify-token', { credentials: "include" });
  data = await response.json();
  console.log(data);
  
  (new Promise(async (res, rej) => {
        let blooks = 'Results:\n';

        for (let i = 0; i < numberOfBoxes; i++) {
            fetch("https://api.blooket.com/api/users/unlockblook", {
              "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9,ru;q=0.8",
                "content-type": "text/plain;charset=UTF-8",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1"
              },
              "referrerPolicy": "no-referrer",
              "body": JSON.stringify({box:box,name:data.name}),
              "method": "PUT",
              "mode": "cors",
              "credentials": "include"
            }).then(r => r.json()).then(r => {console.log(r.unlockedBlook, time());blooks += (r.unlockedBlook + '\n');if(i == numberOfBoxes - 1){alert(blooks)}});
        };
    }))
})();
