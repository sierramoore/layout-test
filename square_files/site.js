/*Interactivity to determine when an animated element in in view. In view elements trigger our animation*/
$(document).ready(function() {
  var animation_elements = $.find('.animation-element');
  var web_window = $(window);
  var countElementsFinished = false;
  var shared = getCookie('shared');
  var isMobile = false;

  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
  }

  if (shared === 'true') {
    setDiscount();
  }

  if (isMobile) {
    $('#inside').css('display', 'none');
    $('#inside-mobile').css('display', 'block');
    /*
    document.getElementById('video_1').setAttribute('poster','../assets/placeholders/1.png');
    document.getElementById('video_2').setAttribute('poster','../assets/placeholders/2.png');
    document.getElementById('video_3').setAttribute('poster','../assets/placeholders/3.png');
    document.getElementById('video_4').setAttribute('poster','../assets/placeholders/4.png');
    document.getElementById('video_5').setAttribute('poster','../assets/placeholders/5.png');
    document.getElementById('video_6').setAttribute('poster','../assets/placeholders/6.png');
    */
  }

  //check to see if any animation containers are currently in view
  function check_if_in_view() {
    //get current window information
    var window_height = web_window.height();
    var window_top_position = web_window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    //iterate through elements to see if its in view
    $.each(animation_elements, function() {
      //get the element sinformation
      var element = $(this);
      var children = Array.from(element.find('.hidden'));
      var countChildren = Array.from(element.find('.count'));
      var element_height = $(element).outerHeight();
      var element_top_position = $(element).offset().top + window.innerHeight / 3;
      var element_bottom_position = (element_top_position + element_height);
      var bottomTop = element_bottom_position >= window_top_position - 200;
      var topBottom = element_top_position <= window_bottom_position - 200;

      //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
      if (bottomTop && topBottom) {
        if (countChildren.length > 0 && !countElementsFinished) {
          countElementsFinished = true;

          $.each(countChildren, function (index) {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: (index * 500) + 500,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
          });
        }

        $.each(children, function(index) {
          $(this).delay($(this).attr('class').indexOf('box-col') > -1 ? 300 : 0).velocity({
            opacity: 1,
            top: 0
          }, {
            duration: element.attr('class').indexOf('box-col') > -1 ? 1500 : (1000 + (index * 10)),
            delay: (element.attr('id') === 'header' && $(this).attr('class').indexOf('box') > -1) ? 0 : (index * 50),
            easing: [0.19, 1, 0.22, 1],
            complete: function() {
              $(this).removeClass('hidden');
            }
          });
        });
      }
    });
  }

  // SHARING FUNCTIONS
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  toggleVideo = function(id) {
    var video = isMobile ? document.getElementById('video_'+id+'_mobile') : document.getElementById('video_'+id);

    $('#video_'+id).parent().addClass('clicked');

    $('#video_'+id).parent().mouseleave(function() {
      $('#video_'+id).parent().removeClass('clicked');
    });

    if (video.paused) {
      video.play();
      $('#play-button-'+id).addClass('playing');
    } else {
      $('#play-button-'+id).removeClass('playing');
      video.pause();
    }
  }

  twttr.ready(function (twttr) {
    twttr.events.bind('tweet', function(event) {
        document.cookie = "shared=true";
        setDiscount();
    });
  });

  function setDiscount() {
    $('#modal-price').text('79');
    $('#modal-link').attr('href', 'https://gumroad.com/l/bimgE/EaPnfAmEfXqk8yJPNhucJZzy');
    $('.btn-modal-share').addClass('shared');
    $('.btn-modal-share').text('Thank you');
  }

  function checkOffset() {
    if (window.scrollY > 250) {
      $('#fixed-header').addClass('visible');
    } else {
      $('#fixed-header').removeClass('visible');
    }
  }

  // ONLOAD
  setTimeout(function() {
    $('main').removeClass('loading');
    $('#bm').addClass('absolute');
    check_if_in_view();
  }, isMobile ? 0 : 4300);

  if (isMobile) {
    $('#bm').addClass('hide');
  }

  $(window).on('scroll resize', function(e) {
      checkOffset();
      check_if_in_view();
  })

  // Actions
  /* $('.buy').click(function() {
    $('#share-modal').css("display", "block");
    $('#share-modal').velocity({
      opacity: 1
    }, {
      duration: 300
    });
  }); */

  $('.watch-video-button').click(function() {
    $('#video-modal').css("display", "block");
    $('#video-modal').velocity({
      opacity: 1
    }, {
      duration: 300
    });
    $('.youtube_player_iframe').each(function(){
      this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    });
  });

  $('.learn-more').click(function() {
    $('#slide_1').velocity('scroll', {
        duration: 700,
        offset: 0,
        easing: [ 0.17, 0.67, 0.83, 0.96 ]
    });
  });

  $('.close-button').click(function() {
    $('#share-modal').velocity({
      opacity: 0
    }, {
      duration: 300,
      easing: [ 0.17, 0.67, 0.83, 0.96 ]
    });
    setTimeout(() => {
      $('#share-modal').css("display", "none");
    }, 200)

    $('#video-modal').velocity({
      opacity: 0
    }, {
      duration: 300,
      easing: [ 0.17, 0.67, 0.83, 0.96 ]
    });

    setTimeout(() => {
      $('.youtube_player_iframe').each(function(){
        this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
      });

      $('#video-modal').css("display", "none");
    }, 200)
  });

  $('#fixed-header-logo').click(function() {
    $('body').velocity('scroll', {
        duration: 700,
        offset: 0,
        easing: [ 0.17, 0.67, 0.83, 0.96 ]
    });
  });

  $('#fb-share-button').click(function() {
    FB.ui({
      method: 'share',
      href: 'http://uimotionkit.io/',
    }, function(response) {
      setDiscount();
    });
  })
});