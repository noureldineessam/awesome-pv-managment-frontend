import { gql } from '@apollo/client';

export const GET_REPORT = gql`
  query GetReport($id: ID!) {
    report(_id: $id) {
      _id
      dataPoints {
        timestamp
        active_power_kW
        energy_kWh
      }
      createdAt
      updatedAt
    }
  }
`;

export const FACILITY_REPORTS = gql`
  query FacilityReports($facilityId: ID!) {
    facilityReports(facilityId: $facilityId) {
      dataPoints {
        timestamp
        active_power_kW
        energy_kWh
      }
      createdAt
      updatedAt
    }
  }
`;
