/* eslint-disable @typescript-eslint/naming-convention */
import { BehaviorSubject, forkJoin, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

export class BaseService<Entity> {
  private createSubject<T>(initialValue: T) {
    return new BehaviorSubject<T>(initialValue);
  }

  isFetchingEntity = this.createSubject(false);
  errorFetchingEntity = this.createSubject<unknown>(null);
  entity = this.createSubject<Entity | null>(null);

  isFetchingEntities = this.createSubject(false);
  errorFetchingEntities = this.createSubject<unknown>(null);
  entities = this.createSubject<Entity[] | null>(null);

  isCreating = this.createSubject(false);
  errorCreating = this.createSubject<unknown>(null);
  entityCreated = this.createSubject<Entity | null>(null);

  isUpdating = this.createSubject(false);
  errorUpdating = this.createSubject<unknown>(null);
  entityUpdated = this.createSubject<Entity | null>(null);

  isDeleting = this.createSubject(false);
  errorDeleting = this.createSubject<unknown>(null);
  entityDeleted = this.createSubject<Entity | null>(null);

  protected fetchEntity(fetchApi$: Observable<Entity>): Observable<Entity> {
    return this.handleFetch(
      fetchApi$,
      this.entity,
      this.isFetchingEntity,
      this.errorFetchingEntity,
    );
  }

  protected fetchEntities(
    fetchApi$: Observable<Entity[]>,
  ): Observable<Entity[]> {
    return this.handleFetch(
      fetchApi$,
      this.entities,
      this.isFetchingEntities,
      this.errorFetchingEntities,
    );
  }

  protected createEntity(createApi: Observable<Entity>): Observable<Entity> {
    return this.handleFetch(
      createApi,
      this.entityCreated,
      this.isCreating,
      this.errorCreating,
    );
  }

  protected updateEntity(updateApi: Observable<Entity>): Observable<Entity> {
    return this.handleFetch(
      updateApi,
      this.entityUpdated,
      this.isUpdating,
      this.errorUpdating,
    );
  }

  protected deleteEntity(deleteApi: Observable<Entity>): Observable<Entity> {
    return this.handleFetch(
      deleteApi,
      this.entityDeleted,
      this.isDeleting,
      this.errorDeleting,
    );
  }

  protected fetchParallel<T>(listAPI: {
    [K in keyof T]: Observable<T[K]>;
  }): Observable<T> {
    return forkJoin(listAPI).pipe(
      catchError((error) => throwError(() => error)),
    );
  }

  private handleFetch<T>(
    fetchApi$: Observable<T>,
    dataSubject: BehaviorSubject<T | null>,
    loadingSubject: BehaviorSubject<boolean>,
    errorSubject: BehaviorSubject<unknown>,
  ): Observable<T> {
    loadingSubject.next(true);
    errorSubject.next(null);

    return fetchApi$.pipe(
      tap((data) => dataSubject.next(data)),
      catchError((error) => {
        errorSubject.next(error);

        return throwError(() => error);
      }),
      finalize(() => loadingSubject.next(false)),
    );
  }

  _updateEntity(entity: Entity) {
    this.entity.next(entity);
  }

  _updateEntities(entities: Entity[]) {
    this.entities.next(entities);
  }

  _resetEntity() {
    this.entity.next(null);
  }

  _resetEntities() {
    this.entities.next(null);
  }

  _resetEntityError() {
    this.errorFetchingEntity.next(null);
  }

  _resetEntitiesError() {
    this.errorFetchingEntities.next(null);
  }

  _resetEntityFetching() {
    this.isFetchingEntity.next(false);
  }

  _resetEntitiesFetching() {
    this.isFetchingEntities.next(false);
  }

  _resetCreating() {
    this.isCreating.next(false);
    this.errorCreating.next(null);
  }

  _resetUpdating() {
    this.isUpdating.next(false);
    this.errorUpdating.next(null);
  }

  _resetDeleting() {
    this.isDeleting.next(false);
    this.errorDeleting.next(null);
  }

  _resetEntityCreated() {
    this.entityCreated.next(null);
  }

  _resetEntityUpdated() {
    this.entityUpdated.next(null);
  }

  _resetEntityDeleted() {
    this.entityDeleted.next(null);
  }
}
