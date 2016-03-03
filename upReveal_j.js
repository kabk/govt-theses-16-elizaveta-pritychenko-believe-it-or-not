// (c)2015 http://uplaod.fr
 	
$.fn.upReveal = function() {

    $(this).css('opacity',1);
    var num = $(this).attr('data-num'),
//    container = document.getElementById('container'+num),
    ctx = $(this)[ 0 ].getContext('2d'),
    can = $(this),
    img = new Image,
    imgback = new Image,
    isDown = false,
    radius = 500;

    ctx.imageSmoothingEnabled = true;

    ctx.fillStyle = 'rgb( 255, 0, 0 )'
//    ctx.fillRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

    img.src = $(this).attr('data-bw');
//  	imgback.src = $(this).attr('data-color');

$(img).on('load', function() {
  $('canvas').animate({ opacity: 1 }, 500, function() { });

	can.on('mousemove', function(e) {
        isDown = true;
        erase(getXY(e));
         ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'destination-out';  
    })
    .on('mousemove ', function(e) {
        if (isDown) erase(getXY(e));
     });
    can.on('mouseleave  ', function(e) {
        isDown = false;
         ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'destination-out';
    });
 
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, can[ 0 ].width, can[ 0 ].height );
    ctx.globalCompositeOperation = 'destination-out';


});

function erase(pos) {
    ctx.beginPath();
	    var rad = ctx.createRadialGradient(pos.x, pos.y, radius, pos.x , pos.y, 10);
	    rad.addColorStop(1, 'rgba(255,0,0,1)');
	    rad.addColorStop(0, 'rgba(255,0,0,0)');
	ctx.fillStyle = rad;
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function drawImage(img) {
	ctx.drawImage(img, 0, 0, img.width , img.height, 0, 0, can.width, can.height);
}
 
function resize() {
   var widthToHeight = can.width ()/ can.height ();
   var newWidthToHeight = widthToHeight;
   var newWidth = window.innerWidth,
       newHeight = window.innerHeight;
       newWidthToHeight = newWidth / newHeight;
   if (newWidthToHeight > widthToHeight) {
       newWidth = newHeight * widthToHeight;
       container.style.height = newHeight + 'px';
       container.style.width = newWidth + 'px';
   } else {
       newHeight = newWidth / widthToHeight;
       container.style.width = newWidth + 'px';
       container.style.height = newHeight + 'px';
   }
   container.style.marginTop = (-newHeight / 2) + 'px';
   container.style.marginLeft = (-newWidth / 2) + 'px';

};
window.addEventListener('resize', function () {
   resize();
}, false);

window.addEventListener('orientationchange', function () {
   resize();
}, false);

resize();

function getXY(e) {
    var r = $('#upReaveal'+num)[0].getBoundingClientRect();
    return {
    x: e.clientX - r.left, 
    y: e.clientY - r.top
    };
}

};