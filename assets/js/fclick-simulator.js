function formatPrice(price) {
    return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
 }

function add_carrier_quote_id(quote_id){
    var el = document.createElement('h4');
    el.setAttribute('class', '.quote-num');
    var eltext = document.createTextNode("Cotação #" + quote_id);
    el.append(eltext)

    return  $('.quote-num').html(el)
}

function addCarrirToList(image, deadline, price, retrieveDeadline){

    $('.popup-cover').addClass('wrap-quotes')
    $('#btnclousemodal').css('display', 'block')

    //box
    let box_quote = document.createElement('div');
    box_quote.setAttribute('class', 'box-quote');

    //image
    let box_image = document.createElement('div');
    box_image.setAttribute('class', 'box-image');
    box_quote.append(box_image);

    let itemimg = document.createElement('img');
    itemimg.setAttribute('src', 'https://'+ image)
    box_image.append(itemimg);

    //box info
    let box_info = document.createElement('div');
    box_info.setAttribute('class', 'box-info');

    box_quote.append(box_info);

    //box coleta
    let box_coleta = document.createElement('div');
    box_coleta.setAttribute('class', 'box-coleta');
    box_info.append(box_coleta);

    let coleta_span = document.createElement('span');
    let coleta_text = document.createTextNode('Coleta em até ' + retrieveDeadline + ' dias uteis');
    coleta_span.append(coleta_text);
    box_coleta.append(coleta_span);


    //box-delivery
    let box_delivery = document.createElement('div');
    box_delivery.setAttribute('class', 'box-delivery');

    let delivery_span = document.createElement('span');
    let text_delivery = document.createTextNode('Entrega entre ' + deadline + ' e 4 dias úteis');
    delivery_span.append(text_delivery);

    let delivery_p = document.createElement('p');
    let text_delivery2 = document.createTextNode('(*após coletado)');
    delivery_p.append(text_delivery2);

    box_delivery.append(delivery_span);

    box_info.append(box_delivery);

    //box price
    let box_price = document.createElement('div');
    box_price.setAttribute('class', 'box-price');

    let price_h4 = document.createElement('h4');
    let price_text = document.createTextNode(price);
    price_h4.append(price_text);
    box_price.append(price_h4);

    box_info.append(box_price);

    //<button class="btn-contratar" type="submit">CONTRATAR</button>
    let button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.setAttribute('class', 'btn-contratar');
    let button_text = document.createTextNode('CONTRATAR');
    button.append(button_text);

    box_info.append(button);

    $('#listing-quotes').append(box_quote);

}

function add_options() {
    const options = JSON.parse( ajax_cotafacil.options );
    
    for (let i = 0; i < options.length; i++) {
        var el = document.createElement('option');
        el.setAttribute('value', options[i]);
        var text = document.createTextNode(options[i]);
        el.append(text);
        $('#product-category').append(el)
    }
}

function clouse_modal(){
    $('#modal').css('display', 'none')
}

function show_modal(){
    $('#modal').css('display', 'block')
}

function addLoader(){
    $('#btnquote').removeClass('btn-quote');
    $('#btnquote').addClass('spinner-loader');
}

function removeLoader(){
    $('#btnquote').removeClass('spinner-loader');
    $('#btnquote').addClass('btn-quote');
}

function add_spin_input(){
    $('.spin-in').addClass('spin-input');
    $('.wrap-spin-in').css('display', 'block');
}

function remove_spin_input(){
    $('.spin-in').removeClass('spin-input');
    $('.wrap-spin-in').css('display', 'none');
}


function formatMask(){
    $('.cep').mask('00000-000');
    $('.phone_with_ddd').mask('(00) 00000-0000');
    $('.money2').mask("#.##0,00", {reverse: true});
    $('.product_kg').mask('##0,000', {reverse: true});
    $('.product-cm').mask('##0,00', {reverse: true});
}

function addError(message){
    $('#btnclousemodal').css('display', 'none')
    add_carrier_quote_id(' Erro ao realizar cotação!')
    return $('#listing-quotes').html('<div id="error-pop">' + message + '</div>')
}

function convert_kg(kg){
    return kg.replace(/[^0-9]/g, '' )/ 1000.0;
}

function convert_m(m){
    return m.replace(/[^0-9]/g, '' )/ 100.0;
}

function convert_price(price){

    price = price.replace('.', '');
    price = price.replace(',', '.');
    return price;
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
        
        'product-invoice-total': convert_price( $('#product-invoice-total').val() ),
        'product-quantity': $('#product-quantity').val(),
        'product-weight':   convert_kg( $('#product-weight').val() ),
        'product-height':   convert_m( $('#product-height').val() ),
        'product-width':    convert_m( $('#product-width').val() ),
        'product-depth':    convert_m( $('#product-depth').val() )
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

            add_carrier_quote_id(res.response.data.order.id)

            $.each(res.response.data.order.quotes, function (index, val){
                $('#listing-quotes').html(addCarrirToList(val['carrier']['image'], val['deliveryDeadline'], formatPrice(val['total']), val['retrieveDeadline']))
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

function disable_elements(){
    
    $('#custumer-name').prop('disabled', true),
    $('#custumer-phone').prop('disabled', true),
    $('#cep_retriver').prop('disabled', true),
    $('#cep_delivery').prop('disabled', true),
    $('#product-category').prop('disabled', true),
    $('#product-type').prop('disabled', true),
    $('#product-invoice-total').prop('disabled', true),
    $('#product-quantity').prop('disabled', true),
    $('#product-weight').prop('disabled', true),
    $('#product-height').prop('disabled', true),
    $('#product-width').prop('disabled', true),
    $('#product-depth').prop('disabled', true)

    add_spin_input();
}

function enable_elements(){

    $('#custumer-name').prop('disabled', false),
    $('#custumer-phone').prop('disabled', false),
    $('#cep_retriver').prop('disabled', false),
    $('#cep_delivery').prop('disabled', false),
    $('#product-category').prop('disabled', false),
    $('#product-type').prop('disabled', false),
    $('#product-invoice-total').prop('disabled', false),
    $('#product-quantity').prop('disabled', false),
    $('#product-weight').prop('disabled', false),
    $('#product-height').prop('disabled', false),
    $('#product-width').prop('disabled', false),
    $('#product-depth').prop('disabled', false)

    remove_spin_input();
}

function getPeopleByID(id){

    axios.get('https://api.freteclick.com.br/people/' + id, {
        headers: {
            'api-token': '242c5d6f05fd292bc91fd67170dc5a04'
        }
    })
    .then((res) => {

        var phone = res.data.phone[0].ddd.toString() + res.data.phone[0].phone.toString() + ' ';

        $('#custumer-name').val(res.data.name)
        $('#custumer-phone').val(phone)

        enable_elements();
    })
    .catch((error) => {
        console.error(error)
    })
}

function getPeopleIdByEmail() {

    enable_elements();

    axios.get("https://api.freteclick.com.br/email/find?email=" + $('#custumer-email').val())
    .then(function (response) {
        $.each(response.data, function (index, val) {

            if(val.success === false){
               console.log('Email invalido ou não cadastrado')
            }else{
                
                return getPeopleByID( val['data']['people_id'] )
            }
            
        })
    })
    .catch(function (error) {
        console.error(error);
        return null
    })

}

function createElVolume(data = [], index, elnum){

    let form_control = document.createElement('div');
    form_control.setAttribute('class', 'form-control');

    let label = document.createElement('span');
    label.setAttribute('class', 'text-label');
    let label_text = document.createTextNode(data[index]['textLabel']);
    
    label.append(label_text)
    form_control.append(label)

    let box_control = document.createElement('div');
    box_control.setAttribute('class', 'wpfc-box-control');

    form_control.append(box_control);

    let box_in = document.createElement('input');
    box_in.setAttribute('type', data[index]['input_type']);
    box_in.setAttribute('id', data[index]['input_id']+elnum);
    box_in.setAttribute('class', data[index]['input_class']);
    box_in.setAttribute('name', data[index]['input_name']+elnum);
    box_in.setAttribute('placeholder', data[index]['input_placeholder']);
    box_in.setAttribute('data-value',  '1');

    box_control.append(box_in);

    let suffix = document.createElement('div');
    suffix.setAttribute('class', 'text-suffix');

    let suffix_text = document.createTextNode(data[index]['suffixText']);
    suffix.append(suffix_text);

    box_control.append(suffix)

    $('#form_volumes_inputs_'+elnum).append(form_control);
    
}


/**
 * JQuery ready document
 */
jQuery(document).ready(function ($) {
    
    formatMask();
    add_options();

    var typingTimer; 
    var doneTypingInterval = 1000; 
    
    $('#custumer-email').keyup(function() {
        
        clearTimeout(typingTimer);
        
        if ($('#custumer-email').val()) {
            disable_elements()
            typingTimer = setTimeout(getPeopleIdByEmail, doneTypingInterval);
        }
    });

    var contador = 0;

    $('.form-volumes-add').click(function (e){
        e.preventDefault();

        const form_inputs = [
            {
                'textLabel': 'Nº de Volumes',
                'suffixText': 'Qt',
                'input_type': 'number',
                'input_name': 'product_quantity_',
                'input_id': 'product_quantity_',
                'input_class': 'd',
                'input_placeholder': '1'
            },
            {
                'textLabel': 'Peso por volume',
                'suffixText': 'Kg',
                'input_type': 'text',
                'input_name': 'product_weight_',
                'input_id': 'product_weight_',
                'input_class': 'product_kg',
                'input_placeholder': '0,000 kg'
            },
            {
                'textLabel': 'Altura',
                'suffixText': 'm',
                'input_type': 'text',
                'input_name': 'product_height',
                'input_id': 'product_height_',
                'input_class': 'product-cm',
                'input_placeholder': '0,00 m'
            },
            {
                'textLabel': 'Largura',
                'suffixText': 'm',
                'input_type': 'text',
                'input_name': 'product_width_',
                'input_id': 'product_width_',
                'input_class': 'product-cm',
                'input_placeholder': '0,00 m'
            },
            {
                'textLabel': 'Comprimento',
                'suffixText': 'm',
                'input_type': 'text',
                'input_name': 'product_depth_',
                'input_id': 'product_depth_',
                'input_class': 'product-cm',
                'input_placeholder': '0,00 m'
            },

        ];

        let form_volumes = document.createElement('div');
        form_volumes.setAttribute('id', 'form_volumes_inputs_'+contador);
        form_volumes.setAttribute('class', 'form-volumes-inputs');
        $('.form-volumes-item').append(form_volumes);

        for(let i = 0; i < form_inputs.length; i++){
            createElVolume(form_inputs, i, contador)
        }

        formatMask();
        contador++;
    
    });

    $('.form-volumes-remove').click(function (e){
        e.preventDefault();
       
    });

    $('#btnquote').click(function (e) {
        e.preventDefault();

        addLoader();
/*
        console.log(
            $('#product-invoice-total').val(),
            $('#product-quantity').val(),
            $('#product-weight').val(),
            $('#product-height').val(),
            $('#product-width').val(),
            $('#product-depth').val()
         );
         */
        
        /*var x = $("#form-quote").serializeArray();
        $.each(x, function(i, field){

            console.log(field)
          //$("#listing-quotes").append(field.name + ":" + field.value + " ");
        });*/

      get_quotes();

    })
})
