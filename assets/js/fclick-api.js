/**
 * Variables Global
 */
const validacep = /^[0-9]{8}$/;
const url_api = "https://api.freteclick.com.br";
const domain  = 'expressogp.freteclick.com.br';
const config = {
    headers: {
        'api-token': '242c5d6f05fd292bc91fd67170dc5a04',
    }
}

/**
 * Remove character
 */
function removeChar(data){
    return data.toString().replace(/[^0-9]/g,'');
}

/**
 * Add Error
 */
function addError(msg, autoclose = true){
    document.getElementById('popup-alert').style.display = 'block';    
    document.getElementById('popup-msg').textContent = msg;
    
    if(autoclose === true){
        setTimeout("closePopUp()", 3000);
    }

    removeLoader();
}

async function getAddress( cep ) {

    var cep = removeChar(cep);
    
    if ( validacep.test(cep) ) {

        try {
            
            const address = await axios.get( `${url_api}/cep_address/${cep}`, config)
            
            return address?.data

        } catch (err) {
            return false;
        }
    }else {
        addError('CEP inválido.')
    }
}

/**
 * 
 * Get origin
 */
async function getOrigin(){

    var origin  = await getAddress($('#cep_retriver').val());

    const data = {
        city: origin.city,
        state: origin.state,
        country: origin.country
    }

    return data;
}


async function getDestination(){

    var destination = await  getAddress($('#cep_delivery').val());
    
    const data = {
        city: destination.city,
        state: destination.state,
        country: destination.country
    }

    return data;
}

/**
 * Get People By ID
 */
function getPeopleByID(id){

    axios.get( `${url_api}/people/${id}`, config)
        .then((res) => {

            const phone = res.data.phone[0].ddd.toString() + res.data.phone[0].phone.toString() + ' ';

            $('#custumer-name').val(res.data.name);
            $('#custumer-phone').val(phone.trim());

            enable_elements();
        })
        .catch((error) => {
            console.error(error)
            addError(`Cliente não cadastrado ou ID ${id} invalido!`);
        })
}

/**
 * Get people id by e-mail
 */
function getPeopleIdByEmail() {

    enable_elements();

    axios.get( `${url_api}/email/find?email=${$('#custumer-email').val()}`)
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

function checkInputs(){

    if($('#custumer-email').val() === ""){
        return addError('Informe seu e-mail!');
    }

    if($('#custumer-name').val() === ""){
        return addError('Informe seu nome completo!');
    }

    if($('#custumer-phone').val() === ""){
        return addError('Informe seu telefone!');
    }

    if($('#product-category').val() === ""){
        return addError('Informe a categoria do produto!');
    }

    if($('#product-type').val() === ""){
        return addError('Informe o tipo de produto!');
    }

    if($('#product-invoice-total').val() === ""){
        return addError('Informe o valor total da nota fiscal!');
    }

    if($('#cep_retriver').val() === ""){
        return addError('Informe o CEP de Origin!');
    }
 
    if($('#cep_delivery').val() === ""){
        return addError('Informe o CEP de Destino!');
    }

    return true;
 
}

/**
 * Quotes
 */
async function getQuotes(){

    if(checkInputs() === true){
        quoteData = {
            origin: await getOrigin(),
            destination: await getDestination(),
            domain: null, //'expressogp.freteclick.com.br',
            productTotalPrice: 30,
            productType: "Produto 01",
            packages: getPackages(),
            order: "total",
            quoteType: "full", 
            noRetrieve: true,
            denyCarriers: null,
            app: "Cota Fácil - Wordpress",
            contact: 
            {
                email: "devmunds@gmail.com",
                name: "LEANDRO GABRIEL CUNHA",
                phone: "19999847031"
            }
        }

       const quotes = await axios.post(`${url_api}/quotes`, quoteData, config)

       try{

            console.log(quotes.data);


            $.each(quotes.data.order, function (index, val){
                const resultado = await addCarrirToList(val['quotes']['carrier']['image'], formatPrice(val['quotes']['total']), val['quotes']['retrieveDeadline'],  val['quotes']['deliveryDeadline']);
                console.log(resultado);
            });
            
            $('#listing-quotes').html(resultado)
            
            //show_modal();
            
            removeLoader();
            

       }catch(err){
            addError(err);
       }
    }
}
