/**
 * Create a new Scene
 * <ul><li>Copy the content of this file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .</li>
 * <li>In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"</li>
 * <li>For create a new scene, use this instruction: "new Scene()".</li>
 * </ul>
 * <strong>To load your scene, use this instruction: "Application.LoadLevel(LevelName)".</strong>
 * 
 * @class
 * 
 * @return {Scene}
 * */
function SceneHome() 
{
	this.name = "SceneHome";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;
	this.zoneFilters;
	this.animals = [];
	this.boxCheck;
	this.isCheck;
	this.WorldSize = new Vector(4096,4096);
	this.imageSelected = Images["elephant"];
	this.nbjoueur = 0;
	/**
	 * Called at the instruction new Scene().
	 * */
	this.Awake = function() 
	{
		console.clear();
		Print('System:Scene ' + this.name + " Created !");
	}
	
	/**
	 * Start the Scene and show a message in console or launch Update() if already started
	 * Called at the first use of scene in game.
	 * */
	this.Start = function() 
	{
		if (!this.started) 
		{
			socket.on('toto', function(data){
				nbjoueur = data;
				console.log(data);
			});

			Time.SetTimeWhenSceneBegin();
			// operation start
			var boxElephant = new Box(canvas.width/7-(canvas.width/7)/2, canvas.height/4-(canvas.height/4)/2, 100, 100);
			var boxGiraffe = new Box(canvas.width/7*2-(canvas.width/7)/2, canvas.height/4-(canvas.height/4)/2, 100, 100);
			var boxHippo = new Box(canvas.width/7*3-(canvas.width/7)/2, canvas.height/4-(canvas.height/4)/2, 100, 100);
			var boxMonkey = new Box(canvas.width/7*4-(canvas.width/7)/2, canvas.height/4-(canvas.height/4)/2, 100, 100);
			var boxPanda = new Box(canvas.width/7*5-(canvas.width/7)/2, canvas.height/4-(canvas.height/4)/2, 100, 100);
			var boxParrot = new Box(canvas.width/7-(canvas.width/7)/2, canvas.height/4*2-(canvas.height/4)/2, 100, 100);
			var boxPenguin = new Box(canvas.width/7*2-(canvas.width/7)/2, canvas.height/4*2-(canvas.height/4)/2, 100, 100);
			var boxPig = new Box(canvas.width/7*3-(canvas.width/7)/2, canvas.height/4*2-(canvas.height/4)/2, 100, 100);
			var boxRabbit = new Box(canvas.width/7*4-(canvas.width/7)/2, canvas.height/4*2-(canvas.height/4)/2, 100, 100);
			var boxSnake = new Box(canvas.width/7*5-(canvas.width/7)/2, canvas.height/4*2-(canvas.height/4)/2, 100, 100);
			this.boxCheck = new Box(canvas.width/7*4-(canvas.width/7)/2, canvas.height/4*3-(canvas.height/4)/2, 150, 50);
			this.isCheck = false;
			this.animals.push(boxElephant , boxGiraffe , boxHippo , boxMonkey , boxPanda , boxParrot , boxPenguin , boxPig , boxRabbit , boxSnake);
			this.zoneFilters = this.animals[0];
			this.started = true;
			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	/**
	 * Start every GameObject, Group and apply the debug mode if asked
	 * Called each frame,code game is here.
	 * */
	this.Update = function() 
	{
		if (!Application.GamePaused) 
		{

			ctx.drawImage(Images["elephant"], this.animals[0].x, this.animals[0].y, this.animals[0].w, this.animals[0].h);
			ctx.drawImage(Images["giraffe"],  this.animals[1].x, this.animals[1].y, this.animals[1].w, this.animals[1].h);
			ctx.drawImage(Images["hippo"],  this.animals[2].x, this.animals[2].y, this.animals[2].w, this.animals[2].h);
			ctx.drawImage(Images["monkey"],  this.animals[3].x, this.animals[3].y, this.animals[3].w, this.animals[3].h);
			ctx.drawImage(Images["panda"],  this.animals[4].x, this.animals[4].y, this.animals[4].w, this.animals[4].h);

			ctx.drawImage(Images["parrot"],  this.animals[5].x, this.animals[5].y, this.animals[5].w, this.animals[5].h);
			ctx.drawImage(Images["penguin"],  this.animals[6].x, this.animals[6].y, this.animals[6].w, this.animals[6].h);
			ctx.drawImage(Images["pig"],  this.animals[7].x, this.animals[7].y, this.animals[7].w, this.animals[7].h);
			ctx.drawImage(Images["rabbit"],  this.animals[8].x, this.animals[8].y, this.animals[8].w, this.animals[8].h);
			ctx.drawImage(Images["snake"],  this.animals[9].x, this.animals[9].y, this.animals[9].w, this.animals[9].h);
			ctx.strokeStyle ="black";
			ctx.strokeRect(this.boxCheck.x,this.boxCheck.y,this.boxCheck.w,this.boxCheck.h);
			ctx.fillStyle ="black";
			ctx.textAlign = "center";
			ctx.font = "20px Arial";
			ctx.fillText(this.nbjoueur,this.boxCheck.x + this.boxCheck.w/2,this.boxCheck.y+ (this.boxCheck.h/100*60));
			ctx.textAlign = "start";
			if(Input.mouseClick) {
				for (var i = 0; i < this.animals.length; i++) {
					if (Physics.CheckCollision(Input.MousePosition, this.animals[i]) && !this.isCheck) {
						this.zoneFilters = this.animals[i];
						switch(i){
							case 0 :this.imageSelected = Images["elephant"];
							break;
							case 1 :this.imageSelected = Images["giraffe"];
							break;
							case 2 :this.imageSelected = Images["hippo"];
							break;
							case 3 :this.imageSelected = Images["monkey"];
							break;
							case 4 :this.imageSelected = Images["panda"];
							break;
							case 5 :this.imageSelected = Images["parrot"];
							break;
							case 6 :this.imageSelected = Images["penguin"];
							break;
							case 7 :this.imageSelected = Images["pig"];
							break;
							case 8 :this.imageSelected = Images["rabbit"];
							break;
							case 9 :this.imageSelected = Images["snake"];
							break;
						}
					}
				}
				if (Physics.CheckCollision(Input.MousePosition, this.boxCheck)) {
						this.isCheck = true;

						var player = new Player(this.imageSelected,"host");
						var player1 = new Player(this.imageSelected,"player1");
						var player2 = new Player(this.imageSelected,"player2");
						var player3 = new Player(this.imageSelected,"player3");
			
						Scenes["ScenePlatform"].players.push(player, player1, player2, player3);
						Scenes["ScenePlatform"].GameObjects.push(player, player1, player2, player3);
						Application.LoadedScene = Scenes["ScenePlatform"];
					}
			}
			if(this.isCheck){
				Gfx.Filters.Greyscale({x:0,y:0,w:canvas.width,h:canvas.height});
			}
			
			Gfx.Filters.Tint(this.zoneFilters,"rgba(255,0,0,0.15)");
			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}
		}
		if (Application.debugMode) 
		{
			Debug.DebugScene();
		}
		this.GUI();
	}
	/**
	 * Called each frame, code all the GUI here.
	 * */
	this.GUI = function() 
	{
		if (!Application.GamePaused) 
		{
			//Show UI
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}

/*
choix de personnage
choix du nom
ready ?

*/