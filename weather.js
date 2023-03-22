const express= require("express");
const bodyParser= require("body-Parser");
const https= require("https");
const app= express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/weather_Report", function(req, res){
    var city= req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=cc52cc5c5d1603221b103495209bd123";
    https.get(url, function(resp){
        resp.on("data", function(data){
            const jsdt= JSON.parse(data);
            const wedes= jsdt.weather[0].description;
            const min_temp=jsdt.main.temp_min;
            const max_temp= jsdt.main.temp_max;
            const speed_wind=jsdt.wind.speed;
            const icon= jsdt.weather[0].icon;
            const icon_url= "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The weather in "+ city + " is " + wedes +"</h1>");
            res.write("<img src=" + icon_url + ">");
            res.write("<p>Minimun Temperature: " + min_temp +"C</p>");
            res.write("<p>Maximum Temperature: " + max_temp + "C</p>");
            res.write("<p>Speed of Wind: " + speed_wind + "km/h</p>");
            res.send();

            // console.log(jsdt);
        })
    })

})

app.listen(3000, function(){
    console.log("Server started at port 3000");
})