import { h, render } from 'preact';  // eslint-disable-line no-unused-vars
import { expect } from 'chai';
import sort from './sort';

describe('helper utilities', () => {
	describe('sort', () => {
		let data = [];
		beforeEach(() => {
			data = [
				{
					stars: 4,
					forks: 10,
					issues: 1
				},
				{
					stars: 6,
					forks: 20,
					issues: 6
				},
				{
					stars: 8,
					forks: 15,
					issues: 11
				}
			];
		});
		it('should return sorted array by property stars descending', () => {
			expect(sort(data, 'stars', 'desc')[0]).to.haveOwnProperty('stars').is.equal(8);
		});
		it('should return sorted array by property forks ascending', () => {
			expect(sort(data, 'forks', 'asc')[0]).to.haveOwnProperty('forks').is.equal(10);
		});
		it('should sort descending if no order is passed', () => {
			expect(sort(data, 'stars')[0]).to.haveOwnProperty('stars').is.equal(8);
		});

	});

});
