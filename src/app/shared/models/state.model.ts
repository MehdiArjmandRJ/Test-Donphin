export interface StateModel<T=any> {
  data:T;
}

export interface NameModel {
  name:string;
  family:string;
}

export interface JobModel {
  job:number;
}

export interface AgeModel {
  age:number;
}

export interface DataModelName {
  data:NameModel;
}

export interface DataModelJob {
  data:JobModel;
}

export interface DataModelAge {
  data:AgeModel;
}
