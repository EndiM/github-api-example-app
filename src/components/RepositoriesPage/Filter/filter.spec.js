import { h } from 'preact';
import { expect } from 'chai';
import { shallow } from 'preact-render-spy';
import Filter from './Filter';

describe('Filter Component', () => {

	let languages = {
		'javascript': 1,
		'java': 1,
		'objective-c': 1,
		'c#': 1
	};

	it('should render 4 languages and label option in select', () => {
		const handleFilter = jest.fn();
		const context = shallow(<Filter by={''}
			handleFilter={handleFilter}
			languages={languages}
			fetching={false} />);
		expect(context.find('option').length).to.be.equal(5);
		expect(context.find('option').at(1).attr('value')).to.be.equal('javascript');
	});

	it('should display loading... text when fetching is set to true', () => {
		const handleFilter = jest.fn();
		const context = shallow(<Filter by={''}
			handleFilter={handleFilter}
			languages={languages}
			fetching={true} />);
		expect(context.find('option').at(0).text()).to.be.equal('Loading...');
	});

	it('should call handleFilter when use changes filter value', () => {
		const handleFilter = jest.fn();
		const context = shallow(<Filter by={''}
			handleFilter={handleFilter}
			languages={languages}
			fetching={false} />);
		context.find('[onChange]').simulate('change');
		expect(handleFilter.mock.calls.length).to.be.equal(1);
	});

});
