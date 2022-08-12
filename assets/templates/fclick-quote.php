<div id="wpcfc-content">
     <div class="wpfc-header">
          <h1>COTAÇÃO DE FRETE</h1> 
          <p>Preencha os campos abaixo para sua cotação</p> 
     </div>
    <form method="post">
          <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-6 dms-col-lg-6 dms-col-xl-6">
               <div class="wpfc-box-control">
                    <input type="text" id="cepcollect" name="cepcollect" value="" placeholder="CEP de Origem">
               </div>
          </div>
          <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-6 dms-col-lg-6 dms-col-xl-6">
               <div class="wpfc-box-control">
                    <input type="text" id="cepdelivery" name="cepdelivery" value="" placeholder="CEP de Destino">
               </div>
          </div>
          <div class="dms-col-xs-12 dms-col-sm-4 dms-col-md-4 dms-col-lg-4 dms-col-xl-4">
               <div class="wpfc-box-control">
                    <select name="product-category" id="product-category"></select>
               </div>
          </div>
          <div class="dms-col-xs-12 dms-col-sm-4 dms-col-md-4 dms-col-lg-4 dms-col-xl-4">
               <div class="wpfc-box-control">
                    <input type="text" id="product-type" name="product-type" placeholder="Tipo de produto">
               </div>
          </div> 
          <div class="dms-col-xs-12 dms-col-sm-4 dms-col-md-4 dms-col-lg-4 dms-col-xl-4">
               <div class="wpfc-box-control">
                    <input type="text" id="product-invoice-total" name="product-invoice-total" placeholder="Valor da nota fiscal">
               </div>    
          </div>
          <div class="dms-col-xs-12 dms-col-sm-12 dms-col-md-12 dms-col-lg-12 dms-col-xl-12">
               <div class="product-data" id="product-data">
                    <h3>Dados dos produtos</h3>

                    <div class="product-data-filds">
                         <div class="dms-col-xs-12 dms-col-sm-12 dms-col-md-12 dms-col-lg-12 dms-col-xl-12">
                              <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                                   <div class="wpfc-box-control">
                                        <input type="number" id="product-quantity" name="product-quantity" placeholder="1">
                                   </div>
                              </div>
                             
                              <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                                   <div class="wpfc-box-control">
                                        <input type="text" id="product-weight" name="product-weight" placeholder="0,000 kg"> 
                                   </div>
                              </div>
                              <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                                   <div class="wpfc-box-control">
                                        <input type="text" id="product-height" name="product-height" placeholder="0,00 m">
                                   </div>
                              </div>
                              <div class="dms-col-xs-12 dms-col-sm-6 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                                   <div class="wpfc-box-control">
                                        <input type="text" id="product-width" name="product-width" placeholder="0,00 m">
                                   </div>
                              </div>
                              <div class="dms-col-xs-12 dms-col-sm-12 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                                   <div class="wpfc-box-control">
                                        <input type="text" id="product-depth" name="product-depth" placeholder="0,00 m">
                                   </div>
                              </div>
                              <div class="dms-col-xs-12 dms-col-sm-12 dms-col-md-2 dms-col-lg-2 dms-col-xl-2">
                                   <button id="btndelete">DEL</button>
                                   <button id="btnaddnew">ADD</button>
                              </div>
                              
                         </div>
                    </div>
                    
                    <input type="submit" name="submit" id="btnquote" value="FAZER COTAÇÃO DE FRETE">
               </div>
          </div>
    </form>
</div>