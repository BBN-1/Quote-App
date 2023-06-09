import  * as request from "./requester";

const baseUrl = "http://localhost:3030/data/comments";

export const create = async (quoteId, quoteSnippet,  comment, anonymous) => {
    const res = await request.post(baseUrl, {quoteId, quoteSnippet, text:comment, hide:anonymous});
    
    
    return res;
    
}

export const getByQuoteId = (quoteId) => {
    const relations = encodeURIComponent(`user=_ownerId:users`);
    const search = encodeURIComponent(`quoteId="${quoteId}"`);

    return request.get(`${baseUrl}?where=${search}&load=${relations}`);
}

export const deleteComment = async (id) => {
    const res = await request.del(`${baseUrl}/${id}`);
    return res;
}

export const editComment = async (id, comment) => {
    const commentReq = await request.put(`${baseUrl}/${id}`, comment);

    return commentReq;
}

export const getOneComment = async (id) => {
    const one = await request.get(`${baseUrl}/${id}`);

    return one;
}

export const getAllCommentsByUser = async (ownerId) => {
    const search = encodeURIComponent(`_ownerId="${ownerId}"`);
    const comments = await request.get(`${baseUrl}?where=${search}`);

    return comments;
}

export const getAllComments = async () => {
    const comments = await request.get(baseUrl);

    return comments;
}