node-tomahk
===========

Node.JS binding to interact with toma.hk

## Create a playlist


```javascript
tomahk.createPlaylist("Awesome playlist!", [
    {artist: "Bloc Party", title: "Ratchet"},
    {artist: "Vampire Weekend", title: "A-Punk"}
  ], function (url) {
    console.log("Playlist URL: " + url);
  });
```

## Get the URL for an album

```javascript
var url = tomahk.albumUrl('Blur', '13');
```

## Get the URL for a track

```javascript
var url = tomahk.trackUrl('Bloc Party', 'Ratchet');
// toma.hk redirects this to a shortened url which you can get via
tomahk.shortTrackUrl('Bloc Party', 'Ratchet', function (url) {
  console.log('Listen to Bloc Party - Ratchet at ' + url);
});
```

## Get the URL for an artist

```javascript
var url = tomahk.artistUrl('Bloc Party');
```
