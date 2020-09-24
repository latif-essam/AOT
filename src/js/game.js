
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

}
