const sign = "leo"; // change to any zodiac sign
const url = `https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope/?zodiacSign=${sign}`;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "c296a1adb4msh483412b9524cbc0p142aa4jsne9a4212852a9",
    "x-rapidapi-host": "best-daily-astrology-and-horoscope-api.p.rapidapi.com"
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Error:", err));


  