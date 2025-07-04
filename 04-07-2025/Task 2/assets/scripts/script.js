$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsiceClass: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
  URLhashListener: true,
  startPosition: "URLHash",
  lazyLoad: true,
  video: true,
  center: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoHeight: true,
});

AOS.init();
