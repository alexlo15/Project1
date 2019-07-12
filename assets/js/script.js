$(document).ready(function () {


    $("#btnGetTracks").on('click', function (e) {

        e.preventDefault();
        // This will print artist name from textbox and append to musicDiv
        var trackArtist = $("<h1>");
        var artistName = $("#txtArtistName").val().trim();
        trackArtist.text(artistName);
        $("#musicDiv").append(trackArtist);
        $("#artistImage").show();
        // ------------------------------
        // This code will load image in image tag
        var imageQueryURL = "https://rest.bandsintown.com/artists/" + artistName +
            "?app_id=codingbootcamp";
        $.ajax({
            url: imageQueryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            var artistImage = response.thumb_url;
            $("#artistImage").attr('src', artistImage);
            var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
            var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");
        })

        // --------------------------
        // This code will get track from musixmatch api 
        var queryUrl =
            'http://api.musixmatch.com/ws/1.1/track.search?q_artist=' + artistName +
            '&page_size=10&page=1&s_track_rating=desc&apikey=71f00284b464247092304a810bf79866'
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/" + queryUrl,
            method: 'GET',
        }).then(function (response) {
            var obj = JSON.parse(response);
            console.log(obj);
            // loop to display all tracks of the artist
            for (var i = 0; i < obj.message.body.track_list.length; i++) {
                var iframeTrack = $("<iframe>");

                var trackAlbumName = $("<h2>");
                var trackName = $("<p>");

                trackAlbumName.text("Track Album Name : " + obj.message.body.track_list[i]
                    .track
                    .album_name);
                trackName.text("Track Name : " + obj.message.body.track_list[i].track
                    .track_name);

                $("#musicDiv").append(trackAlbumName, trackName);
                // trackArtist
                // This will add anchor tag and trigger click of that  tag and display lyric in lyricDiv
                var trackUrl = $("<a>", {
                    'id': 'trackUrl',
                    'data-trackUrl': obj.message.body.track_list[i].track
                        .track_share_url
                }).text("Click Me to play").click(function () {
                    var trackDisplayUrl = $(this).attr('data-trackUrl');
                    iframeTrack.attr('src', trackDisplayUrl);
                    $("#lyricDiv").append(iframeTrack);
                });


                $("#musicDiv").append(trackUrl);


            }


            $("#musicDiv").trigger("click");

        });
    })

})