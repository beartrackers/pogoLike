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
function SceneEndGame() 
{
	this.name = "SceneEndGame";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.boxButton;

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
			this.boxButton = new Box(canvas.width/2-100,((Scenes["ScenePlatform"].players.length + 3) * 60),200,70);


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
			Scenes["ScenePlatform"].players.sort(function(a, b){
				return b.score - a.score;
			});
				ctx.font = "50px Arial";
				ctx.fillStyle = "black";
				ctx.textAlign = "center"
			ctx.fillText( "Score :", canvas.width/2,  60 );
			for (var i = 0; i < Scenes["ScenePlatform"].players.length; i++) {
				
				ctx.fillText( Scenes["ScenePlatform"].players[i].playerName + " : " + Scenes["ScenePlatform"].players[i].score, canvas.width/2, (i + 2) * 60 );
			}
			ctx.strokeStyle ="black";
			ctx.strokeRect(this.boxButton.x, this.boxButton.y, this.boxButton.w, this.boxButton.h);
			ctx.fillText("Restart",canvas.width/2, ((Scenes["ScenePlatform"].players.length + 4) * 60));
			ctx.textAlign = "start";

			// only host can reset
			if (Input.mouseClick && Physics.CheckCollision(Input.MousePosition, this.boxButton)) {
				Scenes["ScenePlatform"] = new ScenePlatform();
				Scenes["SceneHome"] = new SceneHome();
				Application.LoadedScene = Scenes["SceneHome"];
			}
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