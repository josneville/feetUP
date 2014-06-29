$(document).ready(function(){
    $('#barForm').bootstrapValidator({
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'The name is required and cannot be empty'
                    }
                }
            },
            barName: {
                validators: {
                    notEmpty: {
                        message: 'The bar name is required and cannot be empty'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            }
        },
        submitHandler: function(validator, form, submitButton) {
            var postData = form.serializeArray();
            var formURL = form.attr('action');
            $.ajax(
            {
                url : formURL,
                type: "POST",
                data : postData,
                success:function(data, textStatus, jqXHR) 
                {
                    $('#letsTalk').modal('hide');
                    $('#thankYouMessage').modal('show');
                },
                error: function(jqXHR, textStatus, errorThrown) 
                {
                       
                }
            });
        }
    });
    $('#contactUsForm').bootstrapValidator({
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'The name is required and cannot be empty'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
            message: {
                validators: {
                    notEmpty: {
                        message: 'The message is required and cannot be empty'
                    }
                }
            },
        },
        submitHandler: function(validator, form, submitButton) {
            var postData = form.serializeArray();
            var formURL = form.attr('action');
            $.ajax(
            {
                url : formURL,
                type: "POST",
                data : postData,
                success:function(data, textStatus, jqXHR) 
                {
                    $('#contactUs').modal('hide');
                    $('#thankYouMessage').modal('show');
                },
                error: function(jqXHR, textStatus, errorThrown) 
                {
                       
                }
            });
        }
    });
});