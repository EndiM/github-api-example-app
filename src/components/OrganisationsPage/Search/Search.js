import { h } from 'preact';
import style from './search-style';

const Search = ({ saveSearchRef, handleOrganisationSearch, clearState, handleKeyPress }) => {
	return (
		<div class={[style.wrapper, 'uk-flex'].join(' ')}>
			<div class={["uk-inline", style.inputWrapper].join(' ')}>
				<span class="uk-form-icon" uk-icon="icon: github" />
				<input type="search"
					spellcheck="false"
					class="uk-input"
					placeholder="type username"
					ref={saveSearchRef}
					onKeyPress={handleKeyPress}
					onInput={clearState} />
			</div>
			<button class={["uk-button uk-button-default", style.button].join(' ')} type="submit" onClick={handleOrganisationSearch}>Search</button>
		</div>
	);
};
export default Search;


