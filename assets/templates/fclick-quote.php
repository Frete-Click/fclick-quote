<div id="wpcfc-content">
     <div class="box-header">
          <h1>COTAÇÃO DE FRETE</h1> 
          <p>Preencha os campos abaixo para sua cotação</p> 
     </div>
    <form method="post" id="form-quote">
          <div class="box-col-3">
               <div class="wpfc-box-control">
                    <input type="text" id="custumer-email" name="custumer-email" placeholder="E-mail">
               </div>
               <div class="wpfc-box-control">
                    <input type="tel" maxlength="15" autocomplete="off" class="phone_with_ddd" id="custumer-phone" name="custumer-phone" placeholder="Telefone">
                    <div class="wrap-spin-in">
                         <div class="spin-in"></div>
                    </div>
               </div> 
               <div class="wpfc-box-control">
                    <input type="text" id="custumer-name" name="custumer-name" placeholder="Nome completo">
                    <div class="wrap-spin-in">
                         <div class="spin-in"></div>
                    </div>
               </div>

          </div> 

          <div class="box-col-2">
               <div class="wpfc-box-control">
                    <input type="text" class="cep" id="cep_retriver" name="cep_retriver" value="" placeholder="CEP de Origem" required>
               </div>

               <div class="wpfc-box-control">
                    <input type="text" class="cep" id="cep_delivery" name="cep_delivery" value="" placeholder="CEP de Destino" required>
               </div>

          </div>

          <div class="box-col-3">
               <div class="wpfc-box-control">
                    <select name="product-category" id="product-category"></select>
               </div>

               <div class="wpfc-box-control">
                    <input type="text" id="product-type" name="product-type" placeholder="Tipo de produto" required>
               </div>

               <div class="wpfc-box-control">
                    <input type="text" class="money2" id="product-invoice-total" name="product-invoice-total" placeholder="Valor da nota fiscal" required>
               </div>  

          </div>

          <div class="form-title">
               <h4>Informações do volume</h4>
          </div>
 
          <div class="form-volumes-wrap"></div>
          
          <!--Button add-->
          <div class="wrap-button-add">
               <button class="form-volumes-add"><span class="dashicons dashicons-plus"></span>Adicionar volume</button>
          </div>

          <div class="wrap-btn-quote">
               <input type="submit" name="submit" id="btnquote" class="btn-quote" value="FAZER COTAÇÃO DE FRETE">
          </div>
    </form>

</div>


<div id="modal" class="popup-overlay">
     <div class="popup-cover">
          <div class="popup-header">
               <div class="quote-num"></div>
               <div class="close_pop"><span onclick="clouse_modal()">X</span></div>
          </div>
          
          <div class="popup-section-qrap">
               <div id="listing-quotes" class="popup-section"></div>
          </div>
          <!--end section-->
          <div class="popup-footer">
               <button id="btnclousemodal" onclick="clouse_modal()">RETORNAR AOS DADOS DA COTAÇÃO</button>
          </div>
     </div>
</div>