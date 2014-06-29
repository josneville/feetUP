$(document).ready(function() { 
    $("#interestedForm").submit(function(e)
    {
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        $.ajax(
        {
            url : formURL,
            type: "POST",
            data : postData,
            success:function(data, textStatus, jqXHR) 
            {
                $("#interestedEmail").css('color', 'green');
                $("#interestedEmail").val("Thank you!");
                $("#interestedEmail").prop('disabled', true);
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
                $("#interestedEmail").css('color', 'red');
                $("#interestedEmail").val("Unknown error occured. Try again later!");    
                $("#interestedEmail").prop('disabled', true);
            },
            statusCode: {
                400: function(response){
                    $("#interestedEmail").prop('disabled', true); 
                },
                401: function(response){
                    $("#interestedEmail").css('color', 'red');
                    $("#interestedEmail").val("Email already registered");
                    $("#interestedEmail").prop('disabled', true);
                }
            }
        });
        e.preventDefault(); //STOP default action
        e.unbind(); //unbind. to stop multiple form submit.
    });
});