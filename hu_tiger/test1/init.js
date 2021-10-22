$(document).ready(function() {

    let soltool = new SolWeb3Tools()

    $("#connectbtn").click(function(){
        console.log(soltool)
        soltool.init_web3()
    })
    connectbtn

    // 初始化
    $("#initbtn").click(function(){
        soltool.initAccount()
    })

})