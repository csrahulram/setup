import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient:HttpClient) { 
    this.httpClient.get('/api/read').subscribe((data: any) => {console.log(data)});
  }


}
