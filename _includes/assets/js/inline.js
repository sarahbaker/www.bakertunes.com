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

  if ($('.testimonials--container')[0] && $('.testimonials--container').data('testimonial-count') > 1) {
    var count = $('.testimonials--container').data('testimonial-count');
    var rand = Math.floor((Math.random() * count) + 1);
    var name = '.testimonial--' + rand;
    if (rand > 1) {
      var testimonial = $(name);
      testimonial[0].scrollIntoView();
    }
  }
});
