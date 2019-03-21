import { h } from 'preact';
import style from './pagination-style'; //eslint-disable-line no-unused-vars

const Pagination = ({ handlePageChange, pageInfo }) => {
	return (
		<div class={[style.pagination].join()} >
			<div class="uk-float-left">
				<button class="uk-button uk-button-default uk-button-small" onClick={() => handlePageChange('previous')} disabled={!pageInfo.hasPreviousPage}>Previous</button>
			</div>
			<div class="uk-float-right">
				<button class="uk-button uk-button-default uk-button-small" onClick={() => handlePageChange('next')} disabled={!pageInfo.hasNextPage}>Next</button>
			</div>
		</div>
	);
};
export default Pagination;


