import { h } from 'preact';
import style from './per-page-style.scss'; //eslint-disable-line no-unused-vars

const PerPage = ({ perPage, fetching, onChange }) => {
	return (
		<div class={style.wrapper}>
			<select
				class={[style.perPage, "uk-select uk-form-small"].join(' ')}
				name="per-page-option"
				value={perPage} onChange={onChange}
				disabled={fetching}>
				{
					Array.from(new Array(5), (val, index) => {
						return <option key={index} value={(index + 1) * 10}>{(index + 1) * 10}</option>;
					})
				}
			</select>
		</div>
	);
};
export default PerPage;


