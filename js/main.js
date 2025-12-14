(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 4
            },
            768: {
                items: 6
            },
            992: {
                items: 8
            }
        }
    });

    // Active Nav Link (Scrollspy)
    $(window).scroll(function () {
        var scrollDistance = $(window).scrollTop() + 120; // Adjust for sticky navbar height
        $('.navbar-nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (currLink.attr("href").startsWith("#") && refElement.length && refElement.position().top <= scrollDistance && refElement.position().top + refElement.height() > scrollDistance) {
                $('.navbar-nav a').removeClass("active");
                currLink.addClass("active");
            }
        });
    }).scroll();

    // Dynamic Content Loading
    $.getJSON("data.json", function (data) {
        // Render Top Bar
        $("#topbar-address").html(`<i class="fa fa-map-marker-alt me-2"></i>${data.topbar.address}`);
        $("#topbar-phone").html(`<i class="fa fa-phone-alt me-2"></i>${data.topbar.phone}`);
        $("#topbar-email").html(`<i class="fa fa-envelope-open me-2"></i>${data.topbar.email}`);

        let socialHtml = "";
        data.topbar.social.forEach(function (social) {
            socialHtml += `<a class="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="${social.link}"><i class="${social.icon} fw-normal"></i></a>`;
        });
        $("#topbar-social").html(socialHtml);
        // Render Services
        let servicesHtml = "";
        data.services.forEach(function (service) {
            servicesHtml += `
            <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                    <div class="service-icon">
                        <img src="${service.image}" class="img-fluid rounded-circle" style="width: 60px; height: 60px;" alt="${service.title}">
                    </div>
                    <h4 class="mb-3">${service.title}</h4>
                    <p class="m-0">${service.description}</p>
                    <a class="btn btn-lg btn-primary rounded" href="${service.link}">
                        <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>`;
        });
        $("#service-container").html(servicesHtml);

        // Render Team
        let teamHtml = "";
        data.team.forEach(function (member) {
            teamHtml += `
            <div class="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                <div class="team-item bg-light rounded overflow-hidden">
                    <div class="team-img position-relative overflow-hidden">
                        <img class="img-fluid w-100" src="${member.image}" alt="${member.name}">
                        <div class="team-social">
                            <a class="btn btn-lg btn-primary btn-lg-square rounded" href=""><i class="fab fa-linkedin-in fw-normal"></i></a>
                        </div>
                    </div>
                    <div class="text-center py-4">
                        <h4 class="text-primary">${member.name}</h4>
                        <p class="text-uppercase m-0">${member.role}</p>
                    </div>
                </div>
            </div>`;
        });
        $("#team-container").html(teamHtml);

        // Render Projects
        let projectsHtml = "";
        data.projects.forEach(function (project) {
            projectsHtml += `
            <div class="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                <div class="blog-item bg-light rounded overflow-hidden">
                    <div class="blog-img position-relative overflow-hidden">
                        <img class="img-fluid" src="${project.image}" alt="${project.title}">
                        <a class="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4" href="">${project.category}</a>
                    </div>
                    <div class="p-4">
                        <h4 class="mb-3">${project.title}</h4>
                        <p>${project.description}</p>
                        <a class="text-uppercase" href="">View Details <i class="bi bi-arrow-right"></i></a>
                    </div>
                </div>
            </div>`;
        });
        $("#projects-container").html(projectsHtml);

        // Render Features
        let featuresHtml = "";
        // First Column
        featuresHtml += '<div class="col-lg-4"><div class="row g-5">';
        for (let i = 0; i < 2; i++) {
            let feature = data.features[i];
            featuresHtml += `
            <div class="col-12 wow zoomIn" data-wow-delay="0.2s">
                <div class="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                    <i class="${feature.icon} text-white"></i>
                </div>
                <h4>${feature.title}</h4>
                <p class="mb-0">${feature.description}</p>
            </div>`;
        }
        featuresHtml += '</div></div>';

        // Center Image
        featuresHtml += `
        <div class="col-lg-4 wow zoomIn" data-wow-delay="0.9s" style="min-height: 350px;">
            <div class="position-relative h-100">
                <img class="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.1s" src="img/feature.jpg" style="object-fit: cover;">
            </div>
        </div>`;

        // Third Column
        featuresHtml += '<div class="col-lg-4"><div class="row g-5">';
        for (let i = 2; i < 4; i++) {
            let feature = data.features[i];
            featuresHtml += `
            <div class="col-12 wow zoomIn" data-wow-delay="0.4s">
                <div class="bg-primary rounded d-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                    <i class="${feature.icon} text-white"></i>
                </div>
                <h4>${feature.title}</h4>
                <p class="mb-0">${feature.description}</p>
            </div>`;
        }
        featuresHtml += '</div></div>';
        $("#feature-container").html(featuresHtml);


        // Render Testimonials
        let testimonialHtml = "";
        data.testimonials.forEach(function (testimonial) {
            testimonialHtml += `
            <div class="testimonial-item bg-light my-4">
                <div class="d-flex align-items-center border-bottom pt-5 pb-4 px-5">
                    <img class="img-fluid rounded" src="${testimonial.image}" style="width: 60px; height: 60px;">
                    <div class="ps-4">
                        <h4 class="text-primary mb-1">${testimonial.name}</h4>
                        <small class="text-uppercase">${testimonial.role}</small>
                    </div>
                </div>
                <div class="pt-4 pb-5 px-5">
                    ${testimonial.text}
                </div>
            </div>`;
        });

        // Destroy carousel before updating content to avoid issues
        $(".testimonial-carousel").trigger('destroy.owl.carousel');
        $(".testimonial-carousel").html(testimonialHtml);

        // Re-initialize Owl Carousel after content injection
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });

    }).fail(function () {
        console.error("Could not load data.json. Ensure you are running on a local server (http://localhost...) and not file://");
    });
})(jQuery);

