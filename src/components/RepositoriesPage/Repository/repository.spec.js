import { h } from 'preact';
import { expect } from 'chai';
import { shallow } from 'preact-render-spy';
import Repository from './Repository';

describe('Repository Component', () => {

	let repo = {
		id: 1,
		name: "repo-1",
		starCount: 1,
		forkCount: 2,
		issueCount: 3
	};

	it('should render div element with class repository', () => {
		const context = shallow(<Repository repo={repo} orgName={'org-1'} />);
		expect(context.find('.repository')).to.be.ok;
	});

	it('should render five span elements inside nested div element', () => {
		const context = shallow(<Repository repo={repo} orgName={'org-1'} />);
		expect(context.find('span').length).to.be.equal(5);
	});
});
