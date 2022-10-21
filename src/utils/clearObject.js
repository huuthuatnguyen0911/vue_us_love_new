function ClearObject(object) {
  Object.keys(object).forEach((key) => {
    delete object[key];
  });
}

export default ClearObject;
