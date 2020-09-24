
const player1 = document.getElementById("health1");
const player2 = document.getElementById("health2");

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
