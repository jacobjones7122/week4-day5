$(document).ready(function(){

    getLocations();
        //ajax for post
    function createLocation(){
    var newLocation = {
            name: $("#nameInput").val(),
            delievers: $('#deliverInput').is(':checked'),
            phone: $("#phoneInput").val(),
            address: {
                lineOne: $("#lineOneInput").val(),
                lineTwo: $("#lineTwoInput").val(),
                city: $("#cityInput").val(),
                state: $("#stateInput").val(),
                zip: $("#zipInput").val()
            }
        };
        $.ajax({
            method: "POST",
            url: "/api/locations",
            contentType: "application/json",
            data: JSON.stringify(newLocation)
        });
    };
      //  ajax for get
    function getLocations(){
        $.ajax({
            method: "GET",
            url: '/api/locations',
            contentType: "application/json",
            success: function(locations) {
                $.each(locations, function(i, location){
                    //$('#showLocationDiv').append("<div class= 'location'>" + location.location + "</div><br /><br />");
                    $('#showLocationDiv').append("<div class= 'location'>Loaction Name: " + location.location.name + "<br />Location Phone: " + location.location.phone + "<br />Location Delivers: " + location.location.delievers + "<br /> Location Address: <br /><div id='address'>" + location.location.address.lineOne + "<br />" + location.location.address.lineTwo + "<br />" + location.location.address.city + "<br />" + location.location.address.state + "<br />" + location.location.address.zip + "<div>");
                });
            }
        });
    }

    $('#btnInput').on('click', function(){
        console.log("Here");
        console.log($("#deliverInput"));
        createLocation();
        $('#showLocationDiv').empty();
        getLocations();
    });

    $('#phoneInput').keypress(function(e){
        var length = this.value.length;
        var value = $(this).val();
        if (length == 3 && value.indexOf('(') <= -1) {
            $(this).val("(" + value + ")" + "-");
        } else if (length == 4 && value.indexOf('(') > -1) {
            $(this).val(value + ")-");
        } else if (length == 5 && value.indexof(')') > -1) {
            $(this).val(value + '-');
        } else if (length == 9) {
            $(this).val(value + '-');
        }
    })
});