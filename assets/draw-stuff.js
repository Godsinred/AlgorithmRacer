/* 
Authors: Jonathan Ishii, Matthew Mikulka
Contact: jtishii@csu.fullerton.edu, mattmikulka@csu.fullerton.edu
Description: This program illustrates Wolfram's Rule-90 is based on a 1D array where each cell is active.
            We will illustate on a webpage visually how this works. This file holds all the functions to be called by the Cela Rule 90.html file
*/

// Draw filled rect.

var row_number = 0;
var myArray;

function draw_rect( ctx, stroke, fill ) 
{
    stroke = stroke || 'black';
    fill = fill || 'white';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(5, 5, canvas.width - 10, canvas.height - 10);
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}

function draw_grid( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width - 5;
    let height = rctx.canvas.height - 10;
    rctx.lineWidth = 1;

    for ( var ix = 0; ix < width - 10; ix += 60 )
    {
        rctx.beginPath( );
        rctx.moveTo( ix + 5, 5 );
        rctx.lineTo( ix + 5, height + 5);
        rctx.stroke( );
    }

    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 5, iy + 5 );
        rctx.lineTo( width, iy + 5 );
        
        if (iy % rmajor === 0 && iy !== 0)
        {
            rctx.lineWidth = 4;
            rctx.strokeStyle = "#cc6d02";
        }
        else
        {
            rctx.lineWidth = 1;
            rctx.strokeStyle = rstroke;
        }
        rctx.stroke( );
    }
    rctx.restore( );
}

function nextStep() 
{
    document.getElementById("stepButton").style.color = "red";

    var canvas = document.getElementById( "grid" );
    var insertion = canvas.getContext( "2d" );

    var canvas2 = document.getElementById( "grid2" );
    var merge = canvas2.getContext( "2d" );

    var canvas3 = document.getElementById( "grid3" );
    var quick = canvas3.getContext( "2d" );

    drawArray(insertion, myArray, row_number);
    drawArray(merge, myArray, row_number);
    drawArray(quick, myArray, row_number);

    // so the program knows which row to write on
    ++row_number;

}

function drawStep(ctx, myArray)
{
//     let width = ctx.canvas.width - 5;
//     let height = ctx.canvas.height - 5;

    drawArray(ctx, myArray, 1);

}

function drawArray(ctx, myArray, row)
{
    for (var i = 0; i < 12; ++i)
    {
        ctx.save( );
        ctx.fillStyle = "green";
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillText(myArray[i], 5 + 30 + 60 * i, 70 + (120 * row)); 
        ctx.restore( );
    }
}

// for a different part
function drawValue(ctx, value)
{
    fill = 'green';
    ctx.save( );
    ctx.fillStyle = fill;
    ctx.lineWidth = 3;
    ctx.rect(5 + value * 60, 5 + (11 - value) * 10, 60, (value + 1) * 10);
    ctx.fill();
    ctx.restore( );
}

// when the window is scroll it will call myFunction
window.onscroll = function() {myFunction()};

// get the navbar element
var navbar = document.getElementById("navbar");

// get the offset of the top
var sticky = navbar.offsetTop;

// add the sticky class to the navbar when you reach its scroll postition. remove "stick" when you leave the scroll postion
function myFunction() {
    if (window.pageYOffset >= sticky) 
    {
        navbar.classList.add("sticky");
    }
    else
    {
        navbar.classList.remove("sticky");
    }
}