
/* Global variables */

let debug=false;
let player1ScoreText = "";
let player2ScoreText = "";
let player1ScoreValue = 0.0;
let player2ScoreValue = 0.0;
let level = 1;

let opponent = "player"; /* default upon load */
let winner = "";
let computerSelected="";


let startTime = new Date();
let endTime = new Date();
let timeElapsed = endTime - startTime;


/* -------------------------------------------------------------------------------*/

 function onLoadFunction(){

       
	winner="";
	
	let startTime = new Date();
		
	opponent = "player"; 

	document.getElementById("player1ScoreText").innerHTML = "0";
	document.getElementById("player2ScoreText").innerHTML = "0";
	document.getElementById("player1name").innerHTML = "Player 1";
	document.getElementById("player2name").innerHTML = "Player 2";
	
	document.getElementById("userMessageText1").innerHTML = "";
	document.getElementById("userMessageText2").innerHTML = "";
	
	level = 1;
	document.getElementById("levelText").innerHTML = "Level " + level;	  
	  
}
/* -------------------------------------------------------------------------------*/

function PlayAgainstComputer(){
		
	/* If player has changed, zerioise score */
		
	SendUserMessage("Playing against the computer");
	if (opponent=="player"){
		
	document.getElementById("player1ScoreText").innerHTML = 0;
	document.getElementById("player2ScoreText").innerHTML = 0;
	document.getElementById("player2ScoreText").innerHTML = 0;
		 
	}
	
	opponent = "computer";
	document.getElementById("player2name").innerHTML = "Computer";
	
	clearGrid();
		
}

/* -------------------------------------------------------------------------------*/

function PlayAgainstPerson(){
	
	/* If player has changed, zerioise score */
		
	SendUserMessage("Playing against another player");
	if (opponent=="computer") {
				
		document.getElementById("player1ScoreText").innerHTML = 0;
		document.getElementById("player2ScoreText").innerHTML = 0;
	}
	
	opponent = "player";
	document.getElementById("player2name").innerHTML = "Player 2";
	
	clearGrid();
}

/* -------------------------------------------------------------------------------*/
function levelUp(){
	
	/* if level is not already 6, add to it */
	if (level <6) level = level + 1;
	document.getElementById("levelText").innerHTML = "Level " + level;	 
	
}

/* -------------------------------------------------------------------------------*/

function levelDown(){
	/* if level is not already 1, subtract from it */
	if (level > 1 ) level = level - 1;
	document.getElementById("levelText").innerHTML = "Level " + level;	 

	
}

/* -------------------------------------------------------------------------------*/
 function SaveGame(){
		
	/* opponent = "player"; */
	
	svplayer1ScoreText = "0";
    svplayer2ScoreText = "0";
    svplayer1name = "";
	svplayer2name = "";
	svsavedOpponent = "";
	svsavedLevel = 0;
	endTime = new Date();
	svsavedTime = endTime - startTime;
	
		
	let mbExtremeNoughts = {svplayer1ScoreText,
					   svplayer2ScoreText,
					   svplayer1name,
					   svplayer2name,
					   svsavedOpponent,
					   svsavedLevel,
					   svsavedTime
					   };


    mbExtremeNoughts.svplayer1ScoreText = document.getElementById("player1ScoreText").innerHTML;
	mbExtremeNoughts.svplayer2ScoreText = document.getElementById("player2ScoreText").innerHTML;
			
	mbExtremeNoughts.svplayer1name = document.getElementById("player1name").innerHTML;
	mbExtremeNoughts.svplayer2name = document.getElementById("player2name").innerHTML;
	
	mbExtremeNoughts.svsavedOpponent = opponent;	  
	mbExtremeNoughts.svsavedLevel = level;	
	mbExtremeNoughts.svsavedTime = endTime - startTime;
	  
	
	localStorage.setItem("mbExtremeNoughts", JSON.stringify(mbExtremeNoughts));
	
	SendUserMessage("Score has been saved");
	
	
	
}

/*--------------------------------------------------------------------------------*/
function SendUserMessage(userMessageText)
{    /* Put messages on both sides of the screen */
	document.getElementById("userMessageText1").innerHTML = userMessageText;
	document.getElementById("userMessageText2").innerHTML = userMessageText;

    /* After pause, blank the message out */
    clearMessageTexts();
}

/* -------------------------------------------------------------------------------*/

function clearMessageTexts(textMsg)
		{
			/* Blank the User Message Boxes, after 2 seconds  */
		setTimeout(function(){ 

		document.getElementById("userMessageText1").innerHTML = "";
		document.getElementById("userMessageText2").innerHTML = "";

		}, 2500);

	
}

/* -------------------------------------------------------------------------------*/
 
 function loadGame(){

    svplayer1ScoreText = "0";
	svplayer2ScoreText = "0";
	svplayer1name="";
	svplayer2name="";
	svsavedOpponent = "";
	svsavedLevel = 0;
	svsavedTime = 0;
	
		
	let mbExtremeNoughtsLd = {svplayer1ScoreText,
					   svplayer2ScoreText,
					   svplayer1name,
					   svplayer2name,
					   svsavedOpponent,
					   svsavedLevel,
					   svsavedTime
					   };
				   
	 mbExtremeNoughtsLd = JSON.parse(localStorage.getItem("mbExtremeNoughts"));

		
    document.getElementById("player1ScoreText").innerHTML = mbExtremeNoughtsLd.svplayer1ScoreText;
	document.getElementById("player2ScoreText").innerHTML = mbExtremeNoughtsLd.svplayer2ScoreText;
	document.getElementById("player1name").innerHTML = mbExtremeNoughtsLd.svplayer1name;
	document.getElementById("player2name").innerHTML = mbExtremeNoughtsLd.svplayer2name;
	
	opponent = mbExtremeNoughtsLd.svsavedOpponent;
	level  = mbExtremeNoughtsLd.svsavedLevel;
	document.getElementById("levelText").innerHTML = ("Level" + (mbExtremeNoughtsLd.svsavedLevel));
	
	/* Set start time back to allow for retrieved game time */
	startTime = new Date() - mbExtremeNoughtsLd.svsavedTime;
	
	/* Set the opponent to reflect the one from the saved game  */
	if (opponent == "computer")  PlayAgainstComputer();
	if (opponent == "player")    PlayAgainstPerson();
	
	
	SendUserMessage("Score has been loaded");
	
	
	clearGrid();
	
 }
 
 
function processclick(event) {
	
	

	/* Retriever the players turn */
	var player_now = document.getElementById("player_turn").src;
		 
	 /* set go to not taken */
	 let go_taken = false;
	 
	 
	 /* Skip most of the processing if the cell is not already empty */
	 var image_now = document.getElementById(event.currentTarget.id).src;
	 
	 	
		/* Amend the image for a cell, if not already set */
		
			if (image_now.includes("empty-cell.png")){
				if (player_now.includes("O-clear.png")){
					document.getElementById(event.currentTarget.id).src = "O-clear.png";
				} else {
					document.getElementById(event.currentTarget.id).src = "X-clear.png";
				}
			
				/* mark as a valid go was taken to allow player switch */
				go_taken = true;
				
				/* Check for minor win */
				 checkMinorWin(player_now, event.currentTarget.id);	
		
				/* Check for major win */
				 checkMajorWin(player_now);	

	
			/* else do nothing and leave turn indicator, as -is */
			}
		
   
		/* If a valid go was taken and no-one has won yet*/
	 	 
		if ((go_taken == true) && (winner=="")) { 
		
			/*  Toggle the Player's Turn image */
			if (player_now.includes("O-clear.png")){
				document.getElementById("player_turn").src = "X-clear.png";
				}
				else
				{document.getElementById("player_turn").src = "O-clear.png";}
				
			/* If opponent is computer, take a go  */
			/* and then check for wins again       */
			
			if (opponent=="computer")
				{
					/* "retrieve" computer name as current player */
					player_now = document.getElementById("player_turn").src;
					
					/* Take computer's go */
					takeComputerMove(player_now)
										
					
				}
				

		
			} /* end of if go_taken */
			
			
	 /*  }  end of if not empty cell. */
}

/*--------------------------------------------------------------------------------------------------------------------------*/


function takeComputerMove(player_now){
	
	/* Levels            */
	
	
	computerSelected="";
	
    /* Peform the required actions corresponding to the level selected */	
	if ((computerSelected=="") & (level >=2)) {computerSelected = level2Move(computerSelected)}; /* Win if possible */
	if ((computerSelected=="") & (level >=3)) {computerSelected = level3Move(computerSelected)}; /* Block if possible */
	if ((computerSelected=="") & (level >=4)) {computerSelected = level4Move(computerSelected)}; /* Take center */
	if ((computerSelected=="") & (level >=5)) {computerSelected = level5Move(computerSelected)}; /* Play opposite corner */
	if ((computerSelected=="") & (level >=6)) {computerSelected = level6Move(computerSelected)}; /* Play any corner */
	if ((computerSelected=="") & (level >=7)) {computerSelected = level7Move(computerSelected)}; /* Create fork */
	if ((computerSelected=="") & (level >=8)) {computerSelected = level8Move(computerSelected)}; /* Block opponents fork */
	
	/* default move */
	if (computerSelected=="")  {computerSelected = level1Move(computerSelected)}; /* Random */
	
	
		/* Check for minor win */
		checkMinorWin(player_now, computerSelected);	
		
		/* Check for major win */
		checkMajorWin(player_now);	
					
		/* Put the player back to human */
		document.getElementById("player_turn").src = "O-clear.png";
	
	
}

/* -------------------------------------------------------------------------------------------------------------------------*/

/* Go somewhere random */
function level1Move(level1selection){
		

	/* Look for random cell, repeating until a blank one was found */
	let randomCellFound = false;
	
	do {
		/* Pick random Majors and Minors  */
		randMajRow = Math.floor(Math.random() * 3) + 1 ;
		randMajCol = Math.floor(Math.random() * 3) + 1 ;
		randMinRow = Math.floor(Math.random() * 3) + 1 ;
		randMinCol = Math.floor(Math.random() * 3) + 1 ;
	
		chkRandSpace = "image" + randMajRow + "-" + randMajCol + "-" + randMinRow + "-" + randMinCol;
		RandSpaceImage = document.getElementById(chkRandSpace).src;
		
		
		if (RandSpaceImage.includes("empty-cell.png")){
			
			
			/* document.getElementById(chkRandSpace).src = "X-clear.png"; */
			randomCellFound = true;
			level1selection = chkRandSpace;
			changeToX(level1selection);
		}
	
	} while (randomCellFound == false);
	
	return level1selection;
	
	}
			
/* --------------------------------------------------------------------------------------------------------  */			
			
/* Level 2 - Win if possible  */
function level2Move(level2selection){
		
			/* Read every row, column and diagonal for number of X's eq 2 */
			/* if found, complete that win  */
			
			/* For each Major */
			level2selection="";  /* no chosen go was selected yet */
			
			Lev2MajRow = 1;
			while ((Lev2MajRow <= 3) && (level2selection == ""))
			{
				Lev2MajCol = 1;	
				while ((Lev2MajCol <= 3) && (level2selection == ""))
				{
					
					/* Check row */
					Lev2MinRow = 1;
					while ((Lev2MinRow <= 3) && (level2selection == ""))
					{	
						chkCol1 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-" + Lev2MinRow + "-1";
						chkCol2 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-" + Lev2MinRow + "-2";
						chkCol3 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-" + Lev2MinRow + "-3";
						
				        imgCol1 = document.getElementById(chkCol1).src;
						imgCol2 = document.getElementById(chkCol2).src;
						imgCol3 = document.getElementById(chkCol3).src;
						
						if (imgCol1.includes("empty-cell.png") && imgCol2.includes("X-clear") && imgCol3.includes("X-clear"))
								level2selection = chkCol1;   /* select col 1 */
							
						if (imgCol2.includes("empty-cell.png") && imgCol1.includes("X-clear") && imgCol3.includes("X-clear"))
								level2selection = chkCol2;	/* select col 2 */
							
						if (imgCol3.includes("empty-cell.png") && imgCol1.includes("X-clear") && imgCol2.includes("X-clear"))
								level2selection = chkCol3;	/* select col 3 */
						
						/* If a selection has been made, stop further checks */
						if (level2selection != "") break;
						Lev2MinRow++;
					}
					
					/* check columns */
					if (level2selection == "") {
						Lev2MinCol = 1;
						while ((Lev2MinCol <= 3) && (level2selection == ""))
						{	
							chkRow1 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-1-" + Lev2MinCol;
							chkRow2 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-2-" + Lev2MinCol;
							chkRow3 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-3-" + Lev2MinCol;
							
							imgRow1 = document.getElementById(chkRow1).src;
							imgRow2 = document.getElementById(chkRow2).src;
							imgRow3 = document.getElementById(chkRow3).src;
							
							if (imgRow1.includes("empty-cell.png") && imgRow2.includes("X-clear") && imgRow3.includes("X-clear"))
									level2selection = chkRow1;   	/* select Row 1 */
								
							if (imgRow2.includes("empty-cell.png") && imgRow1.includes("X-clear") && imgRow3.includes("X-clear"))
									level2selection = chkRow2;	/* select Row 2 */
								
							if (imgRow3.includes("empty-cell.png") && imgRow1.includes("X-clear") && imgRow2.includes("X-clear"))
									level2selection = chkRow3;	/* select Row 3 */
							
							/* If a selection has been made, stop further checks */
							if (level2selection != "") break;
							Lev2MinCol++;
						}
					}
					
					
					/* check leading diagonal  /  */
					if (level2selection == "") {
						
							chkDiag1 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-3-1";
							chkDiag2 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-2-2";
							chkDiag3 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-1-3";
							
							imgDiag1 = document.getElementById(chkDiag1).src;
							imgDiag2 = document.getElementById(chkDiag2).src;
							imgDiag3 = document.getElementById(chkDiag3).src;
							
							if (imgDiag1.includes("empty-cell.png") && imgDiag2.includes("X-clear") && imgDiag3.includes("X-clear"))
									level2selection = chkDiag1;   	
								
							if (imgDiag2.includes("empty-cell.png") && imgDiag1.includes("X-clear") && imgDiag3.includes("X-clear"))
									level2selection = chkDiag2;	
								
							if (imgDiag3.includes("empty-cell.png") && imgDiag1.includes("X-clear") && imgDiag2.includes("X-clear"))
									level2selection = chkDiag3;	
							
					
						
						}
						
						
						
					/* check trailing diagonal  /  */
					if (level2selection == "") {
						
							chkDiag1 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-1-1";
							chkDiag2 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-2-2";
							chkDiag3 = "image" + Lev2MajRow + "-" + Lev2MajCol + "-3-3";
							
							imgDiag1 = document.getElementById(chkDiag1).src;
							imgDiag2 = document.getElementById(chkDiag2).src;
							imgDiag3 = document.getElementById(chkDiag3).src;
							
							if (imgDiag1.includes("empty-cell.png") && imgDiag2.includes("X-clear") && imgDiag3.includes("X-clear"))
									level2selection = chkDiag1;   	
								
							if (imgDiag2.includes("empty-cell.png") && imgDiag1.includes("X-clear") && imgDiag3.includes("X-clear"))
									level2selection = chkDiag2;	
								
							if (imgDiag3.includes("empty-cell.png") && imgDiag1.includes("X-clear") && imgDiag2.includes("X-clear"))
									level2selection = chkDiag3;	
						
						}
						
						
					
					
					
					/* If a selection has been made, stop further checks */
					if (level2selection != "") break;
					Lev2MajCol++;
				}
				
				/* If a selection has been made, stop further checks */
				if (level2selection != "") break;
				Lev2MajRow++;
			}
		
		/* After all rows / columns / diagonal checks have been done. */
		
	    /* if selection was made, place an X there */
	
		
		if (level2selection!="") 
			changeToX(level2selection);
			/* document.getElementById(level2selection).src = "X-clear.png"; */
			
		return level2selection;	
		

    
			
			
			}			
			
/* --------------------------------------------------------------------------------------------------------  */						


/* Level 3 - Block move   */
function level3Move(level3selection){
		
			/* Read every row, column and diagonal for number of O's eq 2 */
			/* if found, block that that win  */
			
			/* For each Major */
			level3selection="";  /* no chosen go was selected yet */
			
			Lev3MajRow = 1;
			while ((Lev3MajRow <= 3) && (level3selection == ""))
			{
				Lev3MajCol = 1;	
				while ((Lev3MajCol <= 3) && (level3selection == ""))
				{
					
					/* Check row */
					Lev3MinRow = 1;
					while ((Lev3MinRow <= 3) && (level3selection == ""))
					{	
						chkCol1 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-" + Lev3MinRow + "-1";
						chkCol2 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-" + Lev3MinRow + "-2";
						chkCol3 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-" + Lev3MinRow + "-3";
						
				        imgCol1 = document.getElementById(chkCol1).src;
						imgCol2 = document.getElementById(chkCol2).src;
						imgCol3 = document.getElementById(chkCol3).src;
						
						
						
						if (imgCol1.includes("empty-cell.png") && imgCol2.includes("O-clear") && imgCol3.includes("O-clear"))
								level3selection = chkCol1;   /* select col 1 */
							
						if (imgCol2.includes("empty-cell.png") && imgCol1.includes("O-clear") && imgCol3.includes("O-clear"))
								level3selection = chkCol2;	/* select col 2 */
							
						if (imgCol3.includes("empty-cell.png") && imgCol1.includes("O-clear") && imgCol2.includes("O-clear"))
								level3selection = chkCol3;	/* select col 3 */
						
						/* If a selection has been made, stop further checks */
						if (level3selection != "") break;
						Lev3MinRow++;
					}
					
					/* check columns */
					if (level3selection == "") {
						Lev3MinCol = 1;
						while ((Lev3MinCol <= 3) && (level3selection == ""))
						{	
							chkRow1 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-1-" + Lev3MinCol;
							chkRow2 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-2-" + Lev3MinCol;
							chkRow3 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-3-" + Lev3MinCol;
							
							imgRow1 = document.getElementById(chkRow1).src;
							imgRow2 = document.getElementById(chkRow2).src;
							imgRow3 = document.getElementById(chkRow3).src;
							
							if (imgRow1.includes("empty-cell.png") && imgRow2.includes("O-clear") && imgRow3.includes("O-clear"))
									level3selection = chkRow1;   	/* select Row 1 */
								
							if (imgRow2.includes("empty-cell.png") && imgRow1.includes("O-clear") && imgRow3.includes("O-clear"))
									level3selection = chkRow2;	/* select Row 2 */
								
							if (imgRow3.includes("empty-cell.png") && imgRow1.includes("O-clear") && imgRow2.includes("O-clear"))
									level3selection = chkRow3;	/* select Row 3 */
							
							/* If a selection has been made, stop further checks */
							if (level3selection != "") break;
							Lev3MinCol++;
						}
					}
					
					
					/* check leading diagonal  /  */
					if (level3selection == "") {
						
							chkDiag1 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-3-1";
							chkDiag2 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-2-2";
							chkDiag3 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-1-3";
							
							imgDiag1 = document.getElementById(chkDiag1).src;
							imgDiag2 = document.getElementById(chkDiag2).src;
							imgDiag3 = document.getElementById(chkDiag3).src;
							
							if (imgDiag1.includes("empty-cell.png") && imgDiag2.includes("O-clear") && imgDiag3.includes("O-clear"))
									level3selection = chkDiag1;   	
								
							if (imgDiag2.includes("empty-cell.png") && imgDiag1.includes("O-clear") && imgDiag3.includes("O-clear"))
									level3selection = chkDiag2;	
								
							if (imgDiag3.includes("empty-cell.png") && imgDiag1.includes("O-clear") && imgDiag2.includes("O-clear"))
									level3selection = chkDiag3;	
							
					
						
						}
						
						
						
					/* check trailing diagonal  /  */
					if (level3selection == "") {
						
							chkDiag1 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-1-1";
							chkDiag2 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-2-2";
							chkDiag3 = "image" + Lev3MajRow + "-" + Lev3MajCol + "-3-3";
							
							imgDiag1 = document.getElementById(chkDiag1).src;
							imgDiag2 = document.getElementById(chkDiag2).src;
							imgDiag3 = document.getElementById(chkDiag3).src;
							
							if (imgDiag1.includes("empty-cell.png") && imgDiag2.includes("O-clear") && imgDiag3.includes("O-clear"))
									level3selection = chkDiag1;   	
								
							if (imgDiag2.includes("empty-cell.png") && imgDiag1.includes("O-clear") && imgDiag3.includes("O-clear"))
									level3selection = chkDiag2;	
								
							if (imgDiag3.includes("empty-cell.png") && imgDiag1.includes("O-clear") && imgDiag2.includes("O-clear"))
									level3selection = chkDiag3;	
						
						}
						
						
					
					
					
					/* If a selection has been made, stop further checks */
					if (level3selection != "") break;
					Lev3MajCol++;
				}
				
				/* If a selection has been made, stop further checks */
				if (level3selection != "") break;
				Lev3MajRow++;
			}
		
		/* After all rows / columns / diagonal checks have been done. */
		
	    /* if selection was made, place an X there */
	
		
		if (level3selection!="") 
			changeToX(level3selection);
			/* document.getElementById(level3selection).src = "X-clear.png"; */
			
		return level3selection;	
		

    
			
			
			}			

/* --------------------------------------------------------------------------------------------------------  */						

/* Level 4 - Take Center  */
function level4Move(levelselection){

	levelselection="";  

	
	/* Default to center center first */
	chkCent = "image2-2-2-2";
    imgCent = document.getElementById(chkCent).src;
	if (imgCent.includes("empty-cell.png"))
			levelselection = chkCent;   /* select this center */
	
	
	/* If still available, try the corner centers */
	if (levelselection == "") {
	chkCent = "image1-1-2-2";
    imgCent = document.getElementById(chkCent).src;
	if (imgCent.includes("empty-cell.png"))
			levelselection = chkCent;   /* select this center */
	}

	if (levelselection == "") {
	chkCent = "image3-3-2-2";
    imgCent = document.getElementById(chkCent).src;
	if (imgCent.includes("empty-cell.png"))
			levelselection = chkCent;   /* select this center */
	}
	
	if (levelselection == "") {
	chkCent = "image1-3-2-2";
    imgCent = document.getElementById(chkCent).src;
	if (imgCent.includes("empty-cell.png"))
			levelselection = chkCent;   /* select this center */
	}
	
	if (levelselection == "") {
	chkCent = "image3-1-2-2";
    imgCent = document.getElementById(chkCent).src;
	if (imgCent.includes("empty-cell.png"))
			levelselection = chkCent;   /* select this center */
	}
	
	/* If still not taken a center, try everywhere */
	if (levelselection == "") {	
	/* Read every major cell,  */
			/* if center is empty, take it and leave   */
			
			/* For each Major */

			
			LevMajRow = 1;
			while ((LevMajRow <= 3) && (levelselection == ""))
			{
				LevMajCol = 1;	
				while ((LevMajCol <= 3) && (levelselection == ""))
				{
					
					/* Check center */
					LevMinRow = 2;
					LevMinCol = 2;
						
					chkCent = "image" + LevMajRow + "-" + LevMajCol + "-2-2";
					
												
				    imgCent = document.getElementById(chkCent).src;
					
					if (imgCent.includes("empty-cell.png"))
								levelselection = chkCent;   /* select this center */
							
					/* If a selection has been made, stop further checks */
					if (levelselection != "") break;
					LevMajCol++;
				}
				
				/* If a selection has been made, stop further checks */
				if (levelselection != "") break;
				LevMajRow++;
			}
		
		
	}
		/* After centers have been checked. */
	    /* if selection was made, place an X there */
		if (levelselection!="") 
			changeToX(levelselection);
			/* document.getElementById(levelselection).src = "X-clear.png"; */
	
	return levelselection;
}


/* --------------------------------------------------------------------------------------------------------  */						


/* Level 5  Play opposite corner  */
function level5Move(levelselection){
	
	/* Read every major cell,  */
			/* if corner is opponent, try opposite corner, and leave   */
			
			/* For each Major */
			levelselection="";  
			
			LevMajRow = 1;
			while ((LevMajRow <= 3) && (levelselection == ""))
			{
				LevMajCol = 1;	
				while ((LevMajCol <= 3) && (levelselection == ""))
				{
					
					/* Check corners */

					/* Top Left */
					chkCorner = "image" + LevMajRow + "-" + LevMajCol + "-1-1";
				    imgCorner = document.getElementById(chkCorner).src;
					chkOppo = "image" + LevMajRow + "-" + LevMajCol + "-3-3";
				    imgOppo = document.getElementById(chkOppo).src;
						if ((imgCorner.includes("O-clear.png"))
						   && (imgOppo.includes("empty-cell.png")))
									levelselection = chkOppo;   /* select this corner */
						if (levelselection != "") break; /* Selection made, stop further checks */
					
					/* Top Right */
					chkCorner = "image" + LevMajRow + "-" + LevMajCol + "-1-3";
				    imgCorner = document.getElementById(chkCorner).src;
					chkOppo = "image" + LevMajRow + "-" + LevMajCol + "-3-1";
				    imgOppo = document.getElementById(chkOppo).src;
						if ((imgCorner.includes("O-clear.png"))
						   && (imgOppo.includes("empty-cell.png")))
									levelselection = chkOppo;   /* select this corner */
							
					if (levelselection != "") break; /* Selection made, stop further checks */
					
					/* Bottom Left */
					chkCorner = "image" + LevMajRow + "-" + LevMajCol + "-3-1";
				    imgCorner = document.getElementById(chkCorner).src;
					chkOppo = "image" + LevMajRow + "-" + LevMajCol + "-1-3";
				    imgOppo = document.getElementById(chkOppo).src;
						if ((imgCorner.includes("O-clear.png"))
						   && (imgOppo.includes("empty-cell.png")))
									levelselection = chkOppo;   /* select this corner */
					
					if (levelselection != "") break; /* Selection made, stop further checks */
					
					/* Bottom Right */
					chkCorner = "image" + LevMajRow + "-" + LevMajCol + "-3-3";
				    imgCorner = document.getElementById(chkCorner).src;
					chkOppo = "image" + LevMajRow + "-" + LevMajCol + "-1-1";
				    imgOppo = document.getElementById(chkOppo).src;
						if ((imgCorner.includes("O-clear.png"))
						   && (imgOppo.includes("empty-cell.png")))
									levelselection = chkOppo;   /* select this corner */
					
					if (levelselection != "") break; /* Selection made, stop further checks */
				
					LevMajCol++;
				}
				
				/* If a selection has been made, stop further checks */
				if (levelselection != "") break;
				LevMajRow++;
			}
		
		/* After corners have been checked. */
	    /* if selection was made, place an X there */
		
		if (levelselection!="") {
			changeToX(levelselection);
			
		}
	
	return levelselection;
}


/* --------------------------------------------------------------------------------------------------------  */						


/* Level 6  Play any corner  */
function level6Move(levelselection){
	
	/* Read every major cell,  */
			/* if corner is empty, take it and leave   */
			
			/* For each Major */
			levelselection="";  
			
			LevMajRow = 1;
			while ((LevMajRow <= 3) && (levelselection == ""))
			{
				LevMajCol = 1;	
				while ((LevMajCol <= 3) && (levelselection == ""))
				{
					
					/* Check corners */

					/* Top Left */
					chkCorner = "image" + LevMajRow + "-" + LevMajCol + "-1-1";
				    imgCorner = document.getElementById(chkCorner).src;
					if (imgCorner.includes("empty-cell.png"))
								levelselection = chkCorner;   /* select this corner */
					if (levelselection != "") break; /* Selection made, stop further checks */
					
					/* Top Right */
					chkCorner = "image" + LevMajRow + "-" + LevMajCol + "-1-3";
				    imgCorner = document.getElementById(chkCorner).src;
					if (imgCorner.includes("empty-cell.png"))
								levelselection = chkCorner;   /* select this corner */
					if (levelselection != "") break; /* Selection made, stop further checks */
					
					/* Bottom Left */
					chkCorner = "image" + LevMajRow + "-" + LevMajCol + "-3-1";
				    imgCorner = document.getElementById(chkCorner).src;
					if (imgCorner.includes("empty-cell.png"))
								levelselection = chkCorner;   /* select this corner */
					if (levelselection != "") break; /* Selection made, stop further checks */
					
					/* Bottom Right */
					chkCorner = "image" + LevMajRow + "-" + LevMajCol + "-3-3";
				    imgCorner = document.getElementById(chkCorner).src;
					if (imgCorner.includes("empty-cell.png"))
								levelselection = chkCorner;   /* select this corner */
					if (levelselection != "") break; /* Selection made, stop further checks */
				
					LevMajCol++;
				}
				
				/* If a selection has been made, stop further checks */
				if (levelselection != "") break;
				LevMajRow++;
			}
		
		/* After corners have been checked. */
	    /* if selection was made, place an X there */
		
		if (levelselection!="") 
						changeToX(levelselection);
			/* document.getElementById(levelselection).src = "X-clear.png";*/
		
					
	
	
	return levelselection;
}

/* --------------------------------------------------------------------------------------------------------  */						

/* Level 7  Create fork */
function level7Move(levelselection){
	
	return levelselection;
}

/* --------------------------------------------------------------------------------------------------------  */						

/* Level 8  Block opponents fork */
function level8Move(levelselection){
	
	return levelselection;
}

/* --------------------------------------------------------------------------------------------------------  */						


function changeToX(selection){
		
			/*  force update  
			setTimeout(function () {
			console.log("updates screen");
			}, 5); */
			
			document.getElementById(selection).src = "X-clear.png";			
	 		/* document.getElementById(selection).style.border = "2px solid blue";			
			
						
			  force update  
			setTimeout(function () {
			console.log("updates screen");
			}, 5);
			
			
			console.log('Wait....');
			const date = Date.now();
			let currentDate = null;
			do {
				currentDate = Date.now();
			} while (currentDate - date < 5000);
			
			
			console.log('....and go'); 
			
			
			 document.getElementById(selection).style.border = "";		
			  force update 
			setTimeout(function () {
			console.log("updates screen");
			}, 5);  */
			
			
}
/* --------------------------------------------------------------------------------------------------------  */						

function clearGrid(){

	for (let rowmaj = 1; rowmaj <=3; rowmaj++)
		for (let colmaj = 1; colmaj <=3; colmaj++)
			for (let rowmin = 1; rowmin <=3; rowmin++)
				for (let colmin = 1; colmin <=3; colmin++)
				{
					chkspaceA = "image" + rowmaj + "-" + colmaj + "-" + rowmin + "-" + colmin;
					document.getElementById(chkspaceA).src = "empty-cell.png";
                }		
	
	/* Set turn back to noughts    */
			document.getElementById("player_turn").src = "O-clear.png";
	
	
}

/* ------------------------------------------------------------------------------------------------------------------ */
function checkMinorWin(player_now, identity)
{
	  
	 /* find positions of hyphens and the end space */
	 /* let searchtext = event.currentTarget.id; */
	 let searchtext = identity;
	  
	  
	 	 
	 let majRow = searchtext.charAt(5);
	 let majCol = searchtext.charAt(7);
	 let minRow = searchtext.charAt(9);
	 let minCol = searchtext.charAt(11);

	 
	 	  
	 /* Check Minor wins */
	 
	 
	 let win = false;
	
 
	 /* for selected row in this major, check columns are equal */
	  	  
		let chkspace1 = "image" + majRow + "-" + majCol + "-" + minRow + "-" + "1";
		let chkspace2 = "image" + majRow + "-" + majCol + "-" + minRow + "-" + "2";
		let chkspace3 = "image" + majRow + "-" + majCol + "-" + minRow + "-" + "3" ;
		
				  /* Check row but only if not blank */
		  if ((document.getElementById(chkspace1).src ==
		      document.getElementById(chkspace2).src) &&
			  (document.getElementById(chkspace2).src ==
			  document.getElementById(chkspace3).src))
			  {
				  win=true;
				
				  minor_win(player_now, majRow, majCol);
			  }
			  
	    /* for selected column in in this major, check rows are equal */ 
			  	  
		chkspace1 = "image" + majRow + "-" + majCol + "-" + "1" + "-" + minCol;
		chkspace2 = "image" + majRow + "-" + majCol + "-" + "2" + "-" + minCol;
		chkspace3 = "image" + majRow + "-" + majCol + "-" + "3" + "-" + minCol;
		
		
		  /* Check row but only if not blank */
		  if ((document.getElementById(chkspace1).src ==
		      document.getElementById(chkspace2).src) &&
			  (document.getElementById(chkspace2).src ==
			  document.getElementById(chkspace3).src))
			  {
				  win=true;
	
				   minor_win(player_now, majRow, majCol);
			  }
			 
	 /* Check Diagonals  */ 
	
	 /* If col=row, check the trailing diagonal   \   */
	 if (minRow == minCol){
		 chkspace1 = "image" + majRow + "-" + majCol + "-" + "1" + "-" + "1";
		 chkspace2 = "image" + majRow + "-" + majCol + "-" + "2" + "-" + "2";
		 chkspace3 = "image" + majRow + "-" + majCol + "-" + "3" + "-" + "3";
		 if ((document.getElementById(chkspace1).src ==
		      document.getElementById(chkspace2).src) &&
			  (document.getElementById(chkspace2).src ==
			   document.getElementById(chkspace3).src))
			  {
				  win=true;
	
				  minor_win(player_now, majRow, majCol);
			  }
	 }
	 
	
	 let element = minRow+minCol;  // string
	 
	 if ((element == '13') || (element == '22') || (element == '31'))
	 {
		 chkspace1 = "image" + majRow + "-" + majCol + "-" + "1" + "-" + "3";
		 chkspace2 = "image" + majRow + "-" + majCol + "-" + "2" + "-" + "2";
		 chkspace3 = "image" + majRow + "-" + majCol + "-" + "3" + "-" + "1";
		 if ((document.getElementById(chkspace1).src ==
		      document.getElementById(chkspace2).src) &&
			  (document.getElementById(chkspace2).src ==
			  document.getElementById(chkspace3).src))
			  {
				  win=true;
	
				   minor_win(player_now, majRow, majCol);
			  }
		 
		
		 
	 }
 
	/* Check for draw */
		
			let cellsFilled =0;
			iRow=0;
			iCol=0;
			let iCell="";
				
     		for (iRow=1;iRow<4;iRow++) 
				for (iCol=1;iCol<4;iCol++) 
				{		/* Check number of cells filled */
			
				        iCell = "image" + majRow + "-" + majCol + "-" + iRow + "-" + iCol;
						cell_image_now = document.getElementById(iCell).src;
						if (cell_image_now.includes("empty-cell.png"))
						{/* do nothing */ }
						else {
						/* increment the number of cells filled */
						cellsFilled++;
						}
						
				}
				
				/* If all cells are filled for this major and no win marked, it must be a draw */
				
				iRow=0;
			    iCol=0;				
				iCell="";
				if ((cellsFilled == 9) && (win==false))
					{for (iRow=1;iRow<4;iRow++) {
						for (iCol=1;iCol<4;iCol++) 
						{
						
					    /* Change symbol of cell to a draw  */
				        iCell = "image" + majRow + "-" + majCol + "-" + iRow + "-" + iCol;   
						
						document.getElementById(iCell).src = "draw.png";
						}
					}
					}
					
					
	 
 
 
} 


/* ----------------------------------------------------------------------------------------------------------*/
function minor_win(player_now, majRow, majCol){
		 /* Mark all cells in current major as a win for the current player */
		for (iRow=1;iRow<4;iRow++) 
			for (iCol=1;iCol<4;iCol++) 
			{
				        let iCell = "image" + majRow + "-" + majCol + "-" + iRow + "-" + iCol;
						
											
						
			   			if (player_now.includes("O-clear.png")){
							
						document.getElementById(iCell).src = "O-win.png";
						} else {
							document.getElementById(iCell).src = "X-win.png";
						}
			}
	 
	 
	 }

/* ----------------------------------------------------------------------------------------------------------*/

function checkMajorWin(player_now){
	
	
	var gamesComplete = 0;
	
	winner="";
	
	
	
	
	/* Check rows for a win */
	for (let mRow = 1; mRow <= 3; mRow++) {
		
		chkspaceA = "image" + mRow + "-"  + "1" + "-" + "1" + "-" + "1";
		chkspaceB = "image" + mRow + "-" + "2" + "-" + "1" + "-" + "1";
		chkspaceC = "image" + mRow + "-" + "3" + "-" + "1" + "-" + "1";
		
		var chkimageA = document.getElementById(chkspaceA).src;
		var chkimageB = document.getElementById(chkspaceB).src;
		var chkimageC = document.getElementById(chkspaceC).src;
		
		/* for this major row, check columns are all the same for a row win */
	    if ( (chkimageA.includes("O-win")  && chkimageB.includes("O-win") && chkimageC.includes("O-win"))	)
		{
			winner="O-win.png";
		}
		if ( (chkimageA.includes("X-win")  && chkimageB.includes("X-win") && chkimageC.includes("X-win"))	)	
		{
				winner="X-win.png";
		}
	
	} /* end for */
				
	
	
	/* Check columns for a win */
		for (let mCol = 1; mCol <= 3; mCol++) {
			chkspaceA = "image" + "1" + "-" + mCol + "-" + "1" + "-" + "1";
			chkspaceB = "image" + "2" + "-" + mCol + "-" + "1" + "-" + "1";
			chkspaceC = "image" + "3" + "-" + mCol + "-" + "1" + "-" + "1";
			var chkimageA = document.getElementById(chkspaceA).src;
			var chkimageB = document.getElementById(chkspaceB).src;
			var chkimageC = document.getElementById(chkspaceC).src;
		
			/* for this major column, check row are all the same for a column win */
			if ( (chkimageA.includes("O-win")  && chkimageB.includes("O-win") && chkimageC.includes("O-win"))	) 
			{
				winner="O-win.png";
			}
			if ( (chkimageA.includes("X-win")  && chkimageB.includes("X-win") && chkimageC.includes("X-win"))	)	
			{
				winner="X-win.png";
			}
	  	
		} /* end for */
	
	
	
	 /* Check diagonals for a win   */
	 /*  ...Check leading diagonal \ */
	    chkspaceA = "image" + "1" + "-" + "1" + "-" + "1" + "-" + "1";
		chkspaceB = "image" + "2" + "-" + "2" + "-" + "1" + "-" + "1";
		chkspaceC = "image" + "3" + "-" + "3" + "-" + "1" + "-" + "1";
		
		var chkimageA = document.getElementById(chkspaceA).src;
		var chkimageB = document.getElementById(chkspaceB).src;
		var chkimageC = document.getElementById(chkspaceC).src;
		
		if ( (chkimageA.includes("O-win")  && chkimageB.includes("O-win") && chkimageC.includes("O-win"))	)
			winner="O-win.png";
		if ( (chkimageA.includes("X-win")  && chkimageB.includes("X-win") && chkimageC.includes("X-win"))	)	
			winner="X-win.png";
		
	    
	 
	 
	 /* ....Check trailing diagonal / */
	    chkspaceA = "image" + "1" + "-" + "3" + "-" + "1" + "-" + "1";
		chkspaceB = "image" + "2" + "-" + "2" + "-" + "1" + "-" + "1";
		chkspaceC = "image" + "3" + "-" + "1" + "-" + "1" + "-" + "1";
		
		var chkimageA = document.getElementById(chkspaceA).src;
		var chkimageB = document.getElementById(chkspaceB).src;
		var chkimageC = document.getElementById(chkspaceC).src;
		
		if ( (chkimageA.includes("O-win")  && chkimageB.includes("O-win") && chkimageC.includes("O-win"))	)
			winner="O-win.png";
		if ( (chkimageA.includes("X-win")  && chkimageB.includes("X-win") && chkimageC.includes("X-win"))	)	
			winner="X-win.png";
	 

    
	
	
	
	
	/* If there is a winner, change all symbols */
		if (winner != ""){
			changeAllSymbols(winner);
		}
	    /* else check for a draw                    */
		else
		{
			
			/* Check first elements of each major  */
			for (let mRow = 1; mRow <= 3; mRow++) {
				for (let mCol = 1; mCol <= 3; mCol++) { 
			
					chkspaceM = "image" + mRow + "-" + mCol + "-" + "1" + "-" + "1";
			
					var chkimageM = document.getElementById(chkspaceM).src;
			
					if ((chkimageM.includes("win")) || (chkimageM.includes("draw"))){
	
						/* if cell 1-1 of a major is a win or draw, increment total     */
						/* so we know when game is over but drawn                       */
						gamesComplete++;
					}
				}
				
			}	 
		
			/* if this is a draw, change all symbols to draw and winner tag to "draw" */
			if ((winner=="") && (gamesComplete ==9)) {
				winner="draw.png";
				changeAllSymbols(winner);
			}
			
		}
		
    
			
						
		/* if all majors are complete, or there has been a winner, update actual scores     */	
		if ((gamesComplete==9) || (winner !="")) {
			
			player1ScoreValue = 0.0;
			player2ScoreValue = 0.0;
						
			/* retrieve scores */
			player1ScoreValue = Number(document.getElementById("player1ScoreText").innerHTML);
			player2ScoreValue = Number(document.getElementById("player2ScoreText").innerHTML);
			
			
									
			if (winner=="O-win.png")
				
			    player1ScoreValue = player1ScoreValue + 1.0 ;
			  
			
			if (winner=="X-win.png")
				player2ScoreValue = player2ScoreValue + 1.0;
				
			
			/* If draw, each player receives a half a point */
			if (winner=="draw.png"){
				player1ScoreValue = player1ScoreValue + 0.5;
				player2ScoreValue = player2ScoreValue + 0.5;
				
			}
			
		    	
			document.getElementById("player1ScoreText").innerHTML = player1ScoreValue;
			document.getElementById("player2ScoreText").innerHTML = player2ScoreValue;  
		
			
	
		}
}

/* -------------------------------------------------------------------------------------------------------------------------*/

/* a win or draw has been detected, change all 81 symbols to the winning symbol (or draw) */

function changeAllSymbols(winner) 
{
	/* Pause for a 1.5 seconds to allow view of win before amending all symbols */
	/* setTimeout(sleep, 1500, "waiting");	 */
	
	for (iMajRow=1;iMajRow<4;iMajRow++) 
		for (iMajCol=1;iMajCol<4;iMajCol++) 
			for (iMinRow=1;iMinRow<4;iMinRow++) 
				for (iMinCol=1;iMinCol<4;iMinCol++) 		
				{
					chkspaceAll = "image" + iMajRow + "-" + iMajCol + "-" + iMinRow + "-" + iMinCol;
					document.getElementById(chkspaceAll).src = winner;
				}
		
	console.debug("winner=", winner);
	console.debug("opponent=", opponent); 
	
	if (winner=="draw.png")  SendUserMessage("It's a draw.");
	if ((winner=="O-win.png") && (opponent == "computer"))  SendUserMessage("Congratulations, you've won.");
	if ((winner=="O-win.png") && (opponent == "player"))    SendUserMessage("Congratulations, Player 1 has won");
	
	if ((winner=="X-win.png") && (opponent == "computer"))  SendUserMessage("Sorry, I won, this time.");
	if ((winner=="X-win.png") && (opponent == "player"))    SendUserMessage("Congratulations, Player 2 has won.");
			
}





		
/* -----------------END OF PROGRAM -----------------------------------------------------------------------------------------*/
