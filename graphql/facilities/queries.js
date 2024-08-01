import { gql } from '@apollo/client';

export const GET_FACILITY = gql`
  query GetFacility($id: ID!) {
    facility(_id: $id) {
      _id
      name
      nominialPower
      createdAt
      updatedAt
    }
  }
`;

export const USER_FACILITIES = gql`
  query UserFacilities {
    userFacilities {
      _id
      name
      nominialPower
    }
  }
`;
