//enables popovers to work throughout the site

$(function () {
  $('[data-toggle="popover"]').popover({html: true});
})



function showStreetView() {
    $('#street-view').show();
}