jQuery(document).ready(function ($) {

    /*
    const form_fields = [
        filds = [
            'type'  = 'text',
            'id'    = 'product-quantity',
            'name'  = 'product-quantity'
        ],
        filds = [
            'type'  = 'text',
            'id'    = 'product-weight',
            'name'  = 'product-weight'
        ],
    ]

    for (let i =0; i < form_fields; i++){
        console.log(form_fields)
        //$('#fields').append('<input type="' + filds['type'] + '" placeholder="' + filds['name'] + ' />');
    }*/

    //Options
    const options = JSON.parse( ajax_cotafacil.options )

    for (let i = 0; i < options.length; i++) {
        $('#product-category').append('<option value="' + options[i] + '">'+ options[i] + '</option>')
    }
   
    //add
    $('#btnaddnew').click(function(e){
        e.preventDefault();

        var f = $(this).parent().parent(),
            c = f.clone(true,true);
            c.insertAfter(f);

    });

    $('#btndelete').click(function(e){
        e.preventDefault();

        const element = this;
        $(element).closest('.product-data-filds').remove();
    });

    $('#btnquote').click(function (e) {
        e.preventDefault();

        var data_form = {
            'action': 'get_quotes',
            'cepcollect': $('#cepcollect').val(),
            'cepdelivery': $('#cepdelivery').val(),
            'product-category': $('#product-category').val(),
            'product-type': $('#product-type').val(),
            'product-invoice-total': $('#product-invoice-total').val(),
            'product-quantity': $('#product-quantity').val(),
            'product-weight': $('#product-weight').val(),
            'product-height': $('#product-height').val(),
            'product-width': $('#product-width').val(),
            'product-depth': $('#product-depth').val()
        }

        $.ajax({
            url: ajax_cotafacil.url,
            type: 'POST',
            dataType: 'json',
            data: data_form,
            success: function (request) {
                res = JSON.parse(request);
                console.log(res)
                
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    });

})
