import { h } from 'preact';
import style from './branch-list'; // eslint-disable-line no-unused-vars
import Branch from '../Branch';
import Spinner from '../../Spinner';

const BranchList = ({ branches, fetching }) => {
	return (
		<div class={style.branchList}>
			<div class={style.count}>{branches.totalCount} branches found</div>
			<div>
				{
					fetching ? <div style={{ margin: "40px 20px" }}><Spinner ratio={3} /></div> :
						branches.items.map(branch => {
							return <Branch branch={branch} />;

						})
				}
			</div>
		</div>
	);
};
export default BranchList;


