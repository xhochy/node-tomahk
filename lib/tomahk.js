var http = require('http');

module.exports = {
    albumUrl: function(artist, title) {
        return 'http://toma.hk/album/' + encodeURIComponent(artist) + '/' + encodeURIComponent(title);
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
