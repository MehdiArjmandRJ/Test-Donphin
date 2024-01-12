import { Injectable } from '@angular/core';

import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { merge, Observable, share, tap, using } from 'rxjs';
class Action {}

type Dispatches<AG extends Record<string, new (payload: any) => Action>> = {
  [K in keyof AG]: ConstructorParameters<AG[K]>[0] extends undefined
    ? () => void
    : (payload: ConstructorParameters<AG[K]>[0]) => void;
};

type Selections<Selectors extends Record<string, any>> = {
  [K in keyof Selectors & string as `${K}$`]: Observable<
    ReturnType<Selectors[K]>
  >;
};

type Sources<AG extends Record<string, new (payload: any) => Action>> = {
  [K in keyof AG]: Observable<ConstructorParameters<AG[K]>[0]>;
};
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor () {

  }
  public validateFormFields(formGroup: RxFormGroup) {
    if (formGroup && formGroup.controls) {
      Object.keys(formGroup.controls).forEach((field: any) => {
        const control : any = formGroup.get(field);
        const controlsForm: any = control ? control['controls'] : {} 
        if (controlsForm) {
          Object.keys(controlsForm).forEach((f: any) => {
            const ct:any = control?.get(f);
            ct?.markAllAsTouched();
          });
        } else {
          control?.markAsTouched();
        }
      });
      return false;
    } else {
      return true;
    }
  }

  public parseObjectFaValues (obj: any) {
    let tempObj = obj;

    for (const key in tempObj) {
      if (typeof tempObj[key] === 'object') {
        this.parseObjectFaValues(tempObj[key]);
      } else {
        tempObj = {...tempObj, [key]: this.parseNumberToEn(tempObj[key])};
      }
    }

    return tempObj;
  }

  private parseNumberToEn(str: any) {
    if (typeof str === 'string') {
      str = str.replace(/[۰-۹]/g, (d: any): any => String('۰۱۲۳۴۵۶۷۸۹').indexOf(d));
    }
    return str;
  }

  public getFilterValues(values: any) {
    let filterStr = '';
    const filledValues:any = {};
    Object.keys(values).forEach((key: any) => {
      if (values[key] !== null && values[key] !== '') {
        filledValues[key] = values[key];
      }
    });

    Object.keys(filledValues).forEach((key: any, index: number) => {
      const value = filledValues[key];
      if (index === Object.keys(filledValues).length - 1) {
        filterStr += key + ':' + String(value);
      } else {
        filterStr += key + ':' + String(value) + ';';
      }
    });

    return filterStr;
  }

  createReactiveFacade<
    AG extends Record<string, new (payload: any) => Action>,
    Selectors extends Record<string, (s: any) => any>,
    S extends Partial<Sources<AG>>
  >(
    [actionGroup, selectors]: [AG, Selectors],
    sources: S
  ): Dispatches<AG> & Selections<Selectors> {
    const store = this.store,
      facade = {} as any;

    // Create action dispatchers
    for (const actionName in actionGroup) {
      facade[actionName] = ((firstArg: any) => {

        store.dispatch(new actionGroup[actionName](firstArg));
      })as any;
    }

    // Create source stream that dispatches actions
    // Different from StateAdapt.
    // In StateAdapt, each source can cause multiple state changes.
    // Here, each source is represented one-to-one by an action.
    // Multiple reducers can react to single actions.
    // This is merely a substitute for the `using` syntax.
    const requiredSources = [];
    for (const actionName in sources) {
      requiredSources.push(sources[actionName]?.pipe(tap(facade[actionName])));
    }
    const requireSources$ = merge(...requiredSources).pipe(share());

    // Wrap selectors in `using` to pass subscriptions to required sources
    for (const selectorName in selectors) {
      const newName = `${selectorName}$`;
      facade[newName as keyof typeof facade] = using(
        () => requireSources$.subscribe(),
        () => store.select(selectors[selectorName])
      ) as any;
    }

    return facade;
  }


}
