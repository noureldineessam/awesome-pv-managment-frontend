import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($user: UserCreateInput!) {
    createUser(user: $user) {
      _id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $user: UserUpdateInput!) {
    updateUser(_id: $id, user: $user) {
      _id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(_id: $id)
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;
