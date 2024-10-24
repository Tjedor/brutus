import { PersonRepository } from "../../repository/personRepository";

export const buildGetPeople = (peopleRepository: PersonRepository) => {
  return async (
    offset: number,
    pageSize: number,
    filter: {
      searchTerm?: string;
    }
  ) => {
    const results = await peopleRepository.getMany(offset, pageSize, filter);

    const searchParam = filter.searchTerm ? `&search=${filter.searchTerm}` : "";

    const nextUrlParams = `?offset=${
      offset + pageSize
    }&pageSize=${pageSize}${searchParam}`;

    const previous = offset - pageSize;
    if (previous < 0) {
      offset = 0;
    }

    const previousUrlParams = `?offset=${
      offset - pageSize
    }&pageSize=${pageSize}${searchParam}`;

    return {
      people: results,
      next: results.length === pageSize ? nextUrlParams : null,
      previous: offset > 0 ? previousUrlParams : null,
    };
  };
};
