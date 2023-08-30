import { environment } from "src/environments/environment.development";

// api login
export const API_URL_login = environment.apiUrl;

// api employees
export const API_URL_employee = environment.api_URL_employee;


export class END_POINTS {

  //  login
  public static login = API_URL_login + '/auth/login';

  //  get all employees / add / edit / delete
  public static employee = API_URL_employee + '/employee/employee-list';

}


