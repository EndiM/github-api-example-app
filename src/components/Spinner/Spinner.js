import { h } from 'preact';
import style from './spinner-style'; //eslint-disable-line no-unused-vars

const Spinner = ({ ratio = 1 } = {}) => {
	return (
		<div class={style.spinner}>
			<span uk-spinner={`ratio: ${ratio}`}/>
		</div>
	);
};

export default Spinner;


