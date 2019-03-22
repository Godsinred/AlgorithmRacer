/* 
Authors: Jonathan Ishii, Matthew Mikulka
Contact: jtishii@csu.fullerton.edu, mattmikulka@csu.fullerton.edu
Description: This program illustrates Wolfram's Rule-90 is based on a 1D array where each cell is active.
            We will illustate on a webpage visually how this works. This file holds all the functions to be called by the Cela Rule 90.html file
*/

// how many operations have occured
var counter = 0;

// make fales for no audio
var AUDIO = false;

// plays cool mario kart start music. i do not own this track or claim any rights to it
var marioKartStartAudio = new Audio('/Users/godsinred/Desktop/AlgorithmRacer/sounds/MarioKartStart.mp3');
// lowers the volume of the start count down to be about the same as the star power
marioKartStartAudio.volume = 0.25;
var starPowerAudio = new Audio('/Users/godsinred/Desktop/AlgorithmRacer/sounds/StarPower.mp3');
var finishedAudio = new Audio('/Users/godsinred/Desktop/AlgorithmRacer/sounds/Finished.mp3');
var mk64Winner = new Audio('/Users/godsinred/Desktop/AlgorithmRacer/sounds/mk64_firstplace.wav');

// insertion sort variables to keep from pass to pass
var insertionArray = {};
// the current index of the element being added
var insertionIndex = 1;
// the index that the step will look at
var insertionComparisonIndex = 0;
// the row number that insertion sort will write to
var insertionRowNum = 0;
// to determine if the pass is finished
var insertionPassDone = false;
// if the algorithm is completed
var insertionDone = false;

// merge sort variables to keep from pass to pass
var mergeArray = {};
// what row we are merging
var mergeRow = 0;
// the size of each merge
var mergeSize = 1;
// the array of colors for the boxes
var mergeColors = ["#000000", "#FAEBD7", "#E0FFFF", "#90EE90", "#DDA0DD", "#F0E68C", "#AFEEEE", "#f28143", "#C0C0C0", "#DAA520", "#FF00FF", "#eaff66", "#ff8c8c"];
// what group we are sorting together
var mergeGroup = 1;
// where to start the slicing
var mergeStart = 0;
// where to end the parsing 2^mergeRow
var mergeEnd = 2;
// how many steps done in that part of the split array
var mergeCounter = 0;
// the index of the first array
var mergeIndex = 0;
// index of the second array
var mergeIndex2= 0;
// arrays for merge sort
var a1 = {};
var a2 = {};
// to determine if the pass is done so we can update the display
var mergePassDone = false;
// to see if one of the merging parts are done
var mergePartDone = false;
// if the algorithm is completed
var mergeDone = false;

// quick sort variables to keep from pass to pass
var quickArray = {};
var pivotIndex= 0;
var pivotValue = 0;
// start and end is the original indexes
var startIndex = 0;
var endIndex = 11;
// left and right are used to scan through the array
var leftIndex = 1;
var rightIndex = 11;
var startEndIndexes = [];
var leftFound = false;
var rightFound = false;
var quickRowNum = 0;
var quickPassCounter = 1;
var quickElemColor = [];
var quickPassDone = false;
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

function removeStandardAlgos()
{
    var test = document.getElementById("standardAlgos");
    test.remove();

    // unhide all the cool algorithms
    // document.getElementById("test").style.visibility = "visible";
}

function nextStep() 
{
    if (counter == 0)
    {
        if (AUDIO)
        {
            marioKartStartAudio.pause();
            marioKartStartAudio.currentTime = 0;
            starPowerAudio.play();
        }

        document.getElementById("stepButton").innerHTML = "Step";
        document.getElementById("stepButton").style.color = "white";
    }
    
    // to see which algorithm finishes first
    // also displays over the algorithm name who is the winner and the amount of operations needed to complete it
    if (insertionDone)
    {
        finished = true;
        document.getElementById('insertionAlgo').innerHTML = "Inserton sort is the winner with " + counter + " operations completed!"

    }
    else if (mergeDone)
    {
        finished = true;
        document.getElementById('insertionAlgo').innerHTML = "Merge sort is the winner with " + counter + " operations completed!"
    }
    else if (quickDone)
    {
        finished = true;
        document.getElementById('insertionAlgo').innerHTML = "Quick sort is the winner with " + counter + " operations completed!"
    }

    if (!finished)
    {
        var canvas = document.getElementById( "grid" );
        var insertion = canvas.getContext( "2d" );

        var canvas2 = document.getElementById( "grid2" );
        var merge = canvas2.getContext( "2d" );

        var canvas3 = document.getElementById( "grid3" );
        var quick = canvas3.getContext( "2d" );

        insertionStep(insertion);
        mergeStep(merge);
        quickStep(quick);

        // updates the counter display in the navbar
        ++counter;
        document.getElementById('counter').innerHTML = counter;
    }

    if (finished)
    {
        document.getElementById("stepButton").innerHTML = "Finished!";

        if (AUDIO)
        {
            starPowerAudio.pause();
            starPowerAudio.currentTime = 0;
            finishedAudio.play();
            setTimeout(function()
            {
                mk64Winner.play();
            } , 1000);
        }
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

function highlightInsertedElem(ctx, item, index, row)
{
    ctx.save( );
    ctx.fillStyle = "#f2b90e";
    ctx.textAlign = "center";
    ctx.font = "30px Arial";
    ctx.fillText(item, 5 + 30 + 60 * index, 70 + (120 *  row)); 
    ctx.restore( );
}

function fillBox(ctx, index, colorIndex)
{
    ctx.beginPath();
    stroke =  'black';
    fill = mergeColors[colorIndex];
    ctx.save( );
    ctx.strokeStyle = stroke;
    
    ctx.rect(5 + 60 * index, 5 + 120 * mergeRow, 60, 120);
    ctx.fillStyle = fill;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}

function drawInsertionLine(ctx, index)
{
    ctx.save( );
    ctx.beginPath();
    ctx.moveTo(5 + 60 * index, 5 + 120 * insertionRowNum);
    ctx.lineTo(5 + 60 * index, 125 + 120 * insertionRowNum);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore( );
}

// when the window is scroll it will call myFunction
window.onscroll = function() {myFunction()};

// get the navbar element
var navbar = document.getElementById("navbar");

// get the offset of the top
var sticky;

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
    //console.log(insertionArray[insertionIndex].charCodeAt(0));
    //console.log(insertionArray[insertionComparisonIndex].charCodeAt(0));
    // checks to see if the new value is smaller than the sorted array portion
    if(insertionArray[insertionIndex].charCodeAt(0) < insertionArray[insertionComparisonIndex].charCodeAt(0))
    {
        //console.log("SMALLER");
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
        //console.log("LARGER");
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
        highlightInsertedElem(insertion, insertionArray[insertionComparisonIndex], insertionComparisonIndex, insertionRowNum);
        drawInsertionLine(insertion, insertionIndex + 1);
        
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

    //console.log("NEW INDEX: " +  newIndex);
    // shifts all the elements down to the new position
    for(var i = insertionIndex; newIndex < i; --i)
    {
        insertionArray[i] = insertionArray[i - 1];
    }

    // inserts the new value to its new correct location
    insertionArray[newIndex] = insertValue;
}

function mergeStep(merge)
{
    // see which element is smaller to be inserted into the array
    // both arrays have not been sorted yet
    if (mergeIndex < a1.length && mergeIndex2 < a2.length)
    {
        if (a1[mergeIndex] < a2[mergeIndex2])
        {
            //console.log(a1[mergeIndex]);
            mergeArray[mergeStart] = a1[mergeIndex];
            ++mergeIndex;
            ++mergeStart;
        }
        else
        {
            //console.log(a2[mergeIndex2]);
            mergeArray[mergeStart] = a2[mergeIndex2];
            ++mergeIndex2;
            ++mergeStart;
        }
    }
    // the first array has already been sorted
    else if (mergeIndex == a1.length && mergeIndex2 < a2.length)
    {
        // adds the rest of the a2 to the mergeArray
        for (mergeStart; mergeStart < mergeEnd; ++mergeStart)
        {
            //console.log(a2[mergeIndex2]);
            mergeArray[mergeStart] = a2[mergeIndex2];
            ++mergeIndex2;
        }
        //console.log("Finished loading 2");
        mergePartDone = true;
    }
    // the second already has already been sorted
    else if (mergeIndex2 == a2.length && mergeIndex < a1.length)
    {
        // adds the rest of the a1 to the mergeArray
        for (mergeStart; mergeStart < mergeEnd; ++mergeStart)
        {
            //console.log(a1[mergeIndex]);
            mergeArray[mergeStart] = a1[mergeIndex];
            ++mergeIndex;
        }
        //console.log("Finished loading 1");
        mergePartDone = true;
    }
    // both arrays have already been sorted and this part of the merge pass is completed
    else
    {
        //console.log("Finished");
        mergePartDone = true;
    }

    // resets all counters and sees if the pass is completed
    if (mergePartDone)
    {
        //console.log("mergePartDone, resetting values.");
        mergeIndex = 0;
        mergeIndex2 = 0;
        mergePartDone = false;

        mergeStart = mergeEnd;
        mergeEnd += mergeSize * 2;
        if (mergeEnd > 12)
        {
            //console.log("mergePassDone, resetting pass. mergeEnd >12");
            mergePassDone = true;
        }
        else 
        {
            a1 = mergeArray.slice(mergeStart, mergeStart + mergeSize);
            //console.log(a1);
            a2 = mergeArray.slice(mergeStart + mergeSize, mergeEnd);
            //console.log(a2);
        }
        
        ++mergeGroup;

        if (mergeGroup > (12 / Math.pow(2, mergeRow)) || mergePassDone)
        {
            //console.log("mergePassDone, resetting pass.");
            mergePassDone = false;
            mergePartDone = false;
            mergeGroup = 0;
            
            var colorIndex = 0;
            for (var i = 0; i < 12; ++i)
            {
                if ((i % (mergeSize * 2)) == 0)
                {
                    ++colorIndex;
                }
                fillBox(merge, i, colorIndex);
                
            }
            drawArray(merge, mergeArray, mergeRow);
            ++mergeRow;
            // compares merge row to the ceiling of log base 2 of 12 = 4
            if (mergeRow > Math.ceil(Math.log(12)/Math.log(2)))
            {
                //console.log("MERGE SORT COMPLETELY DONE");
                mergeDone = true;
            }
            mergeStart = 0;
            mergeEnd = Math.pow(2, mergeRow)
            mergeSize *= 2;

            //console.log("new pass arrays");
            a1 = mergeArray.slice(mergeStart, mergeStart + mergeSize);
            //console.log(a1);
            a2 = mergeArray.slice(mergeStart + mergeSize, mergeEnd);
            //console.log(a2);
        }
    }
}

function quickStep(quick)
{
    if (!quickPassDone)
    {
        if (!leftFound)
        {
            
            if (leftIndex > rightIndex)
            {
                    quickPassDone = true;               
            }
            else
            {
                // scans from left to right to try and find a value bigger than the pivot
                if (quickArray[leftIndex] <= pivotValue)
                {
                    ++leftIndex;
                }
                else
                {
                    leftFound = true;
                }
            }
        }
        else if (!rightFound)
        {
            
            if (rightIndex < leftIndex)
            {
                quickPassDone = true;
            }
            else
            {
                if (quickArray[rightIndex] > pivotValue)
                {
                    --rightIndex;
                }
                else
                {
                    rightFound = true;
                }   
            }
        }

        // swaps the elements
        if (leftFound && rightFound)
        {
            var temp = quickArray[rightIndex];
            quickArray[rightIndex] = quickArray[leftIndex];
            quickArray[leftIndex] = temp;
            
            // draws everytime a swap is made
            // drawArray(quick, quickArray,quickRowNum)
            // ++quickRowNum;

            leftFound = false;
            rightFound = false;

        }

        // the pass is completed and we switch the pivot with the right index
        if (quickPassDone)
        {
            // means elements were found to be swapped
            if (quickPassDone && leftFound)
            {
                console.log("quickPassDone && leftFound");
                // swaps the pivot value with one less than the found value
                var temp = quickArray[leftIndex - 1];
                quickArray[leftIndex - 1] = pivotValue;
                quickArray[pivotIndex] = temp;
                pivotIndex = leftIndex - 1;
            }
            // went out of bounds and all the elements are smaller than the pivot
            else if (quickPassDone && leftIndex > endIndex)
            {
                console.log("quickPassDone and left went out of bounds");
                // swaps the pivot value with the last value since it is all bigger
                var temp = quickArray[leftIndex - 1];
                quickArray[leftIndex - 1] = pivotValue;
                quickArray[pivotIndex] = temp;
                pivotIndex = leftIndex - 1;
            }
            else if (quickPassDone)
            {
                console.log("quickPassDone");
                // swaps the pivot value with the last value since it is all bigger
                var temp = quickArray[leftIndex];
                quickArray[leftIndex] = pivotValue;
                quickArray[pivotIndex] = temp;
                pivotIndex = leftIndex;
            }

            // pushes the pivot index to the array of items to be color (these are all sorted)
            quickElemColor.push(pivotIndex);
            
            console.log("pivotIndex: " + pivotIndex);
            console.log("leftIndex: " + leftIndex);
            console.log("rightIndex: " + rightIndex);// should print everytime a full pass is completed
               
            // gets the new range of left and right indexes for parting the array
            if (pivotIndex - 1 > startIndex)
            {
                console.log("pivotIndex - 1 > leftIndex " + [startIndex, (pivotIndex - 1)]);
                startEndIndexes.push([startIndex, (pivotIndex - 1)]);
            }
            else
            {
                // this item must be sorted
                (pivotIndex - 1 >= 0) ? quickElemColor.push(pivotIndex - 1) : false;
            }

            if (pivotIndex + 1 < endIndex)
            {
                console.log("pivotIndex + 1 < rightIndex " + [(pivotIndex + 1), endIndex]);
                startEndIndexes.push([(pivotIndex + 1), endIndex]);
            }   
            else
            {
                // this item must be sorted
                (pivotIndex + 1 < 12) ? quickElemColor.push(pivotIndex + 1) : false;
            }  

            // should print everytime a full pass is completed
            --quickPassCounter;
            if (quickPassCounter == 0) 
            {
                quickPassCounter = startEndIndexes.length;
                drawArray(quick, quickArray, quickRowNum);

                // colors all the sorted elements
                for (var i = 0; i < quickElemColor.length; ++i)
                {
                    highlightInsertedElem(quick, quickArray[quickElemColor[i]], quickElemColor[i], quickRowNum);
                }
                console.log(quickElemColor);
                ++quickRowNum;
            }   

            if (startEndIndexes.length == 0)
            {
                quickDone = true;
            }
            else
            {
                var indexes = startEndIndexes[0];
                startEndIndexes.splice(0,1);
                console.log(indexes);
                startIndex = indexes[0];
                leftIndex = startIndex;
                rightIndex = indexes[1];
                endIndex = rightIndex;
                pivotValue = quickArray[startIndex];
                pivotIndex = startIndex;
                ++leftIndex;
                
            }
            console.log("startIndexNew: " + startIndex);
            console.log("leftIndexNew: " + leftIndex);
            console.log("pivotValueNew: " + pivotValue);

            leftFound = false;
            rightFound = false;
            quickPassDone = false;

            // prints everytime a part of the array is quick sorted
            // drawArray(quick, quickArray, quickRowNum);
            // ++quickRowNum;
        }
    }
}


