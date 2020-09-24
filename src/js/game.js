
const player1 = document.getElementById("health1");
const player2 = document.getElementById("health2");

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
