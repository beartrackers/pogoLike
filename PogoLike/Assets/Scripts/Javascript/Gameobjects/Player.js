/**
 * Create a new GameObject <br />
 * @namespace GameObjects/GameObjects
 *
 * @tutorial
 * <ul><li>Copy the content of GameObjects file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/GameObjects/NameOfYourGameObject.js .</li>
 * <li>In the index.html add below this comment <!-- GameObjects --> the line:<br/>
 * <script type="text/javascript" src="Assets/Scripts/Javascript/GameObjects/NameOfYourGameObject.js"></script></li>
 * <li>For create a new scene, use this instruction: "new GameObject()".</li>
 * </ul>
 * 
 * 
 * @property {String} name - The name of the object.
 * @property {Boolean} enabled - The active state of the GameObject.
 * @property {Boolean} renderer - The active state of Renderer component
 * @property {Boolean} fixedToCamera -  The active state of Camera if is Fixed
 * @property {Vector} MouseOffset  - Position of mouse
 * @property {Group} Parent - A Group which contain several GameObject
 * @property {Object} Transform  
 * @property {Vector} Transform.RelativePosition - the relative position of GameObject inside a Group 
 * @property {Vector} Transform.Size - size of GameObject
 * @property {Vector} Transform.Scale - scale of GameObject 
 * @property {Vector} Transform.Pivot - pivot position of GameObject
 * @property {Number} Transform.angle - angle of GameObject
 *
 *
 * */
function Player(img,name,isHost) 
{
	this.name = "Player";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	this.fixedToCamera = true;
	this.playerName = name || "player";
	this.MouseOffset = new Vector();
	this.isHost = isHost || false;
	this.Parent = null;
	this.gridPos = new Vector();
	this.color = "";
	this.grid ;
	this.canMove = true;
	this.left = false;
	this.up = false;
	this.right = false;
	this.down = false;
	this.goalx = 0;
	this.goaly = 0;
	this.velocity = 1;
	this.velocityScale = 0.2;
	this.score = 0;
	this.isMoving = false;
	this.splahPosition = new Vector();
	this.splahScale = 0;

	this.Transform = {};
	this.Transform.RelativePosition = new Vector();
	this.Transform.Position = new Vector();
	this.Transform.Size = new Vector();
	this.Transform.RelativeScale = new Vector(1,1);
	this.Transform.Scale = new Vector(1,1);
	this.Transform.Pivot = new Vector(0,0);
	this.Transform.angle = 0;

	/**
	 * @function SetPosition
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y position(Transform) of game object
	 * */
	this.SetPosition = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetPosition Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetPosition Go");
		this.Transform.RelativePosition.x = _x;
		this.Transform.RelativePosition.y = _y;
	};

	/**
	 * @function SetPositionCollider
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y position(Physics collider) of game object
	 * */
	this.SetPositionCollider = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetPositionCollider Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetPositionCollider Go");
		this.Physics.Collider.Position.x = _x;
		this.Physics.Collider.Position.y = _y;
	};

	/**
	 * @function SetSize
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the size of game object
	 * */
	this.SetSize = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetSize Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetSize Go");
		this.Transform.Size.x = _x;
		this.Transform.Size.y = _y;
	};

	/**
	 * @function SetColliderSize
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the collider size of game object
	 * */
	this.SetColliderSize = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetColliderSize Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetColliderSize Go");
		this.Physics.Collider.Size.x = _x;
		this.Physics.Collider.Size.y = _y;
	};

	/**
	 * @function SetScale
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the scale of game object
	 * */
	this.SetScale = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetScale Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetScale Go");
		this.Transform.RelativeScale.x = _x;
		this.Transform.RelativeScale.y = _y;
	};

	/**
	 * @function SetPivot
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the pivot of game object
	 * */
	this.SetPivot = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetPivot Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetPivot Go");
		this.Transform.Pivot.x = _x;
		this.Transform.Pivot.y = _y;
	};

	/**
	 * The Physics component of the GameObject. <br />
	 * @memberof GameObjects/GameObjects
	 *
	 * @property {Object} Physics  
	 * @property {Boolean} Physics.enabled - The active state of the GameObject.
	 * @property {Boolean} Physics.clickable - is clickable
	 * @property {Boolean} Physics.dragAndDroppable - is draggable
	 * @property {Boolean} Physics.colliderIsSameSizeAsTransform - is has the same size of Tranform size
	 * @property {Number} Physics.countHovered - counter
	 *
	 *
	 * */
	this.Physics = {};
	this.Physics.enabled = true;
	this.Physics.clickable = false;
	this.Physics.dragAndDroppable = false;
	this.Physics.colliderIsSameSizeAsTransform = false;
	this.Physics.countHovered = 0;

	this.Physics.Collider = 
	{
		Position: new Vector(),
		Size: new Vector()
	};

	this.Renderer = 
	{
		isVisible: true,
		isSpriteSheet: false,
		That: this.Transform,
		Material: 
		{
			Source: img || Images["pig"],
			SizeFrame: new Vector(),
			CurrentFrame: new Vector(),
		},
		animationCount:0,
		Animation:
		{
			animated: true,
			Animations: [],
			Current:[],
			countdown:0,
			currentIndex: 0,
			totalAnimationLength: 0.5
		},
		/**
		 * 
		 * @function Draw
		 * @memberof GameObjects/GameObjects
		 *
		 * @description
		 * Draw the game object component
		 *  
		 * */
		Draw: function() 
		{
			var ScaledSizeX = this.That.Size.x*this.That.Scale.x;
			var ScaledSizeY = this.That.Size.y*this.That.Scale.y;

			ctx.save();
			ctx.translate((this.That.Position.x), (this.That.Position.y));
			ctx.rotate(Math.DegreeToRadian(this.That.angle));
			if (this.isSpriteSheet) 
			{
				if (this.Animation.animated)
				{	
					if (this.animationCount > this.Animation.totalAnimationLength / this.Animation.Current.length) 
					{
						this.Animation.currentIndex ++ ;
						this.animationCount = 0 ;
						if (this.Animation.currentIndex > this.Animation.Current.length-1) 
						{
							this.Animation.currentIndex = 0;
						}
					} 
					
					this.animationCount += Time.deltaTime;
					
				}
				else 
				{
					this.animationCount = 0;
					this.Animation.currentIndex = 0;
				}
				this.Material.CurrentFrame = this.Animation.Current[this.Animation.currentIndex];

				ctx.drawImage(this.Material.Source,
								this.Material.CurrentFrame.x,
								this.Material.CurrentFrame.y,
								this.Material.SizeFrame.x,
								this.Material.SizeFrame.y,
								-this.That.Pivot.x*ScaledSizeX,
								-this.That.Pivot.y*ScaledSizeY,
								ScaledSizeX,
								ScaledSizeY);
			} 
			else 
			{
				ctx.drawImage(this.Material.Source,
								-this.That.Pivot.x*ScaledSizeX,
								-this.That.Pivot.y*ScaledSizeY,
								ScaledSizeX,
								ScaledSizeY);
			}
			ctx.restore();
		}
					

	};

	/**
	 * @function SetSpriteSheet
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {String} _img - the source image of sprite sheet
	 * @param {Vector} _sizeFrame - the size frame of the sprite
	 * @param {Number} _animationLength - how many frame has the sprite sheet
	 *
	 * @description
	 *
	 * Set the sprite sheet source image, the size of one frame and the number of frame the sprite sheet has.
	 * */
	this.SetSpriteSheet = function(_img, _sizeFrame, _animationLength) 
	{
	    if(typeof _img != 'string') PrintErr("Parameter img in SetSpriteSheet");
		if(!(_sizeFrame instanceof(Vector))) PrintErr("Parameter sizeFrame in SetSpriteSheet");
	    if(typeof _animationLength != 'number') PrintErr("Parameter animationLength in SetSpriteSheet");
		this.Renderer.isSpriteSheet = true;
		this.Animation.totalAnimationLength = _animationLength || 0.5;
		this.Renderer.Material.SizeFrame = _sizeFrame;
 		this.Renderer.Material.Source = _img;
 		this.Renderer.Material.CurrentFrame = new Vector(0,0);
 		for (var i = 0; i < _img.height; i += this.Renderer.Material.SizeFrame.y) 
 		{
 			var array = [];
 			for (var j = 0; j < _img.width; j += this.Renderer.Material.SizeFrame.x) 
 			{
 				array.push(new Vector(j, i));
 			}
 			this.Renderer.Animation.Animations.push(array);
 		}
 		this.Renderer.Animation.Current = this.Renderer.Animation.Animations[0];
	}

	/**
	 * @function Awake
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Called at the instruction new GameObject()
	 * */
	this.Awake = function() 
	{
		Print('System:GameObject ' + this.name + " Created !");
	};

	/**
	 * @function Start
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Start the GameObject and show a message in console or launch Update() if already started <br/>
	 * Set the transform component to the physics collider
	 * */
	this.Start = function() 
	{
		if (!this.started) {
			// operation start
			this.color = Math.Random.ColorRGBA(.5);
			this.grid=Application.LoadedScene.grid;
			this.SetPosition(((this.gridPos.x) * this.grid.caseLength) + this.grid.caseLength/2 ,
							((this.gridPos.y) * this.grid.caseLength) + this.grid.caseLength/2);
			this.SetSize(this.grid.caseLength, this.grid.caseLength);
			this.SetPivot(.5,.5);
			this.velocity = 5;
			this.goalx = this.Transform.RelativePosition.x;
			this.goaly = this.Transform.RelativePosition.y;

			if (this.Physics.colliderIsSameSizeAsTransform) 
			{
				this.Physics.Collider = this.Transform;
			}

			this.started = true;
			Print('System:GameObject ' + this.name + " Started !");
		}
		this.PreUpdate();
	};

	/**
	 * @function PreUpdate
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * If GameObject in group (parent), take relative position from parent position <br/>
	 * If not, set GameObject own position <br/>
	 *
	 * Start the camera if exist and set position if fixed
	 *
	 * */
	this.PreUpdate = function() 
	{
		if (this.enabled) 
		{
			if (this.Parent != null) 
			{
				this.Transform.Position.x = this.Transform.RelativePosition.x + this.Parent.Transform.Position.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y + this.Parent.Transform.Position.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x * this.Parent.Transform.Scale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y * this.Parent.Transform.Scale.y;
			} 
			else 
			{
				this.Transform.Position.x = this.Transform.RelativePosition.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y;
			}
			if (Application.LoadedScene.CurrentCamera != null) 
			{
				Application.LoadedScene.CurrentCamera.Start();
				if (!this.fixedToCamera) 
				{
					this.Transform.Position.x -= Application.LoadedScene.CurrentCamera.Transform.Position.x;
					this.Transform.Position.y -= Application.LoadedScene.CurrentCamera.Transform.Position.y;
				}
			}
			
			this.Update();
		}
			
	};
	/**
	 * @function Update
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Call postUpdate function (each frame)
	 * */
	 /**
     * @memberof Tools/Tween
     * @function Linear
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     *  
     * */
     
    // Tween.Linear(Date.now(),
    // 			this.Transform.RelativePosition.x, 
    // 			this.Transform.RelativePosition.x - this.grid.caseLength,
    // 			 500);
	this.Update = function() 
	{
		if (this.isMoving) {
			if (this.left && this.Transform.RelativePosition.x >= this.goalx) {
				this.Transform.RelativePosition.x -= this.velocity;
				this.Transform.Scale.x += this.velocityScale;
				this.Transform.Scale.y += this.velocityScale;
			if(this.Transform.RelativePosition.x >= (this.goalx - this.grid.caseLength/2)){
			 
			 	this.velocityScale = -0.2; 
			 }
			} else {
				this.left = false;
				this.velocityScale = 0.2;
			}

			if (this.up && this.Transform.RelativePosition.y >= this.goaly) {
					this.Transform.RelativePosition.y -= this.velocity;
					this.Transform.Scale.x += this.velocityScale;
					this.Transform.Scale.y += this.velocityScale;
				if(this.Transform.RelativePosition.y >= (this.goaly - this.grid.caseLength/2)){
				 
				 	this.velocityScale = -0.2; 
				 }
			} else {
				this.up = false;
				this.velocityScale = 0.2;
			}

			if (this.right && this.Transform.RelativePosition.x <= this.goalx) {
					this.Transform.RelativePosition.x += this.velocity;
					this.Transform.Scale.x += this.velocityScale;
					this.Transform.Scale.y += this.velocityScale;
				if(this.Transform.RelativePosition.x >= (this.goalx - this.grid.caseLength/2)){
				 
				 	this.velocityScale = -0.2; 
				 }
			} else {
				this.right = false;
				this.velocityScale = 0.2;
			}

			if (this.down && this.Transform.RelativePosition.y <= this.goaly) {
					this.Transform.RelativePosition.y += this.velocity;
					this.Transform.Scale.x += this.velocityScale;
					this.Transform.Scale.y += this.velocityScale;
				if(this.Transform.RelativePosition.y <= (this.goaly - this.grid.caseLength/2)){
				 
				 	this.velocityScale = -0.2; 
				 }
			} else {
				this.down = false;
				this.velocityScale = 0.2;
			}
		}		

		if(this.canMove){
			// Left
			if (Input.KeysDown[37] && this.gridPos.x > 0) {
				this.gridPos.x --;
				this.goalx = this.Transform.RelativePosition.x - this.grid.caseLength;
				this.goaly = this.Transform.RelativePosition.y;
				this.canMove = false;
				this.isMoving = true;
				this.left = true;
			} 
			// Top
			else if (Input.KeysDown[38] && this.gridPos.y > 0) {
				this.gridPos.y --;
				this.goaly = this.Transform.RelativePosition.y - this.grid.caseLength;
				this.goalx = this.Transform.RelativePosition.x;
				this.canMove = false;
				this.isMoving = true;
				this.up = true;
			}
			// Right
			else if (Input.KeysDown[39] && this.gridPos.x < this.grid.cases-1) {
				this.gridPos.x ++;
				this.goalx = this.Transform.RelativePosition.x + this.grid.caseLength;
				this.goaly = this.Transform.RelativePosition.y;
				this.canMove = false;
				this.isMoving = true;
				this.right = true;
			}
			// Both
			else if (Input.KeysDown[40] && this.gridPos.y < this.grid.cases-1) {
				this.gridPos.y ++;
				this.goaly = this.Transform.RelativePosition.y + this.grid.caseLength;
				this.goalx = this.Transform.RelativePosition.x;
				this.canMove = false;
				this.isMoving = true;
				this.down = true;
			} 
		} 

		if(!this.left && !this.up && !this.right && !this.down){
			
			this.splahPosition.x = this.Transform.RelativePosition.x;
			this.splahPosition.y = this.Transform.RelativePosition.y;

			if (this.grid.Tiles[IndexFromCoord(this.gridPos.x,this.gridPos.y, this.grid.cases)] != this.color) {

				this.splahScale += .1;
				ctx.fillStyle = this.color;
				ctx.fillRect(this.splahPosition.x - (this.grid.caseLength * this.splahScale) * this.Transform.Pivot.x,
							 this.splahPosition.y - (this.grid.caseLength * this.splahScale) * this.Transform.Pivot.y,
							 this.grid.caseLength * this.splahScale,
							 this.grid.caseLength * this.splahScale);

			} else if(!Input.KeysDown[37] && !Input.KeysDown[38] && !Input.KeysDown[39] && !Input.KeysDown[40]
						&& !this.left && !this.up && !this.right && !this.down){

				this.canMove = true;
				this.Transform.RelativePosition.x = this.goalx;
				this.Transform.RelativePosition.y = this.goaly;				
			}

			if (this.splahScale >= 1) {
				this.splahScale = 0;
				this.grid.Tiles[IndexFromCoord(this.gridPos.x,this.gridPos.y, this.grid.cases)] = this.color;
			}

			//this.grid.Tiles[IndexFromCoord(this.gridPos.x,this.gridPos.y, this.grid.cases)] = this.color;

			this.isMoving = false;
			this.catchCoin();
		}

		// if(!Input.KeysDown[37] && !Input.KeysDown[38] && !Input.KeysDown[39] && !Input.KeysDown[40]
		// 	&& !this.left && !this.up && !this.right && !this.down){
		// 	this.canMove = true;
		// 	this.Transform.RelativePosition.x = this.goalx;
		// 	this.Transform.RelativePosition.y = this.goaly;
		// }

		this.Renderer.Draw();

		this.PostUpdate();	
	};
	/**
	 * @function PostUpdate
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Execute PostUpdate. If DebugMode is active, diplay GameObject in debug mode
	 *
	 * */
	this.PostUpdate = function() 
	{
		if (Application.debugMode) {
			Debug.DebugObject(this);
		}
		this.GUI();	
	};

	/**
	 * @function GUI
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Display the GUI of GameObject
	 * */
	this.GUI = function() 
	{
		
	}

	/**
	 * @function onHover
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Counter on hover the GameObject
	 * */
	this.onHover = function() 
	{
		this.Physics.countHovered ++;	
	}

	/**
	 * @function onClicked
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Set the MouseOffset with mouse position <br/>
	 * Increment the countHovered
	 * */
	this.onClicked = function() 
	{
		this.MouseOffset.x = Input.MousePosition.x - this.Transform.Position.x;
		this.MouseOffset.y = Input.MousePosition.y - this.Transform.Position.y;
		this.Physics.countHovered ++;
	}
	/**
	 * @function onUnHovered
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Reinitialize the countHovered to 0
	 * */
	this.onUnHovered = function() 
	{
		this.Physics.countHovered = 0;
	}
	this.catchCoin = function()
	{
		for (var i = 0; i < Application.LoadedScene.GameObjects.length; i++) {
			if(Application.LoadedScene.GameObjects[i].name=="Coin" )
				if( Application.LoadedScene.GameObjects[i].gridPos.x == this.gridPos.x 
					&& Application.LoadedScene.GameObjects[i].gridPos.y == this.gridPos.y){
					Application.LoadedScene.GameObjects.splice(i,1);
					i--;
					var posCoin = new Vector(Math.Random.RangeInt(0,this.grid.cases-1,true),Math.Random.RangeInt(0,this.grid.cases-1,true));
					Application.LoadedScene.GameObjects.push(new Coin(posCoin));
				for (var i = 0; i < this.grid.Tiles.length; i++) {
					if(this.grid.Tiles[i] == this.color){
						this.score ++;
						this.grid.Tiles[i] = "rgba(255,255,255,0)";
					}
				}				
			}
		}
	}
	this.Awake();
}