$( document ).ready(function() {
    console.log( "ready!" );
    $('#addonations').click( function(){
      $("#about_form").hide();
      $("#donation_form").toggle();
    })

    $('#about').click( function(e){
        e.preventDefault();
        $("#donation_form").hide();
        $("#about_form").toggle();
    })

    $('#form-horizontal').submit((e) => {
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
        .done((data) => {
          // console.log('post req', data);
        })
        .fail( function(data) {
          console.error('error!');
        });
    })

}); // end of document load
