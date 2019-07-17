$(document).ready(function () {

    // -------------------------------------------Global Variables----------------------------------------------------//
    var messageFlag = false;

    // -------------------------------------------Buttons for changing the theme----------------------------------------------------//
    $("#but1").on("click", function () {
        $("body").removeClass()
        $("body").addClass("space");
        $("nav").css("background-image", "linear-gradient(-180deg, #5500c3, #283643)");
        $("footer").css("background-image", "linear-gradient(-180deg, #283643, #5500c3)");
        $("footer").css("color", "rgb(241, 155, 208)");
        $("button.alo").removeClass("btn-success", "btn-primary", "btn-warning", "btn-link", "btn-dark", "btn-info", "btn-danger", "btn-light");
        $("button.alo").addClass("btn-secondary");
    });

    $("#but2").on("click", function () {
        $("body").removeClass();
        $("body").addClass("abstract");
        $("nav").css("background-image", "linear-gradient(-180deg, #fffb00, #283643)");
        $("footer").css("background-image", "linear-gradient(-180deg, #283643, #fffb00)");
        $("footer").css("color", "rgb(22, 6, 253)");
        $("button.alo").removeClass("btn-secondary btn-warning btn-success btn-link btn-dark btn-info btn-danger btn-light");
        $("button.alo").addClass("btn-primary");
    });

    $("#but3").on("click", function () {
        $("body").removeClass();
        $("body").addClass("beach");
        $("nav").css("background-image", "linear-gradient(-180deg, #11fbb5, #283643)");
        $("footer").css("background-image", "linear-gradient(-180deg, #283643, #11fbb5)");
        $("footer").css("color", "sandybrown");
        $("button.alo").removeClass("btn-warning btn-secondary btn-success btn-link btn-dark btn-primary btn-danger btn-light");
        $("button.alo").addClass("btn-info");
    });

    $("#but4").on("click", function () {
        $("body").removeClass();
        $("body").addClass("rain");
        $("nav").css("background-image", "linear-gradient(-180deg, #25009e, #283643)");
        $("footer").css("background-image", "linear-gradient(-180deg, #283643, #25009e)");
        $("footer").css("color", "rgb(246, 132, 132)");
        $("button.alo").removeClass("btn-warning btn-info btn-secondary btn-success btn-link btn-dark btn-primary btn-danger btn-light");
        $("button.alo").addClass("btn-link");
    });

    $("#but5").on("click", function () {
        $("body").removeClass();
        $("body").addClass("lounge");
        $("nav").css("background-image", "linear-gradient(-180deg, #f60101, #283643)");
        $("footer").css("background-image", "linear-gradient(-180deg, #283643, #f60101)");
        $("footer").css("color", "gold");
        $("button.alo").removeClass("btn-success btn-info btn-secondary btn-dark btn-primary btn-link btn-danger btn-light");
        $("button.alo").addClass("btn-warning");
    });

    $("#but6").on("click", function () {
        $("body").removeClass();
        $("body").addClass("coffee");
        $("nav").css("background-image", "linear-gradient(-180deg, #f0a519, #283643)");
        $("footer").css("background-image", "linear-gradient(-180deg, #283643, #f0a519)");
        $("footer").css("color", "grey");
        $("button.alo").removeClass("btn-warning btn-info btn-secondary btn-dark btn-primary btn-link btn-danger btn-light");
        $("button.alo").addClass("btn-success");
    });

    $("#but7").on("click", function () {
        $("body").removeClass();
        $("body").addClass("themes");
        $("nav").css("background-image", "linear-gradient(-180deg, #41be6d, #283643)");
        $("footer").css("background-image", "linear-gradient(-180deg, #283643, #41be6d)");
        $("footer").css("color", "black");
        $("button.alo").removeClass("btn-success btn-info btn-secondary btn-success btn-primary btn-link btn-danger btn-light");
        $("button.alo").addClass("btn-dark");
    });

    // -------------------------------------------Animation for Header-----------------------------------------------//
    $(function () {
        //animate on scroll
        new WOW().init();
    });

    // -------------------------------------------Click Function for Get Tracks Button-----------------------------------------------//  
    $("#btnGetTracks").on('click', function (e) {

        // Gets artist from search bar
        var artistName = $("#txtArtistName").val().trim();
        e.preventDefault();

        // Unhides the left div which contains the artist/tracks & empties the event Div
        $("#leftDiv").show();
        $("#eventDiv").empty()
        resetFields();

        // This will print artist name from textbox and append to trackDiv
        var trackArtist = $("<h1>");
        trackArtist.addClass('artistHeadling');
        trackArtist.text(artistName);
        $("#trackDiv").append(trackArtist);

        // Calls the function to display the artist bio
        artistBio(artistName);

        // Calls the function to display the name
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

                // Calls the function to display the all the tracks
                displayTrackFunction(obj);
                $("#trackDiv").trigger("click");
            });
        }

        // This function will get the artist-info 
        function artistBio(artistName) {

            //sets the URL to whatever the user's choice in artist is
            var napsterKey = "NDI4OTM2NWMtNjUwMS00MTE2LWE1OWItMThmOWJkZDY0Mzdm"
            var napsterUrl = "https://api.napster.com/v2.2/search?apikey=" + napsterKey +
                "&query=" + artistName + "&type=artist";

            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/" + napsterUrl,
                method: "Get"
            }).then(function (response) {
                // Empties the artist-info and then shows it onto the HTML
                $("#artist-info").empty();
                var bio = response.search.data.artists[0].bios[0].bio;
                $("#artist-info").append(`<p>${bio}</p>`);
                $("#artist-info").prepend("<h3>Artist Bio</h3>")
            })

        }

        // This Function will load image of artist in image tag
        function displayImageFuncion(artistName) {
            var imageQueryURL = "https://rest.bandsintown.com/artists/" + artistName +
                "?app_id=70db470b-35d4-4cf4-8624-428f3b573263";

            $.ajax({
                url: imageQueryURL,
                method: 'GET'
            }).then(function (response) {

                //Empties any images from before and then creates a new image
                //based off the user's input from the ajax call
                $("#artistPic").empty();
                var artistImageUrl = response.thumb_url;
                var artistImage = $("<img>");
                artistImage.attr('id', 'artistImage');
                artistImage.attr('src', artistImageUrl);
                artistImage.addClass("card-img")
                $("#artistPic").prepend(artistImage);
            })
        }

        // This function loops through all tracks of the user's choice in artist
        function displayTrackFunction(obj) {
            // This code will check for the records only show for correct name entered.
            if (obj.message.body.track_list.length === 0) {
                $("#trackDiv").empty();
                var messageH2 = $("<h2>");
                messageH2.attr("id", 'messageH2');
                messageH2.text("Error in typing name of Artist, Check it again");
                $("#trackDiv").append(messageH2);
                $("#rightDiv").empty();
                messageFlag = true;
            } else {
                messageFlag = false;

                //Stores the artist's name of the song into a variable for the
                var songArtistName = obj.message.body.track_list[0].track.artist_name;

                //For loop to display each track to the page
                for (var i = 0; i < obj.message.body.track_list.length; i++) {

                    //Creates the tags for each track property
                    var trackAlbumName = $("<h2>");
                    trackAlbumName.addClass('albumNameClass')
                    var trackName = $("<p>");
                    var trackUrl = $("<a>");

                    //Sets the text of each track
                    trackAlbumName.text(i + 1 + ". " + "Album: " + obj.message.body.track_list[i].track.album_name);
                    trackName.text("Track: " + obj.message.body.track_list[i].track.track_name);

                    //Displays each track into the HTML in the trackDiv
                    $("#trackDiv").append(trackAlbumName, trackName);

                    // Adds the anchor tag of the track's lyrics url so that it'll be displayed in the lyricDic
                    trackUrl.attr('id', 'trackUrl');
                    trackUrl.attr('data-trackUrl', obj.message.body.track_list[i].track.track_share_url)
                    trackUrl.attr('data-name', obj.message.body.track_list[i].track.track_name);

                    //This creates a button for each track so the user can click on it to display the lyrics
                    trackUrl.html('<button type="button" class="btn btn-outline-success playMe"><i class="fas fa-play-circle smallPlay"></i> Click Me For Lyrics</button>')

                    //This creates the click function for the "Click to see lyrics" button for each track
                    trackUrl.click(function () {

                        // Empties the lyricDiv each time shows both the rightDiv and the lyricsDiv
                        $("#lyricDiv").empty();
                        $("#rightDiv").show();
                        $("#lyricDiv").show();

                        // Creates the card that holds the lyrics & sets the src to be the lyrics of the selected song and shows them on the HTML
                        var iframeTrack = $("<iframe>");
                        iframeTrack.attr('id', 'iframeTrack')
                        var trackDisplayUrl = $(this).attr('data-trackUrl');
                        iframeTrack.attr('src', trackDisplayUrl);
                        $("#lyricDiv").append(iframeTrack);

                        // Takes the name of the selected song and uses it to search for the song on the Deezer API
                        var songName = $(this).attr('data-name');
                        var songLookUpURL = "https://api.deezer.com/search/track?q=" + songName;

                        $.ajax({
                            url: "https://cors-anywhere.herokuapp.com/" + songLookUpURL,
                            method: "GET"
                        }).then(function (response) {

                            //creates an indexCount for the while loop & a boolean that determines if the artistmatches the song
                            var i = 0;
                            artistMatches = false;

                            //Goes through the all the possible songs from Deezer and determines if the artist from musixmatch is the same as the artist in deezer
                            //If the artist does not match it will loop through the entire array
                            while (artistMatches == false) {

                                //If the artist from musixmatch is the same as the one from Deezer, it selects that saves that URL and sends it to the player
                                if (response.data[i].artist.name == songArtistName) {
                                    var songURL = "https://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=200&height=200&color=ff0000&layout=dark&size=medium&type=tracks&id=" + response.data[i].id;
                                    $(".deezer-widget-player").attr("data-src", songURL);
                                    widget();
                                    artistMatches = true;
                                }
                                i++;

                                //If at the end of the array there is no matching artist, it sets the song to be the first song in the response
                                if (i === response.data.length) {
                                    var songURL = "https://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=200&height=200&color=ff0000&layout=dark&size=medium&type=tracks&id=" + response.data[0].id;
                                    $(".deezer-widget-player").attr("data-src", songURL);
                                    widget();
                                    artistMatches = true;
                                }
                            }
                        });
                    });

                    // Shows the tracks on the HTML trackDiv
                    $("#trackDiv").append(trackUrl);
                }
            }
        }
    })

// -------------------------------------------Click Function for Check Events Button-----------------------------------------------//
    $("#checkEvent").on('click', function (e) {
        e.preventDefault();
        if (messageFlag === true) {
            $("#lyricDiv").empty();
            $("#playerDiv").empty();
        } 
        else {
            // Saves the artists name from the user input & removes whatever is in the lyric and player divs & shows the events
            var artistName = $("#txtArtistName").val().trim();
            $("#lyricDiv").empty();
            $("#playerDiv").empty();
            $("#rightDiv").show();

            // Creates a queryURL for the AJAX call to bandsintown
            var eventQueryURL = "https://rest.bandsintown.com/artists/" + artistName +
                "?app_id=70db470b-35d4-4cf4-8624-428f3b573263";

            $.ajax({
                url: eventQueryURL,
                method: 'GET'
            }).then(function (response) {
                //Creates the div that will hold the artist image and the upcoming events
                var eventDiv = $("<div>");
                eventDiv.attr('id', 'eventDiv');

                // takes the url for the artist image and creates an img tag for it and appends it to the eventDiv
                var artistImageUrl = response.thumb_url;
                var artistImage = $("<img>");
                artistImage.attr('id', 'artistImage');
                artistImage.attr('src', artistImageUrl);
                eventDiv.prepend(artistImage);

                //sets the text for Upcoming events and Tour dates
                var upcomingEvents = $("<h2>").text("Upcoming events: " + response.upcoming_event_count);
                var goToArtist = $("<a>").text("See Tour Dates");
                goToArtist.attr('id', 'eventCheckDate');

                // sets the click function for when the user sees the tour dates
                goToArtist.click(function () {

                    //empties the lyrics div incase there's anything inside of it & and creates a new div to put the URL of the events
                    $("#lyricDiv").empty();
                    var iframeDiv = $("<div>");
                    var enventIframe = $("<iframe>");
                    enventIframe.attr('src', response.url);
                    enventIframe.attr('id', 'eventIFrame');
                    iframeDiv.append(enventIframe);
                    eventDiv.append(enventIframe);
                    $("#lyricDiv").append(eventDiv);
                });

                // displays all Divs to the lyric Div
                eventDiv.append(upcomingEvents, goToArtist);
                $("#lyricDiv").append(eventDiv);
            })
        }
    });
})

// -------------------------------------------Function to reset all the DIVs-----------------------------------------------//
function resetFields() {
    $("#artistImage").empty();
    $("#trackDiv").empty();
}


// -------------------------------------------Function to display the song player widget-----------------------------------------------//
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