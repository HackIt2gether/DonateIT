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

  getdonations();

  $('.form-horizontal').submit((e) => {
    // e.preventDefault();
    // html elements
    let $name = $('#name').val();
    let $email = $('#email').val();
    let $pickup_address = $('#pickup_address').val();
    let $category = $('#category').val();
    let $item_description = $('#item_description').val();

      $.post('/donations', newDonation)
        .done((data) => {
          // console.log('post req', data);
          // window.location.href = res.redirect;
        })
        .fail( function(data) {
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
