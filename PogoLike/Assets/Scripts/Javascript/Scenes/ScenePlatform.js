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
function ScenePlatform() 
{
	this.name = "ScenePlatform";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.nbPlayer = 0;
	this.grid;

	this.players = [];

	this.timer;

	this.WorldSize = new Vector(4096,4096);

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
			Time.SetTimeWhenSceneBegin();
			// operation start

			this.nbPlayer = 8;

			var nbColumn = this.nbPlayer*2;

			this.grid = new Grid(0, 0, canvas.height, nbColumn);
			var posCoin = new Vector(Math.Random.RangeInt(0,this.grid.cases-1,true),Math.Random.RangeInt(0,this.grid.cases-1,true));
			this.GameObjects.push(new Coin(posCoin));
			var posPlayer = new Vector(Math.Random.RangeInt(0,this.grid.cases-1,true),Math.Random.RangeInt(0,this.grid.cases-1,true));
			
			var player = new Player(posPlayer);
			var player1 = new Player(new Vector(Math.Random.RangeInt(0,this.grid.cases-1,true),Math.Random.RangeInt(0,this.grid.cases-1,true)));
			var player2 = new Player(new Vector(Math.Random.RangeInt(0,this.grid.cases-1,true),Math.Random.RangeInt(0,this.grid.cases-1,true)));
			var player3 = new Player(new Vector(Math.Random.RangeInt(0,this.grid.cases-1,true),Math.Random.RangeInt(0,this.grid.cases-1,true)));

			this.players.push(player, player1, player2, player3);
			this.GameObjects.push(player, player1, player2, player3);

			this.timer = new Timer(10);

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
			// for (var i = 0; i < this.GameObjects.length; i++) {
			// 	if(this.GameObjects[i].name == "Splash"){

			// 	}
			// }
			this.grid.Draw();
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
			this.players.sort(function(a, b){
				return b.score - a.score;
			});

			for (var i = 0; i < this.players.length; i++) {
				ctx.font = "30px Arial";
				ctx.fillStyle = "black";
				ctx.fillText( this.players[i].name + " : " + this.players[i].score, canvas.height + 50, (i + 3) * 40 );
			}

			ctx.fillText("time : " + (this.timer.duration - Math.floor(this.timer.currentTime)) , canvas.height + 50, 40 );

		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}