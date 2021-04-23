const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
    host:"35.226.161.246",
    user: "root",
    password:"databaseconissuers",
    database: "spotify_team_database",
    port: "3306",
})


db.connect(function(err){
    if(!err) {
        console.log("Success");
    } else {
        console.log("Error trying to connect");    
    }
}); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get("/api/getsrutiquery", (require, response) => {
    const sqlSelect = "SELECT Energy, count(SongAttributes.Song_id) as num_songs_with_high_energy_and_valance FROM SongAttributes  WHERE SongAttributes.Song_id IN (SELECT SongAttributes.Song_id FROM SongAttributes WHERE SongAttributes.Dancibility > 0.7) GROUP BY Energy ORDER BY Energy DESC LIMIT 15;";
    db.query(sqlSelect, (err, result) => {
        if (err) console.log("Error query dont work"); 
        response.send(result);
    });
});

app.post("/api/insert", (require, response) => {
    const genreName = require.body.genreName;

    const sqlInsert = "INSERT INTO `Genre` (`Genre_name`) VALUES (?)";
    db.query(sqlInsert, [genreName], (err, result) => {
        console.log(err);
    })
});


app.post("/api/findArtistGenre", (require, response) => {
    const artistName = require.body.artistName;

    const sqlFind = "SELECT `Genre_name` FROM `Artist` WHERE `Artist_name`= ?";
    db.query(sqlFind, artistName, (err, result) => {
        response.send(result);
    })
});


app.delete("/api/delete/:genreName", (require, response) => {
    const genreName = require.params.genreName;

    const sqlDelete = "DELETE FROM `Genre` WHERE `Genre_name`= ?";
    db.query(sqlDelete, genreName, (err, result) => {
        if (err) console.log("could not delete");
        console.log(error);
    })
});

app.put("/api/update/", (require, response) => {
    const genreName = require.body.genreName;
    const newGenre = require.body.newGenre;
    console.log(newGenre);
    const sqlUpdate = "UPDATE `Genre` SET `Genre_name` = ? WHERE `Genre_name`= ?";
    db.query(sqlUpdate, [newGenre,genreName ], (err, result) => {
        if (err) 
        console.log(error);
    })
});

 app.listen(3005, () => {
    console.log("running on port 3005");
})

