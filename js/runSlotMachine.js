// global variable
	var reelName = Array("reel1", "reel2", "reel3");
	var randomLoopNumber = new Array(); 
	    
	// this instatiates 3 reels for the slot machine
	var reel1 = new classReel(reelName[0]);
	var reel2 = new classReel(reelName[1]);
	var reel3 = new classReel(reelName[2]);
	
	// this calls the onloadSetReelTop method to randomly position
	// the pic before spinning
	window.onload = reel1.onloadSetReelTop(reelName[0]);
	window.onload = reel2.onloadSetReelTop(reelName[1]);
	window.onload = reel3.onloadSetReelTop(reelName[2]);
        
	// this gets a handler for the spin button and message display area	
    var handleSpin = document.getElementById("spinButton");
    var handleResultTextArea = document.getElementById("resultTextArea");
	
	// this register the event listener with event handler
	handleSpin.onclick = spinIt;
            
    function spinIt()
	{
        // disable the button
        handleSpin.disabled=true;
		
		// this creates a random number for each reel
		// that determines the time in spinning
		randomLoopNumber[0] = Math.floor((401)*Math.random()+5000);
		randomLoopNumber[1] = Math.floor((401)*Math.random()+5000);
		randomLoopNumber[2] = Math.floor((401)*Math.random()+5000);
        handleResultTextArea.style.textDecoration = "blink";
		handleResultTextArea.innerHTML = "Spinning ...";	
            
		// this sets the interval to call the method to set the reel pic position
		// to produce the spinning effect
        runReel1Id = setInterval("reel1.runReel()", 1);
        runReel2Id = setInterval("reel2.runReel()", 1);
        runReel3Id = setInterval("reel3.runReel()", 1);
	
		// this clears the interval after a reel has spinned for some time
        setTimeout("clearInterval(runReel1Id)",randomLoopNumber[0] );	
        setTimeout("clearInterval(runReel2Id)",randomLoopNumber[1] + 1500);	
        setTimeout("clearInterval(runReel3Id)",randomLoopNumber[2] + 3000);	
	
		// this adjusts the reel pic to make sure the pic of the reel is set at a meaningful boundary
		// right before coming to a full stop in spinning. As an example,
		// it makes sure complete picture of an item such as ground espresso at position 0,
		// or loose tea, at position -200, is displayed.
        setTimeout("reel1.adjustReel(reelName[0])", randomLoopNumber[0] + 1);
        setTimeout("reel2.adjustReel(reelName[1])", randomLoopNumber[1] + 1500);
        setTimeout("reel3.adjustReel(reelName[2])", randomLoopNumber[2] + 3000);
            
		// this calls the method to check the result of the spinning, reset state, and display
        // message whether the user wins. 
        checkResultId = setInterval("checkResult()", 400);
    }
        
	 // function that checks the result of the spinning, resets state, and displays
     // message whether the user wins. 
     function checkResult()
	 {
     	if ( (reel1.getDoneRolling() == 1) && (reel2.getDoneRolling() == 1) && (reel3.getDoneRolling() == 1) )
		{
			clearInterval(checkResultId);
			reel1.resetState();
			reel2.resetState();
			reel3.resetState();
			handleResultTextArea.style.textDecoration = "none";
				
		if ( (reel1.reelTop == reel2.reelTop) && (reel1.reelTop == reel3.reelTop))
		{
			switch(reel1.reelTop)
			{
				case 0:
					handleResultTextArea.innerHTML = "Congratulations! You win a cup of Espresso.";
					break;
				case -200:
					handleResultTextArea.innerHTML = "Congratulations! You win a cup of tea.";
					break;
				case -400:
					handleResultTextArea.innerHTML = "Congratulations! You win a cup of coffee.";
					break;
				default:
					handleResultTextArea.innerHTML = "You win a cup of drink!!!";
			}
					
		}
		else
		{
			handleResultTextArea.innerHTML = "No match, try again!";				
		}
				
        handleSpin.disabled=false;	
		}
	}