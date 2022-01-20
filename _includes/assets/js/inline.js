$(document).ready(function () {
  $('html').addClass('js');

  // Open and close loop for main navigation on mobile.
  $('button.site-header__menu').click(function () {
    // when user clicks on nav btn..
    if ($('.open-mobile').length) {
      // .. if nav is already open..
      $('.site-header').removeClass('open-mobile'); // .. remove the class..
      $('button.site-header__menu').attr('aria-expanded', 'false');
    } else {
      // .. if not ..
      $('.site-header').addClass('open-mobile'); // .. add the open on mobile class..
      $('button.site-header__menu').attr('aria-expanded', 'true');
    }
  });
});
