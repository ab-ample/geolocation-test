// 52.5018232,13.4164226

let locations = [
    {
        name: 'Amazone zu Pferde',
        lat: 52.5144813,
        lon: 13.3685318
    },
    {
        name: 'Monumento a los judíos de Europa asesinados',
        lat: 52.514657,
        lon: 13.378760
    },
    {
        name: 'Rosengarten',
        lat: 52.5140822,
        lon: 13.3541314
    },
    {
        name: 'Rousseau-Säule',
        lat: 52.5136828,
        lon: 13.3559638
    },
    {
        name: 'oranienplatz',
        lat: 52.5018232,
        lon: 13.4164226
    }
];

// Converts numeric degrees to radians
let toRad = (Value) => {
    return Value * Math.PI / 180;
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
let calcCrow = (lat1, lon1, lat2, lon2) => {
    
    lat1 = 52.5018232; lon1 = 13.4164226; // Testing (forcing match)
    
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}

window.addEventListener('DOMContentLoaded', (event) => {

    if ('geolocation' in navigator) {

        document.getElementById('refresh').addEventListener('click', (event) => {
            getCoords
            .then((res) => {
                return res;
            })
            .then((res) => {
                console.log(res);
                document.getElementById('content').innerHTML += res.name;
                document.getElementById(res.name).style.display = 'block';
            })
            .catch((error) => {
                console.error(error)
            })
            
        })
    
    } else {
        document.body.innerHTML = 'Geolocation not supported in your device';
    }
})

let getCoords = new Promise((resolve, reject) => {

    // using a promise we assure that the process is finished
    navigator.geolocation.getCurrentPosition((position) => {

        // get your location (latitude, longitude and accuracy) 📍
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let acc = position.coords.accuracy;
        
        // send coords;
        resolve(getNear([lat, lon, acc]));

    }, (error) => {

        reject(error);

    }, { enableHighAccuracy: true });
});

let getNear = (coords) => new Promise((resolve, reject) => {

    locations.forEach((location) => {
        // check if you are 30 meters next to an interest point ✅
        if (calcCrow(coords[0], coords[1], location.lat, location.lon) < 0.03) {
            // You're in an interest point!
            resolve(location);
        }
        
    })

    reject('No point found');
})