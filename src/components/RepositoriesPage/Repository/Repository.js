import { h } from 'preact';
import style from './repository-style.scss'; //eslint-disable-line no-unused-vars
import { route } from 'preact-router';

const Repository = ({ repo, orgName, sortBy }) => {
	return (
		<div key={repo.id} onClick={() => route(`/${orgName}/${repo.name}/branches`)} class={style.repository}>
			<div style={{ textTransform: "uppercase" }} >
				<span>{repo.name}</span>
				<span class={["uk-label uk-label-success", sortBy === "starCount" ? style.current : ""].join(' ')}>{repo['starCount']} stars</span>
				<span class={["uk-label uk-label-success", sortBy === "forkCount" ? style.current : ""].join(' ')}>{repo['forkCount']} forks</span>
				<span class={["uk-label uk-label-success", sortBy === "issueCount" ? style.current : ""].join(' ')}>{repo['issueCount']} issues</span>
				<span class="uk-label">{repo['language']}</span>
			</div>
		</div>

	);
};
export default Repository;


