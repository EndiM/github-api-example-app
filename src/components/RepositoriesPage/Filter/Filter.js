import { h } from 'preact';
import style from './filter-style.scss'; //eslint-disable-line no-unused-vars

const Filter = ({ by, handleFilter, languages, fetching }) => {
	return (
		<div class={style.wrapper}>
			<select
				class={[style.filter, "uk-select uk-form-small"].join(' ')}
				name="lang-filter"
				value={by} onChange={handleFilter}
				disabled={fetching}>
				<option value="" disabled selected>{fetching ? "Loading..." : "Filter by language"}</option>
				{
					Object.keys(languages).map((lang, i) => {
						return (
							<option key={i} value={lang}>{`${lang} - found ${languages[lang]}`}</option>
						);
					})
				}
			</select>
		</div>
	);
};
export default Filter;


