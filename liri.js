const fs = require("fs");

const moment = require("moment");

const dotenv = require("dotenv").config();

const axios = require("axios");

const keys = require("./keys");

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

const command = process.argv[2];

let input = process.argv[3];

for (let i = 4; i < process.argv.length; i++) {
    input += ` ${process.argv[i]}`;
}

switch (command) {

    case "concert-this":
        concertThis(input);
        break;

    case "spotify-this-song":
        spotifyThisSong(input);
        break;

    case "movie-this":
        movieThis(input);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("Please type a command followed by your input");
        console.log("Commands: concert-this spotify-this-song movie-this do-what-it-says");
        break;
}

function concertThis(input) {

    if (!input) {
        console.log("Please enter a band to search");
    } else {
        axios.get(`https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`).then(function (response) {

            const data = response.data;

            for (let key in data) {

                let date = data[key].datetime;
                let formatDate = moment(date).utc().local().format("dddd, MMMM Do YYYY, h:mm A ");

                console.log(`Venue: ${data[key].venue.name}`);
                console.log(`Location: ${data[key].venue.city}, ${data[key].venue.region}`)
                console.log(formatDate);
                console.log("\n");

                fs.appendFile("log.txt", "Band: " + input + "\nVenue: " + data[key].venue.name + "\nLocation: " + data[key].venue.city + "," + data[key].venue.region + "\nDate: " + data[key].datetime + "\n\n", function (err) {
                    if (err) {
                        throw err;
                    }
                })
            }

        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
    }
}

function movieThis(input) {

    if (!input) {
        input = "Mr Nobody"
        axios.get(`http://www.omdbapi.com/?t=${input}&y=&plot=short&apikey=trilogy`).then(function (response) {

            console.log(`Title: ${response.data.Title}`);
            console.log(`Release Date: ${response.data.Released}`);
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Produced in: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Starring: ${response.data.Actors}`);

            fs.appendFile("log.txt", "Title: " + response.data.Title + "\nRelease Date: " + response.data.Released + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nProduced in: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nStarring: " + response.data.Actors + "\n\n", function (err) {
                if (err) {
                    throw err;
                }
            })

        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

    } else {

        axios.get(`http://www.omdbapi.com/?t=${input}&y=&plot=short&apikey=trilogy`).then(function (response) {
            console.log(`Title: ${response.data.Title}`);
            console.log(`Release Date: ${response.data.Released}`);
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Produced in: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Starring: ${response.data.Actors}`);

            fs.appendFile("log.txt", "Title: " + response.data.Title + "\nRelease Date: " + response.data.Released + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nProduced in: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nStarring: " + response.data.Actors + "\n\n", function (err) {
                if (err) {
                    throw err;
                }
            })


        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
    };

};

function spotifyThisSong(input) {
    if (!input) {
        spotify
            .request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
            .then(function (data) {
                console.log(`Artist: ${data.artists[0].name}`);
                console.log(`Song: ${data.name}`);
                console.log(`Link: ${data.external_urls.spotify}`);
                console.log(`Album: ${data.album.name}`);

                fs.appendFile("log.txt", "Artist: " + data.artists[0].name + "\nSong :" + data.name + "\nLink :" + data.external_urls.spotify + "\nAlbum :" + data.album.name + "\n\n", function (err) {
                    if (err) {
                        throw err;
                    }
                })
            })
            .catch(function (err) {
                console.error("Error occurred: " + err);
            })
    } else {
        spotify.search({ type: "track", query: input, limit: 1 }, function (err, data) {
            if (err) {
                throw err;
            }
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Song: ${data.tracks.items[0].name}`);
            console.log(`Link: ${data.tracks.items[0].external_urls.spotify}`);
            console.log(`Album: ${data.tracks.items[0].album.name}`);

            fs.appendFile("log.txt", "Artist: " + data.tracks.items[0].artists[0].name + "\nSong :" + data.tracks.items[0].name + "\nLink :" + data.tracks.items[0].external_urls.spotify + "\nAlbum :" + data.tracks.items[0].album.name + "\n\n", function (err) {
                if (err) {
                    throw err;
                }
            })
        })
    }
}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {

        if (err) {
            throw err;
        }

        const fileArray = data.split(",")
        const command = fileArray[0];
        const input = fileArray[1];

        switch (command) {

            case "concert-this":
                concertThis(input);
                break;

            case "spotify-this-song":
                spotifyThisSong(input);
                break;

            case "movie-this":
                movieThis(input);
                break;

            default:
                console.log("Cannot read from file");
                break;
        }
    })
}