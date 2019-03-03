const copy = (instance) => Object.assign(Object.create(Object.getPrototypeOf(instance)), instance);
export default copy;
  