/* 
Authors: Jonathan Ishii, Matthew Mikulka
Contact: jtishii@csu.fullerton.edu, mattmikulka@csu.fullerton.edu
Description: This program illustrates Wolfram's Rule-90 is based on a 1D array where each cell is active.
            We will illustate on a webpage visually how this works. This file holds all the functions to be called by the Cela Rule 90.html file
*/

// Draw filled rect.
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

function nextStep() {
    document.getElementById("stepButton").style.color = "red";
}

function drawStep(ctx)
{
//     let width = ctx.canvas.width - 5;
//     let height = ctx.canvas.height - 5;

    var myArray = ["0", "B", "A", "3", "2", "8", "4", "7", "6", "5", "1", "9"];
    for(var i = 0; i < 12; ++i)
    {
        drawArray(ctx, myArray, 0);
    }
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