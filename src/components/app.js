import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'redux-zero/preact';
import configureStore from '../store/configureStore';
// Code-splitting is automated for routes
import OrganisationsPage from './OrganisationsPage';
import RepositoriesPage from './RepositoriesPage';
import BranchesPage from './BranchesPage';
import Navigation from './Navigation';
import NotFoundPage from './NotFoundPage';

import { initialState } from '../store/initialState';
const store = configureStore(initialState);

export default class App extends Component {

	render() {

		return (
			<div id="app" class="uk-light">
				<Provider store={store}>
					<div>
						<Navigation />
						<Router>
							<OrganisationsPage path="/" />
							<RepositoriesPage path="/:orgName/repos" />
							<BranchesPage path="/:orgName/:repoName/branches" />
							<div class="default-route" default>
								<NotFoundPage />
							</div>
						</Router>
					</div>
				</Provider>
			</div>
		);
	}
}
