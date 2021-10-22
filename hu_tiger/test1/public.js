$(document).ready(function() {
    var swiper = new Swiper('.hu-swiper-wrapper', {
        effect: 'fade',
        autoplay: {
            delay: 3000,
        },
        direction: 'vertical',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChangeTransitionEnd: function() {
                // console.log(this.activeIndex)
                if (this.activeIndex == 1) {
                    $('#video_swiper').get(0).play();
                    swiper2.slideTo(1, 10, false)
                } else if (this.activeIndex == 2) {
                    $('#video_swiper').get(0).pause();
                    swiper2.slideTo(2, 10, false)
                } else {
                    $('#video_swiper').get(0).pause();
                    swiper2.slideTo(0, 10, false)
                }
            },
        },
    });
    var swiper2 = new Swiper('.small-swiper', {
        effect: 'fade',
        direction: 'vertical',
        noSwiping: true,
    });
    var num = 0;
    $(".tab-wrapper .item-tab-wrapper").click(function() {
        $(this).addClass("active-tab").siblings().removeClass("active-tab");
        $(".content-wrapper .item-content-wrapper").hide().eq($(".tab-wrapper .item-tab-wrapper").index(this)).show();
        num = $(this).index()
    });
    setInterval(function() {
        num++;
        if (num > 4) {
            num = 0
        }
        $(".tab-wrapper .item-tab-wrapper").eq(num).addClass("active-tab").siblings().removeClass("active-tab");
        $(".content-wrapper .item-content-wrapper").hide().eq(num).show()
        $(".p-img-wrapper .p-img").eq(num).addClass('active-opacity').siblings().removeClass("active-opacity");
    },
    3000);
    
    let web3tools = new Web3Tools();
    $("#buy_now").click(function() {
        // $(".modal").fadeIn();
        // $(".step1").show()
        alert(1)
    });
    $("#cancel").click(function() {
        $(".modal").fadeOut();
        $(".step1").hide();
        $(".step3").hide();
        $(".step2").hide()
    });
    $("#cancel2").click(function() {
        $(".modal").fadeOut();
        $(".step1").hide();
        $(".step3").hide();
        $(".step2").hide()
    });
    $("#buy").click(function() {
        var number = $("#number").val();
        if(number > 0) {
            $(".step1").hide();
            $(".step2").show();
            web3tools.sendMintNew(number)
        }
        
    });
    $.getJSON("./lottie/loading.json",
    function(result) {
        lottie.loadAnimation({
            container: document.querySelector('.loading'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: result,
        })
    });
    $.getJSON("./lottie/yan.json",
    function(result) {
        lottie.loadAnimation({
            container: document.querySelector('.yan'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: result,
        })
    });
    $("#m_btn").click(function() {
        window.location.href = 'https://medium.com/@huhutigers/introducing-huhu-tigers-8b5f765aef06'
    });
    $("#t_btn").click(function() {
        window.location.href = 'https://twitter.com/HuhuTigers'
    });
    $("#d_btn").click(function() {
        window.location.href = 'https://discord.gg/3Bj3Uv29hf'
    });
    $("#t_btn1").click(function() {
        window.location.href = 'https://twitter.com/HuhuTigers'
    });
    $("#d_btn1").click(function() {
        window.location.href = 'https://discord.gg/3Bj3Uv29hf'
    });
    // 普通opensea跳转
    $(".opensea").click(function() {
        // window.location.href = 'https://testnets.opensea.io/assets/https://testnets.opensea.io/assets/0x1d0d1bc5e478158231f398908fc942c68c356c31'
        window.open('https://testnets.opensea.io/collection/huhutigers-gebu7ipihc')
    });

    // 购买成功opensea跳转
    $("#buy_opensea").click(function(){
        // window.location.href = 'https://testnets.opensea.io/assets/0x1d0d1bc5e478158231f398908fc942c68c356c31/'
        window.open('https://testnets.opensea.io/' + web3tools.from_addr)

    })

    let soltool = new SolWeb3Tools();

})