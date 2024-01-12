import {Observable} from 'rxjs';
import {DataModelAge, DataModelJob, DataModelName} from '@app/shared/models/state.model';

export interface FacadeDashboardModel{
    nameData$:Observable<DataModelName[]>;
    jobData$:Observable<DataModelJob[]>;
    ageData$:Observable<DataModelAge[]>;
}
