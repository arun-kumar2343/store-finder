var json = [{"officeName":"Noida","latitude":28.607319,"langitude":77.365279,"officeAddress1":"B-49, Sector 59 Noida, U.P","officeAddress2":"Noida","country":"India","phone":"9999999999","pinCode":"500033"},{"officeName":"Gurgaon","latitude":28.508951,"langitude":77.092084,"officeAddress1":"Plot No – 404-405,4th & 6th Floor, ILABS Centre,Udyog Vihar, Phase- III,Gurugram, Haryana","officeAddress2":"Gurgaon","country":"India","phone":"9999999999","pinCode":"122016"}];
var markersArray = [];
            var startPos,map;
 function initialize() {
 	 var myOptions = {
                    center: new google.maps.LatLng(28.4876667, 77.0881034),
                    zoom: 6,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById("store-map"),myOptions);
                var infowindow = new google.maps.InfoWindow({maxWidth: 200});
                setMarkers(map);
                google.maps.event.addListener(map, 'click', function () {
                    infowindow.close();
                });
function setMarkers(map) {
                    var i, outputlist = "";
                    if (json === 'undefined' || json == '' || json == null) {
//                         when show no result;
                    }else {
                        for (var j = 0; j < json.length; j++) {
                            var data = json[j],latLng = new google.maps.LatLng(data.latitude, data.langitude);
                            var index = j;
                            var direURL="https://maps.google.com/maps?daddr="+data.latitude+","+data.langitude;
                            var marker = new google.maps.Marker({
                                map: map,
                                position: latLng,
                                title: json[j].officeName
                            });
                            markersArray.push(marker);
                            map.setCenter(marker.getPosition());
                            var content ="<div>" + json[j].officeAddress1 + "</div><div>" + json[j].officeAddress2 + "</div><div class='g-phone'>Phone : " + json[j].phone + "</div>";
                            outputlist += '<li data-id="' + j + '"><div class="store-inner-box"><div  class="store-name">' + json[j].officeName + '</div><div class="hk-store-street1">' + json[j].officeAddress1 + '</div><div class="hk-store-street2">' + (json[j].officeAddress2).toLowerCase() + '</div><div class="country">' + json[j].pinCode + '</div>';
                            if(json[j].timing != null && json[j].timing != '') {
                                outputlist += '<div class="storetiming">Store timings:' + json[j].timing + '</div>';
                            }
                            outputlist +='<div class="phone-code"> Phone : ' + json[j].phone + '</div><a href="'+direURL+'" target="_blank">Get Direction</a></div></li>';
                            attachListener(marker, content, infowindow);
                        }
                    };
                    // for all store listing
                    var storeListBox = '<ul>' + outputlist + '</ul>';
                    document.getElementById("store-list").innerHTML = storeListBox;
                }
            }
            // Attach infowindow with listener event
            function attachListener(marker,content, infowindow) {
                google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
                    return function() {
                        infowindow.setContent(content);
                        infowindow.open(map,marker);
                        map.setZoom(17);
                        map.panTo(marker.getPosition());
                    };
                })(marker,content,infowindow));
            }

$(function(){
$('#store-list ul li').hover(function(){
                    var placeId=$(this).data('id');
                    if(markersArray.length>0){
                        for(var i = 0; i < markersArray.length; i++){
                            markersArray[i].setAnimation(null);
                        }
                    }
                    if (markersArray[parseInt(placeId)].getAnimation() != null) {
                        markersArray[parseInt(placeId)].setAnimation(null);
                    } else {
                        markersArray[parseInt(placeId)].setAnimation(google.maps.Animation.BOUNCE);
                    }
                }, function(){
                    var placeId=$(this).data('id');
                    setTimeout(function(){ markersArray[parseInt(placeId)].setAnimation(null); }, 750);
                });
	        $('#store-list ul li:first-child').addClass("active");

                $('#store-list ul').on('click','li',function () {
                    var placeId=$(this).data('id');
                    $("#hk-store-listing ul li").removeClass("active");
                    $(this).addClass("active");
                    google.maps.event.trigger(markersArray[parseInt(placeId)],'click');
                    setTimeout(function(){ markersArray[parseInt(placeId)].setAnimation(null);});
                    map.setZoom(15);
                    map.setCenter(markersArray[parseInt(placeId)].getPosition());
                });
})
    