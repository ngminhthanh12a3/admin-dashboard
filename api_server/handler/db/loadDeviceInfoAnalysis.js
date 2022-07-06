module.exports = async (Model, formatDataAnalysis, dbInitialTitle) => {
  const dataArray = await Model.find().lean().exec();

  await dataArray.forEach((data) => {
    const { devID, _id, __v, ...props } = data;
    formatDataAnalysis[devID] = props;
  });
};
