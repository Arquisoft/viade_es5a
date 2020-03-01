
import { SolidTypesHelper } from './../solid';
import { ldflexHelper, storageHelper } from '@utils';
import { namedNode, literal } from '@rdfjs/data-model';
import ldflex from '@solid/query-ldflex';

let isCreatedStructure = false;
export const createInitialStructure = async (webId) => {
  isCreatedStructure = isCreatedStructure || await storageHelper.createInitialFiles(webId);
  return isCreatedStructure;
}

export const addToGraph = async (webId, obj, lit, filename = 'data.ttl', predicate = 'schema:hasPart') => {
  const insert = lit ? literal(obj) : namedNode(obj);
  await ldflex[`${await getAppPathStorage(webId)}${filename}`][predicate].add(insert);
}

export const fetchRawData = async (url, context) => {
  try {
    const obj = await ldflexHelper.fetchLdflexDocument(url);
    if (!obj) throw new Error('404');

    let data = {};
    data.webId = url;
    for await (const field of context.shape) {
        const fieldData = await obj[getPredicate(field, context)];
        data = { ...data, [field.object]: await fieldData && field.type && SolidTypesHelper.transformTypes(field.type, await fieldData.value) };
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export const getAppPathStorage = async (webId) => {
  return await storageHelper.getAppStorage(webId);
}

export const getPredicate = (field, context) => {
  const prefix = context['@context'][field.prefix];
  return `${prefix}${field.predicate}`;
}