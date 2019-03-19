/* 
Authors: Jonathan Ishii, Matthew Mikulka
Contact: jtishii@csu.fullerton.edu, mattmikulka@csu.fullerton.edu
Description: This program illustrates Wolfram's Rule-90 is based on a 1D array where each cell is active.
            We will illustate on a webpage visually how this works. This file holds all the functions to be called by the Cela Rule 90.html file
*/

var counter = 0;

// insertion sort variables to keep from pass to pass
var insertionArray;
// the current index of the element being added
var insertionIndex = 1;
// the index that the step will look at
var insertionComparisonIndex = 0;
// to determine if the pass is finished
var insertionPassDone = false;
// if the algorithm is completed
var insertionDone = false;
// the row number that insertion sort will write to
var insertionRowNum = 0;

// merge sort variables to keep from pass to pass
var mergeArray;
var mergeRow = 1;
var mergeDone = false;

// quick sort variables to keep from pass to pass
var quickArray;
var pivotValue;
var leftIndex = 0;
var rightIndex = 11;
var quickDone = false;

// flag to determine if the first algorithm is finished
var finished = false;

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
    // to see which algorithm finishes first
    if (insertionDone)
    {
        finished = true;
        document.getElementById('insertionAlgo').innerHTML = "WINNER! with " + counter + " operations completed!"

    }
    else if (mergeDone)
    {
        finished = true;
        document.getElementById('insertionAlgo').innerHTML = "WINNER! with " + counter + " operations completed!"
    }
    else if (quickDone)
    {
        finished = true;
        document.getElementById('insertionAlgo').innerHTML = "WINNER! with " + counter + " operations completed!"
    }

    if (!finished)
    {
        // colors the button red on the first click
        document.getElementById("stepButton").style.color = "red";

        var canvas = document.getElementById( "grid" );
        var insertion = canvas.getContext( "2d" );

        var canvas2 = document.getElementById( "grid2" );
        var merge = canvas2.getContext( "2d" );

        var canvas3 = document.getElementById( "grid3" );
        var quick = canvas3.getContext( "2d" );

        insertionStep(insertion);
        mergePass(merge);
        quickPass(quick);

        // updates the counter display in the navbar
        ++counter;
        document.getElementById('counter').innerHTML = counter;
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
        ctx.fillText(myArray[i], 5 + 30 + 60 * i, 70 + (120 *  row)); 
        ctx.restore( );
    }
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

function insertionStep(insertion)
{
    console.log(insertionArray[insertionIndex].charCodeAt(0));
    console.log(insertionArray[insertionComparisonIndex].charCodeAt(0));
    // checks to see if the new value is smaller than the sorted array portion
    if(insertionArray[insertionIndex].charCodeAt(0) < insertionArray[insertionComparisonIndex].charCodeAt(0))
    {
        console.log("SMALLER");
        // to make sure that we don't go out of bounds
        if(insertionComparisonIndex == 0)
        {
            insertionPassDone = true;
        }
        else
        {
            // decrements to check to see if the new value is bigger
            --insertionComparisonIndex;
        }
    }
    else
    {
        // we found its correct position and now we need to end the loop
        console.log("LARGER");
        insertionPassDone = true;   
        ++insertionComparisonIndex;
    
    }

    if (insertionPassDone)
    {
        // resets to false
        insertionPassDone = false;
        
        // shifts the elements down to their new correct position
        insertionShift(insertionComparisonIndex);

        // draws the new sorted array
        drawArray(insertion, insertionArray, insertionRowNum);

        // updates the row number to write to
        ++insertionRowNum;

        // new element positon
        ++insertionIndex;
        // new comparison index
        insertionComparisonIndex = insertionIndex - 1;
        
        // checks to see if we completed all the passes
        if(insertionIndex == 12)
        {
            insertionDone = true;
        }
    }
}

function insertionShift(newIndex)
{
    // temporary value for the array
    var insertValue = insertionArray[insertionIndex];

    console.log("NEW INDEX: " +  newIndex);
    // shifts all the elements down to the new position
    for(var i = insertionIndex; newIndex < i; --i)
    {
        console.log(i);
        insertionArray[i] = insertionArray[i - 1];
    }

    // inserts the new value to its new correct location
    insertionArray[newIndex] = insertValue;
}

function mergePass(merge)
{


    //drawArray(merge, mergeArray);
    
}

function quickPass(quick)
{


    //drawArray(quick, quickArray);
}