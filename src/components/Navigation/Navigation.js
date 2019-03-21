import { h } from 'preact';
import style from './navigation-style'; // eslint-disable-line no-unused-vars
import { Link } from 'preact-router/match';
import { connect } from 'redux-zero/react';
import { route } from 'preact-router';

const mapToProps = ({ breadcrumbs }) => ({ breadcrumbs });

const Navigation = ({ breadcrumbs }) => {
	return (
		<ul class={["uk-breadcrumb", style.navigation].join(' ')}>
			{
				breadcrumbs.map((b, i) => {
					if (b.name === 'back') {
						return <span style={{ cursor: "pointer" }} onClick={() => route('/')} uk-icon="icon: arrow-left" />;
					}
					if (b.link) {
						return <li><Link key={i} href={b.link}>{b.name}</Link></li>;
					}
					return <li key={i}><span>{b.name}</span></li>;
				})
			}
		</ul>
	);
};
export default connect(mapToProps)(Navigation);


