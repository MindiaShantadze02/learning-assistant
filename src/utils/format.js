export const formatJSONResponse = (data) => {
    if (data === '') return [];

    let rawJSON = data.replace('json', '');
    rawJSON = rawJSON.replace(/`/gi, '');

    return JSON.parse(rawJSON);
}