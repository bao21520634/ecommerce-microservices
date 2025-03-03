export function transformFindArgsToGrpcQuery(args: any) {
    return {
        filter: args?.where ? JSON.stringify(args.where) : undefined,
        paging:
            args?.take || args?.skip
                ? {
                      limit: args?.take,
                      offset: args?.skip,
                  }
                : undefined,
        sorting: args?.orderBy?.map((order: any) => {
            const field = Object.keys(order)[0];
            return {
                field,
                direction: order[field] === 'asc' ? 0 : 1,
            };
        }),
    };
}
