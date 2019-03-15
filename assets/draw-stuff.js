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
    let height = rctx.canvas.height - 5;

    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 5, iy + 5 );
        rctx.lineTo( width, iy + 5 );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 3 : 1;
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