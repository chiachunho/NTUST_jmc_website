var api_url = "https://script.google.com/macros/s/AKfycbz6a7IvH4M-DM50m_wlt--w6V2HCzDMXSArAhigY1_iBlPIS08/exec?callback=?";

$(document).ready(function() {

 });

function load(){

 var mode = $('select  option:selected').val();
        $.getJSON(api_url, {mode:mode,private:true})
            .done( function (obj) {
             
var trStr = '';//動態拼接table

    $.each(obj.list, function(i, item) {
            //now you can access properties using dot notation
        console.log(obj.list[i]);
                trStr  += '<tr>';
        trStr  += '<th scope="row">' +  obj.list[i].table  + '</th>';
        
        $.each(obj.list[i].player, function(j, item){
            
            var styleStr ='';
            if (obj.list[i].player[j].win==1) styleStr = 'success">';
            else if (obj.list[i].player[j].win==2) styleStr += 'primary">';
            else styleStr = 'secondary">';
            
        trStr  += '<td><div class="btn-group btn-group-sm" role="group" aria-label="First group">';
            trStr += '<button type="button" disabled class="btn btn-' +styleStr;
            
           trStr += obj.list[i].player[j].name +'</button><button type="button" disabled class="btn btn-outline-' + styleStr;

            if (obj.list[i].player[j].memo =="棄賽")
            {
                trStr += '<span class="badge badge-warning">' + obj.list[i].player[j].memo + '</span></div></td>';
            }
            else{
                trStr += '<span class="badge badge-' +styleStr;
                trStr += obj.list[i].player[j].first + '</span>+<span class="badge badge-' + styleStr;
                trStr += obj.list[i].player[j].second + '</span>=<span class="badge badge-' + styleStr;
                trStr += obj.list[i].player[j].grade + '</span></div></span></button>';

                trStr  += '</div><div><span class="badge badge-warning">' + obj.list[i].player[j].memo + '</span></div></td>';
            }
               });

        trStr  += '</tr>';
        console.log(trStr);
        });
                        
    $("#tbody").html(trStr);
         })

         .fail(function(jqxhr, textStatus, error) {
             var err = textStatus + ", " + error;
             console.log( "Request Failed: " + err );
             $("#response").animate({
                 height: '+=2rem'
             }, 300);
             $('<div class="alert alert-danger">' + '<strong>授權驗證失敗</strong>：請先' +
               '<a href="'+ api_url +'&mode=login" target="_blank" class="alert-link">登入</a>。'+
               '</div>').hide().appendTo('#response').fadeIn(1000);
             $(".alert").delay(9000).fadeOut(
                 "normal",
                 function(){
                     $(this).remove();
                 });
             $("#response").delay(10000).animate({
                 height: '-=2rem'
             }, 300);

         });

}