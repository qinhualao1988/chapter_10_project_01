document.addEventListener("DOMContentLoaded", function() {

   const url = "https://www.randyconnolly.com/funwebdev/3rd/api/colors/sample-colors.php";
   //here start my code//

   //load animation//
   let load = document.querySelector('#loader');
   load.style.display = 'block';


   //color scheme fetch//
   fetch(url)
   .then(response => {
      if (response.ok) {
         return response.json()
      }
      else {
         throw new Error('fetch did not work!');
      }
   })
   .then(data => {
      let  colorsetHTML = '';
      data.forEach( colorset => {
       colorsetHTML += `
      <article class="scheme-group">

           <h3>${colorset.title}</h3>
               <section class="scheme">
                     
                     <div class="preview">
                        <div class="color-box" style="background-color:${colorset.scheme[0].web}"></div>
                        <div class="color-box" style="background-color:${colorset.scheme[1].web}"></div>
                        <div class="color-box" style="background-color:${colorset.scheme[2].web}"></div>
                        <div class="color-box" style="background-color:${colorset.scheme[3].web}"></div>
                        <div class="color-box" style="background-color:${colorset.scheme[4].web}"></div>
                     </div>
                     <div class="actions">        
                        <button data-id="${colorset.id}">View</button>
                     </div>        
               </section>       

      </article> 
       `;
      })
      
      document.querySelector('.container').innerHTML = colorsetHTML;
      //hide load animation//
      load.style.display = 'none'; 

      //button handler//
      const btns = document.querySelectorAll('.actions button');
      for (let bt of btns) {
         bt.addEventListener('click', (e) => {
            /*console.log('see');*/

            //scheme detail//
            if (e.target && e.target.nodeName.toLowerCase() == 'button') {
               let id = e.target.getAttribute('data-id');
               let newData = data.find( colorset => colorset.id == id);
               //console.log(newData);//

               //generate HTML//
               let AsideTitle = '';
               AsideTitle = `
               <h2>${newData.title}</h2>
               <fieldset>
               <!-- Note you will need to remove or comment out this colorRow; 
                   it is there to show you the markup that your javascript will need to generate.
                   And instead of style attribute for the color, you will set it instead via JS. -->            
               <div class="colorRow">
                   <div class="detailBox" style="background-color:#C9303D"> </div> 
                   <span>#000000</span> 
                   <span>rgb(100,100,100)</span>
                   <label >Color Name Here</label>
               </div> 
   
                          
           </fieldset>
               `;
               document.querySelector('aside').innerHTML = AsideTitle;
               
               let AsideFieldSet = ''
               newData.scheme.forEach(s => {
                  AsideFieldSet += `
                  <div class="colorRow">
                      <div class="detailBox" style="background-color:${s.web}"> </div> 
                      <span>${s.web}</span> 
                      <span>rgb(${s.color.red},${s.color.green},${s.color.blue})</span>
                      <label >${s.name}</label>
                  </div>               
                  `;
                  document.querySelector('fieldset').innerHTML = AsideFieldSet;
               })
               console.log(AsideTitle);
            }


         })
      }
   
      

   })//end data fetch//  
});







