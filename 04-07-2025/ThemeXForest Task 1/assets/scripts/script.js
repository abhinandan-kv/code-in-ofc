document.querySelectorAll('.dropdown, .dropend').forEach(function (dropdown) {
    let hideTimeout;
  
    dropdown.addEventListener('mouseenter', function () {
      clearTimeout(hideTimeout);
  
      let toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
      if (toggle) {
        bootstrap.Dropdown.getOrCreateInstance(toggle).show();
      }
    });
  
    dropdown.addEventListener('mouseleave', function () {
      hideTimeout = setTimeout(function () {
        let toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
        if (toggle) {
          bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
        }
      }, 200);
    });
  });
  