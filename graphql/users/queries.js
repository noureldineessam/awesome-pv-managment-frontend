import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(_id: $id) {
      _id
      name
      email
      facilities {
        _id
        name
      }
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

