import {constantOrFormula} from '../helpers/values.js';
import {readAngle} from '../helpers/utils.js';

import Node from './Node.js';

export default class ExpandingNode extends Node {
	constructor(source, i, j) {
		super(source, i, j);
		if (source.expand) {
			this.expand = _.mapValues(source.expand, (item, key) => {
				let value = item;
				if (key === 'angle') {
					value = value || 0;
				}
				else if (key === 'distr') {
					value = value || 0.5;
				}
				return constantOrFormula(item, `${this.cursor}expand.${key}`);
			});
		}
		else if (source.expandedTo) {
			this.expandedTo = _.map(source.expandedTo, (point, k) => {
				return new Node(point, undefined, undefined, `${this.cursor}expandedTo.${k}.`);
			});
		}
	}

	readyToExpand(ops, index) {
		const cursorToLook = [
			`${this.cursor}expand.width`,
			`${this.cursor}expand.distr`,
			`${this.cursor}expand.angle`,
			`${this.cursor}x`,
			`${this.cursor}y`,
		];

		const done = _.take(ops, index + 1);

		//if all the op are done we should have a length 5 short because
		//we removed the 5 necessary cursor
		return _.difference(done, cursorToLook).length === done.length - cursorToLook.length;
	}

	static expand(computedNode) {
		//TODO remove readAngle once we convert all the angle to rad in the ptf
		const {x, y, expand: {width, angle, distr}} = computedNode;

		return [
			{
				x: x + Math.cos(readAngle(angle)) * width * distr,
				y: y + Math.sin(readAngle(angle)) * width * distr,
			},
			{
				x: x - Math.cos(readAngle(angle)) * width * (1 - distr),
				y: y - Math.sin(readAngle(angle)) * width * (1 - distr),
			},
		];
	}
}