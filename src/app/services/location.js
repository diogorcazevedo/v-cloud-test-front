
export async function getlatitude() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          return  position.coords.latitude;
        });
    }

}

export async function getlongitude() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            return  position.coords.longitude;
        });
    }

}
