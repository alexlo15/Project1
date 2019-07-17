<h1> Not-ify </h1>

<div>
<p>
group project 1 for Rutgers coding bootcamp 2019

<ul>

<li> https://alexlo15.github.io/Project1/ </li>
<li>
<strong>
Presentation:
</strong>
https://docs.google.com/presentation/d/1ck86yClUwVcZfSCjHkW3ysUQ6FK6o3oUvSQNFfWKibY/edit#slide=id.p
</li>
<li>
<strong>
Documentation:
</strong>
https://docs.google.com/document/d/1VYW0T1ORqMre2gSc_3W0nMu5gL4NZgT1KI5zn9p1tWQ/edit
</li>
</ul>
</p>
</div>


```js
    $("#checkEvent").on('click', function (e) {
        e.preventDefault();
        // alert('on check event');
        if (messageFlag === true) {
            $("#lyricDiv").empty();
            // $("#rightDiv").empty();
            $("#playerDiv").empty();

```

Alex Lo
Darius McPhatter
Dealan Diongzon
Hetal
Rishi Ajay

Markup Documentation
Project 1- Not-ify Music Player


Api’s used for this projects:
http://api.musixmatch.com/
Musixmatch api used api key to fetch data on each ajax call based on the parameter passed to check the name of artist. 
It pull the top 10 tracks of that artists.
https://rest.bandsintown.com/
Bandsintown api used api key to fetch data on each ajax call based on parameters passed to get the name of artist.
It pulls the image of artist and lyrics of songs selected from musixmatch api.
"https://api.deezer.com/
Deezer api used to play the song selected in audio player. It doesn’t require api key to fetch data using ajax call. 
It pulls the data based on the artist's name and track selected to play.
4. https://developer.napster.com/developer 
Napster API is a music streaming app, which can be people can sign up for free or pay for the service
It is used to obtain the artist’s information, as well as the songs that were sung



HTML
<ul>
<li>For our html page, we used Bootstrap for page size responsiveness and their classes for various things like buttons and rows.</li>

<li>We used WOW.JS for animated text effect.</li>

```html
class="wow fadeInDown" data-wow-duration="3s" data-wow-delay=".2s"
We set custom animations for the page’s elements. This makes it look super fancy.
```

<li>We used a Bootstrap navbar, the “sticky top” class allows it to stay on the top of page while scrolling, this is essential for a page like ours that has a media player. </li>

<li>We used Spotify’s logo as our own, inverted, with page refresh functionality</li>

 <li> We embedded “deezer” widget player using the Deezer API 
This player pulls data from the MusixMatch search API, then finds the right song to play using the returned data.</li>

<li>Our navbar also contains the search input, where the user enters their desired artist and can choose to open a list of ten tracks or events.</li>
 
 <li>Our page also has a feature where you can change the background image, fonts, and colors to a specific theme.</li>

 <li>Our “#trackDiv” and “#lyricDiv” will hold content pulled from their respective API’s</li>
</ul>

<h1>CSS</h1>

<ul>
<li>For our CSS page, we used the common formatting and styling to set up our webpage.</li>
<li>The common styling shows that the webpage is at a regular setting. </li>
<li>On the Navbar Styling, there are sections for different components for the heading. We made a spot section for the logo for Spotify on the left side. The Jankify header is displayed in big black letters with a slogan underneath. We basically used this section for displaying the content for Spotify</li>
<li>The User Input section allows users to put in the artist’s name. It will search for tracks and/or upcoming events. </li>
<li>The Track Listings section displays the name of the song and the artist’s image. It also lets users play a song.</li>
<li>There are buttons that display different themes for the Jankify website. People can use whatever background they like. </li>

</ul>

<h1>JavaScript</h1>

How it works:
<ul>

<li>When the page load user has option to select the background of page depends on their mood using the different buttons.</li>
<li>User asked to enter the name of artist to get the following:</li>
<li>User will get top 10 tracks of that artist.</li>
<li>User will be able to pick any of the 10 tracks from that artist and click to see the lyrics & listen to a 30 second clip of the song.</li>
<li>User will get to see the upcoming events/concerts</li>
</ul>


Code Functionality, Issues to perform the task, & How We Achieve It
When developing an idea for our project we ran into our first problem:


Problem #1: First problems were finding APIs that satisfy our needs, as we have several idea in our minds. 

Solution: Instead of choosing one API, we decided to use three different apis to make it work the way we want

When we able to successfully fetch data from musixMatch api in a format that gives us response in the way we wanted to put we ran into the following problems


Problem #2: It gives response in array format. The interesting part of this was to get the lyrics of selected track and on click of that track it displayed  in other div.

Solution: We declared a data attribute to store the URL of that lyrics and set it to source of iframe which is created dynamically each time we select track.

Problem #3 : Displaying lyrics on same page not to redirect it on other page.
Solution : We got the response url in link format, on click of that it redirect to new window. To avoid that we used iframe. It open the url in its own window on the same page. 

When developing the page, we decided dynamic divs would the most functional, but we ran into the following problems:

Problem #4: On click of buttons the dynamic divs needed to be empty, achieving this functionality was challenging as variables used were local, so can’t get the reference in other button click.

Solution: We added the empty functions before appending anything to any divs so that the user could keep searching up artists without refreshing the page.

Using different APIs to create one stop music functionality was challenging:

Problem #5: Each API had one thing we needed for the artist, but it was difficult matching them on one criteria to get the data. For example, finding a song that had two artists would be challenging to find the song in the Deezer song widget app.

Solution: We decided to check multiple criteria instead of just one. In our code we double checked if the song name matched up as well any of the artists in the song. 

We also wanted our website to have a little more functionality than a regular music player.

Problem #6: We wanted to have a little more functionality than just music and artist information. We wanted our website to also be a place for the user to fully be into the music

Solution: We created multiple buttons that would change the theme and display of the page. Each button would remove and add certain bootstrap classes would correspond with the user’s mood.

