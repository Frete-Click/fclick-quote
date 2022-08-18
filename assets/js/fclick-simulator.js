function formatPrice(price) {
   return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function addCarrirToList(image, deadline, price){

    $('.popup-cover').addClass('wrap-quotes')
    $('#btnclousemodal').css('display', 'block')

    const html =  '<div class="dms-col-12 dms-col-xs-6 dms-col-sm-4 dms-col-md-3 dms-col-lg-3 dms-col-xl-3"> <div class="wpfc-box-quote"> <div class="box-quote-image"> <img src="https://' + image + '" /> </div> <div class="box-quote"> <div class="box-info"><span id="deadline"> Coleta em até '+ deadline  +' dias uteis</span><h4>' + formatPrice( price ) + '</h4> <button type="submit" id="btn-contratar">CONTRATAR</button> </div> </div> </div> </div>'

    return html;
}

function addOptions() {
    const options = JSON.parse( ajax_cotafacil.options )

    for (let i = 0; i < options.length; i++) {
        $('#product-category').append('<option value="' + options[i] + '">'+ options[i] + '</option>')
    }
}

function clouse_modal(){
    $('#modal').css('display', 'none')
}

function show_modal(){
    $('#modal').css('display', 'block')
}

function addLoader(){
    $('#loader-1').addClass('blob-1')
    $('#loader-2').addClass('blob-2')
}

function removeLoader(){
    $('#loader-1').removeClass('blob-1')
    $('#loader-2').removeClass('blob-2')
}

function formatMask(){
    $('.cep').mask('00000-000');
    $('.phone_with_ddd').mask('(00) 00000-0000');
    $('.money2').mask("#.##0,00", {reverse: true});
    $('#product-weight').mask('##0,000', {reverse: true})
    $('.product-cm').mask('##0,00', {reverse: true})
}

function addError(message){
    $('#btnclousemodal').css('display', 'none')
    return $('#listing-quotes').html('<div id="error-pop">' + message + '</div>')
}

function form_data(){
    const data_form = {
        'action': 'get_quotes',
        'custumer-name': $('#custumer-name').val(),
        'custumer-email': $('#custumer-email').val(),
        'custumer-phone': $('#custumer-phone').val(),
        'cep_retriver': $('#cep_retriver').val(),
        'cep_delivery': $('#cep_delivery').val(),
        'product-category': $('#product-category').val(),
        'product-type': $('#product-type').val(),
        'product-invoice-total': $('#product-invoice-total').val(),
        'product-quantity': $('#product-quantity').val(),
        'product-weight': $('#product-weight').val(),
        'product-height': $('#product-height').val(),
        'product-width': $('#product-width').val(),
        'product-depth': $('#product-depth').val()
    }

    return data_form
}

function get_quotes(){
    $.ajax({
        url: ajax_cotafacil.url,
        type: 'POST',
        dataType: 'json',
        data: form_data(),
        success: function (request) {
            
            removeLoader()

            res = JSON.parse(request);
            console.log(res)

            if(res.success === false){
                addError(res.error.message)
                show_modal()
            }

            if(res.response.success === false){

                if(res.response.error === 'No results'){
                    addError('<span>Nehum resultado foi encontrado</span>')
                    show_modal()
                }
            }

            $.each(res.response.data.order.quotes, function (index, val){
                $('#listing-quotes').html(addCarrirToList(val['carrier']['image'], val['retrieveDeadline'], val['total'] ))
                show_modal()
                console.log(val['carrier']['alias'])
            });
            
       },
        error: function (request, status, error) {
            removeLoader() 
            addError(request.responseText)
            show_modal()
        }
    })
}

/**
 * JQuery ready document
 */
jQuery(document).ready(function ($) {
    
    formatMask()
    addOptions()
   
    $('#btnquote').click(function (e) {
        e.preventDefault();
              
        addLoader()
    
        get_quotes()

    })

})
