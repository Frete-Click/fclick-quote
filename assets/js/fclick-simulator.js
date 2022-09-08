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

function addCarrirToList(image, price, retrieveDeadline, deadline){

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
    let text_delivery = document.createTextNode('Entrega entre ' + deadline + ' e '+ deliveryDeadline(deadline) +' dias úteis');
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

    $('#listing-quotes').html(box_quote);

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

function deliveryDeadline(num){
    var soma =  parseInt(num) + parseInt(2);
    return soma;
}

// dissable form inputs
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

// Enable form inputs
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

// remove volume
function form_item_remove(index){
    $('#form-volumes-item_'+index).remove();
}

// create inputs of volumes
function create_inputs_volumes(data = [], index, elnum){

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
    box_in.setAttribute('class', data[index]['input_class']);
    box_in.setAttribute('id', data[index]['input_id']);
    box_in.setAttribute('name', data[index]['input_name']);
    box_in.setAttribute('placeholder', data[index]['input_placeholder']);

    box_control.append(box_in);

    let suffix = document.createElement('div');
    suffix.setAttribute('class', 'text-suffix');

    let suffix_text = document.createTextNode(data[index]['suffixText']);
    suffix.append(suffix_text);

    box_control.append(suffix)

    return form_control; 
}

// add new volume
function add_new_volume(){

    const form_inputs = [
        {
            'textLabel': 'Quantidade',
            'suffixText': 'QT',
            'input_type': 'number',
            'input_name': 'quantity',
            'input_id': 'quantity',
            'input_class': '',
            'input_placeholder': '1'
        },
        {
            'textLabel': 'Peso',
            'suffixText': 'Kg',
            'input_type': 'text',
            'input_name': 'weight',
            'input_id': 'weight',
            'input_class': 'product_kg',
            'input_placeholder': '0,000 kg'
        },
        {
            'textLabel': 'Altura',
            'suffixText': 'M',
            'input_type': 'text',
            'input_name': 'height',
            'input_id': 'height',
            'input_class': 'product-cm',
            'input_placeholder': '0,00 m'
        },
        {
            'textLabel': 'Largura',
            'suffixText': 'M',
            'input_type': 'text',
            'input_name': 'width',
            'input_id': 'width',
            'input_class': 'product-cm',
            'input_placeholder': '0,00 m'
        },
        {
            'textLabel': 'Profundidade',
            'suffixText': 'M',
            'input_type': 'text',
            'input_name': 'pdepth',
            'input_id': 'depth',
            'input_class': 'product-cm',
            'input_placeholder': '0,00 m'
        },

    ];

    let form_volumes_item = document.createElement('div');
    form_volumes_item.setAttribute('class', 'form-volumes-item');
    form_volumes_item.setAttribute('id', 'form-volumes-item_'+contador);

    let form_volumes_inputs = document.createElement('div');
    form_volumes_inputs.setAttribute('class', 'form-volumes-inputs');

    form_volumes_item.append(form_volumes_inputs);

    for(let i = 0; i < form_inputs.length; i++){
        form_volumes_inputs.append( create_inputs_volumes(form_inputs, i, contador) )
    }

    let remove_volumes = document.createElement('div');
    remove_volumes.setAttribute('class', 'form-wrap-remove-volume');
    
    form_volumes_item.append(remove_volumes);

    let btn_remove = document.createElement('button');
    btn_remove.setAttribute('type', 'button');
    btn_remove.setAttribute('class', 'form-volumes-remove');
    btn_remove.setAttribute('onclick', 'form_item_remove('+ contador +')')

    //<span class="dashicons dashicons-trash"></span>
    btn_remove_icon = document.createElement('span');
    btn_remove_icon.setAttribute('class', 'dashicons dashicons-trash');

    btn_remove.append(btn_remove_icon);

    let btn_remove_text = document.createTextNode('Remover volume');
    btn_remove.append(btn_remove_text);

    remove_volumes.append(btn_remove);
    
    $('.form-volumes-wrap').append(form_volumes_item);

}

// Get form values
function get_form_data(){
    const form_data = {
        //cunstumer
        'custumer-name': $('#custumer-name').val(),
        'custumer-email': $('#custumer-email').val(),
        'custumer-phone': $('#custumer-phone').val(),
        
        //address
        'cep_retriver': $('#cep_retriver').val(),
        'cep_delivery': $('#cep_delivery').val(),
        
        //packages types
        'product-category': $('#product-category').val(),
        'product-type': $('#product-type').val(),

        'invoice-total':  convert_price( $('#product-invoice-total').val() )

    }

    return form_data;

}

// Get packages
function getPackages(){

    const packages = [];

    $( ".form-volumes-item" ).each(function( index ) {
        packages.push({
            'qtd': parseInt( $(this).find('#quantity').val() ),
            'weight': convert_kg( $(this).find('#weight').val() ),
            'width': convert_m( $(this).find('#width').val() ),
            'height': convert_m( $(this).find('#height').val() ),
            'depth': convert_m(  $(this).find('#depth').val() )
        })
        
    });

    return packages;
}

/**
 * variables
 */
var contador = 0;

jQuery(document).ready(function ($) {
    
    formatMask();
    add_options();
    add_new_volume();

    var typingTimer; 
    var doneTypingInterval = 1000; 
    
    //Get custumer by e-mail
    $('#custumer-email').keyup(function() {
        
        clearTimeout(typingTimer);
        
        if ($('#custumer-email').val()) {
            disable_elements()
            typingTimer = setTimeout(getPeopleIdByEmail, doneTypingInterval);
        }
    });

    // add new volume
    $('.form-volumes-add').click(function (e){
        e.preventDefault();
        
        add_new_volume();
        formatMask();       
        contador++;
    
    });

    // Get Quotes
    $('#btnquote').click(function (e) {
        e.preventDefault();

        getQuotes();
        addLoader();

    })

    formatMask();
})