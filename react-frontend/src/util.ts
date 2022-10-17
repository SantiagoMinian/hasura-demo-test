export const itemsPerPage = 10;

function lastPage(count: number): number {
    return Math.floor(count / itemsPerPage) + (count % itemsPerPage === 0 ? 0 : 1);
}

export function calculatePagination(count: number, itemsPerPage: number, currentOffset: number) {
    const pages = lastPage(count ?? 0);
    const offsetPage = Math.floor(currentOffset / itemsPerPage) + 1
    const currentPage = Math.min(offsetPage, pages);

    return { pages, offsetPage, currentPage };
}