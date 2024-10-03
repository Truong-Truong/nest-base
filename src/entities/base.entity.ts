export class BaseEntity {
  protected sortFields: string[] = [];

  sortables() {
    return this.sortFields;
  }

  toOrderBy(field: string, direction: string) {
    const ascDesc = direction === '1' ? 'DESC' : 'ASC';
    const order: any = {};
    order[field] = ascDesc;
    return order;
  }
}
