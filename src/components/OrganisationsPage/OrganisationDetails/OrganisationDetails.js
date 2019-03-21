import { h } from 'preact';
import style from './organisation-details';
import Spinner from '../../Spinner';
import { route } from 'preact-router';

const OrganisationDetails = ({ organisation: org, fetching, notFound }) => {
	return (
		<div class={["uk-placeholder", style.wrapper].join(' ')}>
			{
				fetching && <Spinner ratio={3} />
			}
			<div style={{ height: "100%" }}>
				{
					!fetching && org.id &&

					<div onClick={() => route(`/${org.login}/repos`)} key={org.id} class={[style.detailsWrapper, ""].join(' ')}>

						<div class={[style.avatar, "uk-width-auto uk-first-column"].join(' ')}>
							<img class="" src={org.avatarUrl} width="100" height="100" alt="" />
						</div>
						<div class={[style.content, "uk-width-expand"].join(' ')}>
							<h4 class=""><span>{org.name || org.login}</span></h4>
							<div class={style.stats}>
								<span class={style.item}>Total repositories: <code>{org.repositories.totalCount}</code></span>
								<span class={style.item}><span uk-icon="icon: location" />{org.location}</span>
							</div>

						</div>
					</div>
				}
				{
					notFound && <div class={style.notFound}><span>Not Found</span></div>
				}
			</div>
		</div>
	);
};
export default OrganisationDetails;


