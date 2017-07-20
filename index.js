(function () {
	var $app_start = document.getElementById("app_start");
	var game_div = document.createElement('div');
	game_div.textContent = "wait......";
    $app_start.appendChild(game_div);
    $app_start.style.color = 'red';
})();
var chk = 'f';
var map;
function ip_locator() {
			var ip = document.getElementById("id_here");
			if (ip.value == "") {
					alert("Please enter your ip address.");
					return;
			}
            if (chk == 'f'){
                alert("please wait. the system is still doing some background work");
                return;
            }
			if (navigator.onLine) {
				
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						var ip_info = JSON.parse(xhttp.responseText);
                        if (ip_info.error == true) {
                            document.getElementById("ip_view").innerHTML = ip_info.reason;
                            return;
                        }
                        if (ip_info.city == null){
                            document.getElementById("ip_view").innerHTML = ip_info.timezone + ", " + ip_info.country_name ;
                        }
                        else {
                            document.getElementById("ip_view").innerHTML = ip_info.city + "/" + ip_info.country_name ;
                        }
                        map = new google.maps.Map(document.getElementById('googleMap'), {
                            center: {lat: ip_info.latitude, lng:ip_info.longitude},
                            zoom: 5
                        });
					}
					else {
						document.getElementById("ip_view").innerHTML = "Loading.......";
					}
				};
				 xhttp.open("GET", "https://ipapi.co/"+ip.value+"/json/", true);
                xhttp.timeout= 6000;
                xhttp.ontimeout = function (e) {
                    document.getElementById("ip_view").innerHTML = "failed to obtain ip address";
                }
                
				 xhttp.send();
			} else {
				document.getElementById("ip_view").innerHTML = "no connection";
			}
}

function inform() {
    var $app_start = document.getElementById("app_start");
    $app_start.style.color = 'green';
    $app_start.textContent= "Ready.....";
    chk = 't';
}
