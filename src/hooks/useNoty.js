let notyInterface = {
  show: function() {},
  on: function() {},
  closeAll: function() {}
};

export default function useNoty() {
  return {
    ...notyInterface,
    setInterface(newInterface) {
      notyInterface = newInterface;
    }
  };
}
