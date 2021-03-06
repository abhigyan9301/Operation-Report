

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
}
document.addEventListener("app.Ready", onAppReady, false) ;
// document.addEventListener("deviceready", onAppReady, false) ;
// document.addEventListener("onload", onAppReady, false) ;

// The app.Ready event shown above is generated by the init-dev.js file; it
// unifies a variety of common "ready" events. See the init-dev.js file for
// more details. You can use a different event to start your app, instead of
// this event. A few examples are shown in the sample code above. If you are
// using Cordova plugins you need to either use this app.Ready event or the
// standard Crordova deviceready event. Others will either not work or will
// work poorly.

// NOTE: change "dev.LOG" in "init-dev.js" to "true" to enable some console.log
// messages that can help you debug Cordova app initialization issues.


/////////// login val



$(function() {
    
    
                       
                var userName= localStorage.getItem("PMUsername");
                var userPass= localStorage.getItem("PMPassword");
    
     $.ajax({
                      type: "POST",
                      url: "https://cordovaprod.eu-gb.mybluemix.net/CRM_STATUS_REPORT.jsp",
                      data: ({User: userName,Pass: userPass}),
                      cache: false,
                      dataType: "text",
                      success: onSuccess
                    });
//    
     function onSuccess(data)
            {
////                $('#work-in-progress').fadeOut(0);
                var Data = $.parseJSON(data);
//                
                $.each(Data.retail_crm, function(i, f) {
                    
                    document.getElementById("store_visited").value = f.Stores_Visited;
                      document.getElementById("po_signed").value = f.PO_Signed;
                    document.getElementById("probable").value = f.Probable;
                    document.getElementById("not_interested").value = f.Not_Interested;
                    document.getElementById("no_feedback_yet").value = f.No_feedback_yet;
                     document.getElementById("Po_Signed_and_Machine_Installed").value = f.Po_Signed_and_Machine_Installed;
                    document.getElementById("stores_with_99rstreet").value = parseInt(f.PO_Signed)+parseInt(f.Po_Signed_and_Machine_Installed);

                    

     
       
 });
                
            }
});
    


 /*$(document).ready(function() {
//            $('#work-in-progress').fadeOut(0);
 
            //$("#callAjax").click(function() {
                var theName = $.trim($("#theName").val());
                var thePassword = $.trim($("#thePassword").val());
 
                if(theName.length > 0)
                {
                    $('#work-in-progress').fadeIn(0);
                    $.ajax({
                      type: "POST",
                      url: "https://cordovacrm.eu-gb.mybluemix.net/crm_login.jsp",
                      data: ({User: theName,Pass: thePassword}),
                      cache: false,
                      dataType: "text",
                      success: onSuccess
                    });
                }
            });
 
            $("#resultLog").ajaxError(function(event, request, settings, exception) {
              $("#resultLog").html("Error Calling: " + settings.url + "<br />HTTP Code: " + request.status);
            });
 
            function onSuccess(data)
            {
//                $('#work-in-progress').fadeOut(0);
                var Data = $.parseJSON(data);
                
                if(Data.success=='1')
                {
//                     var theName = $.trim($("#theName").val());
//                var thePassword = $.trim($("#thePassword").val());
//                    localStorage.setItem("PMUsername",theName);
//                    localStorage.setItem("PMPassword",thePassword);
                    window.location = 'home.html';
                     alert('Login Successful!');
                }
//                $("#resultLog").html("Result: " + Data.success);
                
                else if (Data.success =='0')
                {
                    document.getElementById("waiting").innerHTML="";
              alert('Wrong user name or password!');

                }
            }
 
        });
   


*/



/////////////////




$(document).on('pageinit', '#home', function(){      
//    var url = 'http://api.themoviedb.org/3/',
//        mode = 'search/movie?query=',
//        movieName = '&query='+encodeURI('Batman'),        
//        key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';    
    var url = 'http://apiprod.mybluemix.net/OperationJSP/Store_Visited.jsp';
    
    $.ajax({
//        url: url + mode + key + movieName ,
        url: url,
        dataType: "json",
        async: true,
        success: function (result) {
            ajax.parseJSON(result);
             
            $('#work-in-progress').fadeOut(0);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
            
            document.getElementById("internet_access").innerHTML="No internet access";
        }
    });         
});

$(document).on('pagebeforeshow', '#headline', function(){      
    $('#movie-data').empty();
    $.each(movieInfo.result, function(i, row) {
        if(row.S_NO == movieInfo.id) {
            
            document.getElementById("crm_serialnumber").value = row.S_NO;
        document.getElementById("crm_name").value = row.NAME;
        document.getElementById("crm_date").value = row.STORE_VISIT_DATE;
        document.getElementById("crm_address").value = row.ADDRESS;
        document.getElementById("crm_no_of_pharmacies").value = row.NO_OF_PHARMACY_COMMITTED;
        document.getElementById("crm_grade").value = row.GRADE;
        document.getElementById("crm_email").value = row.EMAIL;
        document.getElementById("crm_no_of_visit").value = row.NO_OF_VISIT;
        document.getElementById("crm_hemas_date").value = row.HEMAS_LIST_PROVIDED_DATE;
        document.getElementById("crm_po_signed_date").value = row.PO_SIGNED_DATE;
        document.getElementById("crm_hemas_contact").value = row.HEMAS_CONTACT_NUMBER;
        document.getElementById("crm_contact_p_name").value = row.PHARMACY_CONTACT_PERSON;
        document.getElementById("crm_contact").value = row.CONTACT_NUMBER;
        document.getElementById("crm_status").value = row.STATUS;
        document.getElementById("crm_sales_r_name").value = row.HEMAS_SALES_REP_NAME;
        document.getElementById("crm_other_comments").value = row.OTHER_COMMENTS;
       
            $('#movie-data').listview('refresh');            
        }
    });    
});

$(document).on('vclick', '#movie-list li a', function(){  
    movieInfo.id = $(this).attr('data-id');
    $.mobile.changePage( "#headline", { transition: "slide", changeHash: false });
});

var movieInfo = {
    id : null,
    result : null
}

var ajax = {  
    parseJSON:function(result){  
        movieInfo.result = result.entries;
        $.each(result.entries, function(i, row) {
            console.log(JSON.stringify(row));
            $('#movie-list').append('<li>'+'<h3>' +'Store Name  : '+ row.STORE_NAME + '</h3><p9>' +'Store Id : '+ row.STORE_ID + '</p9> <p2><br>Store Visit Date : '+ row.STORE_VISIT_DATE + '</p2><p2><br>Comment: '+ row.COMMENTS + '</p2><p>' +'Store Issue : '+ row.ISSUE + '</p></li>');
        });
        $('#movie-list').listview('refresh');
    }
}








//// CRM REPORT DATA UPLOAD ***********************

$(document).ready(function () {
    $("#uploadbutton").click(function () {
        var S_NO = $("#crm_serialnumber").val();
        var NAME = $("#crm_name").val();
        var STORE_VISIT_DATE= $("#crm_date").val();
         var ADDRESS = $("#crm_address").val();
        var NO_OF_PHARMACY_COMMITTED = $("#crm_no_of_pharmacies").val();
        var GRADE = $("#crm_grade").val();
         var EMAIL = $("#crm_email").val();
        var NO_OF_VISIT = $("#crm_no_of_visit").val();
        var HEMAS_LIST_PROVIDED_DATE = $("#crm_hemas_date").val();
         var PO_SIGNED_DATE = $("#crm_po_signed_date").val();
        var HEMAS_CONTACT_NUMBER = $("#crm_hemas_contact").val();
        var PHARMACY_CONTACT_PERSON = $("#crm_contact_p_name").val();
         var CONTACT_NUMBER = $("#crm_contact").val();
        var STATUS = $("#crm_status").val();
        var HEMAS_SALES_REP_NAME = $("#crm_sales_r_name").val();
         var OTHER_COMMENTS = $("#crm_other_comments").val();
       
         var USER_NAME = localStorage.getItem("PMUsername");



        $.ajax({
            type: "POST",
            
            url: "https://cordovaprod.eu-gb.mybluemix.net/CRM_Update_Upload.jsp",

           /* url: "https://cordova.eu-gb.mybluemix.net?store_id="+filename + "&store_name=" + filename2+ "&ph_no="+filename3,*/
            data: {
                
                "S_NO" : S_NO,
                "NAME" : NAME, 
                "STORE_VISIT_DATE" : STORE_VISIT_DATE,
                 "ADDRESS" : ADDRESS,
                "NO_OF_PHAMACIES_PER_OWNER_COMITTED" : NO_OF_PHARMACY_COMMITTED, 
                "STORE_GRADE" : GRADE, 
                 "EMAIL" : EMAIL,
                "NO_OF_VISIT" : NO_OF_VISIT, 
                "HEMAS_LIST_PROVIDED_DATE" : HEMAS_LIST_PROVIDED_DATE,
                 "PO_SIGNED_DATE" : PO_SIGNED_DATE,
                "HEMAS_CONTACT_NUMBER" : HEMAS_CONTACT_NUMBER, 
                "PHARMACY_CONTACT_PERSON" : PHARMACY_CONTACT_PERSON,
                 "CONTACT_NUMBER" : CONTACT_NUMBER,
                "STATUS" : STATUS, 
                "HEMAS_SALES_REP_NAME" : HEMAS_SALES_REP_NAME,
                "REMARKS" : OTHER_COMMENTS,
                "USER_NAME" : USER_NAME

            },
/*
            data: "store_id ="+ filename + "&store_name =" +filename2 + "&ph_no =" + filename3 ,
*/
            success: function (msg,String,jqXHR) {
                window.location='home.html';
                
                $("#result").html(msg,String,jqXHR)
               alert("Data Uploaded: ");
            }
        });
    });
});




/////////////////////// reload


function Loading()
{
    document.getElementById("waiting").innerHTML = "Loading..."
}

/////////////////////////////////////////


////////////////// login validation 

$(document).ready(function () {
    $("#uploadbutton22").click(function () {
        var S_NO = $("#crm_serialnumber").val();
        var NAME = $("#crm_name").val();
        var STORE_VISIT_DATE= $("#crm_date").val();
        



        $.ajax({
            type: "POST",
            
            url: "https://cordovacrm.eu-gb.mybluemix.net/hemas_cordova.jsp",

           /* url: "https://cordova.eu-gb.mybluemix.net?store_id="+filename + "&store_name=" + filename2+ "&ph_no="+filename3,*/
            data: {
                
                "S_NO" : S_NO,
                "NAME" : NAME, 
                "STORE_VISIT_DATE" : STORE_VISIT_DATE,
               
            },
/*
            data: "store_id ="+ filename + "&store_name =" +filename2 + "&ph_no =" + filename3 ,
*/
            success: function (msg,String,jqXHR) {
                window.location='home.html';
                
                $("#result").html(msg,String,jqXHR)
               alert("Login Successfully: ");
            }
        });
    });
    
    
});




///////////////////////////////// Date Picker







//////////////////////////////

/*
$(function() {
    
    
                       
           
    
     $.ajax({
                      type: "POST",
                      url: "https://cordovacrm.eu-gb.mybluemix.net/CRM_STATUS_REPORT.jsp",
                      cache: false,
                      dataType: "text",
                      success: onSuccess
                    });
//    
     function onSuccess(data)
            {
////                $('#work-in-progress').fadeOut(0);
                var Data = $.parseJSON(data);
//                
                $.each(Data.retail_crm, function(i, f) {
                    
                     document.getElementById("store_visited").value = f.Stores_Visited;
                      document.getElementById("po_signed").value = f.PO_Signed;
                    document.getElementById("probable").value = f.Probable;
                    document.getElementById("not_interested").value = f.Not_Interested;
                    document.getElementById("no_feedback_yet").value = f.No_feedback_yet;
     
       
 });
                
            }
});
    */



/*
$(function() {
    
var retail_crm = [];
var dmJSON = "https://cordovacrm.eu-gb.mybluemix.net/CRM_STATUS_REPORT.jsp";
$.getJSON(dmJSON, function(data) {
   $.each(data.retail_crm, function(i, f) {
       
                  document.getElementById("store_visited").value = f.Stores_Visited;
                      document.getElementById("po_signed").value = f.PO_Signed;
                    document.getElementById("probable").value = f.Probable;
                    document.getElementById("not_interested").value = f.Not_Interested;
                    document.getElementById("no_feedback_yet").value = f.No_feedback_yet;
     
 });
});
});*/





