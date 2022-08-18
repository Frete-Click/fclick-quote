<div id="wpcfc-content">
     <div class="wpfc-header">
          <h1>COTAÇÃO DE FRETE</h1> 
          <p>Preencha os campos abaixo para sua cotação</p> 
     </div>
    <form method="post">
          <div class="dms-col-xs-12 dms-col-sm-4 dms-col-md-4 dms-col-lg-4 dms-col-xl-4">
               <div class="wpfc-box-control">
                    <input type="text" id="custumer-email" name="custumer-email" placeholder="E-mail">
               </div>
          </div> 
          <div class="dms-col-xs-12 dms-col-sm-4 dms-col-md-4 dms-col-lg-4 dms-col-xl-4">
               <div class="wpfc-box-control">
                    <input type="text" class="phone_with_ddd" id="custumer-phone" name="custumer-phone" placeholder="Telefone">
               </div>    
          </div>
          <div class="dms-col-xs-12 dms-col-sm-4 dms-col-md-4 dms-col-lg-4 dms-col-xl-4">
               <div class="wpfc-box-control">
                    <input type="text" id="custumer-name" name="custumer-name" placeholder="Nome completo">
               </div>
          </div>
          <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-6 dms-col-lg-6 dms-col-xl-6">
               <div class="wpfc-box-control">
                    <input type="text" class="cep" id="cep_retriver" name="cep_retriver" value="" placeholder="CEP de Origem" required>
               </div>
          </div>
          <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-6 dms-col-lg-6 dms-col-xl-6">
               <div class="wpfc-box-control">
                    <input type="text" class="cep" id="cep_delivery" name="cep_delivery" value="" placeholder="CEP de Destino" required>
               </div>
          </div>
          <div class="dms-col-xs-12 dms-col-sm-4 dms-col-md-4 dms-col-lg-4 dms-col-xl-4">
               <div class="wpfc-box-control">
                    <select name="product-category" id="product-category"></select>
               </div>
          </div>
          <div class="dms-col-xs-12 dms-col-sm-4 dms-col-md-4 dms-col-lg-4 dms-col-xl-4">
               <div class="wpfc-box-control">
                    <input type="text" id="product-type" name="product-type" placeholder="Tipo de produto" required>
               </div>
          </div> 
          <div class="dms-col-xs-12 dms-col-sm-4 dms-col-md-4 dms-col-lg-4 dms-col-xl-4">
               <div class="wpfc-box-control">
                    <input type="text" class="money2" id="product-invoice-total" name="product-invoice-total" placeholder="Valor da nota fiscal" required>
               </div>    
          </div>

          <div class="dms-col-xs-12 dms-col-sm-12 dms-col-md-12 dms-col-lg-12 dms-col-xl-12">
               <div class="box-product-data">
                    <h4 class="text-center">Dados dos produtos</h4>
               
                    <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                         <span class="text-label">Nº de Volumes</span>
                         <div class="wpfc-box-control">
                              <input type="number" id="product-quantity" name="product-quantity" placeholder="1" required>
                              <div class="text-suffix">QT</div>
                         </div>
                    </div>
                    <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                         <span class="text-label">Peso</span>
                         <div class="wpfc-box-control">
                              <input type="text" id="product-weight" name="product-weight" placeholder="0,000 kg" required> 
                              <div class="text-suffix">kg</div>
                         </div>
                    </div>
                    <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                         <span class="text-label">Altura</span>
                         <div class="wpfc-box-control">
                              <input type="text" class="product-cm" id="product-height" name="product-height" placeholder="0,00 cm" required>
                              <div class="text-suffix">cm</div>
                         </div>
                    </div>
                    <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                         <span class="text-label">Largura</span>
                         <div class="wpfc-box-control">
                              <input type="text" class="product-cm" id="product-width" name="product-width" placeholder="0,00 cm" required>
                              <div class="text-suffix">cm</div>
                         </div>
                    </div>
                    <div class="dms-col-xs-12 dms-col-sm-12 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                         <span class="text-label">Comprimento</span>
                         <div class="wpfc-box-control">
                              <input type="text" class="product-cm" id="product-depth" name="product-depth" placeholder="0,00 cm" required>
                              <div class="text-suffix">cm</div>
                         </div>
                    </div>
                    <div class="dms-col-xs-12 dms-col-sm-12 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">

                    </div>
               </div>
          </div>

          <div class="dms-col-xs-12 dms-col-sm-12 dms-col-md-12 dms-col-lg-12 dms-col-xl-12">
               <div class="text-center">
                    <input type="submit" name="submit" id="btnquote" value="FAZER COTAÇÃO DE FRETE">
               </div>
          </div>
    </form>
     <!--Show loading-->
    <div class="loading">
          <div id="loader-1"></div>
          <div id="loader-2"></div>
     </div>  
</div>
<div id="modal" class="popup-overlay">
     <div class="popup-cover">
          <div class="close_pop"><span onclick="clouse_modal()">X</span></div>
          
          <div id="listing-quotes"></div>

          <button id="btnclousemodal" onclick="clouse_modal()">RETORNAR AOS DADOS DA COTAÇÃO</button>
     </div>
</div>