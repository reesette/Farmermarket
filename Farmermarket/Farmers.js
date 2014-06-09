
var geocoder;
var map;

var currentTime = new Date()
var month = currentTime.getMonth() + 1
var monthdate = currentTime.getDate()
var hours = currentTime.getHours()
var minutes = currentTime.getMinutes()
var timeofday = hours + (minutes/60)
var day = currentTime.getDay()
var year = currentTime.getFullYear()
//alert(day + ", " + timeofday + ", " + minutes +"," + hours +", "  +month + monthdate + year);

var weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";

var openday;

/*Date.prototype.getDayName = function(shortName) {
   var Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   if (shortName) {
      return Days[this.getDay()].substr(0,3);
   } else {
      return Days[this.getDay()];
   }
}

Date.prototype.getMonthName = function() {
   return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.getMonth()]; 
}*/


var lat1;
var lon1;
var chicago = new google.maps.LatLng(41.875696,-87.624207);
var uscenter = new google.maps.LatLng(39, -96);
var initialLocation;
var browserSupportFlag =  new Boolean();

var message = "";
var messageother="";
var markersArray=new Array();
var markersArray2=new Array();
var openmkts=new Array();
var openhome=new Array();
var todaymkts=new Array();
var nearest = new Array();
var myLatLng;


 
var mkts = [
	//chicago
	["61st Street Market", 6, 9, 14, 5,12,2011, 10,27,2011, 41.784218, -87.591204, "9am","2pm"],
	["Andersonville Market", 3, 15, 20,6,13,2011, 8,30,2011, 41.97803, -87.668989,"3pm","8pm"],
	["Andersonville Market", 3, 15, 19,9,1,2011, 10,17,2011, 41.97803, -87.668989,"3pm","7pm"],
	["Beverly Market",0,7,13,5,13,2011,10,28,2011, 41.721123,-87.66914,"7am","1pm"],
	["Bridgeport Market",6,7,13,6,16,2011,10,27,2011, 41.830703,-87.641442,"7am","1pm"],
	["Bronzeville Market",6,8,13,6,16,2011, 10,27,2011, 41.814035,-87.606727,"8am","1pm"],
	["Chicago's Downtown Farmstand",1,11,19,1,1,2011, 12,31,2012, 41.884517,-87.625155,"11am","7pm"],
	["Chicago's Downtown Farmstand",2,11,19,1,1,2011, 12,31,2012, 41.884517,-87.625155,"11am","7pm"],
	["Chicago's Downtown Farmstand",3,11,19,1,1,2011, 12,31,2012, 41.884517,-87.625155,"11am","7pm"],
	["Chicago's Downtown Farmstand",4,11,19,1,1,2011, 12,31,2012, 41.884517,-87.625155,"11am","7pm"],
	["Chicago's Downtown Farmstand",5,11,19,1,1,2011, 12,31,2012, 41.884517,-87.625155,"11am","7pm"],
	["Chicago's Downtown Farmstand",6,11,16,1,1,2011, 12,31,2012, 41.884517,-87.625155,"11am","4pm"],
	["City Farm Market Stand",2,13,17.5,7,10,2011,9,28,2011, 41.903882,-87.639496,"1pm","5:30pm"],
	["City Farm Market Stand",3,13,17.5,7,10,2011,9,28,2011, 41.903882,-87.639496,"1pm","5:30pm"],
	["City Farm Market Stand",4,13,17.5,7,10,2011,9,28,2011, 41.903882,-87.639496,"1pm","5:30pm"],
	["City Farm Market Stand",5,13,17.5,7,10,2011,9,28,2011, 41.903882,-87.639496,"1pm","5:30pm"],
	["Daley Plaza Market",4,7,15,5,24,2011, 10,18,2011, 41.883462,-87.630012,"7am","3pm"],
	["Division Street Market",6,7,13, 5,12,2011, 10,27,2011, 41.903923,-87.629986,"7am","1pm"],
	["Federal Plaza Market",2,7,15,5,22,2011,10,30,2011, 41.877363, -87.628012, "7am","3pm"],
	["Glenwood Sunday Market",0,9,15,6,3,2011,10,28,2011, 42.008526,-87.666248,"9am","3pm"],
	["Green City Market",3,7,13,5,12,2011,10,27,2011, 41.914865,-87.633938,"7am","1pm"],
 	["Green City Market Indoors",6,8,13,1,21,2012,4,28,2012, 41.926667,-87.635278,"8am","1pm"],
	["Hyde Park Market",4,7,13,6,7,2011, 10,25,2011, 41.799747,-87.5876,"7am","1pm"],
	["Independence Park Market",0,9,13,6,10,2011,6,10,2011, 41.953207,-87.724028,"9am","1pm"],
	["Independence Park Market",0,9,13,6,24,2011,6,24,2011, 41.953207,-87.724028,"9am","1pm"],
	["Independence Park Market",0,9,13,7,8,2011,7,8,2011, 41.953207,-87.724028,"9am","1pm"],
	["Independence Park Market",0,9,13,7,22,2011,7,22,2011, 41.953207,-87.724028,"9am","1pm"],
	["Independence Park Market",0,9,13,8,12,2011,8,12,2011, 41.953207,-87.724028,"9am","1pm"],
	["Independence Park Market",0,9,13,8,26,2011,8,26,2011, 41.953207,-87.724028,"9am","1pm"],
	["Independence Park Market",0,9,13,9,9,2011,9,9,2011, 41.953207,-87.724028,"9am","1pm"],
	["Independence Park Market",0,9,13,9,23,2011,9,23,2011, 41.953207,-87.724028,"9am","1pm"],
	["Independence Park Market",0,9,13,10,14,2011,10,14,2011, 41.953207,-87.724028,"9am","1pm"],
	["Independence Park Market",0,9,13,10,28,2011,10,28,2011, 41.953207,-87.724028,"9am","1pm"],	
	["Lincoln Park Market",6,7,13,5,12,2011, 10,27,2011, 41.918214,-87.646118,"7am","1pm"],
	["Lincoln Square Market",2,7,13,6,5,2011, 10,23,2011, 41.966484,-87.68875,"7am","1pm"],
	["Logan Square Market",0,10,15,6,3,2011, 10,28,2011, 41.928414,-87.705367,"10am","3pm"],
	["Loyola's Farmers Market",1,15,19, 6,11,2011, 9,30,2011, 42.00184,-87.660887,"3pm","7pm"],
	["Loyola's Farmers Market",1,14.5,18.5, 10,1,2011, 10,15,2011, 42.00184,-87.660887,"2:30pm","6:30pm"],
	["Museum of Contemporary Art/Streeterville Market",2,7,15, 6,5,2011, 10,23,2011, 41.896769,-87.621831, "7am","3pm"],
	["Northcenter Market",6,7,13,6,16,2011, 10,27,2011, 41.955976,-87.679102,"7am","1pm"],
	["Pilsen Community Market",0,9,15, 6,3,2011, 10,28,2011, 41.857708,-87.647472,"9am","3pm"],
	["Portage Park Market",0,10,14, 6,3,2011, 6,3,2011, 41.956694,-87.766897,"10am","2pm"],
	["Portage Park Market",0,10,14, 6,17,2011, 6,17,2011, 41.956694,-87.766897,"10am","2pm"],
	["Portage Park Market",0,10,14, 7,1,2011, 7,1,2011, 41.956694,-87.766897,"10am","2pm"],
	["Portage Park Market",0,10,14, 7,15,2011, 7,15,2011, 41.956694,-87.766897,"10am","2pm"],
	["Portage Park Market",0,10,14, 7,29,2011, 7,29,2011, 41.956694,-87.766897,"10am","2pm"],
	["Portage Park Market",0,10,14, 8,5,2011, 8,5,2011, 41.956694,-87.766897,"10am","2pm"],
	["Portage Park Market",0,10,14, 8,19,2011, 8,19,2011, 41.956694,-87.766897,"10am","2pm"],
	["Portage Park Market",0,10,14, 9,16,2011, 9,16,2011, 41.956694,-87.766897,"10am","2pm"],
	["Portage Park Market",0,10,14, 9,30,2011, 9,30,2011, 41.956694,-87.766897,"10am","2pm"],
	["Portage Park Market",0,10,14, 10,7,2011, 10,7,2011, 41.956694,-87.766897,"10am","2pm"],
	["Printer's Row Market",6,7,13,6,9,2011, 10,27,2011, 41.872282,-87.629129,"7am","1pm"],
	["Pullman Market",3,7,12,7,11,2011, 10,31,2011, 41.691825,-87.610065,"7am","noon"],
	["Seaway Bank Farmer's Market",3,9,14,7,13,2011, 9,28,2011, 41.736615,-87.607251,"9am","2pm"],
	["South Shore Market",3,7,13,6,6,2011, 10,31,2011, 41.767981,-87.576348,"7am","1pm"],
	["Southport Market",6,8,14,6,23,2011, 9,8,2011, 41.950763,-87.664725,"8am","2pm"],
	["Uptown Market at Weiss",4,8,12.5,6,21,2011,10,25,2011,41.966922,-87.649228,"7:30am","12:30pm"],
	["Wicker Park & Bucktown Market",0,8,14,6,5,2011, 10,30,2011,41.910487,-87.677444,"8am","2pm"],
	["Willis Tower Plaza Market",4,7,15, 6,3,2011, 10,28,2011,41.877344,-87.63662,"7am","3pm"],


	["Wood Street Farm Market",3,13,16,4,18,2012,10,24,2012,41.787956,-87.669382,"1pm","4pm"],
	["La Follette Park Farmers Market",3,13,19,6,20,2012,10,24,2012,41.905314,-87.755263,"1pm", "7pm"],
	["Columbus Park Farmers Market", 2,13,19,6,26,2012,10,30,2012,41.872862,-87.764552,"1pm", "7pm"],
	["Rowan Tree Garden Society", 5,8,16,5,18,2012,11,30,2012,41.780535,-87.637692,"8am", "4pm"],
	["Eden Place Farmers Market",6,8,15,5,19,2012,10,20,2012,41.8139,-87.635427, "8am", "3pm"],
	["West Humbolt Park Farmers Market",6,10,14,6,2,2012,6,2,2012,41.895148,-87.716655, "10am", "2pm"],
	["West Humbolt Park Farmers Market",6,10,14,7,14,2012,7,14,2012, 41.895148,-87.716655, "10am", "2pm"],
	["West Humbolt Park Farmers Market",6,10,14,8,11,2012,8,11,2012, 41.895148,-87.716655, "10am", "2pm"],
	["West Humbolt Park Farmers Market",6,10,14,9,8,2012,9,8,2012, 41.895148,-87.716655, "10am", "2pm"],
	["West Humbolt Park Farmers Market",6,10,14,10,13,2012,10,13,2012, 41.895148,-87.716655, "10am", "2pm"],
	["The Wheeler Mansion Market", 3,16,20,6,6,2012,10,31,2012,41.854916,-87.619544,"4pm","8pm"],
	["Homegrown Bronzeville Farmers Market", 0,9,13,6,10,2012,10,28,2012,41.801871,-87.617425,"9am", "1pm"],		
	["Covenant Bank / North Lawndale Famers Market",3,8,13,6,13,2012,10,10,2012,41.867742,-87.710098 ,"8am", "1pm"],
	["Jefferson Park Sunday Market", 0,10,14,6,24,2012,10,21,2012,41.96802,-87.759253,"10am", "2pm"],

//cook county	
["Brookfield Farmers' Market", 6,7,12,5,1,2011,10,31,2011,41.822631,-87.842658, "7am","12pm"],
["Seguin Gardens Market",0,9,14,6,1,2011,10,31,2011, 41.865631,-87.764256,"9am", "2pm"], 
["Country Club Hills Market",6,15,20,6,1,2011,10,31,2011, 41.5572, -87.7162, "3pm", "8pm"], 
["Elk Grove Village Market", 3,7,13,6,1,2011,9,30,2011,42.0035,-88.0092 , "7am", "1 pm"],
["Flossmoor Market",5,8,13,6,1,2011,10,31,2011,41.5438,-87.6787,"8am","1pm"],
["Glencoe Farmers Market",6, 7,12,6,1,2011,10,31,2011,42.1342 , -87.7596,  "7am","12 noon"],
["Glenview Farmers Market",6,8,12,6,1,2011,10,31,2011,42.0819 , -87.7808,  "8am","12 noon"],
["Homewood Farmers Market",6,8,12,6,20,2011,10,17,2011,41.5635 ,-87.6654 ,  "8am","12 noon"],
["Palatine Farmers Market",6,7,13,6,20,2011,10,17,2011,42.1135 , -88.0481,  "7am","1pm"],
["Lemont's Farmers Market",2,8,13,6,20,2011,12,31,2011,41.6756 ,-87.9976 ,  "8am","1pm"], 
["Morton Grove Farmers' Market",6,8,12,6,1,2011,10,31,2011, 42.0429,-87.7993 ,  "8am","12 noon"],
["Northbrook Farmers Market", 3,7,13,6,22,2011,10,12,2011, 42.1386,-87.87 ,  "7am","1pm"],
["Oak Lawn Farmers Market", 3,7,13,6,1,2011,10,31,2011,41.7135 ,-87.7502 ,  "7am","1pm"],
["Oak Park Farmer's Market",6,7,13,6,1,2011,10,31,2011, 41.8884, -87.7871,  "7am","1pm"],
["Palos Heights Farmers' Market",3,7,13,5,5,6,2011,10,14,2011,41.6694 , -87.7964,  "7am","1pm"],
["Palos Park Woman's Club Farmers' Market", 5,8,12.25,7,1,2011,10,9,12011, 41.6645, -87.8336,  "8am","12:15pm"],
["Park Forest Farmers' Market", 6,7,12,5,1,2011,10,31,2011, 41.4845, -87.6817,  "7am","noon"],
["Park Ridge Farmers' Market", 6,7,13,5,31,2011,10,31,2011, 42.0104, -87.8334,  "7am","1pm"],
["Olde Schaumburg Centre Farmers' Market",5,7,13,1,1,2011,10,31,2011,42.0249 , -88.0807,  "7am","1pm"],
["Skokie Farmer's Market",0,7.5,12.75,6,1,2011,10,31,2011, 42.0263,-87.7557 ,  "7:30am","12:45pm"],
["Village of Thornton Farmers' Market",3,11,23,6,1,2011,10,31,2011,41.5684 , -87.6157,  "11am","6pm"],
["Northfield Farmer's Market",6,7.5,12,15,31,2011,10,31,2011, 42.0887,-87.7669 ,  "7:30am","12noon"],

//Washington DC
["14th & U Farmers Market",6,9,13,5,1,2011,11,31,2011,38.9226,-77.0426, "9am", "1pm"],
["Adam's Morgan Farmers Market",6,8,13,6,1,2011,12,31,2011,38.9226, -77.0426, "8am", "1pm"],
["Twin Springs Farmers Market",6,8,13 ,5,15,2011,12,15,2011,38.9276, -77.0529, "8am", "1pm"],
["Bloomingdale Farmers Market",0,10,14 ,5,15,2011,11,20,2011,38.9127,-77.0125, "10am", "2pm"],
["Brookland Farmers Market",2,16,19 ,6,1,2011,10,31,2011,38.9344,-76.9928, "4pm", "7pm"],
["Columbia Heights Community Marketplace",6,9,14 ,5,15,2011,12,15,2011,38.93,-77.0324, "9am", "2pm"],
["DC Open-Air Farmers Market @ RFK",4,9,14 ,5,7,2011,12,20,2011,38.8977,-76.9695, "9am", "2pm"],
["DC Open-Air Farmers Market @ RFK",6,9,14 ,5,1,2011,12,20,2011,38.8977,-76.9695, "9am", "2pm"],
["Capitol Riverfront Market", 4,15,19,5,1,2011,11,30,2011,38.8848, -77.0219, "3pm", "7pm"],
["Dupont Circle FRESHFARM Market",0,9,13,4,1,2011,12,31,2011,38.9103, -77.0447, "9am", "1pm"],
["Dupont Circle FRESHFARM Market",0,10,13,1,1,2011,3,31,2011,38.9103, -77.0447, "10am", "1pm"],
["Eastern Market",0,8,16,1,1,2011,12,31,2011,38.885,-76.9964, "8am", "4pm"],
["Eastern Market",2,10,17,1,1,2011,12,31,2011,38.885,-76.9964, "10am", "5pm"],
["Eastern Market",3,10,17,1,1,2011,12,31,2011,38.885,-76.9964, "10am", "5pm"],
["Eastern Market",4,10,17,1,1,2011,12,31,2012,38.885,-76.9964, "10am", "5pm"],
["Eastern Market",5,10,17,1,1,2011,12,31,2011,38.885,-76.9964, "10am", "5pm"],
["Eastern Market",6,8,18,1,1,2011,12,31,2011,38.885,-76.9964, "8am", "6pm"],
["Fish Wharf",0,8,21,1,1,2011,12,31,2011, 38.878634, -77.022728, "8am", "9pm"],
["Fish Wharf",1,8,21,1,1,2011,12,31,2011, 38.878634, -77.022728, "8am", "9pm"],
["Fish Wharf",2,8,21,1,1,2011,12,31,2011, 38.878634, -77.022728, "8am", "9pm"],
["Fish Wharf",3,8,21,1,1,2011,12,31,2011, 38.878634, -77.022728, "8am", "9pm"],
["Fish Wharf",4,8,21,1,1,2011,12,31,2012, 38.878634, -77.022728, "8am", "9pm"],
["Fish Wharf",5,8,21,1,1,2011,12,31,2011, 38.878634, -77.022728, "8am", "9pm"],
["Fish Wharf",6,8,21,1,1,2011,12,31,2011, 38.878634, -77.022728, "8am", "9pm"],
["Foggy Bottom FRESHFARM Market",3,14.5,19,4,1,2011,11,30,2011,38.9007, -77.0515, "2:30pm", "7pm"],
["H Street FRESHFARM Market", 6,9,12,5,1,2011,11,21,2011,38.9, -76.997, "9am", "12noon"],
["Penn Quarter FRESHFARM Market", 4,15,19,4,1,2011,12,17,2011,38.8952, -77.023, "3pm", "7pm"],
["FRESHFARM Market by the White House", 4,15,19,5,1,2011,11,18,2011,38.9008, -77.0349, "3pm", "7pm"],
["USDA Farmers Market", 5,10,14,6,1,2011,10,31,2011,38.8878, -77.0283, "10am", "2pm"],
["Georgetown Farmers Market",3,15,19 ,5,1,2011,10,31,2011,38.9086,-77.0548, "3pm", "7pm"],
["Glover Park - Burleith Farmers Market",6,9,13 ,5,1,2011,10,31,2011,38.9158,-77.0683, "9am", "1pm"],
["HHS FRESHFARM Market",3,11,12 ,5,15,2011,10,31,2011,38.8873, -77.0146, "11am", "2pm"],
["Mount Pleasant Farmers Market",6,9,13,5,1,2011,11,15,2011,38.9316,-77.0387, "9am", "1pm"],
["New Morning (Sheridan) Farmers Market",6,8,13,3,1,2011,5,31,2011,38.9465,-77.0703, "8am", "1pm"],
["New Morning (Sheridan) Farmers Market",2,16,20,6,1,2011,9,30,2011,38.9465,-77.0703, "4pm", "8pm"],
["Palisades Farmers Market",0,9,13,1,1,2011,12,31,2011,38.9175,-77.0966, "9am", "1pm"],
["Petworth Farmers Market",5,16,20,5,15,2011,9,31,2011,38.941,-77.0249, "4pm", "8pm"],
["Ward 8 Farmers Market",6,9,14,6,1,2011,11,15,2011,38.8432,-76.9762, "9am", "2pm"],

//san francisco
["Alemany Farmers Market",6,7,18,1,1,2011,12,31,2012, 37.7366, -122.409, "7am", "6pm"],
["Bayview Hunters Point Farmers Market",3,8.5,12,1,1,2011,12,31,2011,37.7350,-122.3901,"8:30am", "12pm"],
["Castro Farmers Market",3,16,20,4,1,2012,10,31,2012,  37.765,-122.433, "4pm", "8pm"],
["Crocker Galleria",4,11,15,1,1,2011,12,31,2011, 37.7890,-122.4028, "11am", "3pm"],
["Divisadero Farmers Market",0,10,14,1,1,2011,12,31,2012, 37.7762, -122.436, "10am", "2pm"],
["Ferry Plaza Farmers Market",2,10,14,1,1,2011,12,31,2012, 37.7955, -122.393, "10am", "2pm"],
["Ferry Plaza Farmers Market",4,10,14,1,1,2011,12,31,2012, 37.7955, -122.393, "10am", "2pm"],
["Ferry Plaza Farmers Market",6,8,14,1,1,2011,12,31,2012, 37.7955, -122.393, "8am", "2pm"],
["Fillmore Farmers Market",6,9,13,1,1,2011,12,31,2012, 37.7833, -122.433, "9am", "1pm"],
["Heart of the City Farmers Market", 0,9,13.5,1,1,2011,12,31,2012,37.7799, -122.414, "9am", "1:30pm"],
["Inner Sunset Farmers Market",0,9,13,1,1,2011,12,31,2012, 37.7636, -122.466, "9am", "1pm"],
["Kaiser Permanente Farmers Market",3,10,14,1,1,2011,12,31,2012,37.783, -122.441, "10am", "2pm"],
["Mission Community Market",4,16,20,4,14,2011,12,15,2012, 37.7689, -122.39, "4pm", "8pm"],
["Mission Bay Farmers Market", 3,10,14,4,11,2012,11,14,2012,37.7689,-122.39, "10am", "2pm"],
["Noe Valley Farmers Market", 6,8,13,1,1,2011,12,31,2011,37.7516,-122.4288,"8am", "1pm"],
["Rincon Center Farmers Market",3,11,14,1,1,2011,12,31,2011,37.7922,-122.3929, "11am", "2pm"],
["Rincon Center Farmers Market", 5,11,14,1,1,2011,12,31,2011,37.7922,-122.3929, "11am", "2pm"],
["Upper Haight Farmers Market", 3,16,20,4,4,2012,10,24,2012,37.7682, -122.453, "4pm", "8pm"],
["Stonestown Galleria Farmers Market",0,9,13,1,1,2011,12,31,2012,37.7297,-122.478, "9am", "1pm"],
["UCSF (Sunset) Farmers Market", 3,10,15,1,1,2011,12,31,2011,37.7630,-122.4578,  "10am", "3pm"],
["Fort Mason Center Farmers Market", 0,10,13.5,1,1,2011,12,31,2012,37.8051, -122.434, "9:30am", "1:30pm"],

//berkeley oakland
["Downtown Berkeley Farmers Market", 6,10,15,1,1,2011,12,31,2011,37.8696,-122.2727, "10am", "3pm"],
["South Berkeley Farmers Market", 2,14,18.5,4,4,2012,10,24,2012,37.8478,-122.271, "2pm", "6:30pm"],
["North Berkeley Farmers Market",4,15,19,1,1,2011,12,31,2012,37.8820,-122.2695, "3pm", "7pm"],
["Jack London Farmers Market", 0,10,14,1,1,2011,12,31,2012,37.7942,-122.2759, "10am", "2pm"],
["Fruitvale Farmers Market",0,10,15,1,1,2011,12,31,2012, 37.7758,-122.2236, "10am", "3pm"],
["Fruitvale Farmers Market",4,14,19,1,1,2011,12,31,2012, 37.7758,-122.2236, "2pm", "7pm"],
["Montclair Farmers Market",0,9,13,1,1,2011,12,31,2012,37.826231,-122.210535, "9am", "1pm"],
["Temescal Farmers Market",0,9,13,1,1,2011,12,31,2012, 37.839975,-122.259749, "9am", "1pm"],
["Old Oakland Farmers Market", 5,8,14,1,1,2012,12,31,2012,37.8009,-122.2733, "10am", "2pm"],
["East Oakland Farmers Market", 5,10,14,1,1,2011,12,31,2011,37.75927,-122.187031,"10am", "2pm"],
["Kaiser Hospital Farmers Market",5,10,14,1,1,2011,12,31,2011,37.8246,-122.2565, "10am", "2pm"],
["Grand Lake Farmers Market", 6,9,14,1,1,2011,12,31,2011,37.811426,-122.248014, "9am", "2pm"],

//portland
["Buckman Farmers Market", 4,15,19,5,1,2011,9,31,2012, 45.5141, -122.646,"3pm", "7pm"],
["Cedar Mill Sunset Farmers Market", 7,0,0,1,1,2011,12,31,2012, 45.5278, -122.816],
["Hillsdale Farmers Market", 0,10,14,5,1,2011,10,31,2012, 45.4779, -122.694,"10am", "2pm"],
["Hollywood Farmers Market", 6,8,13,5,1,2011,10,31,2012, 45.5364, -122.683, "8am", "1pm"],
["Hollywood Farmers Market", 6,9,13,10,1,2011,11,27,2012, 45.5364, -122.683, "9am", "1pm"],
["Interstate Farmers Market - Lombard location", 7,0,0,1,1,2011,12,31,2012, 45.5774, -122.683],
["Interstate Farmers Market - Overlook location",3,15,19,5,15,2011,9,31,2012, 45.5478, -122.681, "3pm", "7pm"],
["King Market", 6,10,14,5,1,2011,10,31,2012, 45.5573, -122.659, "10am", "2pm"],
["Lents International Farmers Market", 0,9,14,6,15,2011,10,15,2012, 45.4801, -122.569,"9am", "2pm"],
["Lloyd Farmers Market", 2,10,14,6,1,2011,9,31,2012, 45.5297, -122.657, "10am", "2pm"],
["Montavilla Farmers Market", 0,10,14,6,1,2011,10,15,2012, 45.5192, -122.585, "10am", "2pm"],
["Moreland Farmers Market", 3,15.5,19.5,5,15,2011,9,31,2012, 45.4739, -122.651, "3:30pm", "7:30pm"],
["NW Farmers Market", 4,15,19,6,1,2011,9,31,2012, 45.5248, -122.691,"3pm", "7pm"],
["OHSU Farmers Market", 2,11.5,15.5,5,15,2011,10,15,2012, 45.4992, -122.688, "11:30am", "3:30pm"],
["Parkrose Farmers Market", 6,8,14,5,1,2011,10,31,2012, 45.552, -122.541, "8am", "2pm"],
["People's Farmers Market", 3,14,19,1,1,2011,12,31,2012, 45.5008, -122.645,"2pm", "7pm"],
["Pioneer Courthouse Square Farmers Market", 1,10,14,6,15,2011,9,31,2012, 45.5188, -122.679,"10am", "2pm"],
["Pioneer Courthouse Square Farmers Market", 2,10,14,6,15,2011,9,31,2012, 45.5188, -122.679,"10am", "2pm"],
["Pioneer Courthouse Square Farmers Market", 4,10,14,6,15,2011,9,31,2012, 45.5188, -122.679,"10am", "2pm"],
["Winter Shemanski Park", 6,10,14,1,1,2011,12,31,2012, 45.5173, -122.682,"10am", "2pm"],
["Shemanski Park", 3,10,14,5,1,2011,10,31,2012, 45.5173, -122.682,"10am", "2pm"],
["PSU Farmers Market", 6,8.5,14,3,1,2011,10,31,2012, 45.5138, -122.684,"8:30am", "2pm"],
["Portland Farmers Market, Portland State Univ.", 6,9,14,11,1,2011,12,31,2012, 45.5138, -122.684,"9am", "2pm"],
["Boring Saturday Farmers Market", 0,9,14,6,1,2011,9,15,2012, 45.4307, -122.374, "9am", "2pm"],
["Canby Saturday Farmers Market", 6,9,13,5,15,2011,10,15,2012, 45.2637, -122.692, "9am", "1pm"],
["Estacada Farmers Market", 6,9,15,5,1,2011,10,31,2012, 45.2879, -122.335, "9am", "3pm"],
["Forest Grove Farmers Market", 3,16,20,5,15,2011,10,31,2012, 45.5201, -123.112, "4pm", "8pm"],
["Gresham Farmers Market", 6,8.5,13,5,1,2011,10,31,2012, 45.4994,-122.432, "8:30am", "1pm"],
["Lake Oswego Farmers Market", 6,8.5,13,5,15,2011,10,31,2012, 45.4173, -122.667, "8:30am", "1pm"],
["Milwaukie Farmers Market", 0,9.5,14,5,15,2011,10,31,2012, 45.4451,-122.642, "9:30am", "2pm"],
["Oregon City Farmers Market", 6,9,14,5,1,2011,10,31,2012, 45.333, -122.582, "9am", "2pm"],
["Scappoose Community Farmers Market", 6,9,14,5,15,2011,10,15,2012, 45.7572,-122.877, "9am", "2pm"],
["Sherwood Farmers Market", 6,9,13,5,1,2011,9,30,2012, 45.356,-122.843, "9am", "1pm"],
["Hillsboro Farmers Market", 6,8,13.5,5,1,2011,12,31,2012, 45.5227, -122.999, "8am", "1:30pm"],
["Hillsboro Farmers Market at Orenco Station", 0,10,14,5,1,2011,10,31,2012, 45.5141, -122.917,"10am", "2pm"],
["Hillsboro Tuesday Marketplace",2,17,20.5,5,1,2011,12,31,2012, 45.5228, -122.997,"5pm", "8:30pm"],
["Beaverton Farmers Market", 6,8,13.5,5,15,2011,10,31,2012, 45.4843, -122.805, "8am", "1:30pm"],
["Beaverton Farmers Market", 3,8,13.5,5,15,2011,10,31,2012, 45.4843, -122.805, "8am", "1:30pm"],
["Fairview Farmers & Artist Market", 4,16,20.5,4,1,2011,10,31,2012, 45.5311, -122.437, "4pm", "8:30pm"],
["Troutdale Farmers and Artists Market", 6,10,15,4,1,2011,10,31,2012, 45.5407, -122.385,"10am", "3pm"],
["Milwaukie Sunday Farmers Market", 0,9.5,14,1,1,2011,12,31,2012, 45.4451,-122.642,"9:30am", "2pm"],
["West Linn Farmers Market", 2,16,20,5,1,2011,10,15,2012, 45.3438, -122.656,"4pm", "8pm"],
["Tigard Area Farmers Market",0,9,14,5,15,2011,10,31,2012, 45.4348,-122.763,"9am", "2pm"],

//minneapolis
["Minneapolis Farmers Market", 1,6,13,4,28,2011,11,30,2012, 44.9685,-93.3080, "6am", "1pm"],
["Minneapolis Farmers Market", 2,6,13,4,28,2011,11,30,2012, 44.9685,-93.3080, "6am", "1pm"],
["Minneapolis Farmers Market", 3,6,13,4,28,2011,11,30,2012, 44.9685,-93.3080, "6am", "1pm"],
["Minneapolis Farmers Market", 4,6,13,4,28,2011,11,30,2012, 44.9685,-93.3080, "6am", "1pm"],
["Minneapolis Farmers Market", 5,6,13,4,28,2011,11,30,2012, 44.9685,-93.3080, "6am", "1pm"],
["Minneapolis Farmers Market", 6,7,14,4,28,2011,11,30,2012, 44.9685,-93.3080, "7am", "2pm"],
["Minneapolis Farmers Market", 0,7,14,4,28,2011,11,30,2012, 44.9685,-93.3080, "7am", "2pm"],
["Nicollet Mall Farmers Market", 4,6,18,4,28,2011,11,30,2012,44.9749,-93.2739, "6am", "6pm"],
["St Paul Farmers Market",6,6,13,4,28,2011,11,17,2012, 44.9499,-93.0854, "6am", "1pm"],
["St Paul Farmers Market",0,8,13,4,28,2011,11,17,2012, 44.9499,-93.0854, "6am", "1pm"],
["Roseville Farmers Market", 2,8,12,4,28,2011,11,30,2012, 45.0049,-93.1783,"8am", "12noon"],
["Aldrich Arena Farmers Market", 3,8,12,5,9,2011,10,31,2012, 44.996798,-93.023588,"8am", "12noon"],
["Apple Valley Farmers Market", 6,8,13,6,16,2011,10,27,2012, 44.735313,-93.20925,"8am", "1pm"],
["Hugo Farmers Market", 4,14.5,18.5,6,14,2011,10,23,2012,45.159964,-92.993341,"2:30pm", "6:30pm"],
["Inver Grove Farmers Market", 4,15.5,18.5,6,21,2011,10,4,2012, 44.831671,-93.065583,"3:30pm", "6:30pm"],
["Rosemount Farmers Market", 2,14,18,6,19,2011,9,25,2012, 44.747699,-93.127525,"2pm", "6pm"],
["St Paul 7th Place Farmers Market",2,10,13.5,6,12,2011,10,16,2012, 44.839929,-93.15552, "10am", "1:30pm"],
["St Paul 7th Place Farmers Market",4,10,13.5,6,7,2011,10,18,2012, 44.839929,-93.15552, "10am", "1:30pm"],
["St Thomas More Church Farmers Market", 5,13.25,17,5,4,2011,8,30,2012, 44.941489,-93.145523,"1:15pm", "5pm"],
["St Thomas More Church Farmers Market", 5,15.5,17.5,9,7,2011,10,26,2012, 44.941489,-93.145523,"3:30pm", "5:30pm"],
["West Saint Paul Farmers Market", 5,8,12,6,15,2011,10,26,2012, 44.909955,-93.080651,"8am", "12noon"],
["Winter Farmers Market", 6,9,13,12,1,2011,4,20,2012, 44.949964,-93.085482,"9am", "1pm"],
["Woodbury Farmers Market", 0,8,13,6,17,2011,10,28,2012,44.916375,-92.933832,"8am", "1pm"],
["Woodbury City Walk Farmers Market", 3,15.5,18.5,6,27,2011,10,10,2012, 44.944955,-92.903426,"3:30pm", "6:30pm"],
["Burnsville Farmers Market", 6,8,13,6,16,2011,10,27,2012, 44.772417,-93.281546,"8am", "1pm"],
["Burnsville Mary, Mother Farmers Market", 4,12,17,5,3,2011,10,25,2012, 44.790379,-93.227754,"12noon", "5pm"],
["Lakeville Farmers Market", 3,12,18,6,14,2011,10,31,2012, 44.648302,-93.242823,"12noon", "6pm"],
["Lakeville Farmers Market", 6,9,13,6,23,2011,10,13,2012, 44.648302,-93.242823,"9am", "1pm"],
["Minnesota Zoo Farmers Market", 3,10.5,2.5,6,13,2011,10,3,2012,44.766298,-93.194575,"10:30am", "2:30pm"],
["Savage Farmers Market", 0,8,12,6,3,2011,10,28,2012, 44.779129,-93.343921,"8am", "1pm"],

//austin
["Downtown Farmers Market", 6,9,13,1,1,2011,12,31,2012, 30.267182,-97.746988,"9am", "1pm"],
["Sunset Valley Farmers Market", 6,9,13,1,1,2011,12,31,2012, 30.230928,-97.807503,"9am", "1pm"],
["The Triangle Farmers Market", 3,16,20,3,1,2011,9,30,2012,30.315104,-97.736154,"4pm", "8pm"],
["The Triangle Farmers Market", 3,15,19,10,1,2011,2,28,2012,30.315104,-97.736154,"3pm", "7pm"],
["East Farmers Market", 2,10,13,1,1,2011,12,31,2012, 30.292423,-97.663307,"10am", "1pm"],
["Barton Creek Farmers Market", 6,9,13,1,1,2011,12,31,2012, 30.259246,-97.804499,"9am", "1pm"],
["Hope Farmers Market", 0,11,15,1,1,2011,12,31,2012, 30.263513,-97.730942,"11am", "3pm"],

//san antonio
["Pearl Brewey Farmers Market", 6,9,13,1,1,2011,12,31,2012, 29.444033,-98.479544,"9am", "1pm"],
["San Antonio Farmers Market", 2,7.5,13,1,1,2011,12,31,2012, 29.494322,-98.494722,"7:30am", "1pm"],
["San Antonio Farmers Market", 1,8,13,1,1,2011,12,31,2012, 29.587117,-98.529913,"8am", "1pm"],
["San Antonio Farmers Market", 3,8,13,5,1,2011,12,31,2012, 29.429878,-98.554956,"8am", "1pm"],
["San Antonio Farmers Market", 5,8,13,1,1,2011,12,31,2012, 29.544411,-98.550828,"8am", "1pm"],
["Main Plaza Farmers Market", 2,10,13,3,20,2011,12,31,2012, 28.915465,-98.553404,"8am", "1pm"],
["South Texas Farmers Market", 1,9,14,1,1,2011,12,31,2012,29.355881,-98.490555,"9am", "2pm"],
["South Texas Farmers Market", 5,9,14,1,1,2011,12,31,2012,29.355881,-98.490555,"9am", "2pm"],
["South Texas Farmers Market", 4,9,14,1,1,2011,12,31,2012,29.468381,-98.648818,"9am", "2pm"],
["South Texas Farmers Market", 5,9,14,1,1,2011,12,31,2012,29.50834,-98.62996,"9am", "2pm"],
["South Texas Farmers Market", 3,9,14,1,1,2011,12,31,2012,29.584446,-98.448994,"9am", "2pm"],

//seattle
["Broadway Farmers Market", 0,11,15,4,22,2011,12,23,2012, 47.61525,-122.320793,"11am", "3pm"],
["Columbia City Farmers Market", 3,15,19,5,1,2011,10,20,2012, 47.558661,-122.286151,"3pm", "7pm"],
["Lake City Farmers Market", 4,15,19,6,10,2011,10,15,2012,47.719291,-122.297664,"3pm", "7pm"],
["Magnolia Farmers Market", 6,10,14,6,1,2011,9,30,2012,47.639552,-122.399615,"10am", "2pm"],
["Phinney Farmers Market", 5,15,19,6,1,2011,10,10,2012,47.677651,-122.354583,"3pm", "7pm"],
["University District Farmers Market", 6,9,14,1,1,2011,12,31,2012,47.664906,-122.313075,"9am", "2pm"],
["West Seattle Farmers Market", 0,10,14,1,1,2011,12,31,2012,47.561104,-122.386784,"10am", "2pm"],
["Ballard Farmers Market", 0,10,15,1,1,2011,12,31,2012,47.666407,-122.383174,"10am", "3pm"],
["Madrona Farmers Market", 5,15,19,5,15,2011,9,30,2012,47.612954,-122.296184,"3pm", "7pm"],
["Wallingford Farmers Market", 3,15.5,19,5,25,2011,9,30,2012,47.665028,-122.3337,"3:30pm", "7pm"],

//philadelphia
["Rittenhouse Farmers Market", 2,10,13,5,1,2012,11,30,2012, 39.950143,-75.170669,"10am", "1pm"],
["Rittenhouse Farmers Market", 6,10,14,1,1,2012,12,31,2012, 39.950143,-75.170669,"10am", "2pm"],
["South & Passyunk Farmers Market", 2,14.5,19,5,15,2011,11,30,2012, 39.940539,-75.15101,"2:30 pm", "7pm"],
["Walnut Hill Farmers Market", 2,15,18,5,1,2011,9,30,2012,39.958301,-75.213523,"3pm", "6pm"],
["Walnut Hill Farmers Market", 5,15,18,5,1,2011,9,30,2012,39.958301,-75.213523,"3pm", "6pm"],
["University Square Farmers Market", 3,10,15,5,1,2011,11,30,2012,39.953147,-75.194782,"10am", "3pm"],
["The Porch Farmers Market", 3,11,14,5,1,2012,10,31,2012,39.956429,-75.196121,"11am", "2pm"],
["Fountain Farmers Market", 3,15,19,5,1,2012,10,30,2012,39.930225,-75.162997,"3pm", "7pm"],
["Oakmont Farmers Market", 3,15,19,5,1,2012,9,30,2012,39.988485,-75.31136,"3pm", "7pm"],
["Suburban Station Farmers Market", 4,12,18.5,1,1,2011,12,31,2012,39.952335,-75.163789,"12pm", "6:30pm"],
["IBC Farmers Market", 4,10.5,15.5,5,1,2012,9,30,2012,39.953564,-75.171939,"10:30am", "2:30pm"],
["Jefferson Farmers Market", 4,11,15.5,5,1,2012,10,31,2012,39.950009,-75.157064,"11am", "3:30pm"],
["Mt. Airy Farmers Market", 4,15,19,5,1,2012,10,31,2012,40.046377,-75.195912,"3pm", "7pm"],
["Bala Cynwyd Farmers Market", 4,14.5,18.5,5,1,2012,9,30,2012, 40.005644,-75.221936,"2:30pm", "6:30pm"],
["Gorgas Park Farmers Market", 5,14,18,5,1,2012,9,30,2012,40.037555,-75.221449,"2pm", "6pm"],
["Chestnut Hill Farmers Market", 6,10,13,1,1,2011,12,31,2012,40.067375,-75.196784,"10am", "1pm"],
["Girard & 27th  Farmers Market", 6,10,12,6,1,2012,10,31,2012,39.974189,-75.180434,"10am", "1pm"],
["Bryn Mawr Farmers Market", 6,10,12,5,1,2012,10,31,2012,40.020931,-75.317218,"10am", "12pm"],
["East Falls Farmers Market", 6,10,14,5,1,2012,10,31,2012,40.007467,-75.191996,"10am", "2pm"],
["Dickinson Square Farmers Market", 0,10,14,6,1,2012,10,31,2012,39.926959,-75.151143,"10am", "2pm"],
//["Headhouse Farmers Market", 6,10,14,5,1,2012,12,31,2012,39.942565,-75.145261,"10am", "2pm"],
["Headhouse Farmers Market", 0,10,14,5,1,2012,12,31,2012,39.942565,-75.145261,"10am", "2pm"],
["Clark Park Farmers Market", 4,15,19,6,1,2012,11,30,2012,39.949573,-75.20924,"3pm", "7pm"],
["Clark Park Farmers Market", 6,10,14,1,1,2012,11,30,2012,39.949573,-75.20924,"10am", "2pm"],
["Fitler Square Farmers Market", 6,9,14,1,1,2012,12,31,2012,39.947332,-75.17931,"9am", "2pm"],
//["Aviator Park Farmers Market", 3,15,19,,,,,,, 39.957456,-75.172403,"3pm", "7pm"],
["Broad and South Farmers Market", 3,14,19,5,1,2012,11,30,2012, 39.963582,-75.161155,"2pm", "7pm"],
["Cliveden Park Farmers Market", 3,14,18,6,1,2011,11,30,2012, 40.052241,-75.175804,"2pm", "6pm"],
["Fairmount Farmers Market", 4,15,19,5,1,2011,11,30,2012,39.96737,-75.173982,"3pm", "7pm"],
["Germantown Farmers Market", 5,14,18,5,1,2011,11,30,2012,40.039806,-75.178647,"2pm", "6pm"],
["52nd & Haverford Farmers Market", 3,13,17,6,1,2011,11,30,2012,39.965004,-75.22461,"1pm", "5pm"],
["52nd & Haverford Farmers Market", 5,13,17,5,1,2011,11,30,2012,39.965004,-75.22461,"1pm", "5pm"],
["Overbrook Farmers Market", 6,9,13,5,1,2012,11,30,2012,39.98833,-75.253935,"9am", "1pm"],
["Oxford Circle Farmers Market", 4,14,18,6,1,2012,10,30,2012,40.038306,-75.091267,"2pm", "6pm"],
["Frankford & Berks Farmers Market", 4,12,18,5,1,2012,9,30,2012,39.977607,-75.131352,"2pm", "6pm"],
["West Oak Lane Farmers Market", 2,14,18,1,1,2011,11,31,2012,40.063543,-75.153158,"2pm", "6pm"],
["Hunting Park Farmers Market", 6,10,14,6,1,2012,11,30,2012,40.016641,-75.147188,"10am", "2pm"],
["Frankford Transit Center Market", 2,14,18,6,1,2012,11,31,2012,40.023607,-75.076839,"2pm", "6pm"],
["29th and Wharton Farmers Market", 2,14,16,6,1,2012,10,31,2012,39.937131,-75.192197,"2pm", "6pm"],
["22nd & Tasker Farmers Market", 2,14,18,6,1,2012,11,30,2012, 39.932163,-75.181463,"2pm", "6pm"],
["33rd & Diamond Farmers Market", 2,14,18,6,1,2012,10,31,2012,39.988665,-75.187049,"2pm", "6pm"],
["58th & Chester Farmers Market", 3,14,18,6,1,2012,11,31,2012,39.935724,-75.228544,"2pm", "6pm"],
["Norris Square Park Farmers Market", 6,10,14,6,1,2012,10,31,2012,39.982142,-75.136007,"10am", "2pm"],
["Francisville Farmers Market", 6,10,14,6,1,2012,10,31,2012,39.969987,-75.167978,"10am", "2pm"],
["Broad & Snyder Farmers Market", 2,14,19,6,1,2012,10,31,2012,39.924391,-75.16974,"2pm", "7pm"],
["Cecil B Moore Farmers Market", 4,14,18,651,2012,11,25,2012,39.978693,-75.157859,"2pm", "6pm"],
["Olney Transit Center Farmers Market", 2,14,18,7,1,2012,11,30,2012,340.039086,-75.144771,"2pm", "6pm"],
["Schuylkill Farmers Market", 3,15,19,5,1,2012,11,30,2012,39.949028,-75.181134,"3pm", "7pm"],

	
//denver boulder	
["Southwest Plaza Farmers Market", 6,8,14,5,1,2012,10,31,2012,39.610962,-105.092862,"8am", "2pm"],
["Highlands Ranch Farmers Market", 0,10,14,5,1,2012,10,31,2012,39.547405,-104.999943,"10am", "2pm"],
["Havana Farmers Market", 2,10,15,6,15,2012,10,15,2012,39.75336,-104.865832,"10am", "3pm"],
["Calvary Temple Farmers Market", 2,10,13,9,1,2012,10,5,2012,39.711341,-104.959141,"10am", "1pm"],
["Littletons Aspen Grove Farmers Market", 3,10,15,6,15,2012,10,31,2012,39.582225,-105.025434,"10am", "3pm"],
["Wheat Ridge Farmers Market", 4,10,15,6,15,2012,10,30,2012,39.774902,-105.081361,"10am", "3pm"],	
["Cherry Creek Farmers Market", 6,8,13,5,1,2012,10,15,2012,39.71834,-104.959322,"8am", "1pm"],
["City Park Esplanade Farmers Market", 0,9,13,5,1,2012,10,31,2012,39.740184,-104.957402,"9am", "1pm"],
["Highland United Neighbors Farmers Market", 6,9,13,6,1,2012,10,31,2012,39.758342,-105.011721, "9am", "1pm"],
["The Market at Belmar", 0,10,14,6,1,2012,9,30,2012,39.70922,-105.081403,"10am", "2pm"],
["South Pearl Farmers Market", 0,9,13,5,15,2012,10,31,2012,39.707368,-104.980481,"9am", "1pm"],
["Boulder Farmers Market", 6,8,14,4,1,2012,11,31,2012,40.017404,-105.278269,"8am", "2pm"],
["Longmont Farmers Market", 6,8,13,4,1,2012,11,7,2012,40.159674,-105.13062,"8am", "1pm"],

//dallas fort worth
["Denton County Farmers Market", 2,7,13,56,1,2012,9,30,2012,33.212551,-97.136515,"7am", "1pm"],
["Denton County Farmers Market", 4,7,13,56,1,2012,9,30,2012,33.212551,-97.136515,"7am", "1pm"],
["Denton County Farmers Market", 6,7,13,56,1,2012,9,30,2012,33.212551,-97.136515,"7am", "1pm"],
["Frisco Farmers Market", 6,8,13,5,1,2012,10,21,2012,33.150492,-96.834643,"8am", "1pm"],
["McKinney Farmers Market", 4,15,19,4,15,2012,10,15,2012,33.198278,-96.707805,"3pm", "7pm"],
["McKinney Farmers Market", 6,8,12,4,15,2012,10,15,2012,33.194144,-96.61335,"8am", "12pm"],
["Rockwall Farmers Market", 6,8,12,5,1,2012,9,30,2012,32.931042,-96.461156,"8am", "12pm"],
["Four Seasons Farmers Market", 6,10,15,1,1,2012,12,31,2012,32.977263,-96.743055,"10am", "3pm"],
["Carrollton Square Farmers Market", 6,8.5,12.5,5,1,2012,9,30,2012,32.951841,-96.90758,"8:30am", "12:30pm"],	
["Carrollton Square Farmers Market", 7,8.5,12.5,5,1,2012,9,30,2012,32.951841,-96.90758,"8:30am", "12:30pm"],	
["Coppell Farmers Market", 6,8,12,4,1,2012,11,21,2012,32.951249,-97.005201,"8am", "12pm"],
//["Coppell Farmers Market", 7,8,12,11,21,2012,3,31,2012,32.951249,-97.005201,"8am", "12pm"],
["Keller Farmers Market", 6,8,12,5,1,2012,10,31,2012,32.930039,-97.227105,"8am", "2pm"],
["Cowtown Farmers Market", 6,8,12,1,1,2012,12,31,2012,32.716486,-97.442126, "8am", "12pm"],
["Cowtown Farmers Market", 3,8,12,6,1,2012,11,30,2012,32.716486,-97.442126, "8am", "12pm"],
["Fort Worth Downtown Market", 5,8,12,6,1,2012,9,30,2012,32.677761,-97.395648,"8am", "12pm"],
["Fort Worth Downtown Market", 6,8,12,6,1,2012,9,30,2012,32.677761,-97.395648,"8am", "12pm"],
["Fort Worth Downtown Market", 0,8,12,6,1,2012,9,30,2012,32.677761,-97.395648,"8am", "12pm"],
["Downtown Arlington Farmers Market", 5,8,13,1,1,2012,12,31,2012,32.737693,-97.104736,"8am", "1pm"],
["Downtown Arlington Farmers Market", 6,8,13,1,1,2012,12,31,2012,32.737693,-97.104736,"8am", "1pm"],
["Grand Prarie Farmers Market", 6,8,13,1,1,2012,12,31,2012,32.745441,-97.004666,"8am", "1pm"],
["Waxahachie Downtown Farmers Market", 6,8,13,5,1,2012,10,31,2012,32.383749,-96.849418,"8am", "1pm"],
//["White Rock Farmers Market", 7,10,13,9,1,2012,10,5,2012,39.711341,-104.959141,"10am", "1pm"],
["Dallas Farmers Market", 0,8,18,1,1,2012,12,31,2012,32.777559,-96.789307,"8am", "6pm"],
["Dallas Farmers Market", 1,8,18,1,1,2012,12,31,2012,32.777559,-96.789307,"8am", "6pm"],
["Dallas Farmers Market", 2,8,18,1,1,2012,12,31,2012,32.777559,-96.789307,"8am", "6pm"],
["Dallas Farmers Market", 3,8,18,1,1,2012,12,31,2012,32.777559,-96.789307,"8am", "6pm"],
["Dallas Farmers Market", 4,8,18,1,1,2012,12,31,2012,32.777559,-96.789307,"8am", "6pm"],
["Dallas Farmers Market", 5,8,18,1,1,2012,12,31,2012,32.777559,-96.789307,"8am", "6pm"],
["Dallas Farmers Market", 6,8,18,1,1,2012,12,31,2012,32.777559,-96.789307,"8am", "6pm"],
//["Mesquite Farmers Market", 7,8,13,5,1,2012,10,30,2012,32.766796,-96.599159,"8am", "1pm"],	

//houston
["City Hall Farmers Market", 3,11,13.5,1,1,2012,12,31,2012,29.760009,-95.369042,"11am", "1:30pm"],
["Urban Harvest Farmers Market", 5,15,19,1,1,2012,12,31,2012,29.721078,-95.459726,"3pm", "7pm"],
["Eastside Farmers Market", 6,8,13,1,1,2012,12,31,2012,29.734698,-95.423978,"8am", "12pm"],
["Highland Village Farmers Market",0, 10,13,1,1,2012,13,31,2012,29.740551,-95.447845,"10am", "1pm"],
//["Farmers Market at Clear Lake Shores", 7,8,12,1,1,2012,12,31,2012,29.541465,-95.045085,"8am", "12pm"],
["Houston Farmers Market at Rice Village", 2,15.5,18.5,1,1,2012,12,31,2012,29.714029,-95.408528,"3:30pm", "6:30pm"],

//raleigh durham
["Western Wake Farmers Market", 6,8,12,1,1,2012,12,31,2012,35.821423,-78.853475,"8am", "12pm"],
["Western Wake Farmers Market", 2,15.5,18.5,5,1,2012,9,31,2012,35.821423,-78.853475,"3:30pm", "6:30pm"],
["Durham Farmers Market", 6,8,12,4,1,2012,11,31,2012,36.000143,-78.901327,"8am", "12pm"],
["Durham Farmers Market", 3,15.5,18.5,5,1,2012,9,33,2012,36.000143,-78.901327,"3:30pm", "6:30pm"],
["Carrboro Farmers Market", 6,7,12,4,1,2012,10,31,2012,35.911446,-79.076822,"7am", "12pm"],
["Carrboro Farmers Market", 3,15.5,18.5,4,1,2012,10,15,2012,35.911446,-79.076822,"3:30pm", "6:30pm"],
["Raleigh Farmers Market", 1,5,18,1,1,2012,12,31,2012,35.76201,-78.662732,"5am", "6pm"],
["Raleigh Farmers Market", 2,5,18,1,1,2012,12,31,2012,35.76201,-78.662732,"5am", "6pm"],
["Raleigh Farmers Market", 3,5,18,1,1,2012,12,31,2012,35.76201,-78.662732,"5am", "6pm"],
["Raleigh Farmers Market", 4,5,18,1,1,2012,12,31,2012,35.76201,-78.662732,"5am", "6pm"],
["Raleigh Farmers Market", 5,5,18,1,1,2012,12,31,2012,35.76201,-78.662732,"5am", "6pm"],
["Raleigh Farmers Market", 6,5,18,1,1,2012,12,31,2012,35.76201,-78.662732,"5am", "6pm"],
["Raleigh Farmers Market", 0,8,18,1,1,2012,12,31,2012,35.76201,-78.662732,"8am", "6pm"],
["Raleigh Downtown Farmers Market", 3,10,14,4,21,2012,10,31,2012,35.772096,-78.638614,"10am", "2pm"],
["Midtown Farmers Market", 6,8,12,4,21,2012,10,15,2012,35.837203,-78.642458,"8am", "12pm"],
["Chatham Mills Farmers Market", 6,8,13,4,15,2012,11,15,2012,35.726987,-79.175742,"8am", "1pm"],
["Wake Forest Farmers Market", 6,8,12,4,1,2012,11,21,2012,35.980488,-78.508761,"8am", "12pm"],
["Wake Forest Farmers Market", 3,15,17,5,1,2012,11,31,2012,35.980488,-78.508761,"3pm", "5pm"],
["Wake Forest Farmers Market", 6,10,12,12,1,2012,3,11,2012,35.980488,-78.508761,"10am", "12pm"],
["Broad Ripple Farmers Market", 6,8,12,4,21,2012,10,15,2012,35.837203,-78.642458,"8am", "12pm"],

//phoenix
["Vincent Saturday Farmers Market", 6,9,13,1,1,2012,12,31,2012,33.510052,-111.996313,"9am", "1pm"],
["Downtown Phoenix Public Market", 6,8,12,1,2012,12,31,2012,33.455696,-112.07404,"8am", "12pm"],
["Downtown Phoenix Public Market", 3,16,20,1,2012,12,31,2012,33.455696,-112.07404,"4pm", "8pm"],
["Town and Country Market", 3,10,14,1,1,2012,12,31,2012,33.507478,-112.037267,"10am", "2pm"],
["Roadrunner Park Farmers Market", 6,8,15,1,1,2012,12,31,2012,33.597012,-112.005361,"8am", "3pm"],
["Ahwatukee Farmers Market", 0,9,13,1,1,2012,12,31,2012,33.331821,-111.983203,"9am", "1pm"],
["Twilight Farmers Market", 3,16,19,1,1,2012,12,31,2012,33.662468,-112.18689,"4pm", "7pm"],
["Norterra Farmers Market", 3,15.5,19.5,1,1,2012,12,31,2012,33.715184,-112.114298,"3:30pm", "7:30pm"],
["Westgate Fountain Park Market", 7,8,12,1,1,2012,12,31,2012,33.353596,-111.972774,"8am", "12pm"],
["Vistancia Country Club Farmers Market", 7,8,12,1,1,2012,12,31,2012,33.353596,-111.972774,"8am", "12pm"],
["Macdonald Street Market", 6,9.5,14,1,1,2012,12,31,2012,33.493126,-111.926049,"9:30am", "2pm"],
["Mesa Community Farmers Market", 5,9,13,1,1,2012,12,31,2012,33.421199,-111.831867,"9am", "1pm"],
["Solera Community Center Farmers Market", 7,15,19,1,1,2012,12,31,2012,33.303416,-111.841513,"3pm", "7pm"],
["Trilogy Farmers Market", 7,5,18,1,1,2012,12,31,2012,33.258974,-111.69435,"5am", "6pm"],
["OldTown Farmers Market", 6,8.5,13,1,1,2012,12,31,2012,33.492224,-111.924544,"8:30am", "1pm"],
["Skysong Downtown Farmers Market", 4,15,19,1,1,2012,12,31,2012,33.464432,-111.926122,"3pm", "7pm"],
["Carefree Farmers Market", 5,9,13,1,1,2012,12,31,2012,33.824956,-111.923096,"9am", "1pm"],
["Borgata of Scottsdale European Market", 5,10,14,1,1,2012,12,31,2012,33.527824,-111.927066,"10am", "2pm"],

//boston cambridge
["Allston Union Square Farmers Market", 6,11,15,6,15,2012,10,31,2012,42.363193,-71.129788,"11am", "3pm"],
["Ashmont Peabody Farmers Market", 5,15,19,7,15,2012,10,31,2012,42.285742,-71.064292,"3pm", "7pm"],
["Boston City Hall Farmers Market", 1,11,18,5,21,2012,11,25,2012,42.357965,-71.059398,"11am", "6pm"],
["Boston City Hall Farmers Market", 3,11,18,5,21,2012,11,25,2012,33.455696,-112.07404,"11am", "6pm"],
["Boston Medical Center Farmers Market", 5,11.5,14.5,7,15,2012,9,31,2012,42.334893,-71.075196,"11:30am", "6:30pm"],
["Bowdoin/Geneva Farmers Market", 4,15,18.5,7,1,2012,10,31,2012,42.305804,-71.067757,"3pm", "6:30pm"],
["Codman Square Farmers Market", 4,13,18,6,20,2012,10,21,2012,42.290184,-71.07163,"1pm", "6pm"],
["Copley Square Farmers Market", 2,11,18,5,15,2012,11,25,2012,42.349294,-71.076911,"11am", "6pm"],
["Dewey Square Farmers Market", 2,11.5,18.5,5,24,2012,11,25,2012,42.352271,-71.055242,"11:30am", "6:30pm"],
["Dewey Square Farmers Market", 4,11.5,18.5,5,21,2012,11,25,2012,42.352271,-71.055242,"11:30am", "6:30pm"],
["Dorchester House Farmers Market", 2,11.5,13.5,7,1,2012,10,31,2012,42.30429,-71.059175,"11:30am", "1:30pm"],
["Dudley Town Farmers Market", 2,15,19,6,1,2012,10,31,2012,42.325262,-71.075026,"3pm", "7pm"],
["Dudley Town Farmers Market", 4,15,19,6,1,2012,10,31,2012,42.325262,-71.075026,"3pm", "7pm"],
["East Boston Farmers Market", 4,15,18.5,7,1,2012,10,31,2012,42.374315,-71.039234,"3pm", "6:30pm"],
["Fields Corner Farmers Market", 6,9,12,7,1,2012,10,31,2012,42.298649,-71.060636,"9am", "12pm"],
["Roxbury / Frederick Douglass Square Farmers Market", 6,11,17,7,5,2012,11,7,2012,42.336667,-71.084281,"11am", "5pm"],
["Harvard Allston Farmers Market", 5,15,19,8,21,2012,10,31,2012,42.363193,-71.129788,"3pm", "7pm"],
["Hyde Park Farmers Market", 6,14,17,7,15,2012,10,8,2012,42.255913,-71.121595,"2pm", "5pm"],
["Jamaica Plain Farmers Market", 2,12,17,6,7,2012,10,31,2012,42.31213,-71.114373,"12pm", "5pm"],
["Jamaica Plain Farmers Market", 6,12,15,6,7,2012,11,31,2012,42.31213,-71.114373,"12pm", "3pm"],
["Loring-Greenough House Farmers Market", 4,14,18,5,31,2012,10,31,2012,42.309466,-71.115553,"2pm", "6pm"],
["Mattapan Farmers Market", 6,10,13,7,7,2012,10,31,2012,42.26763,-71.093955,"10am", "1pm"],
["Mission Hill - Brigham Circle Farmers Market", 4,11,18,6,7,2012,11,15,2012,42.3342,-71.104905,"11am", "6pm"],
["Roslindale Farmers Market", 6,9,13.5,6,1,2012,10,31,2012,42.28644,-71.128161,"9am", "1:30pm"],
["South Boston Farmers Market", 1,12,18,5,1,2012,11,25,2012,42.336213,-71.046812,"12pm", "6pm"],
["Central Square Farmers Market", 1,11.5,18,6,1,2012,10,31,2012,42.309466,-71.115553,"11:30am", "6pm"],
["Central Square Farmers Market", 1,11.5,17,11,1,2012,10,31,2012,42.309466,-71.115553,"11:30am", "5pm"],
["Charles Square Market", 5,10,18,6,15,2012,11,21,2012,42.26763,-71.093955,"10am", "6pm"],
["Charles Square Market", 0,10,15,5,25,2012,11,21,2012,42.26763,-71.093955,"10am", "3pm"],
["Harvard University Farmers Market", 2,12.5,14.5,6,1,2012,11,30,2012,42.3342,-71.104905,"12:30pm", "6pm"],
["Kendall Square Farmers Market", 4,11,14.5,6,1,2012,11,30,2012,42.287998,-71.089934,"11am", "2:30pm"],
["Cambridgeport Farmers Market", 6,10,14,6,15,2012,10,31,2012,42.28644,-71.128161,"10am", "2pm"],


//san diego
["Borrego Springs Chamber of Commerce Farmers Market", 5,7,12,10,1,2012,5,31,2012,33.256633,-116.375856,"7am", "12pm"],
["Carlsbad Village Farmers Market", 3,13,17,1,1,2012,12,31,2012,33.159383,-117.351849,"1pm", "5pm"],
["Carlsbad Village Farmers Market", 6,13,17,1,1,2012,12,31,2012,33.159383,-117.351849,"1pm", "5pm"],
["Chula Vista Farmers Market", 4,15,19,4,1,2012,10,8,2012,32.640531,-117.078896,"3pm", "7pm"],
["Chula Vista Farmers Market", 4,15,18,11,1,2012,3,31,2012,32.640531,-117.078896,"3pm", "6pm"],
["Chula Vista Otay Farmers Market", 2,16,20,1,1,2012,12,31,2012,32.62146,-116.962981,"4pm", "8pm"],
["Coronado Farmers Market", 2,14.5,18,1,1,2012,12,31,2012,32.699082,-117.169683,"2:30pm", "6pm"],
["Encinitas Station Farmers Market", 3,17,20,1,1,2012,12,31,2012,33.0448,-117.292443,"5pm", "8pm"],
["Del-Mar Farmers Market", 6,13,16,1,1,2012,12,31,2012,32.955024,-117.263381,"1pm", "4pm"],
["Welk Farmers Market", 1,15,19,1,1,2012,12,31,2012,33.232543,-117.143281,"3pm", "7pm"],

["Escondido Farmers Market", 2,14,18,1,1,2012,12,31,2012,33.123001,-117.078709,"2pm", "6pm"],
["Fallbrook Farmers Market", 5,10,14,1,1,2012,12,31,2012,33.382076,-117.251368,"11am", "6pm"],
["Imperial Beach Farmers Market", 5,14,18,10,1,2012,3,31,2012,32.579736,-117.132327,"2pm", "6pm"],
["Imperial Beach Farmers Market", 5,14,19.5,4,1,2012,9,30,2012,32.579736,-117.132327,"2pm", "7:30pm"],
["Leucadia/Encinitas Farmers Market", 0,10,14,1,1,2012,12,31,2012,33.05792,-117.297262,"10am", "2pm"],
["La Costa Canyon Farmers Market", 6,10,14,1,1,2012,12,31,2012,33.073174,-117.228064,"10am", "2pm"],
["La Jolla Farmers Market", 0,9,13,1,1,2012,12,31,2012,32.837594,-117.271544,"9am", "1pm"],
["UCSD Price Center Farmers Market", 2,10,14,1,7,2012,6,21,2012,32.879043,-117.237566,"10am", "6pm"],
["UCSD Price Center Farmers Market", 2,10,14,9,21,2012,12,15,2012,32.879043,-117.237566,"10am", "6pm"],
["La Mesa Farmers Market", 5,14,18,1,1,2012,12,31,2012,32.767213,-117.022376,"2pm", "6pm"],
["Ocean Beach Farmers Market", 3,16,19,1,1,2012,3,31,2012,32.746298,-117.250192,"4pm", "7pm"],
["Ocean Beach Farmers Market", 3,17,20,1,1,2012,3,31,2012,32.746298,-117.250192,"5pm", "8pm"],
["Oceanside Farmers Market", 4,9,13,1,1,2012,12,31,2012,33.196762,-117.380247,"9am", "1pm"],
["Oceanside Sunset Farmers Market", 5,17,21,1,1,2012,12,31,2012,33.196292,-117.381042,"5pm", "9pm"],
["Pacific Beach Farmers Market", 6,8,12,1,1,2012,12,31,2012,32.791766,-117.25414,"8am", "12pm"],
["Pacific Beach Tuesday Farmers Market", 2,14,18.5,1,1,2012,12,31,2012,32.796963,-117.25367,"2pm", "6:30pm"],
["Point Loma Farmers Market", 0,9.5,14.5,1,1,2012,12,31,2012,32.720282,-117.229866,"9:30am", "2:30pm"],
["Poway Farmers Market", 6,8,11.5,1,1,2012,12,31,2012,32.970274,-117.036602, "8am", "11:30am"],
["Ramona Farmers Market", 6,9,13,1,1,2012,12,31,2012,33.034486,-116.882107,"9am", "1pm"],
["North San Diego Farmers Market", 0,10.5,15.5,1,1,2012,12,31,2012,33.067839,-117.064699,"10:30am", "3:30pm"],
["Rancho Santa Fe Del Rayo Farmers Market", 0,9,13.5,1,1,2012,12,31,2012,32.991319,-117.197357,"9am", "1:30pm"],
["City Heights Farmers Market", 6,9,13,1,1,2012,12,31,2012,32.747868,-117.101598,"9am", "1pm"],
["Golden Hill Farmers Market", 6,9.5,13.5,1,1,2012,12,31,2012,32.717941,-117.133838,"9:30am", "1:30pm"],
["Gaslamp / Third Ave Farmers Market", 0,9,13,1,1,2012,12,31,2012,32.709997,-117.161958,"9am", "1pm"],
["Hillcrest Farmers Market", 0,9,14,1,1,2012,12,31,2012,32.75025,-117.148955,"9am", "2pm"],
["Horton Square Farmers Market", 4,11,15,3,1,2012,10,31,2012,32.715576,-117.162709,"11am", "3pm"],
["Linda Vista Farmers Market", 4,14,18,1,1,2012,12,31,2012,32.785124,-117.169538,"2pm", "6pm"],
["Little Italy Farmers Market", 6,9,13.5,1,1,2012,12,31,2012,32.722981,-117.168288,"9am", "1:30pm"],
["Mira Mesa Farmers Market", 2,14.5,19,2,5,2012,12,15,2012,32.910371,-117.139245,"2:30pmm", "7pm"],
["Morena District Farmers Market", 2,15,19,1,1,2012,12,31,2012,32.769212,-117.20381,"3pm", "7pm"],
["Mission Hills Farmers Market", 3,15,19,1,1,2012,12,31,2012,32.749911,-117.170488,"3pm", "7pm"],
["North Park Farmers Market", 4,15,19,1,1,2012,12,31,2012,32.747814,-117.126081,"3pm", "7pm"],
["Pacific Highlands Farmers Market", 4,15.5,19,1,1,2012,12,31,2012,32.960004,-117.189395,"3:30pm", "7pm"],
["Rancho San Diego Farmers Market", 6,9,14,1,1,2012,12,31,2012,32.747266,-116.937004,"9am", "2pm"],
["San Carlos Farmers Market", 4,16,19,1,1,2012,12,31,2012,32.800997,-117.020469,"4pm", "7pm"],
["Scripps Ranch Farmers Market", 6,9,13,1,1,2012,12,31,2012,32.935538,-117.095507,"9am", "1pm"],
["San Diego Public Farmers Market", 3,9,14,1,1,2012,12,31,2012,32.702507,-117.147731,"9am", "2pm"],
["San Diego Public Farmers Market", 0,9,14,1,1,2012,12,31,2012,32.702507,-117.147731,"9am", "2pm"],
["Peoples Produce Farmers Market", 5,14,18,1,1,2012,12,31,2012,32.710476,-117.087582,"2pm", "6pm"],
["UTC Farmers Market", 4,15,19,1,1,2012,12,31,2012,32.869955,-117.213978,"3pm", "7pm"],
["San Marcos Farmers Market", 3,13,17,1,1,2012,12,31,2012,33.12792,-117.160724,"1pm", "5pm"],
["San Marcos Farmers Market", 0,10,14,1,1,2012,12,31,2012,33.12792,-117.160724,"10am", "2pm"],
["Santee Farmers Market", 3,15,19,1,1,2012,12,31,2012,32.838422,-116.969967,"3pm", "7pm"],
["Solano Beach Farmers Market", 0,13,17,1,1,2012,12,31,2012,32.987559,-117.269375,"1pm", "5pm"],
["Vista Main Street Farmers Market", 3,16,20,1,1,2012,12,31,2012,33.202442,-117.241913,"4pm", "8pm"],
["Vista Farmers Market", 6,8,12,1,1,2012,12,31,2012,33.192322,-117.25653,"8am", "12pm"],

//indianapolis
["Broad Ripple Farmers Market", 6,8,12.5,5,1,2012,11,31,2012,39.868973,-86.138103,"8am", "12:30pm"],
["Broad Ripple Farmers Market", 3,17,20,6,1,2012,9,30,2012,39.868973,-86.138103,"5pm", "8pm"],
["Indianapolis City Market", 3,9.5,13.5,5,1,2012,10,31,2012,39.768466,-86.154055,"9:30am", "1:30pm"],
["Indianapolis City Market", 3,10,13,11,1,2012,4,31,2012,39.768466,-86.154055,"10am", "1pm"],
["Traders Point Green Market", 5,16,20,5,1,2012,10,31,2012,39.917292,-86.288176,"4pm", "8pm"],
["Traders Point Green Market", 6,9,13.5,11,1,2012,4,31,2012,39.917292,-86.288176,"9am", "1:30pm"],
["Indy Winter Farmers Market", 6,9,00,11,15,2012,4,31,2012,39.768466,-86.154055,"11am", "6pm"],

//new york
["Staten Island Ferry / Whitehall Greenmarket", 2,8,19,1,1,2012,12,31,2012,40.701306,-74.013213,"8am", "7pm"],
["Staten Island Ferry / Whitehall Farmers Market", 5,8,19,1,1,2012,12,31,2012,40.701306,-74.013213,"8am", "7pm"],
["Bowling Green Farmers Market", 2,8,17,1,1,2012,12,31,2012,40.704587,-74.014266,"8am", "5pm"],
["Bowling Green Farmers Market", 4,8,17,1,1,2012,12,31,2012,40.704587,-74.014266,"8am", "5pm"],
["Downtown PATH Farmers Market", 2,8,18,1,1,2012,12,31,2012,40.711581,-74.008133,"8am", "6pm"],
["City Hall Park Farmers Market", 2,8,16,3,1,2012,12,21,2012,40.714053,-74.006417,"8am", "4pm"],
["City Hall Park Farmers Market", 5,8,16,3,1,2012,12,21,2012,40.714053,-74.006417,"8am", "4pm"],
["Tribeca Farmers Market", 3,8,15,1,1,2012,12,31,2012,40.716363,-74.011073,"8am", "3pm"],
["Tribeca Farmers Market", 6,8,15,1,1,2012,12,31,2012,40.716363,-74.011073,"8am", "3pm"],
["Tompkins Square Farmers Market", 0,8,18,1,1,2012,12,31,2012,40.726018,-73.983532,"8am", "6pm"],
["St Mark's Church Farmers Market", 2,8,19,5,15,2012,11,20,2012,40.729753,-73.986817,"8am", "7pm"],
["Stuyvesant Town Farmers Market", 0,9.5,16,5,1,2012,12,23,2012,40.730399,-73.980357,"9:30am", "4pm"],
["Abingdon Square Farmers Market", 6,8,14,1,1,2012,12,31,2012,40.737548,-74.00483,"8am", "2pm"],
["Union Square Market", 1,8,18,1,1,2012,12,31,2012,40.737098,-73.990352,"8am", "6pm"],
["Union Square Market", 3,8,18,1,1,2012,12,31,2012,40.737098,-73.990352,"8am", "6pm"],
["Union Square Market", 5,8,18,1,1,2012,12,31,2012,40.737098,-73.990352,"8am", "6pm"],
["Union Square Market", 6,8,18,1,1,2012,12,31,2012,40.737098,-73.990352,"8am", "6pm"],
["Dag Hammarskjold Plaza Farmers Market", 3,8,16,1,1,2012,12,31,2012,40.752992,-73.96988,"8am", "4pm"],
["Rockefeller Center Farmers Market", 2,8,17,7,25,2012,8,25,2012,40.759068,-73.97846,"8am", "5pm"],
["Rockefeller Center Farmers Market", 3,8,17,7,25,2012,8,25,2012,40.759068,-73.97846,"8am", "5pm"],
["Rockefeller Center Farmers Market", 4,8,17,7,25,2012,8,25,2012,40.759068,-73.97846,"8am", "5pm"],
["Rockefeller Center Farmers Market", 5,8,17,7,25,2012,8,25,2012,40.759068,-73.97846,"8am", "5pm"],
["57th Street Farmers Market", 6,8,18,4,15,2012,12,22,2012,40.767923,-73.98572,"8am", "6pm"],
["57th Street Farmers Market", 3,8,18,5,1,2012,12,21,2012,40.767923,-73.98572,"8am", "6pm"],
["Tucker Square Farmers Market", 4,8,17,1,1,2012,12,31,2012,40.773607,-73.981579,"8am", "5pm"],
["Tucker Square Farmers Market", 6,8,17,1,1,2012,12,31,2012,40.773607,-73.981579,"8am", "5pm"],
["79th Street Farmers Market", 0,8,18,1,1,2012,12,31,2012,40.781267,-73.975981,"8am", "6pm"],
["82nd Street Farmers Market", 6,9,14.5,1,1,2012,12,31,2012,42.3342,-71.104905,"9am", "2:30pm"],
["92nd Street Farmers Market", 0,9,16,6,15,2012,12,23,2012,40.781013,-73.946357,"9am", "4pm"],
["97th Street Farmers Market", 5,8,14,1,1,2012,12,31,2012,40.79356,-73.967012,"8am", "2pm"],
["Mount Sinai Hospital Farmers Market", 3,8,17,6,15,2012,11,21,2012,40.788876,-73.952022,"8am", "5pm"],
["Columbia University Farmers Market", 0,8,18,1,1,2012,12,31,2012,40.806672,-73.964765,"8am", "6pm"],
["Columbia University Farmers Market", 4,8,18,1,1,2012,12,31,2012,40.806672,-73.964765,"8am", "6pm"],
["Ft. Washington Farmers Market", 2,8,16,6,1,2012,11,15,2012,40.842172,-73.942289,"8am", "4pm"],
["175th Street Farmers Market", 4,8,17,6,21,2012,11,7,2012,40.846223,-73.938468,"8am", "5pm"],
["Inwood Farmers Market", 6,8,18,1,1,2012,12,31,2012,40.869916,-73.920896,"8am", "6pm"],
["NY/NJ Port Authority Farmers Market", 4,8,18,1,1,2012,12,31,2012,40.757228,-73.989793,"8am", "6pm"],
["Lower East Side YM Farmers Market", 4,15,19,7,10,2012,11,20,2012,40.714399,-73.981655,"3pm", "7pm"],
["Roberto Clemente Plaza YM Farmers Market", 3,9,15.5,7,11,2012,11,14,2012,40.816062,-73.917624,"9am", "3:30pm"],
["Riverdale YM Farmers Market", 4,15,19,7,10,2012,11,15,2012,40.903881,-73.903129,"3pm", "7pm"],
["Poe Park Farmers Market", 2,8,15,7,1,2012,11,21,2012,40.864235,-73.895722,"8am", "3pm"],
["Bronx Borough Hall Farmers Market", 2,8,18,6,1,2012,12,20,2012,40.826881,-73.922625,"8am", "6pm"],
["Lincoln Hospital Farmers Market", 2,8,15,6,25,2012,11,20,2012,40.817388,-73.922738,"8am", "3pm"],
["Lincoln Hospital Farmers Market", 5,8,15,6,25,2012,11,20,2012,40.817388,-73.922738,"8am", "3pm"],
["New York Botanical Garden Farmers Market", 3,9,15,6,15,2012,11,31,2012,40.866094,-73.882585,"9am", "3pm"],
["Crotona Park Farmers Market", 6,8,15,7,1,2012,11,20,2012,40.834744,-73.898436,"8am", "3pm"],
["Learn It, Grow It, Eat it YM Market", 3,10,15,7,11,2012,11,14,2012,40.831177,-73.900282,"10am", "3pm"],
["Marble Hill YM Market", 4,14,18,7,11,2012,11,31,2012,40.874682,-73.909712,"2pm", "6pm"],
["Parkchester/Virginia Pk Farmers Market", 5,8,16,6,25,2012,11,15,2012,40.833052,-73.862636,"8am", "4pm"],
["Wholesale Market Farmers Market", 2,2,8,3,1,2012,11,30,2012,40.802336,-73.873668,"2am", "8am"],
["Wholesale Market Farmers Market", 3,2,8,3,1,2012,11,30,2012,40.802336,-73.873668,"2am", "8am"],
["Wholesale Market Farmers Market", 4,2,8,3,1,2012,11,30,2012,40.802336,-73.873668,"2am", "8am"],
["Wholesale Market Farmers Market", 5,2,8,3,1,2012,11,30,2012,40.802336,-73.873668,"2am", "8am"],
["Wholesale Market Farmers Market", 6,2,8,3,1,2012,11,30,2012,40.802336,-73.873668,"2am", "8am"],
["Astoria Farmers Market", 3,8,15,7,11,2012,11,14,2012,40.76798,-73.932259,"8am", "3pm"],
["Jackson Heights Farmers Market", 0,8,15,1,1,2012,12,31,2012,40.753353,-73.889279,"8am", "3pm"],
["Sunnyside Farmers Market", 6,8,16,6,1,2012,12,22,2012,40.746881,-73.920808,"8am", "4pm"],
["Corona Farmers Market", 5,8,17,7,5,2012,11,22,2012,40.749884,-73.862706,"8am", "5pm"],
["Elmhurst Hospital Farmers Market", 2,8,14,7,5,2012,11,20,2012,40.745899,-73.884551,"8am", "4pm"],
["Ridgewood YM Farmers Market", 6,10,15,7,10,2012,11,20,2012,40.700227,-73.906381,"10am", "3pm"],
["Socrates Sculpture Park Farmers Market", 6,8,14,6,15,2012,11,21,2012,40.76771,-73.936178,"8am", "4pm"],
["Douglaston Farmers Market", 0,8,15,7,7,2012,11,20,2012,40.768774,-73.749021,"8am", "3pm"],
["Atlas Park Farmers Market", 6,8,15,7,8,2012,11,20,2012,40.709271,-73.870141,"8am", "3pm"],
["Forest Hills Farmers Market", 0,8,15,7,1,2012,12,23,2012,40.72188,-73.846385,"8am", "3pm"],
["Greenpoint - McCarren Park Farmers Market", 6,8,15,1,1,2012,12,31,2012,40.719219,-73.952477,"8am", "3pm"],
["Williamsburg Farmers Market", 4,8,16,7,1,2012,11,15,2012,40.70889,-73.959262,"8am", "4pm"],
["Fort Greene Park Farmers Market", 6,8,16,1,1,2012,12,31,2012,40.68962,-73.973127,"8am", "4pm"],
["Brooklyn Borough Hall Farmers Market", 2,8,18,1,1,2012,12,31,2012,40.693727,-73.990376,"8am", "6pm"],
["Brooklyn Borough Hall Farmers Market", 4,8,18,1,1,2012,12,31,2012,40.693727,-73.990376,"8am", "6pm"],
["Brooklyn Borough Hall Farmers Market", 6,8,18,1,1,2012,12,31,2012,40.693727,-73.990376,"8am", "6pm"],
["Carroll Gardens Farmers Market", 0,8,15,1,1,2012,12,31,2012,40.68085,-73.995731,"8am", "5pm"],
["Grand Army Plaza Farmers Market", 6,8,16,1,1,2012,12,31,2012,40.664504,-73.976932,"8am", "4pm"],
["Bartel-Pritchard Square Farmers Market", 3,8,15,5,1,2012,11,21,2012,40.671458,-73.97118,"8am", "5pm"],
["Windsor Terrace-PS154 Farmers Market", 0,9,15,7,7,2012,11,20,2012,40.657201,-73.976398,"9am", "5pm"],
["Cortelyou Farmers Market", 0,8,16,1,1,2012,12,31,2012,40.64083,-73.9653,"8am", "4pm"],
["Boro Park Farmers Market", 4,8,15,7,5,2012,11,20,2012,40.633137,-73.990497,"8am", "3pm"],
["Sunset Park Farmers Market", 6,8,15,6,20,2012,11,20,2012,40.640798,-74.018371,"8am", "3pm"],
["Bay Ridge Farmers Market", 6,8,15,5,10,2012,11,21,2012,40.617226,-74.033616,"8am", "3pm"],
["Cypress Hills YM Farmers Market", 5,14,18,7,10,2012,11,21,2012,40.682055,-73.877878,"2pm", "6pm"],
["Brownsville Rockaway YM Farmers Market", 5,13,18,7,10,2012,11,20,2012,40.663224,-73.909149,"1pm", "6pm"],
["Kensington YM Farmers Market", 6,9,15,7,10,2012,11,20,2012,40.649013,-73.977063,"9am", "3pm"],
["Brownsville Rec Center YM Farmers Market", 6,10.5,14.5,1,1,2012,12,31,2012,40.656957,-73.900781,"10:30am", "2:30pm"],
//["Brownsville Pitkin YM Farmers Market", 6,9.5,15.5,7,10,2012,11,20,2012,0,0,"9:30am", "3:30pm"],
["Bensonhurst Farmers Market", 0,9,16,7,5,2012,11,20,2012,40.725764,-73.877575,"9am", "4pm"],
["St. George Farmers Market", 6,8,14,5,10,2012,11,20,2012,40.641586,-74.077909,"8am", "2pm"],
["Staten Island Mall Farmers Market", 6,9,16,6,21,2012,12,22,2012,42.3342,-71.104905,"9am", "4pm"],

//los angeles
["Chinatown Farmers Market", 4,16,20,1,1,2012,12,31,2012,34.061751,-118.240049,"4pm", "8pm"],
["Historic District Farmers Market", 0,9,13,1,1,2012,12,31,2012,34.04738,-118.24958,"9am", "1pm"],
["Downtown LA Figueroa Farmers Market", 4,11,15,1,1,2012,12,31,2012,34.049599,-118.260917,"11am", "3pm"],
["Downtown LA BofA Plaza Farmers Market", 5,10,14,1,1,2012,12,31,2012,34.053492,-118.252913,"10am", "2pm"],
["Downtown LA Pershing Square Farmers Market", 3,11.5,16,1,1,2012,12,31,2012,34.049236,-118.252889,"11:30am", "4pm"],
["Echo Park Farmers Market", 5,15,19,1,1,2012,12,31,2012,34.075816,-118.259257,"3pm", "7pm"],
["Little Tokyo/Arts District Farmers Market", 4,10,14,1,1,2012,12,31,2012,34.053873,-118.243275,"10am", "1pm"],
["Sylmar Farmers Market", 6,9,13,1,1,2012,12,31,2012,34.314506,-118.420247,"9am", "1pm"],
["Chatsworth Farmers Market", 6,16,20,1,1,2012,12,31,2012,34.257399,-118.571896,"4pm", "8pm"],
["Northridge Farmers Market", 3,15,21,3,1,2012,11,30,2012,34.240874,-118.555951,"5pm", "9pm"],
["Canoga Park (Pierce College) Farmers Market", 4,15,21,1,1,2012,12,31,2012,34.188375,-118.585725,"5pm", "9pm"],
["Canoga Park (Saturday) Farmers Market", 6,9,13,1,1,2012,12,31,2012,34.201021,-118.601566,"9am", "1pm"],
["Woodland Hills Farmers Market", 4,10,14.5,1,1,2012,12,31,2012,34.170993,-118.589741,"10am", "2:30pm"],
["Encino Farmers Market", 0,8,13,1,1,2012,12,31,2012,34.186629,-118.51204,"8am", "1pm"],
["Panorama City Farmers Market", 3,9,13.5,1,1,2012,12,31,2012,34.219844,-118.430029,"9am", "1:30pm"],
["Van Nuys Farmers Market", 4,10,14,1,1,2012,12,31,2012,34.184353,-118.447291,"10am", "2pm"],
["Sherman Oaks Farmers Market", 2,15,20,1,1,2012,12,31,2012,34.157609,-118.431298,"3pm", "8pm"],
["Sherman Oaks Tuesday Farmers Market", 2,15,20,1,1,2012,12,31,2012,34.156508,-118.436777,"3pm", "8pm"],
["Sherman Oaks - Galleria Farmers Market", 6,8,13,1,1,2012,12,31,2012,34.157589,-118.466154,"8am", "1pm"],
["Berverly Glen Farmers Market", 6,9,14,1,1,2012,12,31,2012,34.126809,-118.444416,"9am", "2pm"],
["North Hollywood Arts District Farmers Market", 6,8,14,1,1,2012,12,31,2012,34.164918,-118.377397,"8am", "2pm"],
["Studio City Farmers Market", 0,8,13,1,1,2012,12,31,2012,34.143857,-118.393489,"8am", "1pm"],
["Toluca Lake Farmers Market", 0,9,14,1,1,2012,12,31,2012,34.152211,-118.353816,"9am", "2pm"],
["Atwater Village Farmers Market", 0,10,14,1,1,2012,12,31,2012,34.118006,-118.26042,"10am", "2pm"],
["Los Feliz Farmers Market", 0,9,14,1,1,2012,12,31,2012,34.104866,-118.291783,"9am", "2pm"],
["Barnsdall Art Park Farmers Market", 3,12,18,1,1,2012,12,31,2012,34.101618,-118.295027,"12pm", "6pm"],
["East Hollywood Farmers Market", 4,15.5,19.5,1,1,2012,12,31,2012,34.102228,-118.308141,"3:30pm", "7:30pm"],
["Eagle Rock N Roll Farmers Market", 0,9,14,1,1,2012,12,31,2012,34.141382,-118.225859,"9am", "2pm"],
["Eagle Rock Farmers Market", 5,17,20.5,1,1,2012,12,31,2012,34.138092,-118.21311,"5pm", "8:30pm"],
["Highland Park Farmers Market", 2,15,20,1,1,2012,12,31,2012,34.110478,-118.1935,"3pm", "8pm"],
["El Sereno Farmers Market", 5,16,20,1,1,2012,12,31,2012,34.093263,-118.160989,"4pm", "8pm"],
["Fairfax Farmers Market", 1,8,20,1,1,2012,12,31,2012,34.071655,-118.359935,"8am", "8pm"],
["Fairfax Farmers Market", 2,8,20,1,1,2012,12,31,2012,34.071655,-118.359935,"8am", "8pm"],
["Fairfax Farmers Market", 3,8,20,1,1,2012,12,31,2012,34.071655,-118.359935,"8am", "8pm"],
["Fairfax Farmers Market", 4,8,20,1,1,2012,12,31,2012,34.071655,-118.359935,"8am", "8pm"],
["Fairfax Farmers Market", 5,8,20,1,1,2012,12,31,2012,34.071655,-118.359935,"8am", "8pm"],
["Fairfax Farmers Market", 6,8,19,1,1,2012,12,31,2012,34.071655,-118.359935,"8am", "7pm"],
["Fairfax Farmers Market", 0,8,19,1,1,2012,12,31,2012,34.071655,-118.359935,"8am", "7pm"],
["Melrose Place (West Hollywood) Farmers Market", 0,10,14,1,1,2012,12,31,2012,34.083662,-118.373618,"10am", "2pm"],
["West Hollywood Farmers Market", 1,9,14,1,1,2012,12,31,2012,34.075642,-118.35222,"9am", "2pm"],
["Hollywood (Sunday) Farmers Market", 0,8,13,1,1,2012,12,31,2012,34.098021,-118.328799,"8am", "1pm"],
["Yamishiro (Hollywood) Farmers Market", 4,17,21,1,1,2012,12,31,2012,34.106432,-118.34213,"5pm", "9pm"],
["Larchmont Village/Hancock Park Farmers Market", 0,10,14,1,1,2012,12,31,2012,34.075003,-118.323625,"10am", "2pm"],
["Westwood Thursday Farmers Market", 4,12,18,1,1,2012,12,31,2012,34.061726,-118.446436,"12pm", "6pm"],
["Century City Farmers Market", 4,1,15,1,1,2012,12,31,2012,34.060637,-118.417514,"11am", "3pm"],
["La Cienega Farmers Market", 4,15,19,1,1,2012,12,31,2012,34.044516,-118.376832,"3pm", "7pm"],
["La Cienega Kaiser Farmers Market", 3,9,13.5,1,1,2012,12,31,2012,34.038138,-118.376243,"9am", "1:30pm"],
["Mid-City Wellington Farmers Market", 0,9,13,1,1,2012,12,31,2012,34.039601,-118.33505,"9am", "1pm"],
["Wilshire Center Farmers Market", 5,11,15,1,1,2012,12,31,2012,34.061786,-118.291248,"11am", "3pm"],
["Silver Lake Farmers Market", 6,8,13,1,1,2012,12,31,2012,34.090359,-118.277779,"8am", "1pm"],
["Pacific Palisades Farmers Market", 0,8,13,1,1,2012,12,31,2012,34.048404,-118.524977,"8am", "1pm"],
["Topanga Canyon Farmers Market", 5,9,13,1,1,2012,12,31,2012,34.090242,-118.603873,"9am", "1pm"],
["Brentwood Village Farmers Market", 0,9,14.5,1,1,2012,12,31,2012,34.05064,-118.475119,"9am", "2:30pm"],
["West Los Angeles Farmers Market", 0,9,14,1,1,2012,12,31,2012,34.045841,-118.449674,"9am", "2pm"],
["Palms Farmers Market", 0,9,13,1,1,2012,12,31,2012,34.028958,-118.411267,"9am", "1pm"],
["Culver City Farmers Market", 2,15,19,1,1,2012,12,31,2012,34.02477,-118.394508,"3pm", "7pm"],
["Crenshaw Farmers Market", 6,10,15,1,1,2012,12,31,2012,34.010027,-118.335791,"10am", "3pm"],
["FAME Church Farmers Market", 6,9,14,1,1,2012,12,31,2012,34.032701,-118.308989,"9am", "2pm"],
["FAME Church Farmers Market", 0,9,14,1,1,2012,12,31,2012,34.032701,-118.308989,"9am", "2pm"],
["Adams and Vermont Farmers Market", 3,14,18,1,1,2012,12,31,2012,34.032937,-118.292692,"2pm", "6pm"],
["Downtown Exposition Park Farmers Market", 6,11,16,1,1,2012,12,31,2012,34.016517,-118.284579,"11am", "4pm"],
["Exposition Park Farmers Market", 4,15,17,1,1,2012,12,31,2012,34.011533,-118.290015,"3pm", "5pm"],
["Central Avenue (Alameda) Farmers Market", 6,8,12,1,1,2012,12,31,2012,34.003862,-118.26087,"8am", "12pm"],
["USC Farmers Market", 2,11,19,1,1,2012,12,31,2012,34.02521,-118.282754,"11am", "7pm"],
["Venice Farmers Market", 5,7,11,1,1,2012,12,31,2012,33.987294,-118.46635,"7am", "11am"],
["Del Ray Farmers Market", 5,12,19,1,1,2012,12,31,2012,33.985025,-118.431203,"12pm", "7pm"],
["Mar Vista Farmers Market", 0,8.5,14,1,1,2012,12,31,2012,34.004828,-118.431155,"8:30am", "2pm"],
["Playa Vista Farmers Market", 6,9,14,1,1,2012,12,31,2012,33.972019,-118.421873,"9am", "2pm"],
["Westchester Farmers Market", 3,8.5,13,1,1,2012,12,31,2012,33.956598,-118.415924,"8:30am", "1pm"],
["Watts Farmers Market", 6,10,14,1,1,2012,12,31,2012,33.945621,-118.251729,"10am", "2pm"],
["Harbor City Farmers Market", 5,10,14,1,1,2012,12,31,2012,33.789922,-118.297491,"10am", "2pm"],
["Wilmington Farmers Market", 4,9,13,1,1,2012,12,31,2012,33.786798,-118.26205,"9am", "1pm"],
["San Pedro Farmers Market", 5,9,14,1,1,2012,12,31,2012,33.738794,-118.286684,"9am", "2pm"],
["Beverly Hills Farmers Market", 0,9,13,1,1,2012,12,31,2012,34.0736,-118.399143,"9am", "1pm"],
["Burbank Farmers Market", 6,8,12.5,1,1,2012,12,31,2012,34.182792,-118.308499,"8am", "12:30pm"],
["Glendale Farmers Market", 4,9.5,13.5,1,1,2012,12,31,2012,34.147169,-118.254948,"9:30am", "1:30pm"],
["Glendale (Gigi) Farmers Market", 6,10,14,1,1,2012,12,31,2012,34.144416,-118.255806,"10am", "2pm"],
["Santa Monica Farmers Market", 6,8.5,13,1,1,2012,12,31,2012,34.01658,-118.49817,"8:30am", "1pm"],
["Santa Monica Farmers Market", 3,8.5,13.5,1,1,2012,12,31,2012,34.01658,-118.49817,"8:30am", "1:30pm"],
["Santa Monica Main Street Farmers Market", 0,9.5,13,1,1,2012,12,31,2012,34.001647,-118.483517,"9:30am", "1pm"],
["Santa Monica Virginia Farmers Market", 6,8,13,1,1,2012,12,31,2012,34.022039,-118.468782,"8am", "1pm"]


]

//var openday=mkts[i][1];

function initialize() 
{
	geocoder = new google.maps.Geocoder();
	var myOptions = {
      scrollwheel: true,
      streetViewControl:false,
      navigationControl: true,
      navigationControlOptions:{style: google.maps.NavigationControlStyle.SMALL},
      zoom: 3,
      center: uscenter,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getStartMarkets();
}

function geolocate() 
{	// Try W3C Geolocation (Preferred)
	clearOverlays();
	clearTextbox();
	todaymkts=[];
	openmkts=[];
	nearest=[];
	//message="";
	//document.getElementById("FMText").innerHTML=message;
	//messageother="";
	//document.getElementById("errormessage2").innerHTML=messageother;
	if(navigator.geolocation) 
	{
browserSupportFlag = true;
navigator.geolocation.getCurrentPosition(function(position)
{
initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
map.setCenter(initialLocation);
map.setZoom(9);
lat1=position.coords.latitude;
lon1=position.coords.longitude;

	var image = new google.maps.MarkerImage('mapicons/homeinvert.png',
	new google.maps.Size(32, 37),
	new google.maps.Point(0,0),
	new google.maps.Point(16, 37),
	new google.maps.Size(24, 28)
	);
var shape = {coord: [1, 1, 1, 32, 32, 37, 37 , 1],type: 'poly'};
var marker = new google.maps.Marker({map: map, position: initialLocation,
zIndex: google.maps.Marker.MAX_ZINDEX + 1,icon:image, title: 'You are here.'});
markersArray.push(marker); // to allow clearing of user location

getMarkets();  //alert("You are located at "+lat1+" and "+lon1+"."); 
},
function(){handleNoGeolocation(browserSupportFlag);}
);
	}
	/*else // Browser doesn't support Geolocation
	{
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	} 
	*/
	
	function handleNoGeolocation(errorFlag) {
if (errorFlag == true) {
var messageother = "Your geolocation services are turned off.  To find the nearest farmers market open now,  please enter your location.";
document.getElementById("addbutton").innerHTML=messageother;
} else {
var messageother = "Your browser doesn't support geolocation. Please enter your location.";
document.getElementById("FMText").innerHTML=messageother;
}  
//map.setCenter(initialLocation); 
}
	 
}

function codeAddress()
{
	var address = document.getElementById("address").value;
	clearOverlays();
	clearTextbox();
	todaymkts=[];
	openmkts=[];
	nearest=[];
	message="";
	document.getElementById("FMText").innerHTML=message;
	messageother="";
	document.getElementById("errormessage2").innerHTML=messageother;
geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
map.setCenter(results[0].geometry.location);
map.setZoom(9);
lat1=results[0].geometry.location.lat();
lon1=results[0].geometry.location.lng();
//alert("You are located at "+lat1+" and "+lon1+".");
var image = new google.maps.MarkerImage('mapicons/homeinvert.png',
	new google.maps.Size(32, 37),
	new google.maps.Point(0,0),
	new google.maps.Point(16, 37),
	new google.maps.Size(24, 28));
var shape = {coord: [1, 1, 1, 32, 32, 37, 37 , 1],type: 'poly'};
var marker = new google.maps.Marker({map: map, position: results[0].geometry.location,zIndex: google.maps.Marker.MAX_ZINDEX + 1, icon:image, title: 'You are here.'}); 
markersArray.push(marker); // to allow clearing of user location
getMarkets();

} 
/*else {
message="Geocode was not successful for the following reason: " + status;
document.getElementById("errormessage2").innerHTML=message;
} */
}); 
}

function clearOverlays() //Removes the overlays from the map, but keeps them in the array
{if (markersArray) 
	{for (i in markersArray)
		{markersArray[i].setMap(null);}
	}
}

function clearOverlays2() //Removes the overlays from the map, but keeps them in the array
{if (markersArray2) 
	{for (i in markersArray2)
		{markersArray2[i].setMap(null);}
	}
}

function clearTextbox()	
{document.getElementById("address").value=" ";
return false;
}

function idDayMkts()// markets open today
{
	for (var i = 0; i <mkts.length; i++)
	{				
		if (day==mkts[i][1] && // current day
		((month==mkts[i][4] && monthdate>=mkts[i][5])||  //OR   opening month criteria
		((month>mkts[i][4] && monthdate>mkts[i][5]) && (month<mkts[i][7] && monthdate<mkts[i][8])) || //OR  in between month criteria
		((month>mkts[i][4] && month<mkts[i][7]) && (monthdate<mkts[i][5]|| monthdate>mkts[i][8])) ||  //OR  in between month criteria
		(month==mkts[i][7] && monthdate<=mkts[i][8]) //closing month critera
		))	
		{todaymkts.push(mkts[i]);}	
	
		/*else
		message = "There are no farmers markets open today near you.";
		document.getElementById("FMText").innerHTML=message;*/
	}
}

function idOpenMkts() // from markets open today, ids markets open now
{  	
	for (var i = 0; i <todaymkts.length; i++)
	{				
		if (timeofday<todaymkts[i][3] && timeofday>=todaymkts[i][2])
			{openmkts.push(todaymkts[i]);}
		/*else
		message = "There are no farmers markets open near you now.";
		document.getElementById("FMText").innerHTML=message;*/
	}
	
}

//identifies nearest open market to user within 50 miles from markets open today and from location services or user input
function find_closest_marker(lat1,lon1) 
	{
	var pi = Math.PI;
	var R = 3959; //mi (6371 = km)
	var distances = new Array();
	var closest = -1;
	for( i=0;i<openmkts.length; i++ ) 
		{
		var lat2 = openmkts[i][10];
		var lon2 = openmkts[i][11];
		var chLat = lat2-lat1;
		var chLon = lon2-lon1;
		var dLat = chLat*(pi/180);
		var dLon = chLon*(pi/180);
		var rLat1 = lat1*(pi/180);
		var rLat2 = lat2*(pi/180);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		//var distance = Math.round(distance*100)/100 // round values?

		distances[i] = d;
			if ((closest == -1 && d< 50) || (d < distances[closest] && d<50)) 
				{closest = i;}
				//alert(distances[i]);
		}
	nearest.push(openmkts[closest]);
}

function openhome() // to create a single array for bounding box zoom?  // currently unused
	{openhome.push(todaymkts[i]);
	openhome.push(nearest[i]);
	}


var infowindow =  new google.maps.InfoWindow({content: ''}); // set outside the loop to ensure only one window at a time

function setMarkers(map, nearest) //draws marker for nearest open market
	{var image = new google.maps.MarkerImage('mapicons/applesimple.png',new google.maps.Size(32, 37),new google.maps.Point(0,0), new google.maps.Point(16, 37)); 
	var shape = {coord: [1, 1, 1, 32, 32, 37, 37 , 1],type: 'poly'};	
	var myLatLng = new google.maps.LatLng(nearest[0][10], nearest[0][11]);
	var marker = new google.maps.Marker({map: map, position: myLatLng, shape: shape, zIndex: google.maps.Marker.MAX_ZINDEX+1, icon:image, 
		title: nearest[0][0]+" is open today from "+(nearest[0][12])+" to "+(nearest[0][13])+"."});
	markersArray.push(marker);
	//map.setCenter(myLatLng);
	//message= "The nearest open farmers market is the "+(nearest[0][0])+". It is open from "+(nearest[0][12])+" to "+(nearest[0][13])+".";
	bindInfoWindow(marker, map, infowindow, "<p>"+"The currently open market nearest to your locations is"+"</p>"+"<h5>"+nearest[0][0]+"."+"</h5>"+"<p>"+"It is open today from "+(nearest[0][12])+" to "+(nearest[0][13])+"." +"</p>"); 
	}

function addMarkers(map, todaymkts) //draws markers for today markers and binds onclick to marker and pushes markers to array2
	{	
	for (var i = 0; i <todaymkts.length; i++)
		{	
		var image = new google.maps.MarkerImage('mapicons/applesimplered.png',new google.maps.Size(32, 37),new google.maps.Point(0,0), new google.maps.Point(16, 37)); 
		var shape = {coord: [1, 1, 1, 32, 32, 37, 37 , 1],type: 'poly'};	
		var myLatLng = new google.maps.LatLng(todaymkts[i][10], todaymkts[i][11]);
		var marker = new google.maps.Marker({map: map, position: myLatLng, shape: shape, zIndex: google.maps.Marker.MAX_ZINDEX - 1,icon:image, 
			title: todaymkts[i][0]+ " is open "+weekdays[day]+"s"+" from "+(todaymkts[i][12])+" to "+(todaymkts[i][13])+"."
			});
		google.maps.event.addListener(marker, "click",function(){
   			map.setZoom(10);
    		map.setCenter(this.getPosition(i));
  			});
  		bindInfoWindow(marker, map, infowindow, "<h5>" + todaymkts[i][0]+"</h5>"+"<p>"+" is open "+weekdays[day]+"s"+" from "+(todaymkts[i][12])+" to "+(todaymkts[i][13])+"." +"</p>"); 
		markersArray2.push(marker);	
		}			
	} 

function bindInfoWindow(marker, map, infowindow, html) { 
	google.maps.event.addListener(marker, 'click', function() { 
		infowindow.setContent(html); 
		infowindow.open(map, marker); 
	}); 
} 

function AllMarkers(map, mkts) //draws markers for all markets in array and binds onclick zoom to makers.
	{
	for (var i = 0; i <mkts.length; i++)
		{
		var image = new google.maps.MarkerImage('mapicons/applegray.png',new google.maps.Size(32, 37),new google.maps.Point(0,0), new google.maps.Point(16, 37)); 
		var shape = {coord: [1, 1, 1, 32, 32, 37, 37 , 1],type: 'poly'};	
		var myLatLng = new google.maps.LatLng(mkts[i][10], mkts[i][11]);
		var marker = new google.maps.Marker({map: map, position: myLatLng, shape: shape,zIndex: google.maps.Marker.MAX_ZINDEX - 2, icon:image, 
			//title: mkts[i][0]+ " is open from "+(mkts[i][12])+" to "+(mkts[i][13])+"."
			});		
		google.maps.event.addListener(marker, "click",function(){
   			map.setZoom(10);
    		map.setCenter(this.getPosition(i));
  			});
  			bindInfoWindow(marker, map, infowindow, "<h5>" + mkts[i][0]+"</h5>"+"<p>"+ " is not open today"+"."+"</p>"); 
		} 	
	}	
	
function getMarkets() //calls functions to identify open and nearest and draws open and nearest markets
	{
	/*clearOverlays();
	clearTextbox();*/
	idDayMkts();
	idOpenMkts();
	find_closest_marker(lat1,lon1);
	addMarkers(map, todaymkts);	
	setMarkers(map, nearest);
	}	
	
function getDayMarkets()  // call functions to clear nearest and home overlay and draw today markets
	{
	clearOverlays();
	clearTextbox();
	idDayMkts();
	addMarkers(map, todaymkts);
	}	


function getStartMarkets() //call functions to clear nearest and home overlay identify today markets and draw today and all markets
	{
	clearOverlays();
	//clearOverlays2();
	clearTextbox();
	idDayMkts();
	AllMarkers(map,mkts);
	addMarkers(map, todaymkts);
	}	
	
function doUnzoom(){
		/*map.setCenter(marker.getPosition());
		if
		(zoom > 10) 
		{map.setZoom(6);}
		else */
		map.setCenter(uscenter);
		map.setZoom(3); 
		} 
		
function movePDX(){
		map.setCenter(new google.maps.LatLng(45.52, -122.67));
		map.setZoom(9); 
		}// unused function for zoooming to city

function moveSF(){
		map.setCenter(new google.maps.LatLng(37.77, -122.42));
		map.setZoom(12); 
		}// unused function for zoooming to city

function moveMPLS(){
		map.setCenter(new google.maps.LatLng(44.97, -93.14));
		map.setZoom(10); 
		}// unused function for zoooming to city

function moveCHI(){
		map.setCenter(new google.maps.LatLng(41.90, -87.65));
		map.setZoom(9); 
		}// unused function for zoooming to city

function moveDC(){
		map.setCenter(new google.maps.LatLng(38.90, -77.03));
		map.setZoom(12); 
		}// unused function for zoooming to city
		
function moveSEA(){
		map.setCenter(new google.maps.LatLng(47.65, -122.335));
		map.setZoom(11); 
		}// unused function for zoooming to city
		
function moveAUS(){
		map.setCenter(new google.maps.LatLng(30.267, -97.74));
		map.setZoom(12); 
		}// unused function for zoooming to city
		
function moveST(){
		map.setCenter(new google.maps.LatLng(29.42, -98.49));
		map.setZoom(11); 
		}// unused function for zoooming to city
		
function moveBERK(){
		map.setCenter(new google.maps.LatLng(37.82,-122.25));
		map.setZoom(12); 
		}// unused function for zoooming to city

function moveblank(){
		map.setCenter(new google.maps.LatLng(37.60, -122.125));
		map.setZoom(10); 
		}// unused function for zoooming to city