import * as userQueries from './users/queries';
import * as userMutations from './users/mutations';

import * as facilityQueries from './facilities/queries';
import * as facilityMutations from './facilities/mutations';

import * as reportQueries from './reports/queries';
import * as reportMutations from './reports/mutations';

const graphql = {
    queries: {
        users: userQueries,
        facilities: facilityQueries,
        reports: reportQueries,
    },
    mutations: {
        users: userMutations,
        facilities: facilityMutations,
        reports: reportMutations,
    },
};

export default graphql;