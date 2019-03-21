import { h } from 'preact';
import style from './repository-list'; //eslint-disable-line no-unused-vars
import Repository from '../Repository';
import Spinner from '../../Spinner';

const RepositoryList = ({ repositories: repos, orgName, fetching, sortBy }) => {
	return (
		<div class={style.repositoryList}>
			<div class={style.count}>{repos.totalCount} repositories found</div>
			<div>
				{
					fetching ? <div style={{ margin: "40px 20px" }}><Spinner ratio={3} /></div> :
						repos.items.map(repo => <Repository key={repo.id} repo={repo} orgName={orgName} sortBy={sortBy} />)
				}
			</div>
		</div>
	);
};
export default RepositoryList;


