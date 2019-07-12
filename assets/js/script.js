var artistName = ""; 
 
 
 $(document).ready(function () {


        $("#btnGetTracks").on('click', function (e) {

            e.preventDefault();
            var trackArtist = $("<h1>");
            artistName = $("#txtArtistName").val().trim();
            // alert(artistName)
            trackArtist.text(artistName);
            $("#musicDiv").append(trackArtist);
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

                    var imageQueryURL = "https://rest.bandsintown.com/artists/" + artistName + "?app_id=codingbootcamp";

                }
                $("#musicDiv").trigger("click");
                console.log("done");

            });

            
         
        })

    });
var queryURL =
            "https://app.ticketmaster.com/discovery/v2/events.json?" + 
                "&apikey=tDbpfjWt10PW1rPAG9UEbkFGw7O3oQeS";
            console.log(queryURL);

    $.ajax({
     url:queryURL,
        method: "GET",
    }).then(function(response){
        // var obj = JSON.parse(response);
        console.log(queryURL);
        console.log(response);
 
        console.log(response._embedded.events[0].name);
        console.log()
 
     // var results = response.data;
 
     //    $("<p>").text()
     //    // console.log(obj);
         // stores the data from AJAX into the results variable
         var results = response._embedded.events;
                         // looping through each result item
                         for (var i = 0; i < results.length; i++) {
                             // creating & storing a div tag
                             var eventsDiv = $("<div>");
 
                             // creating a paragraph tag with the result item's rating
                             var p = $("<p>").text("Events: " + results[i].name);
                            //  var p = $("<p>").text("Time: " + results[i].dates.start.localDate);
 
                             // appending the paragraph and image tag to the teamsDiv
                             eventsDiv.append(p);
                             
 
                             // prepending the eventsDiv to the HTML page in the "tickets" div
                             $(".tickets").prepend(eventsDiv);
                         }});