
const player1 = document.getElementById("health1");
const player2 = document.getElementById("health2");

// store all the weapons and their power
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
		this.weapon = null ;
		this.player = null ;
	}
}

class Weapon {
	/**
	 * @param name {string}
	 * @param position {ItemPosition}
	 * @param power {number}
	 */
	constructor(name,position, power) {
		this.position = position;
		this.power = power;
		this.name = name ;
	}
}
class Player {
	/**
	 *
	 * @param name {string}
	 * @param title {string}
	 * @param turn {boolean}
	 */
	constructor(name,title,turn) {
		this.name = name ;
		this.title = title ;
		this.health = 100 ;
		this.power = 10 ;
		this.img = '' ;
		this.turn = turn ;
		this.position = null ;
	}
}
class Game {
	constructor() {
		this.container = $('#game-container');
		/**
		 *
		 * @type {BoardBox[]}
		 */
		this.boxes = [];
		this.players = this.initializePlayers()
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
	createObstacles = () => {
		// creating number of walls
		let numberOfObstaclesCreated = 0;
		while (numberOfObstaclesCreated < 10) {
			// getting random cell selections by (x,y)

			const randomX = Utils.randomNumber(1, 8);
			const randomY = Utils.randomNumber(1, 8);
			const box = this.getBoxItemAtPosition(randomX,randomY) ;
			if (
				box.isEmpty
			) {
				box.isEmpty = false;
				box.filledWith = ItemTypes.OBSTACLE;
				box.element.classList.add('unavailable');
				numberOfObstaclesCreated++;
			}

		}
	};
	createWeapons = () => {
		let numberOfCreatedWeapons = 0;
		while (numberOfCreatedWeapons < 4) {
			// getting random cell selections by (x,y)
			const randomX = Utils.randomNumber(1, 8);
			const randomY = Utils.randomNumber(1, 8);
			const box = this.getBoxItemAtPosition(randomX, randomY);
			if (box.isEmpty) {
				const currentWeapon = weapons[numberOfCreatedWeapons]
				box.isEmpty = false;
				box.filledWith = ItemTypes.WEAPON ;
				box.weapon = new Weapon(currentWeapon.name,
					new ItemPosition(box.position.x,box.position.y),currentWeapon.power)
				box.element.classList.add(currentWeapon.name);
				numberOfCreatedWeapons++;
			}
		}
	};
	createPlayers = () => {
		// getting random cell selections by (x,y)
		// player 1
		let numberOfPlayersCreated = 0 ;
		while (numberOfPlayersCreated < 2 ){
			// player 1
			const randomXPlayer1 = Utils.randomNumber(0, 9);
			const randomYPlayer1 = Utils.randomNumber(0, 1);
			// player 2
			const randomXPlayer2 = Utils.randomNumber(1, 9);
			const  randomYPlayer2 = Utils.randomNumber(9, 0);

			const box1 = this.getBoxItemAtPosition(randomXPlayer1,randomYPlayer1) ;
			const box2 = this.getBoxItemAtPosition(randomXPlayer2,randomYPlayer2);
			if (box1.isEmpty) {
				box1.isEmpty = false ;
				box1.element.classList.add(this.players[0].name)
				box1.filledWith = ItemTypes.PLAYER ;
				box1.player = this.players[0].title ;
				// add player 1  new position
				this.players[0].position = new ItemPosition(box1.position.x , box1.position.y)
				numberOfPlayersCreated++ ;
			}
			if(box2.isEmpty){
				box2.isEmpty = false ;
				box2.element.classList.add(this.players[1].name)
				box2.filledWith = ItemTypes.PLAYER ;
				box2.player = this.players[1].title ;
				// add player 2 new position
				this.players[1].position = new ItemPosition(box2.position.x , box2.position.y)
				numberOfPlayersCreated++ ;
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


}
