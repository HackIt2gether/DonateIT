'use strict'
$(document).ready( function(){

  console.log('index.js loaded!');

  $('#addonations').click(function(){
       $("#donation_form").toggle();
  });

  getdonations();

  $('.form-horizontal').submit((e) => {
    // e.preventDefault();
    // html elements
    let $name = $('#name').val();
    let $email = $('#email').val();
    let $pickup_address = $('#pickup_address').val();
    let $category = $('#category').val();
    let $item_description = $('#item_description').val();

    let newDonation = {
      name: $name,
      email: $email,
      pickup_address: $pickup_address,
      category: $category,
      item_description: $item_description
    };

    $.post('/donations', newDonation)
      .done((newDonation) => {
        // console.log('post req', newDonation);
      })
      .fail( function(newDonation) {
        console.error('error!');
      });
  })

}); // end of document load


function getdonations(){
 $.get('/donations')
  .done( (data) => {
      localStorage.clear();
      localStorage.donateit = JSON.stringify(data);
  })
  .fail( () => {
    console.error('You have failed this homework!!!!!!!!!');
  });
}
