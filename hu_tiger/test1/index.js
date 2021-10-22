let str = window.location.href;
let url = str.replace(/pc/, "web")
if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    console.log('web')
    window.location.href = './web.html';
}else{
    console.log('pc')
    // window.location.href = './index.html';
}