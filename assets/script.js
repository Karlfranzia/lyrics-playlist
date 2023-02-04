const clientId = '07745df9262c4de48f0f8d25213b10a3';
const clientSecret = 'c7e3a9d7bfad4498af076f0ca496f6e7';
const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
var query = "broccoli";
var player = document.getElementById("player")
init = function(){
fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${encodedCredentials}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'grant_type=client_credentials'
})
  .then(response => response.json())
  .then(data => {
    const accessToken = data.access_token;
    console.log(`Access token: ${accessToken}`);

    var url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;

    fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.tracks.items);
        playSong(data.tracks.items)
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
}
  playSong = function(songs){
    player.title = songs[0].name
    player.src = songs[0].external_urls.spotify
  }

  init()
