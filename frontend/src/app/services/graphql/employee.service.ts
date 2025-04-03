import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAllEmployees() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllEmployees {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).valueChanges;
  }

  addEmployee(data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddEmployee(
          $first_name: String!
          $last_name: String!
          $email: String!
          $gender: String!
          $designation: String!
          $salary: Float!
          $date_of_joining: String!
          $department: String!
        ) {
          addEmployee(
            first_name: $first_name
            last_name: $last_name
            email: $email
            gender: $gender
            designation: $designation
            salary: $salary
            date_of_joining: $date_of_joining
            department: $department
          ) {
            id
          }
        }
      `,
      variables: data
    });
  }

  getEmployeeById(id: string) {
    return this.apollo.query({
      query: gql`
        query ($id: ID!) {
          searchEmployeeByEid(id: $id) {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
          }
        }
      `,
      variables: { id },
      fetchPolicy: 'no-cache'
    });
  }

  updateEmployee(id: string, data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployee(
          $id: ID!,
          $first_name: String,
          $last_name: String,
          $email: String,
          $gender: String,
          $designation: String,
          $salary: Float,
          $department: String
        ) {
          updateEmployee(
            id: $id,
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            gender: $gender,
            designation: $designation,
            salary: $salary,
            department: $department
          ) {
            id
          }
        }
      `,
      variables: {
        id,
        ...data
      }
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id)
        }
      `,
      variables: { id }
    });
  }
}
