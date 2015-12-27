

var SaveManager = new function(){



	this.saveGame = function(){
		localStorage.setItem('VJ2015-tarea2_save', JSON.stringify(this.SaveData));
	};


	this.continueGame = function(){
		if(this.hasData()){
			this.SaveData = JSON.parse(localStorage.getItem('VJ2015-tarea2_save'));
		}
		else{
			this.SaveData = new Array();
			this.SaveData[0] = {};
		}
	};

	this.resetSave = function(){
		localStorage.setItem('VJ2015-tarea2_save', null);
		this.SaveData = null;
	};

	this.hasData = function(){
		return localStorage.getItem('VJ2015-tarea2_save') != null
		 && localStorage.getItem('VJ2015-tarea2_save') != "null"
		 && localStorage.getItem('VJ2015-tarea2_save') != undefined
		 && localStorage.getItem('VJ2015-tarea2_save') != "undefined";
	};

	this.setTimesPlayed = function(timesPlayed){
		//Setea el timesPlayed
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined){
				this.SaveData[0] = {};
			}
			this.SaveData[0].timesPlayed = timesPlayed;
		}
		this.saveGame();
	};

	this.getTimesPlayed = function(){
		//Obtiene la cantidad de veces jugadas
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined || this.SaveData[0].timesPlayed == undefined){
				return 0;
			}
			return this.SaveData[0].timesPlayed;
		}
		else{
			return 0;
		}
	};

	this.addTimesPlayed = function(value){
		// Añade el valor de value a la cantidad de veces jugadas
		var x = this.getTimesPlayed();
		this.setTimesPlayed(x+value);
	};

	this.setP1Wins = function(P1Wins){
		//Setea el P1Wins
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined){
				this.SaveData[0] = {};
			}
			this.SaveData[0].P1Wins = P1Wins;
		}
		this.saveGame();
	};
	
	this.getP1Wins = function(){
		//Obtiene la cantidad de veces que P1 ha ganado
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined || this.SaveData[0].P1Wins == undefined){
				return 0;
			}
			return this.SaveData[0].P1Wins;
		}
		else{
			return 0;
		}
	};

	this.addP1Wins = function(value){
		// Añade el valor de value a los wins p2
		var x = this.getP1Wins();
		this.setP1Wins(x+value);
	};

	this.setP2Wins = function(P2Wins){
		//Setea el P2Wins
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined){
				this.SaveData[0] = {};
			}
			this.SaveData[0].P2Wins = P2Wins;
		}
		this.saveGame();
	};
	
	this.getP2Wins = function(){
		//Obtiene la cantidad de veces que P2 ha ganado
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined || this.SaveData[0].P2Wins == undefined){
				return 0;
			}
			return this.SaveData[0].P2Wins;
		}
		else{
			return 0;
		}
	};

	this.addP2Wins = function(value){
		// Añade el valor de value a los wins p2
		var x = this.getP2Wins();
		this.setP2Wins(x+value);
	};

	this.setTies = function(ties){
		//Setea el ties
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined){
				this.SaveData[0] = {};
			}
			this.SaveData[0].ties = ties;
		}
		this.saveGame();
	};
	
	this.getTies = function(){
		//Obtiene la cantidad de veces que se ha empatado
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined || this.SaveData[0].ties == undefined){
				return 0;
			}
			return this.SaveData[0].ties;
		}
		else{
			return 0;
		}
	};

	this.addTies = function(value){
		// Añade el valor de value a los ties
		var x = this.getTies();
		this.setTies(x+value);
	};

	this.setCardsUsed = function(cardsUsed){
		//Setea las cartas usadas
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined){
				this.SaveData[0] = {};
			}
			this.SaveData[0].cardsUsed = cardsUsed;
		}
		this.saveGame();
	};
	
	this.getCardsUsed = function(){
		//Obtiene la cantidad de veces que se han usado cartas
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined || this.SaveData[0].cardsUsed == undefined){
				return 0;
			}
			return this.SaveData[0].cardsUsed;
		}
		else{
			return 0;
		}
	};

	this.addCardsUsed = function(value){
		// Añade el valor de value a las cartas usadas
		var x = this.getCardsUsed();
		this.setCardsUsed(x+value);
	};

	this.setTotalTimePlayed = function(totalTimePlayed){
		//Setea las cartas usadas
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined){
				this.SaveData[0] = {};
			}
			this.SaveData[0].totalTimePlayed = totalTimePlayed;
		}
		this.saveGame();
	};
	
	this.getTotalTimePlayed = function(){
		//Obtiene el tiempo total jugado
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined || this.SaveData[0].totalTimePlayed == undefined){
				return 0;
			}
			return this.SaveData[0].totalTimePlayed;
		}
		else{
			return 0;
		}
	};

	this.addTotalTimePlayed = function(value){
		// Añade el valor de value a la cantidad de tiempo total jugado
		var x = this.getTotalTimePlayed();
		this.setTotalTimePlayed(x+value);
	};

}
