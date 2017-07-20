(function () {
	var $app_start = document.getElementById("app_start");
	var game_div = document.createElement('div');
	game_div.textContent = "";
})();

function ip_locator() {
			var ip = document.getElementById("id_here");
			if (ip.value == "") {
					alert("Please enter your ip address.");
					return;
			}
			if (navigator.onLine) {
				
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						var ip_info = JSON.parse(xhttp.responseText);
						if (ip_info.status == "success")
							document.getElementById("ip_view").innerHTML = ip_info.city + "/" + ip_info.country ;
						else 
							document.getElementById("ip_view").innerHTML = "invalid ip address.";
					}
					else {
						document.getElementById("ip_view").innerHTML = "Loading.......";
					}
				};
				 xhttp.open("GET", "http://ip-api.com/json/"+ip.value, true);
                xhttp.timeout= 6000;
                xhttp.ontimeout = function (e) {
                    document.getElementById("ip_view").innerHTML = "failed to obtain ip address";
                }
                
				 xhttp.send();
			} else {
				document.getElementById("ip_view").innerHTML = "no connection";
			}
}
