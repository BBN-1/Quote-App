import * as request from "./requester";

const baseUrl = "http://localhost:3030/data/quotes";

//services for API

export const getLastThree = async () => {
    const all = await request.get(baseUrl);
    const lastThreeQuotes = all.splice(-3);

    return lastThreeQuotes;
};

export const getAll = async () => {
    const all = await request.get(baseUrl);

    return all;
};

export const getOne = async (id) => {
    const one = await request.get(`${baseUrl}/${id}`);

    return one;
};

export const getByAuthorName = async (authorName) => {
    const search = encodeURIComponent(`author="${authorName}"`);
    const quotes = await request.get(`${baseUrl}?where=${search}`);

    return quotes;
};

export const createQuote = async (quote) => {
    const quoteReq = await request.post(baseUrl, quote);

    return quoteReq;
};

export const editQuote = async (id, quote) => {
    const quoteReq = await request.put(`${baseUrl}/${id}`, quote);

    return quoteReq;
};

export const deleteQuote = async (id) => {
    const res = await request.del(`${baseUrl}/${id}`);
    return res;
};

export const getAllQuotesByAuthor = async (ownerId) => {
    const search = encodeURIComponent(`_ownerId="${ownerId}"`);
    const quotes = await request.get(`${baseUrl}?where=${search}`);

    return quotes;
};

export const getRandomeQuote = async () => {
    const all = await request.get(baseUrl);
    const randomQuote = all[Math.floor(Math.random() * all.length)];

    return randomQuote;
};

//services for local data

export const getOneLocal = (array, id) => {
    return array.find((quote) => quote.key === id) || null;
};

export const getAllByAuthor = (array, author) => {
    return array.filter((quote) => quote.author === author);
};
