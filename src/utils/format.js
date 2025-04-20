export const formatJSONResponse = (data) => {
    if (data === '') return [];

    let rawJSON = data.replace('json', '');
    rawJSON = rawJSON.replace(/`/gi, '');
    console.log(rawJSON);

    return JSON.parse(rawJSON);
}