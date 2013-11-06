var http = require('http');
var querystring = require('querystring');

module.exports = {
    albumUrl: function(artist, title) {
        return 'http://toma.hk/album/' + encodeURIComponent(artist) + '/' + encodeURIComponent(title);
    },

    createPlaylist: function(title, tracks, cb) {
        var options = {
            host: 'toma.hk',
            port: 80,
            path: '/playlistgen.php',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        var data = querystring.stringify({'title': title, 'save': true, 'redirect': true});
        tracks.forEach(function (item) {
            data += '&artists[]=' + encodeURIComponent(item.artist);
            data += '&titles[]=' + encodeURIComponent(item.title);
        });
        var req = http.request(options, function (res) {
            res.on('data', function (data) {}); // Sometimes this is needed to seek throuh data or end does not fire
            res.on('end', function() {
                cb(res.headers.location);
            });
        });
        req.write(data);
        req.end();
    },

    shortenUrl: function (url, cb) {
        http.get(url, function (res) {
            res.on('data', function (data) {
                // seek through data
            });
            res.on('end', function () {
                cb(res.headers.location || url)
            });
        });
    },

    shortTrackUrl: function (artist, title, cb) {
        var url = this.trackUrl(artist, title);
        this.shortenUrl(url, cb);
    },

    trackUrl: function (artist, title) {
        return 'http://toma.hk/?artist=' + encodeURIComponent(artist) + '&title=' + encodeURIComponent(title);
    }

}
