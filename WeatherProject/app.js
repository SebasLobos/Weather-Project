const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html"); 
});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = "PUT YOUR API KEY HERE";
    const unit= "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit; 

    https.get(url, function (response){
        console.log(response.statusCode);
    
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            res.write("<p>The weather ir currenlty " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is "+ temp + " degrees Celcius.</h1>"); 
            const icon = weatherData.weather[0].icon;
            const urlImage = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<img src="+ urlImage+ ">");
            res.send();

        })
    
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});