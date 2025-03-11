module.exports = function (doc) {
    doc._es_meta = {
        index: {
            index_patterns: ['products'],
            settings: {
                analysis: {
                    analyzer: {
                        edge_ngram_analyzer: {
                            type: 'custom',
                            tokenizer: 'standard',
                            filter: ['lowercase', 'edge_ngram_filter'],
                        },
                        search_analyzer: {
                            type: 'custom',
                            tokenizer: 'standard',
                            filter: ['lowercase'],
                        },
                    },
                    filter: {
                        edge_ngram_filter: {
                            type: 'edge_ngram',
                            min_gram: 2,
                            max_gram: 20,
                        },
                    },
                },
            },
            mappings: {
                dynamic_templates: [
                    {
                        all_text_fields: {
                            match_mapping_type: 'string',
                            mapping: {
                                type: 'text',
                                analyzer: 'edge_ngram_analyzer',
                                search_analyzer: 'search_analyzer',
                            },
                        },
                    },
                ],
            },
        },
    };

    return doc;
};
