const PImage = require("pureimage");
const fs = require("fs");

const model = require("./dbmodel");

const config = require('./config');
const mysql = require("mysql");

const con = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});
con.connect(onDbConnected);

global.db = con;

var fnt = PImage.registerFont(
    "fonts/Arial.ttf",
    "Arial"
);
fnt.loadSync();

function onDbConnected(err) {
    if (err) throw err;
    console.log("Connected!");
    const img1 = PImage.make(1000, 1000);
    const ctx = img1.getContext("2d");



    model.getCurrentCup().then(r => {
        if (r.length > 0) {
            model.getCupPlayers(r[0].id).then(plrs => {
                let size = generateRectangleWithPlayer(ctx, "Group A", plrs, 10, 10);
                generateRectangleWithPlayer(ctx, "Group B", plrs, 10, size.height + 2*5);
                PImage.encodePNGToStream(img1, fs.createWriteStream("out.png"))
                    .then(() => {
                        console.log("wrote out the png file to out.png");
                    })
                    .catch((e) => {
                        console.log("there was an error writing");
                    });
            })
        }


    });



}

function generateRectangleWithPlayer(ctx, groupName, players, x, y) {
    const padding = 10;

    ctx.font = "13pt Arial";
    const titleSize = ctx.measureText(groupName);
    const titleHeight = titleSize.emHeightAscent + titleSize.emHeightDescent + padding;
    let maxWidth = titleSize.width;

    let i = 0;
    let textHeight = 0;

    for (var p of players) {
        const {width, emHeightAscent, emHeightDescent} = ctx.measureText(p.name);
        if (maxWidth < width) {
            maxWidth = width;
        }
        if (textHeight === 0) {
            textHeight = emHeightAscent + emHeightDescent;
        }

        ctx.font = "13pt Arial";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(p.name, x + padding, y + padding + titleHeight + textHeight + i * 13);
        ctx.fillStyle = "red";
        i ++;
    }

    ctx.font = "13pt Arial";
    ctx.fillStyle = "#ef893a";
    ctx.fillText(groupName, x + padding, y + padding + titleHeight - padding);
    ctx.fillStyle = "red";

    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.rect(x, y, padding*2 + maxWidth, padding*2 + players.length * 13 + titleHeight);
    ctx.stroke();

    return {
        width: x + 2 * padding + maxWidth,
        height: y + 2*padding + players.length * 13 + titleHeight
    }
}