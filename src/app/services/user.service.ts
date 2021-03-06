import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/user/${id}`);
  }
  getnumOfTutorial() {
    return this.http.get(`${baseUrl}/query/numOfTutorial`);
  }
  findExistsUse(uname,psw) {
    return this.http.get(`${baseUrl}/query/findExistsUse?&uname=${uname}&psw=${psw}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  init(data) {
    return this.http.post(`${baseUrl}/initUser`,data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByUserName(name) {
    return this.http.get(`${baseUrl}?username=${name}`);
  }

  findByParams(status, name, faculty)
  {
    return this.http.get(`${baseUrl}?status=${status}&username=${name}&faculty=${faculty}`);
  }

  findByStatus(status) {
    return this.http.get(`${baseUrl}?status=${status}`);
  }

  findByFaculty(faculty) {
    return this.http.get(`${baseUrl}?faculty=${faculty}`);
  }


}
