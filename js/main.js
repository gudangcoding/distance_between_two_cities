function getCities() {
    var city1 = $("#city1").val();
    var city2 = $("#city2").val();
    console.log(city1);
    console.log(city2);
}
 
$("#city2").change(getCities);