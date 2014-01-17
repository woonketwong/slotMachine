
	   
	  // this is a class define for the slot machine reel
	  // 3 slot machine reels are instantiated using this class
	  function classReel(id) {
		this.reelTop = 0;
		this.id = id;
		this.doneRolling = 0;
                
		// this method randomly display one of the three pictures in a reel
		// when the window is loaded (window.onload)
		this.onloadSetReelTop = function()
		{
			var index = Math.floor((3)*Math.random());
			if (index == 0)
				this.reelTop = 0;
			else if (index ==1)
				this.reelTop = -200;
			else 
				this.reelTop = -400;
				
			this.setReelTop();
		}
		
		// this method changes the the reel pic position
		this.setReelTop = function()
		{
			var elemId = document.getElementById(this.id);
			elemId.style.top = this.reelTop + 'px';
		}
		
		// this method makes sure the pic of the reel is set at a meaningful boundary
		// right before coming to a full stop in spinning. As an example,
		// it makes sure complete picture of an item such as ground espresso at position 0,
		// or loose tea, at position -200, is displayed.
		this.adjustReel = function (thisObject)
		{
			this.checkIfReelIsAdjustedId = setInterval(thisObject + ".checkIfReelIsAdjusted()", 50);
		}
		
		// this method sets the reel position and call setReelTop method
	    this.runReel = function()
	    {
			if ( this.reelTop == 100 ) //150
			{
				this.reelTop = -500;   //-510
				this.setReelTop();
			}
			else
			{
				this.reelTop += 5;
				this.setReelTop();
			}
	    }
				
		
		// this method is called by adjustReel method to check is reel is adjusted
		this.checkIfReelIsAdjusted = function()
		{
			if ((this.reelTop == -400) || (this.reelTop == -200) || (this.reelTop == 0))
			{
				clearInterval(this.checkIfReelIsAdjustedId);
                                this.doneRolling = 1;
			}
			else
			{
		        if ( this.reelTop == 100 )
		        {
					this.reelTop = -500;
				}
				this.reelTop += 5;
				this.setReelTop(this.id, this.reelTop);
			}
		
		}
        
		// this method returns a status to indicate the reel has done spinning
        this.getDoneRolling = function()
        {
            return this.doneRolling;
        }
        
		// this method resets the status that indicates the reel has done spinning
        this.resetState = function()
        {
            this.doneRolling = 0;
        }
		
	  }