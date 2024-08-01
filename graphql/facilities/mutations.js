import { gql } from '@apollo/client';

export const CREATE_FACILITY = gql`
  mutation CreateFacility($facility: FacilityCreateInput!) {
    createFacility(facility: $facility) {
      _id
      name
      nominialPower
    }
  }
`;

export const UPDATE_FACILITY = gql`
  mutation UpdateFacility($id: ID!, $facility: FacilityUpdateInput!) {
    updateFacility(_id: $id, facility: $facility) {
      _id
      name
      nominialPower
    }
  }
`;

export const DELETE_FACILITY = gql`
  mutation DeleteFacility($id: ID!) {
    deleteFacility(_id: $id)
  }
`;
