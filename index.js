const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

app.post('/', async (req, res) => {
    const city = req.body.city;
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        const weather = response.data;
        res.render('index', { 
            weather: `It's ${weather.main.temp}°C in ${weather.name}, ${weather.sys.country}`, 
            error: null 
        });
    } catch (error) {
        res.render('index', { 
            weather: null, 
            error: 'City not found. Please try again.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
