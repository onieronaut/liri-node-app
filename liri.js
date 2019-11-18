const fs = require("fs");

const dotenv = require("dotenv").config();

const axios = require("axios");

const keys = require("./keys");

// const spotify = Spotify(keys.spotify);

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

        break;

    case "movie-this":
        movieThis(input);
        break;

    case "do-what-it-says":

        break;

    default:
        console.log("Please type a command followed by your input");
        console.logo("Commands: concert-this spotify-this-song movie-this do-what-it-says");
        break;
}

function concertThis(input) {

    if (!input) {
        console.log("Please enter a band to search");
    } else {
        axios.get(`https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`).then(function (response) {
            // console.log(response.data[0]);
            const data = response;
            console.log(data)

            // for (let i = 0; i < data.length; i++); {
                console.log(`Venue: ${data[i].venue.name}`);
                console.log(`Location: ${data[i].venue.city}, ${data[i].venue.region}`)
                console.log(`Date: ${data[i].datetime}`)
            // }

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
        axios.get(`http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy`).then(function (response) {
            
            console.log(`Title: ${response.data.Title}`);
            console.log(`Release Date: ${response.data.Released}`);
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Produced in: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Starring: ${response.data.Actors}`);

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