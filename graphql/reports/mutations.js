import { gql } from '@apollo/client';

export const CREATE_REPORT = gql`
  mutation CreateReport($report: ReportCreateInput!, $facilityId: ID!) {
    createReport(report: $report, facilityId: $facilityId) {
      _id
      dataPoints {
        timestamp
        active_power_kW
        energy_kWh
      }
    }
  }
`;

export const DELETE_REPORT = gql`
  mutation DeleteReport($id: ID!, $facilityId: ID!) {
    deleteReport(_id: $id, facilityId: $facilityId)
  }
`;
