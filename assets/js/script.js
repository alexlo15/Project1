$(document).ready(function () {

    $(function() {
        //animate on scroll
        new WOW().init(); 
    });

    var trackArtist = $("<h1>");


    $("#btnGetTracks").on('click', function (e) {
        var artistName = $("#txtArtistName").val().trim();
        e.preventDefault();
        $("#leftDiv").removeClass('col-sm-5');
        $("leftDiv").addClass('col-sm-7');
        resetFields();
        // This will print artist name from textbox and append to musicDiv
        // trackArtist = $("<h1>");
        trackArtist.addClass('artistHeadling');

        trackArtist.text(artistName);
        // $("#txtArtistName").text('');

        $("#trackDiv").append(trackArtist);
        // $("#artistImage").show();

        $("#musicDiv").addClass('borderBottomClass');

        // This Function  will load image in image tag
        displayImageFuncion(artistName);

        // This Function will get track from musixmatch api 
        getTrackFromApi(artistName);

        // This code is for function to get track from musixmatch api 
        function getTrackFromApi(artistName) {
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

                displayTrackFunction(obj);
                $("#trackDiv").trigger("click");

            });
        }


        function displayImageFuncion(artistName) {
            var imageQueryURL = "https://rest.bandsintown.com/artists/" + artistName +
                "?app_id=70db470b-35d4-4cf4-8624-428f3b573263";
            $.ajax({
                url: imageQueryURL,
                method: 'GET'
            }).then(function (response) {
                console.log(response);
                var artistImage = $("<img>");
                var artistImageUrl = response.thumb_url;
                artistImage.attr('id', 'artistImage');
                artistImage.attr('src', artistImageUrl);
                $("#trackDiv").prepend(artistImage);
            })
        }

        function displayTrackFunction(obj) {

            for (var i = 0; i < obj.message.body.track_list.length; i++) {

                var trackAlbumName = $("<h2>");
                trackAlbumName.addClass('albumNameClass')
                var trackName = $("<p>");
                var trackUrl = $("<a>");

                trackAlbumName.text(i + 1 + " . " + "Album : " + obj.message.body.track_list[i]
                    .track
                    .album_name);
                trackName.text("Track : " + obj.message.body.track_list[i].track
                    .track_name);


                $("#trackDiv").append(trackAlbumName, trackName);

                // This will add anchor tag and trigger click of that  tag and display lyric in lyricDiv

                trackUrl.attr('id', 'trackUrl');
                trackUrl.attr('data-trackUrl', obj.message.body.track_list[i].track
                    .track_share_url)
                trackUrl.attr('data-name', obj.message.body.track_list[i].track
                .track_name);

                trackUrl.text("Click Me For Lyrics")
                trackUrl.click(function () {
                    $("#rightDiv").show();
                    $("#rightDiv").addClass('col-sm-5');
                    $("#lyricDiv").empty();
                    var iframeTrack = $("<iframe>");
                    iframeTrack.attr('id','iframeTrack')
                    var trackDisplayUrl = $(this).attr('data-trackUrl');
                    iframeTrack.attr('src', trackDisplayUrl);
                    $("#lyricDiv").append(iframeTrack);

                    //code for song widget
                    var songName = $(this).attr('data-name');
                    console.log(songName);

                    var songURL = "https://api.deezer.com/search/track?q=" + songName;
                    $.ajax({
                        url: "https://cors-anywhere.herokuapp.com/" + songURL,
                        method: "GET"
                    }).then (function(response){
                        console.log(response.data[0].id);
                    });

                });


                $("#trackDiv").append(trackUrl);


            }
        }
        // To clear the input box on get track click
        // $("input:text").val('');

    })

    function resetFields() {

        $("#trackDiv").empty();
    }


    // ------------Check Event button click-------------

    $("#checkEvent").on('click', function (e) {
        e.preventDefault();
        // alert('on check event');
        $("#lyricDiv").empty();
        var artistName = $("#txtArtistName").val().trim();



        var eventQueryURL = "https://rest.bandsintown.com/artists/" + artistName +
            "?app_id=70db470b-35d4-4cf4-8624-428f3b573263";
        $.ajax({
            url: eventQueryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response);

            var eventDiv = $("<div>");

            eventDiv.attr('id', 'eventDiv');

            var artistImageUrl = response.thumb_url;
            var artistImage = $("<img>");
            artistImage.attr('id', 'artistImage');
            artistImage.attr('src', artistImageUrl);

            eventDiv.prepend(artistImage);

            var upcomingEvents = $("<h2>").text("Upcoming events : " + response.upcoming_event_count);
            var goToArtist = $("<a>").text("See Tour Dates");
            goToArtist.attr('id','eventCheckDate');
            goToArtist.click(function () {
               
                $("#lyricDiv").empty();
                var iframeDiv = $("<div>");
                var enventIframe = $("<iframe>");
                enventIframe.attr('src', response.url);
                enventIframe.attr('id','eventIFrame');
                iframeDiv.append(enventIframe);

                // eventDiv.append(enventIframe);
                $("#lyricDiv").append(iframeDiv);
                // $(this).fadeTo("fast", .5).removeAttr("src");
            });
            // goToArtist.attr("disabled","disabled");



            eventDiv.append(upcomingEvents, goToArtist);
            $("#lyricDiv").append(eventDiv);
        })
    });



})


// function that needs to be put in order for the song widget to show up
function widget() {
	var w = document[typeof document.getElementsByClassName === 'function' ? 'getElementsByClassName' : 'querySelectorAll']('deezer-widget-player');
	for (var i = 0, l = w.length; i < l; i++) {
		w[i].innerHTML = '';
		var el = document.createElement('iframe');
		el.src = w[i].getAttribute('data-src');
		el.scrolling = w[i].getAttribute('data-scrolling');
		el.frameBorder = w[i].getAttribute('data-frameborder');
		el.setAttribute('frameBorder', w[i].getAttribute('data-frameborder'));
		el.allowTransparency = w[i].getAttribute('data-allowTransparency');
		el.width = w[i].getAttribute('data-width');
		el.height = w[i].getAttribute('data-height');
		w[i].appendChild(el);
	}
};

// initial display of widget
widget();