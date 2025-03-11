export function mapSearchResponse(
    esResponse: any,
    page: number,
    pageSize: number,
) {
    const { hits, aggregations } = esResponse;

    // Calculate metadata
    const totalResults = hits.total.value;
    const totalPages = Math.ceil(totalResults / pageSize);

    const mappedHits = hits.hits.map((hit: any) => ({
        id: hit._id,
        score: hit._score,
        indexName: hit._index,
        document: Buffer.from(JSON.stringify(hit._source)),
        highlights: mapHighlights(hit.highlight),
    }));

    const mappedAggregations: Record<string, Buffer> = {};
    if (aggregations) {
        Object.entries(aggregations).forEach(([key, value]) => {
            mappedAggregations[key] = Buffer.from(JSON.stringify(value));
        });
    }

    return {
        metadata: {
            totalResults,
            page,
            pageSize,
            totalPages,
        },
        hits: mappedHits,
        aggregations: mappedAggregations,
    };
}

// Helper function to map highlight objects
function mapHighlights(highlight: any) {
    if (!highlight) {
        return {};
    }

    const result: Record<string, string> = {};
    Object.entries(highlight).forEach(([field, snippets]: [string, any]) => {
        result[field] = Array.isArray(snippets)
            ? snippets.join(' ... ')
            : snippets.toString();
    });

    return result;
}
