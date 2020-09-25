const player1HealthElement = document.getElementById('health1');
const player2HealthElement = document.getElementById('health2');

// store all the weapons and their power

// default and the main weapon for each player
const defaultWeapon = {
	name:'main',
	power:10
};

const weapons = [
	{
		name: 'weapon1',
		power: 20,
	},
	{
		name: 'weapon2',
		power: 50,
	},
	{
		name: 'weapon3',
		power: 70,
	},
	{
		name: 'weapon4',
		power: 35,
	},
];
class Utils {
	/**
	 *
	 * @param from {number}
	 * @param to {number}
	 *  @returns {number} the random generated number
	 */
	static randomNumber(from, to) {
		return Math.floor(Math.random() * to) + from;
	}
}
class ItemTypes {
	static PLAYER = 'PLAYER';
	static OBSTACLE = 'OBSTACLE';
	static WEAPON = 'WEAPON';
}
/**
 * store the position of an item using its x and y
 */
class ItemPosition {
	/**
	 *
	 * @param x {number} x-axis position (row)
	 * @param y {number} y-axis position (column)
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
class BoardBox {
	/**
	 *
	 * @param position {ItemPosition}
	 * @param element {HTMLElement}
	 * @param index {number}
	 */
	constructor(position, element, index) {
		this.position = position;
		this.element = element;
		this.index = index;
		this.isEmpty = true;
		this.filledWith = null;
		this.weapon = null;
		this.player = null;
	}
}

class Weapon {
	/**
	 * @param name {string} the weapon name used for css classes
	 * @param position {ItemPosition} the weapon position (x,y)
	 * @param power {number} the weapon power
	 * @param index {number} the weapon index at the weapons Array;
	 */
	constructor(name, position, power, index) {
		this.position = position;
		this.power = power;
		this.name = name;
		this.index = index;
	}
}
class Player {
	/**
	 *
	 * @param name {string}
	 * @param title {string}
	 * @param turn {boolean}
	 */
	constructor(name, title, turn) {
		this.name = name;
		this.title = title;
		this.health = 100;
		this.power = 10;
		this.img = '';
		this.turn = turn;
		this.position = null;
		this.currentBox = null;
		this.currentWeapon = new Weapon('main',null,10,-1) ;
		this.oldWeapon = null ;
		this.oldBox = null ;
	}
}
class Game {
	constructor() {
		this.container = document.getElementById('game-container');
		/**
		 *
		 * @type {BoardBox[]}
		 */
		this.boxes = [];
		this.players = this.initializePlayers();

		this.generateMap()
		this.placeObstacles(15);
		this.placeWeapons();
		this.placePlayers()

		this.currentPlayer = this.players[0] ;
		/**
		 *
		 * @type {HTMLElement[]}
		 */
		this.currentElementsToMoveIn = [] ;
		this.boxesToMoveIn = this.calculateAvailableBoxes() ;
		this.makeHoverEffect() ;
	}
	generateMap() {
		let itemIndex = 0;
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				const element = document.createElement('div');
				element.className = 'grid-item';
				const box = new BoardBox(new ItemPosition(i, j), element, itemIndex);
				this.boxes.push(box);
				this.container.append(box.element);
				itemIndex++;
			}
		}
	}

	/**
	 *
	 * @param numberOfObstacles {number} number of obstacles to place in the board
	 */
	placeObstacles = (numberOfObstacles) => {
		// creating number of walls
		let numberOfObstaclesCreated = 0;
		while (numberOfObstaclesCreated < numberOfObstacles) {
			// getting random cell selections by (x,y)

			const randomX = Utils.randomNumber(1, 8);
			const randomY = Utils.randomNumber(1, 8);
			const box = this.getBoxItemAtPosition(randomX, randomY);
			if (box.isEmpty) {
				box.isEmpty = false;
				box.filledWith = ItemTypes.OBSTACLE;
				box.element.classList.add('unavailable');
				numberOfObstaclesCreated++;
			}
		}
	};
	placeWeapons = () => {
		let numberOfCreatedWeapons = 0;
		while (numberOfCreatedWeapons < 4) {
			// getting random cell selections by (x,y)
			const randomX = Utils.randomNumber(1, 8);
			const randomY = Utils.randomNumber(1, 8);
			const box = this.getBoxItemAtPosition(randomX, randomY);
			if (box.isEmpty) {
				const currentWeapon = weapons[numberOfCreatedWeapons];
				box.isEmpty = false;
				box.filledWith = ItemTypes.WEAPON;
				box.weapon = new Weapon(
					currentWeapon.name,
					new ItemPosition(box.position.x, box.position.y),
					currentWeapon.power,
					numberOfCreatedWeapons,
				);
				box.element.classList.add(currentWeapon.name);
				numberOfCreatedWeapons++;
			}
		}
	};
	placePlayers = () => {
		// getting random cell selections by (x,y)
		// player 1
		let numberOfPlayersCreated = 0;
		while (numberOfPlayersCreated < 2) {
			// player 1
			const randomXPlayer1 = Utils.randomNumber(0, 9);
			const randomYPlayer1 = Utils.randomNumber(0, 1);
			// player 2
			const randomXPlayer2 = Utils.randomNumber(1, 9);
			const randomYPlayer2 = Utils.randomNumber(9, 0);

			const box1 = this.getBoxItemAtPosition(randomXPlayer1, randomYPlayer1);
			const box2 = this.getBoxItemAtPosition(randomXPlayer2, randomYPlayer2);
			if (box1.isEmpty) {
				box1.isEmpty = false;
				box1.element.classList.add(this.players[0].name);
				box1.filledWith = ItemTypes.PLAYER;
				box1.player = this.players[0].title;
				// add player 1  new position
				this.players[0].position = new ItemPosition(
					box1.position.x,
					box1.position.y,
				);
				this.players[0].currentBox = box1;
				numberOfPlayersCreated++;
			}
			if (box2.isEmpty) {
				box2.isEmpty = false;
				box2.element.classList.add(this.players[1].name);
				box2.filledWith = ItemTypes.PLAYER;
				box2.player = this.players[1].title;
				// add player 2 new position
				this.players[1].position = new ItemPosition(
					box2.position.x,
					box2.position.y,
				);
				this.players[1].currentBox = box2;
				numberOfPlayersCreated++;
			}
		}
	};
	/**
	 *
	 * @param x {number}
	 * @param y {number}
	 * @returns {BoardBox}
	 */
	getBoxItemAtPosition(x, y) {
		return this.boxes.find(
			(box) => box.position.x === x && box.position.y === y,
		);
	}

	/**
	 *
	 * @returns {Player[]}
	 */
	initializePlayers() {
		const p1 = new Player('player_one', 'player1', true);
		const p2 = new Player('player_two', 'player2', false);
		return [p1, p2];
	}

	calculateAvailableBoxes() {
		this.clearUIEffects() ;
		const boxesToMoveIn = {
			top:[],
			left:[],
			right:[],
			bottom:[]
		}
		const {x,y} = this.currentPlayer.currentBox.position ;
		// availableTopBoxes
		for(let i = 1 ; i < 4;i++) {
			const nextTopBox  = this.getBoxItemAtPosition(x-i,y) ;

			if(!nextTopBox) {
				break ; 
			}
			// we can't move if we find obstacles
			if(nextTopBox && nextTopBox.filledWith === ItemTypes.OBSTACLE) {
				break ;
			}
			if(nextTopBox && (nextTopBox.isEmpty || nextTopBox.filledWith === ItemTypes.WEAPON)) {
				boxesToMoveIn.top.push(nextTopBox) ;
				this.currentElementsToMoveIn.push(nextTopBox.element) ;
			}
		}
		// availableBottomBoxes
		for(let i = 1 ; i < 4;i++) {
			const nextTopBox  = this.getBoxItemAtPosition(x+i,y) ;
			// we can't move if we find obstacles
			if(nextTopBox && nextTopBox.filledWith === ItemTypes.OBSTACLE) {
				break ;
			}
			if(nextTopBox && (nextTopBox.isEmpty || nextTopBox.filledWith === ItemTypes.WEAPON)) {
				boxesToMoveIn.bottom.push(nextTopBox) ;
				this.currentElementsToMoveIn.push(nextTopBox.element) ;

			}
		}
		// availableLeftBoxes
		for(let i = 1 ; i < 4;i++) {
			const nextTopBox  = this.getBoxItemAtPosition(x,y-i) ;
			// we can't move if we find obstacles
			if(nextTopBox && nextTopBox.filledWith === ItemTypes.OBSTACLE) {
				break ;
			}
			if(nextTopBox && (nextTopBox.isEmpty || nextTopBox.filledWith === ItemTypes.WEAPON)) {
				boxesToMoveIn.left.push(nextTopBox) ;
				this.currentElementsToMoveIn.push(nextTopBox.element) ;

			}
		}
		// availableRightBoxes
		for(let i = 1 ; i < 4;i++) {
			const nextTopBox  = this.getBoxItemAtPosition(x,y+i) ;
			// we can't move if we find obstacles
			if(nextTopBox && nextTopBox.filledWith === ItemTypes.OBSTACLE) {
				break ;
			}
			if(nextTopBox && (nextTopBox.isEmpty || nextTopBox.filledWith === ItemTypes.WEAPON)) {
				boxesToMoveIn.right.push(nextTopBox) ;
				this.currentElementsToMoveIn.push(nextTopBox.element) ;

			}
		}
		return boxesToMoveIn;
	}

	makeHoverEffect() {
		if(this.currentElementsToMoveIn) {
			this.currentElementsToMoveIn.forEach(element=>{
				element.classList.add('box-hover')
				element.addEventListener('click',this.clickHandler);
			})
		}
	}
	clearUIEffects(){
		if(this.currentElementsToMoveIn) {
			this.currentElementsToMoveIn.forEach(element=>{
				element.classList.remove('box-hover')
				element.removeEventListener('click',this.clickHandler);
			})
		}
		this.currentElementsToMoveIn = [] ;

	}

	clickHandler() {

	}
}
// generate new game
const game = new Game();


// select the element of each player own board
const player1StatusSection = document.getElementById('player1');
const player2StatusSection = document.getElementById('player2');
const Player1PowerElement = document.querySelector('#power1');
const Player2PowerElement = document.querySelector('#power2');

const setPlayerValues = () => {
	player1HealthElement.innerHTML = game.players[0].health.toString();
	player2HealthElement.innerHTML = game.players[1].health.toString();
	Player1PowerElement.innerHTML = game.players[0].power.toString();
	Player2PowerElement.innerHTML = game.players[1].power.toString();
};
setPlayerValues();
