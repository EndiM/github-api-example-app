import { h } from 'preact';
import style from './sort-style';

const iconSetup = {
	'desc': 'down',
	'asc': 'up'
};

const Sort = ({ by, handleSort, sortOptions }) => {
	const toggleOption = (option) => {
		return option.order === '' || option.order === 'asc' ? 'desc' : 'asc';
	};
	return (
		<div class={[style.sort].join(' ')}>
			{
				sortOptions.map((option,i) => {
					return (
						<button key={i} onClick={() => handleSort({ value: option.value, order: toggleOption(option) })} class="uk-button uk-button-default uk-button-small" type="button">
							{
								by === option.value ? <span key={option.name} uk-icon={`arrow-${iconSetup[option.order]}`} /> : ""
							}
							 <span>{option.name.toUpperCase()}</span>
						</button>
					);

				})
			}

		</div>
	);
};
export default Sort;


