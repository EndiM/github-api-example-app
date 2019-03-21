import { h } from 'preact';
import style from './branch-style'; //eslint-disable-line no-unused-vars

const Branch = ({ branch }) => {
	return (
		<div class={style.branch} key={branch.name}>
			<span uk-icon="git-branch" />
			<span>{branch.name}</span>
		</div>
	);
};
export default Branch;


