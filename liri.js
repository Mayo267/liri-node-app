require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var command = process.argv[2];
var moment = require("moment");
var axios = require("axios");


switch(command){
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;
    
    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default: console.log("\nType any command following the node command..." + "\nspotify-this-song" + 
    "\nmovie-this" +
    "\ndo-what-it-says" + "\n");


}

//SPOTIFY search function....
function spotifyThisSong(trackName){
    var trackName = process.argv.slice(3).join(" ");;
    if(!trackName){
        trackName = "The Sign";
    };
    song = trackName;
    spotify.search({
        type: "track",
        query: song
    },
        function(err, data){
            if(!err){
                var trackInfo = data.tracks.items;
                for(var i = 0; i < 3; i++){
                    if(trackInfo[i] != undefined){
                        var spotifyResults =
                            "\n------------------------------------------" +
                            "\nArtist: " + trackInfo[i].artists[0].name +
                            "\nSong: " + trackInfo[i].name +
                            "\nPreview URL: " + trackInfo[i].preview_url +
                            "\nAlbum: " + trackInfo[i].album.name + 
                            "\n------------------------------------------"
                            console.log(spotifyResults);
                            
                        
                    };

                };
            }else {
                console.log("error: " + err);
                return;
            };
        });
};

//MOVIE search function....
function movieThis(){
    var movieName = process.argv.slice(3).join(" ");
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request (queryURL, function(error, response, body){

        if(!error){

            var movieData = JSON.parse(body);
            var queryUrlResults = 
            "\n------------------------------------------" +
            "\nTitle: " + movieData.Title +
            "\nYear: " + movieData.Year + 
            "\nIMDB Rating: " + movieData.Ratings[0] +
            "\nRotten Tomatoes Rating: " + movieData.Ratings[1] +
            "\nOriginal Country: " + movieData.Country + 
            "\nLanguage: " + movieData.Language + 
            "\nPlot: " + movieData.Plot + 
            "\nActors: " + movieData.Actors +
            "\n------------------------------------------"
        
        console.log(queryUrlResults);
        }else {
            console.log("error: " + err);
            return;
        };
    });
};

//Concert this function....
function concertThis(artist){
    var artist = process.argv.slice(3).join(" ");
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
    axios.get(queryUrl).then(
        function (response) {
            var answer = response.data;
            
            
            console.log("\n----------------------------------------");
            var date = moment(answer[0].datetime).format("MM/DD/YYYY");
            console.log("\nArtist: " + answer[0].lineup);
            console.log("\nShow Name: " + answer[0].venue.name);
            console.log("\nLocation: " + answer[0].venue.city + ", " + answer[0].venue.country);
            console.log("\nDate: " + date);
            console.log("\n----------------------------------------");
            
            
            
        }
        
    );

};

//Do-what-it-says function..... 
var fs = require("fs");

function doWhatItSays(){
fs.readFile("./random.txt", "utf-8", function (err, data){
    if(err) throw err;
    var command = process.argv.slice(2).join(",")
    console.log(data);
    console.log(command);

    
})

}
