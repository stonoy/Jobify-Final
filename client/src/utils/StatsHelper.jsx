const StatsHelper = (obj, Component) => {
  let result = [];
  for (const item in obj) {
    result.push(<Component name={item} count={obj[item]} key={item} />);
  }
  return result;
};

export default StatsHelper;
