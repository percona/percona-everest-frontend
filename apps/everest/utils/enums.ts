export const getEnumKeyByEnumValue = (enumObject, enumValue) => {
    let keys = Object.keys(enumObject).filter(x => enumObject[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}
