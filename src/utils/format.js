export const formatJSONResponse = (data) => {
    if (data === '') return [];

    let rawJSON = data.replace('json', '');
    rawJSON = data.replace(/`/gi, '');

    return JSON.parse(rawJSON);
}